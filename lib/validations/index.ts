import { z } from "zod";

// ==============================================================================
// ITEMS VALIDATIONS
// ==============================================================================
export const itemSchema = z.object({
  id: z.string().uuid().optional(),
  org_id: z.string().uuid({ message: "Valid organization ID is required" }),
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  category: z
    .string()
    .min(1, { message: "Please specify a valid category" })
    .default("General"),
  status: z
    .enum(["active", "pending", "archived", "completed"])
    .default("active"),
  amount: z
    .number()
    .nonnegative({ message: "Amount must be a non-negative number" })
    .default(0),
  metadata: z.record(z.any()).default({}),
});

export const createItemSchema = itemSchema.omit({ id: true });
export const updateItemSchema = itemSchema.partial().omit({ id: true });

export type ItemFormValues = z.infer<typeof itemSchema>;
export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;

// ==============================================================================
// ORGANIZATION VALIDATIONS
// ==============================================================================
export const orgSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(2, { message: "Organization name must be at least 2 characters" })
    .max(60, { message: "Organization name cannot exceed 60 characters" }),
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters" })
    .max(50, { message: "Slug cannot exceed 50 characters" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must contain only lowercase letters, numbers, and dashes",
    }),
  billing_status: z
    .enum(["trialing", "active", "past_due", "canceled"])
    .default("trialing"),
  subscription_tier: z.string().default("starter"),
});

export const updateOrgSchema = orgSchema.pick({ name: true, slug: true });

export type OrgFormValues = z.infer<typeof orgSchema>;
export type UpdateOrgInput = z.infer<typeof updateOrgSchema>;

// ==============================================================================
// TEAM & MEMBERSHIP VALIDATIONS
// ==============================================================================
export const inviteMemberSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.enum(["owner", "admin", "member"], {
    errorMap: () => ({ message: "Role must be owner, admin, or member" }),
  }),
  org_id: z.string().uuid({ message: "Valid organization ID is required" }),
});

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;

// ==============================================================================
// BILLING VALIDATIONS
// ==============================================================================
export const subscriptionUpdateSchema = z.object({
  org_id: z.string().uuid(),
  tier: z.enum(["starter", "pro", "enterprise"]),
  interval: z.enum(["monthly", "annual"]).default("monthly"),
});

export type SubscriptionUpdateInput = z.infer<typeof subscriptionUpdateSchema>;

// ==============================================================================
// AUTH VALIDATIONS
// ==============================================================================
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  orgName: z
    .string()
    .min(2, { message: "Organization name must be at least 2 characters" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
