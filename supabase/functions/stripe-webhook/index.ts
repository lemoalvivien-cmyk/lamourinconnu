import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import Stripe from "npm:stripe@17.3.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, stripe-signature",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!stripeSecretKey || !stripeWebhookSecret) {
      throw new Error("Stripe credentials not configured");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-11-20.acacia",
      httpClient: Stripe.createFetchHttpClient(),
    });

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Missing stripe-signature header" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        stripeWebhookSecret
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Received event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_details?.email;

      console.log("Processing checkout session for:", customerEmail);

      if (customerEmail) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id, role")
          .eq("email", customerEmail)
          .maybeSingle();

        if (profileError) {
          console.error("Error finding profile:", profileError);
          throw profileError;
        }

        if (profile) {
          console.log("Found profile:", profile.id);

          const { error: updateError } = await supabase
            .from("profiles")
            .update({ role: "subscriber" })
            .eq("id", profile.id);

          if (updateError) {
            console.error("Error updating profile role:", updateError);
            throw updateError;
          }

          console.log("Updated profile role to subscriber");

          const now = new Date();
          const periodEnd = new Date();
          periodEnd.setMonth(periodEnd.getMonth() + 1);

          const { error: subError } = await supabase
            .from("subscriptions")
            .upsert(
              {
                user_id: profile.id,
                stripe_customer_id: session.customer as string,
                stripe_subscription_id: session.subscription as string || null,
                status: "active",
                current_period_start: now.toISOString(),
                current_period_end: periodEnd.toISOString(),
                rdv_quota_used: 0,
                rdv_quota_max: 2,
              },
              { onConflict: "user_id" }
            );

          if (subError) {
            console.error("Error updating subscription:", subError);
            throw subError;
          }

          console.log("Updated subscription successfully");
        } else {
          console.log("No profile found for email:", customerEmail);
        }
      }
    } else if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      console.log("Processing subscription update for customer:", customerId);

      const { data: sub, error: subError } = await supabase
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_customer_id", customerId)
        .maybeSingle();

      if (subError) {
        console.error("Error finding subscription:", subError);
        throw subError;
      }

      if (sub) {
        const status = subscription.status === "active" ? "active" : "inactive";

        const { error: updateError } = await supabase
          .from("subscriptions")
          .update({
            status: status,
            current_period_start: new Date(
              subscription.current_period_start * 1000
            ).toISOString(),
            current_period_end: new Date(
              subscription.current_period_end * 1000
            ).toISOString(),
          })
          .eq("user_id", sub.user_id);

        if (updateError) {
          console.error("Error updating subscription status:", updateError);
          throw updateError;
        }

        const newRole = status === "active" ? "subscriber" : "member";
        const { error: roleError } = await supabase
          .from("profiles")
          .update({ role: newRole })
          .eq("id", sub.user_id);

        if (roleError) {
          console.error("Error updating profile role:", roleError);
          throw roleError;
        }

        console.log("Updated subscription and profile successfully");
      }
    } else if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      console.log("Processing subscription deletion for customer:", customerId);

      const { data: sub, error: subError } = await supabase
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_customer_id", customerId)
        .maybeSingle();

      if (subError) {
        console.error("Error finding subscription:", subError);
        throw subError;
      }

      if (sub) {
        const { error: updateError } = await supabase
          .from("subscriptions")
          .update({ status: "canceled" })
          .eq("user_id", sub.user_id);

        if (updateError) {
          console.error("Error updating subscription:", updateError);
          throw updateError;
        }

        const { error: roleError } = await supabase
          .from("profiles")
          .update({ role: "member" })
          .eq("id", sub.user_id);

        if (roleError) {
          console.error("Error updating profile role:", roleError);
          throw roleError;
        }

        console.log("Canceled subscription and downgraded profile");
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
