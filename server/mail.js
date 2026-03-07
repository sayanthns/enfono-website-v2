const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { Pool } = require("pg");
const axios = require("axios");
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8007;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// Serve uploaded files
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
app.use('/uploads', express.static(uploadsDir));

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://enfono:enfonopass@enfono-db:5432/enfono_cms"
});

// Initialize Database Tables
const initDb = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS cms_data (
                id SERIAL PRIMARY KEY,
                key TEXT UNIQUE NOT NULL,
                content JSONB NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS leads (
                id SERIAL PRIMARY KEY,
                data JSONB NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Database tables initialized");
    } catch (err) {
        console.error("Database initialization error:", err);
    }
};
initDb();

// ─── CMS Endpoints ────────────────────────────────────

// Get CMS data by key
app.get("/api/cms/:key", async (req, res) => {
    try {
        const { key } = req.params;
        const result = await pool.query("SELECT content FROM cms_data WHERE key = $1", [key]);
        if (result.rows.length > 0) {
            res.json(result.rows[0].content);
        } else {
            res.status(404).json({ error: "CMS data not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update CMS data
app.post("/api/cms/:key", async (req, res) => {
    try {
        const { key } = req.params;
        const content = req.body;
        await pool.query(
            "INSERT INTO cms_data (key, content, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP) ON CONFLICT (key) DO UPDATE SET content = $2, updated_at = CURRENT_TIMESTAMP",
            [key, content]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ─── Leads Endpoints ──────────────────────────────────

app.get("/api/leads", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM leads ORDER BY created_at DESC");
        res.json(result.rows.map(row => row.data));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/leads", async (req, res) => {
    try {
        const data = req.body;
        await pool.query("INSERT INTO leads (data) VALUES ($1)", [data]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ─── Chatbot Proxy ────────────────────────────────────

app.post("/api/chat", async (req, res) => {
    try {
        const { messages, provider } = req.body;
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: "OpenAI API key not configured on server" });
        }

        if (provider === 'openai') {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4o',
                messages: messages
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            res.json(response.data);
        } else {
            res.status(400).json({ error: "Unsupported provider" });
        }
    } catch (err) {
        console.error("Chat error:", err.response?.data || err.message);
        res.status(500).json({ error: "AI service error" });
    }
});

// ─── Nodemailer Endpoint ──────────────────────────────

app.post("/send", (req, res) => {
    const { email, name, phone, comment } = req.body;

    // Transporter config from .env
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const mailConfig = {
        from: process.env.SMTP_USER,
        to: email, // or your notification email
        subject: `Enfono - ${name ? 'Contact' : 'Subscription'} Form`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${comment}`
    };

    transporter.sendMail(mailConfig, (err) => {
        if (err) {
            console.error("Mail error:", err);
            res.json({ status: "fail" });
        } else {
            res.json({ status: "success" });
        }
    });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl, name: req.file.originalname, type: req.file.mimetype });
});

app.listen(PORT, () => console.log(`CMS Server running on port ${PORT}`));