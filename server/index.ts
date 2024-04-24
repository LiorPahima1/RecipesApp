import express, { Request, Response } from 'express';
import mysql from 'mysql';
import cors from 'cors';


const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lior1234',
    database: 'users',
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
