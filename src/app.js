const express = require('express');
const app = express();
require('dotenv').config(); // Correctly configure dotenv

const port = process.env.PORT || 4000;
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Example function to fetch data
async function fetchData() {
    const { data, error } = await supabase.from('your_table_name').select('*');
    if (error) {
        console.error('Error fetching data:', error);
        return { error: error.message };
    }
    return data;
}

app.get('/', async (req, res) => {
    try {
        const data = await fetchData();
        res.json(data); // Ensure response is sent as JSON
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
