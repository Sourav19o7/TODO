require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');


const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Example function to fetch data
async function fetchData() {
  // Get row count
    const { data, error } = await supabase.from('second_brain').select('*');
    if (error) console.error(error);
    else console.log("Data" , data);
}

fetchData();