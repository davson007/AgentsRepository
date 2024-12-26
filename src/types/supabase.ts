import { SupabaseClient } from '@supabase/supabase-js';

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      ai_personas: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          icon: string;
          name: string;
          description: string;
          main_objective: string;
          system_prompt: string;
          user_prompt_template: string;
          is_favorite: boolean;
          version: string;
          versions: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          icon?: string;
          name: string;
          description?: string;
          main_objective?: string;
          system_prompt?: string;
          user_prompt_template?: string;
          is_favorite?: boolean;
          version?: string;
          versions?: Json;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          icon?: string;
          name?: string;
          description?: string;
          main_objective?: string;
          system_prompt?: string;
          user_prompt_template?: string;
          is_favorite?: boolean;
          version?: string;
          versions?: Json;
        };
      };
      ai_agents: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          icon: string;
          name: string;
          description: string;
          persona_id: string | null;
          configuration: Json;
          status: string;
          is_favorite: boolean;
          main_objective: string;
          system_prompt: string;
          user_prompt_template: string;
          picture: string;
          version: string;
          versions: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          icon?: string;
          name: string;
          description?: string;
          persona_id?: string | null;
          configuration?: Json;
          status?: string;
          is_favorite?: boolean;
          main_objective?: string;
          system_prompt?: string;
          user_prompt_template?: string;
          picture?: string;
          version?: string;
          versions?: Json;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          icon?: string;
          name?: string;
          description?: string;
          persona_id?: string | null;
          configuration?: Json;
          status?: string;
          is_favorite?: boolean;
          main_objective?: string;
          system_prompt?: string;
          user_prompt_template?: string;
          picture?: string;
          version?: string;
          versions?: Json;
        };
      };
      ai_tools: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          description: string;
          code: string;
          code_type: string;
          is_favorite: boolean;
          main_objective: string;
          picture: string;
          notes: string;
          version: string;
          versions: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          description?: string;
          code?: string;
          code_type?: string;
          is_favorite?: boolean;
          main_objective?: string;
          picture?: string;
          notes?: string;
          version?: string;
          versions?: Json;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          description?: string;
          code?: string;
          code_type?: string;
          is_favorite?: boolean;
          main_objective?: string;
          picture?: string;
          notes?: string;
          version?: string;
          versions?: Json;
        };
      };
      api_credentials: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          url: string;
          description: string;
          service: string;
          key: string;
          is_active: boolean;
          is_favorite: boolean;
          notes: string;
          picture: string;
          expires_at: string | null;
          version: string;
          versions: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          url: string;
          description?: string;
          service?: string;
          key: string;
          is_active?: boolean;
          is_favorite?: boolean;
          notes?: string;
          picture?: string;
          expires_at?: string | null;
          version?: string;
          versions?: Json;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          url?: string;
          description?: string;
          service?: string;
          key?: string;
          is_active?: boolean;
          is_favorite?: boolean;
          notes?: string;
          picture?: string;
          expires_at?: string | null;
          version?: string;
          versions?: Json;
        };
      };
      agent_tools: {
        Row: {
          agent_id: string;
          tool_id: string;
          created_at: string;
        };
        Insert: {
          agent_id: string;
          tool_id: string;
          created_at?: string;
        };
        Update: {
          agent_id?: string;
          tool_id?: string;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

type PublicSchema = Database['public'];

export type Tables<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Row'];
export type TableInsert<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Insert'];
export type TableUpdate<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Update'];

export type DatabaseAgentResponse = Tables<'ai_agents'>;
export type DatabasePersonaResponse = Tables<'ai_personas'>;
export type DatabaseToolResponse = Tables<'ai_tools'>;
export type DatabaseCredentialResponse = Tables<'api_credentials'>;

// Create a Supabase client instance
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase: SupabaseClient<Database> = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;