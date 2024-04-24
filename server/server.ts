import express, { Request, Response } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import crypto from 'crypto'; // Import crypto module for encryption

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lior1234',
    database: 'users',
});

// Encryption function
function encrypt(text: string, key: string): string {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Decryption function
function decrypt(encryptedText: string, key: string): string {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

app.post('/register', (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const secretKey = 'mysecretkey'; // Replace with your secret key

    const encryptedPassword = encrypt(password, secretKey); // Encrypt the password

    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, encryptedPassword], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error occurred while saving user data');
        } else {
            console.log(result);
            res.status(200).send('User registered successfully');
        }
    });
});

app.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    const secretKey = 'mysecretkey'; // Replace with your secret key

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error occurred while fetching user data');
        } else {
            if (result.length === 0) {
                res.status(404).send('User not found');
            } else {
                const user = result[0];
                const decryptedPassword = decrypt(user.password, secretKey); // Decrypt the stored password
                if (decryptedPassword === password) {
                    res.status(200).send('Login successful');
                } else {
                    res.status(401).send('Incorrect password');
                }
            }
        }
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
