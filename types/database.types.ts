export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "owner" | "admin" | "member";
export type BillingStatus = "trialing" | "active" | "past_due" | "canceled";
export type ItemStatus = "active" | "pending" | "archived" | "completed";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          billing_status: BillingStatus;
          subscription_tier: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          billing_status?: BillingStatus;
          subscription_tier?: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          billing_status?: BillingStatus;
          subscription_tier?: string;
        };
      };
      memberships: {
        Row: {
          id: string;
          user_id: string;
          org_id: string;
          role: UserRole;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          org_id: string;
          role?: UserRole;
          created_at?: string;
        };
        Update: {
          role?: UserRole;
        };
      };
      items: {
        Row: {
          id: string;
          org_id: string;
          title: string;
          category: string;
          status: ItemStatus;
          amount: number;
          metadata: Json;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          title: string;
          category?: string;
          status?: ItemStatus;
          amount?: number;
          metadata?: Json;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          category?: string;
          status?: ItemStatus;
          amount?: number;
          metadata?: Json;
          updated_at?: string;
        };
      };
      activity_logs: {
        Row: {
          id: string;
          org_id: string;
          user_id: string | null;
          action: string;
          target_resource: string;
          details: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          user_id?: string | null;
          action: string;
          target_resource: string;
          details?: Json;
          created_at?: string;
        };
      };
    };
  };
}
