import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getInternships(filters: any = {}) {
  try {
    let query = supabase
      .from('internships')
      .select(`
        *,
        companies (
          id,
          name,
          description,
          website,
          location
        )
      `)
      .order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Error fetching internships:', error)
      throw error
    }
    
    console.log('Fetched internships:', data)
    return data
  } catch (error) {
    console.error('Error in getInternships:', error)
    throw error
  }
}

export async function getInternshipById(id: string) {
  try {
    const { data, error } = await supabase
      .from('internships')
      .select(`
        *,
        company:companies (
          id,
          name,
          description,
          website,
          location
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching internship:', error)
    throw error
  }
}

export async function getCompanies() {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('name')

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching companies:', error)
    throw error
  }
}

export async function getCompanyById(id: string) {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select(`
        *,
        internships (
          id,
          title,
          type,
          location,
          duration,
          stipend,
          description,
          requirements,
          is_remote,
          created_at
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching company:', error)
    throw error
  }
} 