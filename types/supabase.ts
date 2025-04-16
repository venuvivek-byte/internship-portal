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
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          user_type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          user_type?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          user_type?: string
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          bio: string | null
          resume_url: string | null
          skills: string
          education: Json | null
          experience: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          bio?: string | null
          resume_url?: string | null
          skills?: string
          education?: Json | null
          experience?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          bio?: string | null
          resume_url?: string | null
          skills?: string
          education?: Json | null
          experience?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          website: string | null
          logo_url: string | null
          industry: string | null
          size: string | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          website?: string | null
          logo_url?: string | null
          industry?: string | null
          size?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          website?: string | null
          logo_url?: string | null
          industry?: string | null
          size?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      internships: {
        Row: {
          id: string
          company_id: string
          title: string
          description: string
          location: string
          type: string
          mode: string
          stipend: string | null
          duration: string
          skills: string
          perks: string | null
          status: string
          start_date: string
          end_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          title: string
          description: string
          location: string
          type: string
          mode: string
          stipend?: string | null
          duration: string
          skills: string
          perks?: string | null
          status?: string
          start_date: string
          end_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          title?: string
          description?: string
          location?: string
          type?: string
          mode?: string
          stipend?: string | null
          duration?: string
          skills?: string
          perks?: string | null
          status?: string
          start_date?: string
          end_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          user_id: string
          internship_id: string
          status: string
          cover_letter: string | null
          resume_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          internship_id: string
          status?: string
          cover_letter?: string | null
          resume_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          internship_id?: string
          status?: string
          cover_letter?: string | null
          resume_url?: string | null
          created_at?: string
          updated_at?: string
        }
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