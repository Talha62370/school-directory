require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");


const app = express();
app.use(cors());
app.use(express.json());


// ✅ Connect Database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Storage engine for Multer using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "school_images", // folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// Route to add school with image upload
app.post("/api/addschool", upload.single("image"), async (req, res) => {
  try {
    const { name, address, city, state, contact, email } = req.body;

    if (!name || !address || !city || !state || !contact || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Image URL from Cloudinary
    const imageUrl = req.file.path;

    // Insert into DB
    const [rows] = await pool.query("SELECT MAX(id) as maxId FROM schooldb");
    const newId = (rows[0].maxId || 0) + 1;

    const sql = `
      INSERT INTO schooldb (id, name, address, city, state, contact, image, email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [newId, name, address, city, state, contact, imageUrl, email]);
    

    res.status(201).json({ message: "School added successfully", id: newId, image: imageUrl });
    redirect('/');
    
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});


// ✅ Get all schools with full details
app.get("/api/getschools", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM schooldb");
    res.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
