
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://houokqdxzngnyncidtzh.supabase.co'
const supabaseKey = 'sb_secret_1uNg0RAnCWd1vEzCQOUONg_s3OhxIRQ'

console.log(`Testing connection to ${supabaseUrl}...`);
console.log(`Key format check: ${supabaseKey.startsWith('ey') ? 'JWT-like' : 'Non-JWT (Likely Invalid for Client)'}`);

try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    // Try a simple read to check auth
    const { data, error } = await supabase.from('leads_isabel').select('count', { count: 'exact', head: true })

    if (error) {
        console.error('Connection Error:', error.message)
    } else {
        console.log('Connection Successful!')
    }
} catch (e) {
    console.error('Client Init Error:', e.message)
}
