import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const orgId = body.orgId || "org_demo_101";

    // In production:
    // const session = await stripe.billingPortal.sessions.create({ customer: customerId, return_url: ... });
    // return NextResponse.json({ url: session.url });

    // LemonSqueezy / Stripe simulated portal session URL
    const portalUrl = `https://billing.lemonsqueezy.com/my-orders/customer_portal?org=${orgId}&session_id=${Date.now()}`;

    return NextResponse.json({
      success: true,
      url: portalUrl,
      message: "Customer billing portal session active",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create portal session" },
      { status: 500 }
    );
  }
}
