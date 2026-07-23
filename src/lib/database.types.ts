export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          subscription_status: string;
          trial_start: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          subscription_status?: string;
          trial_start?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          subscription_status?: string;
          trial_start?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          bugs_found: number | null;
          code_snippet: string | null;
          completed_at: string | null;
          created_at: string | null;
          id: string;
          language: string | null;
          pr_number: number | null;
          pr_title: string | null;
          pr_url: string | null;
          repo_id: string | null;
          repo_name: string | null;
          review_result: Json | null;
          review_type: string;
          security_issues: number | null;
          status: string;
          suggestions_count: number | null;
          user_id: string;
        };
        Insert: {
          bugs_found?: number | null;
          code_snippet?: string | null;
          completed_at?: string | null;
          created_at?: string | null;
          id?: string;
          language?: string | null;
          pr_number?: number | null;
          pr_title?: string | null;
          pr_url?: string | null;
          repo_id?: string | null;
          repo_name?: string | null;
          review_result?: Json | null;
          review_type: string;
          security_issues?: number | null;
          status?: string;
          suggestions_count?: number | null;
          user_id: string;
        };
        Update: {
          bugs_found?: number | null;
          code_snippet?: string | null;
          completed_at?: string | null;
          created_at?: string | null;
          id?: string;
          language?: string | null;
          pr_number?: number | null;
          pr_title?: string | null;
          pr_url?: string | null;
          repo_id?: string | null;
          repo_name?: string | null;
          review_result?: Json | null;
          review_type?: string;
          security_issues?: number | null;
          status?: string;
          suggestions_count?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_repo_id_fkey";
            columns: ["repo_id"];
            isOneToOne: false;
            referencedRelation: "user_repos";
            referencedColumns: ["id"];
          }
        ];
      };
      user_repos: {
        Row: {
          active: boolean | null;
          created_at: string | null;
          id: string;
          repo_full_name: string;
          repo_id: number;
          repo_name: string;
          repo_url: string | null;
          updated_at: string | null;
          user_id: string;
          webhook_active: boolean | null;
          webhook_id: number | null;
        };
        Insert: {
          active?: boolean | null;
          created_at?: string | null;
          id?: string;
          repo_full_name: string;
          repo_id: number;
          repo_name: string;
          repo_url?: string | null;
          updated_at?: string | null;
          user_id: string;
          webhook_active?: boolean | null;
          webhook_id?: number | null;
        };
        Update: {
          active?: boolean | null;
          created_at?: string | null;
          id?: string;
          repo_full_name?: string;
          repo_id?: number;
          repo_name?: string;
          repo_url?: string | null;
          updated_at?: string | null;
          user_id?: string;
          webhook_active?: boolean | null;
          webhook_id?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];