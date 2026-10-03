import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature");

    const payload = JSON.parse(rawBody);
    const eventType = payload.type;
    const orgId = payload.data?.object?.metadata?.org_id;

    console.log(`[Stripe Webhook] Event: ${eventType}, Org: ${orgId}`);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey && orgId) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      if (eventType === "checkout.session.completed") {
        await supabase
          .from("organizations")
          .update({ billing_status: "active" })
          .eq("id", orgId);
      } else if (eventType === "customer.subscription.deleted") {
        await supabase
          .from("organizations")
          .update({ billing_status: "canceled" })
          .eq("id", orgId);
      }
    }

    return NextResponse.json({ received: true, type: eventType });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Stripe webhook failed" },
      { status: 400 }
    );
  }
}
