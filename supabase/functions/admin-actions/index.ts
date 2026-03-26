import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authHeader = req.headers.get("Authorization") || "";
    const userSupabase = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await userSupabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: adminProfile } = await userSupabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!adminProfile || adminProfile.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden: Admin required" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json();
    const { action, userId, role, reason, duration, reportId, adminNote, actionTaken } = body;

    let result: Record<string, unknown> = { success: true };

    switch (action) {
      case "updateRole": {
        const { error } = await supabase
          .from("profiles")
          .update({ role })
          .eq("id", userId);
        if (error) throw error;
        result.message = `Role updated to ${role}`;
        break;
      }

      case "suspendUser": {
        const suspendedUntil = duration
          ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString()
          : null;
        const { error } = await supabase
          .from("profiles")
          .update({
            suspended: true,
            suspended_until: suspendedUntil,
            suspension_reason: reason,
          })
          .eq("id", userId);
        if (error) throw error;
        result.message = duration ? `Suspended for ${duration} days` : "Banned permanently";
        break;
      }

      case "warnUser": {
        const { data: profile } = await supabase
          .from("profiles")
          .select("warnings_count")
          .eq("id", userId)
          .single();

        const newWarnings = (profile?.warnings_count || 0) + 1;
        await supabase
          .from("profiles")
          .update({ warnings_count: newWarnings })
          .eq("id", userId);

        if (newWarnings >= 3) {
          await supabase
            .from("profiles")
            .update({
              suspended: true,
              suspended_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              suspension_reason: "Auto-suspension after 3 warnings",
            })
            .eq("id", userId);
        }
        result.message = `Warning ${newWarnings}/3 issued`;
        result.autoSuspended = newWarnings >= 3;
        break;
      }

      case "updateReport": {
        const updates: Record<string, unknown> = {
          status: body.status || "resolved",
          resolved_by: user.id,
        };
        if (body.status === "resolved" || body.status === "rejected") {
          updates.resolved_at = new Date().toISOString();
        }
        if (adminNote) updates.admin_note = adminNote;
        if (actionTaken) updates.action_taken = actionTaken;

        const { error } = await supabase
          .from("reports")
          .update(updates)
          .eq("id", reportId);
        if (error) throw error;
        result.message = `Report updated to ${body.status}`;
        break;
      }

      default:
        return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
