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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          content: string | null
          cover_image: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          published: boolean | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          published?: boolean | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          published?: boolean | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          challenge: string | null
          client_name: string | null
          cover_image: string | null
          created_at: string | null
          gallery_images: string[] | null
          id: string
          metrics: Json | null
          platform: string
          published: boolean | null
          results: string | null
          slug: string
          solution: string | null
          sort_order: number | null
          tags: string[] | null
          title: string
        }
        Insert: {
          challenge?: string | null
          client_name?: string | null
          cover_image?: string | null
          created_at?: string | null
          gallery_images?: string[] | null
          id?: string
          metrics?: Json | null
          platform?: string
          published?: boolean | null
          results?: string | null
          slug: string
          solution?: string | null
          sort_order?: number | null
          tags?: string[] | null
          title: string
        }
        Update: {
          challenge?: string | null
          client_name?: string | null
          cover_image?: string | null
          created_at?: string | null
          gallery_images?: string[] | null
          id?: string
          metrics?: Json | null
          platform?: string
          published?: boolean | null
          results?: string | null
          slug?: string
          solution?: string | null
          sort_order?: number | null
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      client_logos: {
        Row: {
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          published: boolean | null
          sort_order: number | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          published?: boolean | null
          sort_order?: number | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          published?: boolean | null
          sort_order?: number | null
          website_url?: string | null
        }
        Relationships: []
      }
      consultation_bookings: {
        Row: {
          budget_range: string | null
          business_type: string | null
          created_at: string | null
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          platform: string | null
          status: string | null
        }
        Insert: {
          budget_range?: string | null
          business_type?: string | null
          created_at?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          platform?: string | null
          status?: string | null
        }
        Update: {
          budget_range?: string | null
          business_type?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          platform?: string | null
          status?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          read: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          read?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean | null
        }
        Relationships: []
      }
      feedbacks: {
        Row: {
          approved: boolean | null
          created_at: string | null
          email: string | null
          id: string
          message: string
          name: string
          rating: number | null
        }
        Insert: {
          approved?: boolean | null
          created_at?: string | null
          email?: string | null
          id?: string
          message: string
          name: string
          rating?: number | null
        }
        Update: {
          approved?: boolean | null
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string
          name?: string
          rating?: number | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string | null
          email: string
          id: string
          subscribed: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          subscribed?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          subscribed?: boolean | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          link: string | null
          published: boolean | null
          sort_order: number | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          published?: boolean | null
          sort_order?: number | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          published?: boolean | null
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          color_class: string | null
          created_at: string | null
          description: string | null
          icon_name: string | null
          id: string
          published: boolean | null
          sort_order: number | null
          title: string
        }
        Insert: {
          color_class?: string | null
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          published?: boolean | null
          sort_order?: number | null
          title: string
        }
        Update: {
          color_class?: string | null
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          published?: boolean | null
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content_key: string
          content_type: string | null
          content_value: string | null
          created_at: string | null
          id: string
          page: string
          section: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          content_key: string
          content_type?: string | null
          content_value?: string | null
          created_at?: string | null
          id?: string
          page: string
          section: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          content_key?: string
          content_type?: string | null
          content_value?: string | null
          created_at?: string | null
          id?: string
          page?: string
          section?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string | null
          id: string
          name: string
          published: boolean | null
          rating: number | null
          role: string | null
          sort_order: number | null
          text: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          published?: boolean | null
          rating?: number | null
          role?: string | null
          sort_order?: number | null
          text: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          published?: boolean | null
          rating?: number | null
          role?: string | null
          sort_order?: number | null
          text?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visitor_logs: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string | null
          device_type: string | null
          id: string
          ip_address: string | null
          language: string | null
          os: string | null
          page_path: string
          page_title: string | null
          referrer: string | null
          screen_height: number | null
          screen_width: number | null
          session_id: string | null
          user_agent: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          language?: string | null
          os?: string | null
          page_path: string
          page_title?: string | null
          referrer?: string | null
          screen_height?: number | null
          screen_width?: number | null
          session_id?: string | null
          user_agent?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          language?: string | null
          os?: string | null
          page_path?: string
          page_title?: string | null
          referrer?: string | null
          screen_height?: number | null
          screen_width?: number | null
          session_id?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
