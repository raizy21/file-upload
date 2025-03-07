const express = require("express"); // Import express
const multer = require("multer"); // Import multer
const path = require("path"); // Import path
const cors = require("cors"); // Import cors

// Initialize express
const app = express();
// Enable All CORS Requests
app.use(cors());
// Body parser middleware
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));  


// Configure Multer Storage
const storage = multer.diskStorage({
  // Destination to store image
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Uploads is the directory name
  },  
  // File name
  filename: (req, file, cb) => {
   
    // path.extname get the uploaded
    const ext = path.extname(file.originalname);
    // unique name give the file
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    // cb call back  
    cb(null, uniqueName);
  },
});

// Multer file filter
const fileFilter = (req, file, cb) => {
  // Accept image files only
  if (file.mimetype.startsWith("image/")) {
    // To accept the file pass `true`
    cb(null, true);
  } else {
    // To reject this file pass `false
    cb(new Error("Only images are allowed"), false);
  }
};

// Multer upload middleware
const upload = multer({
  storage: storage,  
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Upload route
app.post("/file-upload", upload.single("file"), (req, res) => {
  // If file not found
  if (!req.file) {
    // return response with error message
    return res.status(400).json({ error: "No file uploaded" });
  }
  // Return response with file location
  res.json({ location: `http://localhost:5000/uploads/${req.file.filename}` });
});

// Start server
const PORT = process.env.PORT || 5000;
// Listen to server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
