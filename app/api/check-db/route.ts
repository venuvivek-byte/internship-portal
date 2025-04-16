import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    // Check companies
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('*');
    
    if (companiesError) throw companiesError;

    // Check internships
    const { data: internships, error: internshipsError } = await supabase
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
      `);
    
    if (internshipsError) throw internshipsError;

    return NextResponse.json({
      success: true,
      companies: {
        count: companies.length,
        first: companies[0] || null
      },
      internships: {
        count: internships.length,
        first: internships[0] || null
      }
    });

  } catch (error) {
    console.error('Error checking database:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
} 