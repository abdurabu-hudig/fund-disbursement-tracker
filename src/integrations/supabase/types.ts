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
      achievements: {
        Row: {
          created_at: string | null
          date: string
          description: string
          files: Json
          id: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date: string
          description: string
          files: Json
          id?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          description?: string
          files?: Json
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          check_in: string
          check_out: string | null
          created_at: string | null
          date: string
          id: string
          overtime: number | null
          status: string
          total_hours: number | null
          user_id: string
        }
        Insert: {
          check_in: string
          check_out?: string | null
          created_at?: string | null
          date: string
          id?: string
          overtime?: number | null
          status: string
          total_hours?: number | null
          user_id: string
        }
        Update: {
          check_in?: string
          check_out?: string | null
          created_at?: string | null
          date?: string
          id?: string
          overtime?: number | null
          status?: string
          total_hours?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_records: {
        Row: {
          created_at: string | null
          deductions_absence: number
          deductions_late: number
          deductions_other: Json
          id: string
          month: number
          overtime_amount: number
          overtime_hours: number
          salary_basic: number
          salary_housing: number
          salary_living: number
          salary_nature: number
          salary_other: Json
          salary_transportation: number
          total: number
          user_id: string
          year: number
        }
        Insert: {
          created_at?: string | null
          deductions_absence: number
          deductions_late: number
          deductions_other: Json
          id?: string
          month: number
          overtime_amount: number
          overtime_hours: number
          salary_basic: number
          salary_housing: number
          salary_living: number
          salary_nature: number
          salary_other: Json
          salary_transportation: number
          total: number
          user_id: string
          year: number
        }
        Update: {
          created_at?: string | null
          deductions_absence?: number
          deductions_late?: number
          deductions_other?: Json
          id?: string
          month?: number
          overtime_amount?: number
          overtime_hours?: number
          salary_basic?: number
          salary_housing?: number
          salary_living?: number
          salary_nature?: number
          salary_other?: Json
          salary_transportation?: number
          total?: number
          user_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "financial_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      holidays: {
        Row: {
          created_at: string | null
          date: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      leave_requests: {
        Row: {
          approval_chain: Json
          created_at: string | null
          end_date: string
          id: string
          reason: string
          start_date: string
          status: string
          type: string
          user_id: string
        }
        Insert: {
          approval_chain: Json
          created_at?: string | null
          end_date: string
          id?: string
          reason: string
          start_date: string
          status: string
          type: string
          user_id: string
        }
        Update: {
          approval_chain?: Json
          created_at?: string | null
          end_date?: string
          id?: string
          reason?: string
          start_date?: string
          status?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_required: boolean
          created_at: string | null
          date: string
          id: string
          message: string
          related_id: string | null
          status: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_required: boolean
          created_at?: string | null
          date: string
          id?: string
          message: string
          related_id?: string | null
          status: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_required?: boolean
          created_at?: string | null
          date?: string
          id?: string
          message?: string
          related_id?: string | null
          status?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          approval_chain: Json
          created_at: string | null
          date: string
          end_time: string
          id: string
          reason: string
          start_time: string
          status: string
          type: string
          user_id: string
        }
        Insert: {
          approval_chain: Json
          created_at?: string | null
          date: string
          end_time: string
          id?: string
          reason: string
          start_time: string
          status: string
          type: string
          user_id: string
        }
        Update: {
          approval_chain?: Json
          created_at?: string | null
          date?: string
          end_time?: string
          id?: string
          reason?: string
          start_time?: string
          status?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_by: string
          assigned_to: string
          attachments: Json
          created_at: string | null
          description: string
          due_date: string
          id: string
          status: string
          title: string
        }
        Insert: {
          assigned_by: string
          assigned_to: string
          attachments: Json
          created_at?: string | null
          description: string
          due_date: string
          id?: string
          status: string
          title: string
        }
        Update: {
          assigned_by?: string
          assigned_to?: string
          attachments?: Json
          created_at?: string | null
          description?: string
          due_date?: string
          id?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          center: string | null
          created_at: string | null
          department: string
          department_head: string | null
          direct_manager: string | null
          email: string
          id: string
          name: string
          position: string
          role: string
        }
        Insert: {
          center?: string | null
          created_at?: string | null
          department: string
          department_head?: string | null
          direct_manager?: string | null
          email: string
          id?: string
          name: string
          position: string
          role: string
        }
        Update: {
          center?: string | null
          created_at?: string | null
          department?: string
          department_head?: string | null
          direct_manager?: string | null
          email?: string
          id?: string
          name?: string
          position?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_department_head_fkey"
            columns: ["department_head"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_direct_manager_fkey"
            columns: ["direct_manager"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      work_settings: {
        Row: {
          break_time_end: string
          break_time_start: string
          id: number
          leave_annual: number
          leave_emergency: number
          leave_sick: number
          updated_at: string | null
          work_days: string[]
          work_hours_end: string
          work_hours_start: string
        }
        Insert: {
          break_time_end: string
          break_time_start: string
          id?: number
          leave_annual: number
          leave_emergency: number
          leave_sick: number
          updated_at?: string | null
          work_days: string[]
          work_hours_end: string
          work_hours_start: string
        }
        Update: {
          break_time_end?: string
          break_time_start?: string
          id?: number
          leave_annual?: number
          leave_emergency?: number
          leave_sick?: number
          updated_at?: string | null
          work_days?: string[]
          work_hours_end?: string
          work_hours_start?: string
        }
        Relationships: []
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
