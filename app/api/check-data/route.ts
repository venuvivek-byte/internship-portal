import { supabase } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check internships table
    const { data: internships, error: internshipsError } = await supabase
      .from('internships')
      .select('*')
      .limit(5)

    if (internshipsError) {
      console.error('Error fetching internships:', internshipsError)
      return NextResponse.json({ error: internshipsError.message }, { status: 500 })
    }

    // Check companies table
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('*')
      .limit(5)

    if (companiesError) {
      console.error('Error fetching companies:', companiesError)
      return NextResponse.json({ error: companiesError.message }, { status: 500 })
    }

    return NextResponse.json({
      internships: {
        count: internships?.length || 0,
        sample: internships?.[0]
      },
      companies: {
        count: companies?.length || 0,
        sample: companies?.[0]
      }
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 