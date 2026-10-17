export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          pin_hash: string | null
          sound_enabled: boolean
          updated_at: string
          weekly_email_opt_in: boolean
        }
        Insert: {
          created_at?: string
          email?: string
          id: string
          name?: string
          pin_hash?: string | null
          sound_enabled?: boolean
          updated_at?: string
          weekly_email_opt_in?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          pin_hash?: string | null
          sound_enabled?: boolean
          updated_at?: string
          weekly_email_opt_in?: boolean
        }
        Relationships: []
      }
      category_lessons: {
        Row: {
          category: string
          id: string
          lesson_order: number
          subtopic_name: string
        }
        Insert: {
          category: string
          id?: string
          lesson_order?: number
          subtopic_name: string
        }
        Update: {
          category?: string
          id?: string
          lesson_order?: number
          subtopic_name?: string
        }
        Relationships: []
      }
      child_bag_state: {
        Row: {
          bag_position: number
          child_id: string
          current_bag: string[]
          selected_content: Json | null
          selected_day: string | null
        }
        Insert: {
          bag_position?: number
          child_id: string
          current_bag?: string[]
          selected_content?: Json | null
          selected_day?: string | null
        }
        Update: {
          bag_position?: number
          child_id?: string
          current_bag?: string[]
          selected_content?: Json | null
          selected_day?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "child_bag_state_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: true
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      child_slideshow_progress: {
        Row: {
          category: string
          child_id: string
          next_lesson_index: number
        }
        Insert: {
          category: string
          child_id: string
          next_lesson_index?: number
        }
        Update: {
          category?: string
          child_id?: string
          next_lesson_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "child_slideshow_progress_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          account_id: string
          age: number
          chat_retention_setting: number
          created_at: string
          id: string
          interests: string[]
          name: string
          progress: Json
          reading_level: string | null
          reply_tone: string | null
          screen_time_limit_minutes: number
          setup: Json
          slideshow_reset_time: string
          updated_at: string
        }
        Insert: {
          account_id: string
          age?: number
          chat_retention_setting?: number
          created_at?: string
          id?: string
          interests?: string[]
          name: string
          progress?: Json
          reading_level?: string | null
          reply_tone?: string | null
          screen_time_limit_minutes?: number
          setup?: Json
          slideshow_reset_time?: string
          updated_at?: string
        }
        Update: {
          account_id?: string
          age?: number
          chat_retention_setting?: number
          created_at?: string
          id?: string
          interests?: string[]
          name?: string
          progress?: Json
          reading_level?: string | null
          reply_tone?: string | null
          screen_time_limit_minutes?: number
          setup?: Json
          slideshow_reset_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "children_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      devices: {
        Row: {
          account_id: string
          created_at: string
          device_key: string
          id: string
          label: string
          last_seen: string
          revoked: boolean
        }
        Insert: {
          account_id: string
          created_at?: string
          device_key: string
          id?: string
          label?: string
          last_seen?: string
          revoked?: boolean
        }
        Update: {
          account_id?: string
          created_at?: string
          device_key?: string
          id?: string
          label?: string
          last_seen?: string
          revoked?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "devices_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      slideshow_content_cache: {
        Row: {
          band: string
          content: Json
          lesson_id: string
        }
        Insert: {
          band: string
          content: Json
          lesson_id: string
        }
        Update: {
          band?: string
          content?: Json
          lesson_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "slideshow_content_cache_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "category_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      select_daily_lesson: {
        Args: { p_child_id: string; p_custom?: Json; p_day: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
