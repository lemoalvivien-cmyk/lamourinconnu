import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface Profile {
  id: string;
  email: string;
  gender: string;
  seeking_gender: string;
  birthdate: string;
  city: string;
  postal_code: string;
  max_distance_km: number;
  relation_type: string;
  want_kids: string;
  smoking: string;
  lifestyle_tags: string[];
  bio: string;
  is_profile_complete: boolean;
  role: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  const startTime = Date.now();
  const errors: string[] = [];
  let profilesProcessed = 0;
  let matchesCreated = 0;
  let triggeredBy = "unknown";

  try {
    const authHeader = req.headers.get("Authorization");
    const cronSecret = Deno.env.get("CRON_SECRET");
    if (!cronSecret) {
      return new Response(JSON.stringify({ error: "CRON_SECRET not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (authHeader === `Bearer ${cronSecret}`) {
      triggeredBy = "cron";
    } else {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
      const userSupabase = createClient(supabaseUrl, anonKey, {
        global: {
          headers: { Authorization: authHeader || "" },
        },
      });

      const { data: { user }, error: userError } = await userSupabase.auth.getUser();

      if (userError || !user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: profile } = await userSupabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile || profile.role !== "admin") {
        return new Response(JSON.stringify({ error: "Forbidden: Admin access required" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      triggeredBy = user.id;
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .eq("is_profile_complete", true)
      .eq("suspended", false)
      .eq("profile_invisible", false)
      .is("deleted_at", null);

    if (profilesError) {
      errors.push(`Error fetching profiles: ${profilesError.message}`);
      throw new Error(profilesError.message);
    }

    if (!profiles || profiles.length === 0) {
      const executionDuration = Date.now() - startTime;
      await logMatchingExecution(
        supabase,
        profilesProcessed,
        matchesCreated,
        errors,
        executionDuration,
        triggeredBy
      );

      return new Response(
        JSON.stringify({
          success: true,
          message: "No eligible profiles found",
          profilesProcessed,
          matchesCreated,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    for (const profile of profiles) {
      try {
        profilesProcessed++;

        const { data: existingMatches } = await supabase
          .from("matches")
          .select("id")
          .or(`user_a_id.eq.${profile.id},user_b_id.eq.${profile.id}`)
          .eq("status", "proposed");

        if (existingMatches && existingMatches.length >= 5) {
          continue;
        }

        const compatibles = await findCompatibleProfiles(supabase, profile, profiles);

        for (const compatible of compatibles) {
          const score = calculateCompatibilityScore(profile, compatible);

          if (score >= 60) {
            const { data: existingMatch } = await supabase
              .from("matches")
              .select("id")
              .or(
                `and(user_a_id.eq.${profile.id},user_b_id.eq.${compatible.id}),and(user_a_id.eq.${compatible.id},user_b_id.eq.${profile.id})`
              )
              .maybeSingle();

            if (!existingMatch) {
              const { error: insertError } = await supabase.from("matches").insert({
                user_a_id: profile.id,
                user_b_id: compatible.id,
                compatibility_score: score,
                status: "proposed",
              });

              if (!insertError) {
                matchesCreated++;
              } else {
                errors.push(
                  `Error creating match between ${profile.id} and ${compatible.id}: ${insertError.message}`
                );
              }
            }
          }
        }
      } catch (profileError) {
        errors.push(`Error processing profile ${profile.id}: ${profileError}`);
      }
    }

    const executionDuration = Date.now() - startTime;
    await logMatchingExecution(
      supabase,
      profilesProcessed,
      matchesCreated,
      errors,
      executionDuration,
      triggeredBy
    );

    return new Response(
      JSON.stringify({
        success: true,
        profilesProcessed,
        matchesCreated,
        errors: errors.length > 0 ? errors : undefined,
        executionDuration,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const executionDuration = Date.now() - startTime;
    errors.push(`Fatal error: ${error}`);

    return new Response(
      JSON.stringify({
        success: false,
        error: String(error),
        profilesProcessed,
        matchesCreated,
        errors,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function findCompatibleProfiles(
  supabase: any,
  profile: Profile,
  allProfiles: Profile[]
): Promise<Profile[]> {
  const compatibles: Profile[] = [];

  const profileBirthdate = new Date(profile.birthdate);
  const profileAge = Math.floor(
    (Date.now() - profileBirthdate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );

  for (const candidate of allProfiles) {
    if (candidate.id === profile.id) continue;
    if (!candidate.is_profile_complete) continue;

    if (
      profile.seeking_gender !== "tous" &&
      profile.seeking_gender !== candidate.gender
    ) {
      continue;
    }

    if (
      candidate.seeking_gender !== "tous" &&
      candidate.seeking_gender !== profile.gender
    ) {
      continue;
    }

    const candidateBirthdate = new Date(candidate.birthdate);
    const candidateAge = Math.floor(
      (Date.now() - candidateBirthdate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    );

    const ageDiff = Math.abs(profileAge - candidateAge);
    if (ageDiff > 10) continue;

    const { data: blocks } = await supabase
      .from("blocks")
      .select("id")
      .or(
        `and(blocker_id.eq.${profile.id},blocked_id.eq.${candidate.id}),and(blocker_id.eq.${candidate.id},blocked_id.eq.${profile.id})`
      )
      .maybeSingle();

    if (blocks) continue;

    compatibles.push(candidate);
  }

  return compatibles;
}

function calculateCompatibilityScore(a: Profile, b: Profile): number {
  let score = 0;

  if (a.relation_type === b.relation_type) {
    score += 30;
  }

  if (a.want_kids === b.want_kids) {
    score += 20;
  }

  if (a.smoking === b.smoking) {
    score += 15;
  }

  const commonTags = a.lifestyle_tags.filter((tag) =>
    b.lifestyle_tags.includes(tag)
  );
  score += Math.min(commonTags.length * 5, 25);

  if (a.city === b.city) {
    score += 10;
  }

  return score;
}

async function logMatchingExecution(
  supabase: any,
  profilesProcessed: number,
  matchesCreated: number,
  errors: string[],
  executionDuration: number,
  triggeredBy: string
) {
  try {
    await supabase.from("matching_logs").insert({
      profiles_processed: profilesProcessed,
      matches_created: matchesCreated,
      errors: errors.length > 0 ? errors : null,
      execution_duration_ms: executionDuration,
      triggered_by: triggeredBy,
    });
  } catch (error) {
    console.error("Failed to log matching execution:", error);
  }
}
