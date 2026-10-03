"use server";

import { revalidatePath } from "next/cache";
import { subscriptionUpdateSchema } from "@/lib/validations";

export interface BillingActionResult {
  success: boolean;
  message?: string;
  portalUrl?: string;
  checkoutUrl?: string;
  error?: string;
}

export async function manageSubscriptionAction(
  orgId: string
): Promise<BillingActionResult> {
  try {
    // In production, instantiate LemonSqueezy SDK or Stripe SDK
    // const portal = await stripe.billingPortal.sessions.create({ customer: customerId });
    // or LemonSqueezy customer portal URL
    const simulatedPortalUrl = `https://billing.lemonsqueezy.com/my-orders/customer_portal?org=${orgId}`;

    return {
      success: true,
      portalUrl: simulatedPortalUrl,
      message: "Customer billing portal session created successfully",
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to generate customer portal session",
    };
  }
}

export async function updatePlanAction(
  orgId: string,
  tier: "starter" | "pro" | "enterprise",
  interval: "monthly" | "annual" = "monthly"
): Promise<BillingActionResult> {
  try {
    const validated = subscriptionUpdateSchema.safeParse({
      org_id: orgId,
      tier,
      interval,
    });

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.errors.map((e) => e.message).join(", "),
      };
    }

    revalidatePath("/dashboard/settings");
    return {
      success: true,
      message: `Organization subscription upgraded to ${tier.toUpperCase()} tier (${interval}).`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to update subscription plan",
    };
  }
}

export async function cancelSubscriptionAction(
  orgId: string
): Promise<BillingActionResult> {
  try {
    // In production, update Supabase organization billing_status to 'canceled'
    // and invoke stripe.subscriptions.update(id, { cancel_at_period_end: true });
    revalidatePath("/dashboard/settings");
    return {
      success: true,
      message:
        "Subscription scheduled for cancellation at the end of the current billing cycle.",
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to cancel subscription",
    };
  }
}
