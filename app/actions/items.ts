"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createItemSchema, updateItemSchema } from "@/lib/validations";

export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function createItemAction(
  formData: FormData | Record<string, any>
): Promise<ActionResult> {
  try {
    const rawData =
      formData instanceof FormData
        ? Object.fromEntries(formData.entries())
        : formData;

    const validated = createItemSchema.safeParse({
      org_id: rawData.org_id,
      title: rawData.title,
      category: rawData.category || "General",
      status: rawData.status || "active",
      amount: Number(rawData.amount) || 0,
      metadata: rawData.metadata ? JSON.parse(rawData.metadata as string) : {},
    });

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.errors.map((e) => e.message).join(", "),
      };
    }

    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await (supabase
        .from("items") as any)
        .insert(validated.data)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      revalidatePath("/dashboard/data-manager");
      return { success: true, data };
    }

    // In local demo / offline mode without active Supabase keys
    revalidatePath("/dashboard/data-manager");
    return {
      success: true,
      data: {
        id: `mock-${Date.now()}`,
        ...validated.data,
        created_at: new Date().toISOString(),
      },
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create record" };
  }
}

export async function updateItemAction(
  id: string,
  formData: FormData | Record<string, any>
): Promise<ActionResult> {
  try {
    const rawData =
      formData instanceof FormData
        ? Object.fromEntries(formData.entries())
        : formData;

    const validated = updateItemSchema.safeParse({
      title: rawData.title,
      category: rawData.category,
      status: rawData.status,
      amount: rawData.amount !== undefined ? Number(rawData.amount) : undefined,
    });

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.errors.map((e) => e.message).join(", "),
      };
    }

    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await (supabase
        .from("items") as any)
        .update(validated.data)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      revalidatePath("/dashboard/data-manager");
      return { success: true, data };
    }

    revalidatePath("/dashboard/data-manager");
    return {
      success: true,
      data: { id, ...validated.data, updated_at: new Date().toISOString() },
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update record" };
  }
}

export async function deleteItemAction(id: string): Promise<ActionResult> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("items").delete().eq("id", id);
      if (error) {
        return { success: false, error: error.message };
      }
    }

    revalidatePath("/dashboard/data-manager");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete record" };
  }
}
