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
      internships: {
        Row: {
          id: string
          created_at: string
          title: string
          company_id: string
          description: string
          requirements: string[]
          location: string
          type: string
          duration: string
          industry: string
          experience_level: string
          stipend: number
          is_remote: boolean
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          company_id: string
          description: string
          requirements: string[]
          location: string
          type: string
          duration: string
          industry: string
          experience_level: string
          stipend: number
          is_remote: boolean
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          company_id?: string
          description?: string
          requirements?: string[]
          location?: string
          type?: string
          duration?: string
          industry?: string
          experience_level?: string
          stipend?: number
          is_remote?: boolean
          status?: string
        }
      }
      companies: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          logo_url: string
          website: string
          industry: string
          size: string
          location: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          logo_url: string
          website: string
          industry: string
          size: string
          location: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          logo_url?: string
          website?: string
          industry?: string
          size?: string
          location?: string
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