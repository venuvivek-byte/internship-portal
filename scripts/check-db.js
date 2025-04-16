// This script checks the database connection and data
const { createClient } = require('@supabase/supabase-js')

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oakeovnylfqbnuiexevz.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ha2Vvdm55bGZxYm51aWV4ZXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0OTAwODAsImV4cCI6MjA2MDA2NjA4MH0.Hwg5P6fHNksyMsgMS79T6DQV4xwXcPCb2KsgiSKrwSA"

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkDatabase() {
  console.log('Checking database connection...')
  
  try {
    // Check companies table
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('*')
    
    if (companiesError) {
      console.error('Error fetching companies:', companiesError)
    } else {
      console.log(`Found ${companies.length} companies`)
      console.log('First company:', companies[0])
    }
    
    // Check internships table
    const { data: internships, error: internshipsError } = await supabase
      .from('internships')
      .select(`
        *,
        companies (
          name,
          logo_url,
          website
        )
      `)
    
    if (internshipsError) {
      console.error('Error fetching internships:', internshipsError)
    } else {
      console.log(`Found ${internships.length} internships`)
      console.log('First internship:', internships[0])
    }
    
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

// Run the check
checkDatabase() 