const express = require('express');
const port = 3000;
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');


const app = express();  

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database : 'Tasks'
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});