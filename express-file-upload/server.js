import express from "express"; // Web framework for Node.js
import multer from "multer";  // File upload middleware
import cors from "cors";    // Middleware for enabling CORS
import path from "path";    // Node.js path module
import { fileURLToPath } from "url";  // Node.js URL module
import dotenv from "dotenv";    // Environment variable loader

// Load environment variables
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url); // Get filename from URL
const __dirname = path.dirname(__filename);   // Get directory name

// Initialize Express
const app = express();  

// Middleware
app.use(cors()); // Allows requests from frontend
app.use(express.json()); // Parse JSON requests
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Configure Multer (File Upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Store files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  
  } else {
    // Reject file
    cb(new Error("Only images are allowed"), false);
  }
};

// Multer Upload Middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// File Upload Route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ error: "No file uploaded or file type not allowed" });
  }
  // Send uploaded file URL in response
  res.json({ location: `http://localhost:5000/uploads/${req.file.filename}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  // Log error to console
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
