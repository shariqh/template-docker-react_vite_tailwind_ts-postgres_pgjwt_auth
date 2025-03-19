const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '4000', 10);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

// ✅ Allow CORS for frontend origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Allow frontend to make requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies and authentication headers
  })
);

app.post('/login', async (req: any, res: any, next: any): Promise<void> => {
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rowCount === 0) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const user = result.rows[0];
    const isValid = bcrypt.compareSync(password, user.password_hash);

    if (!isValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const jwtResult = await pool.query('SELECT create_jwt($1) as token', [user.id]);
    res.json({ token: jwtResult.rows[0].token });
  } catch (err) {
    next(err);
  }
});

app.get('/dashboard', (req: any, res: any, next: any): void => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      res.sendStatus(401);
      return;
    }

    const token = authHeader.split(' ')[1];
    res.json({ message: 'Welcome to the dashboard!' });
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
