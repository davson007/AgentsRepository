export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ai_personas: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          icon: string
          name: string
          description: string
          main_objective: string
          system_prompt: string
          user_prompt_template: string
        }
        Insert: Omit<Tables['ai_personas']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Tables['ai_personas']['Insert']>
      }
      ai_agents: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          icon: string
          name: string
          description: string
          persona_id: string | null
          configuration: Json
          status: string
        }
        Insert: Omit<Tables['ai_agents']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Tables['ai_agents']['Insert']>
      }
      tools: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          icon: string
          name: string
          description: string
          objective: string
          parameters: Json
          code: string
        }
        Insert: Omit<Tables['tools']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Tables['tools']['Insert']>
      }
      api_credentials: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          service: string
          description: string
          key: string
          is_active: boolean
          expires_at: string | null
        }
        Insert: Omit<Tables['api_credentials']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Tables['api_credentials']['Insert']>
      }
      agent_tools: {
        Row: {
          agent_id: string
          tool_id: string
          created_at: string
        }
        Insert: Omit<Tables['agent_tools']['Row'], 'created_at'>
        Update: Partial<Tables['agent_tools']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}