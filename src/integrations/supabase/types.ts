export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      health_data: {
        Row: {
          created_at: string | null
          data_type: string
          device_id: string
          id: string
          timestamp: string | null
          unit: string
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string | null
          data_type: string
          device_id: string
          id?: string
          timestamp?: string | null
          unit: string
          user_id: string
          value: number
        }
        Update: {
          created_at?: string | null
          data_type?: string
          device_id?: string
          id?: string
          timestamp?: string | null
          unit?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "health_data_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "health_devices"
            referencedColumns: ["id"]
          },
        ]
      }
      health_devices: {
        Row: {
          created_at: string | null
          device_name: string
          device_type: string
          id: string
          is_connected: boolean | null
          last_data: Json | null
          last_synced: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_name: string
          device_type: string
          id?: string
          is_connected?: boolean | null
          last_data?: Json | null
          last_synced?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_name?: string
          device_type?: string
          id?: string
          is_connected?: boolean | null
          last_data?: Json | null
          last_synced?: string | null
          user_id?: string
        }
        Relationships: []
      }
      meditation_sessions: {
        Row: {
          completed: boolean | null
          created_at: string
          duration: number
          id: string
          notes: string | null
          stress_level_after: number | null
          stress_level_before: number | null
          type: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          duration: number
          id?: string
          notes?: string | null
          stress_level_after?: number | null
          stress_level_before?: number | null
          type: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          duration?: number
          id?: string
          notes?: string | null
          stress_level_after?: number | null
          stress_level_before?: number | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meditation_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          meditation_minutes: number | null
          stress_level: number | null
          updated_at: string
          yoga_sessions: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          meditation_minutes?: number | null
          stress_level?: number | null
          updated_at?: string
          yoga_sessions?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          meditation_minutes?: number | null
          stress_level?: number | null
          updated_at?: string
          yoga_sessions?: number | null
        }
        Relationships: []
      }
      yoga_sessions: {
        Row: {
          completed: boolean | null
          created_at: string
          difficulty: string
          duration: number
          id: string
          notes: string | null
          poses: Json | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          difficulty: string
          duration: number
          id?: string
          notes?: string | null
          poses?: Json | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          difficulty?: string
          duration?: number
          id?: string
          notes?: string | null
          poses?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "yoga_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
