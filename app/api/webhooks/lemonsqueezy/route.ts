import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature") || "";
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "ls_secret_demo";

    // Verify HMAC-SHA256 signature if secret is configured
    if (process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
      const hmac = crypto.createHmac("sha256", secret);
      const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
      const signatureBuffer = Buffer.from(signature, "utf8");

      if (
        digest.length !== signatureBuffer.length ||
        !crypto.timingSafeEqual(digest, signatureBuffer)
      ) {
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 401 }
        );
      }
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name || payload.eventName;
    const customData = payload.meta?.custom_data || {};
    const orgId = customData.org_id || payload.data?.attributes?.custom_data?.org_id;

    console.log(`[LemonSqueezy Webhook] Received event: ${eventName} for org: ${orgId}`);

    // Update Supabase if credentials are provided
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey && orgId) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      let billingStatus = "active";
      let tier = "pro";

      switch (eventName) {
        case "subscription_created":
        case "subscription_resumed":
          billingStatus = "active";
          break;
        case "subscription_updated":
          const status = payload.data?.attributes?.status;
          billingStatus = status === "active" ? "active" : status === "past_due" ? "past_due" : "active";
          break;
        case "subscription_cancelled":
        case "subscription_expired":
          billingStatus = "canceled";
          break;
        default:
          break;
      }

      await supabase
        .from("organizations")
        .update({
          billing_status: billingStatus,
          subscription_tier: tier,
        })
        .eq("id", orgId);
    }

    return NextResponse.json({
      received: true,
      event: eventName,
      orgId: orgId || "demo-org",
    });
  } catch (error: any) {
    console.error("[LemonSqueezy Webhook Error]", error);
    return NextResponse.json(
      { error: error.message || "Internal webhook handler error" },
      { status: 500 }
    );
  }
}
