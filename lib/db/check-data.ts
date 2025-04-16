import { supabase } from '.'

async function checkData() {
  try {
    // Check internships table
    const { data: internships, error: internshipsError } = await supabase
      .from('internships')
      .select('*')
      .limit(5)

    if (internshipsError) {
      console.error('Error fetching internships:', internshipsError)
      return
    }

    console.log('Internships found:', internships?.length || 0)
    console.log('Sample internship:', internships?.[0])

    // Check companies table
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('*')
      .limit(5)

    if (companiesError) {
      console.error('Error fetching companies:', companiesError)
      return
    }

    console.log('Companies found:', companies?.length || 0)
    console.log('Sample company:', companies?.[0])
  } catch (error) {
    console.error('Error:', error)
  }
}

checkData() 