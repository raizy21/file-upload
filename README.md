# Express project:

### At least one POST route /file-upload

- A middleware that implements Multer to manage the file upload.
- Set a file filter in multer to only allow images
- Set a max file size in multer to limit the size in incoming files
- Set a custom name for your files
- Send error if no file is uploaded
- Save the file in your local file system
- Return a reference to the location of the file, e.g: { location: "http://localhost:3000/files/my_cat_pic.jpeg" }
- Implement [express.static()](https://expressjs.com/en/starter/static-files.html) to serve the files

## Dependencies

- [Express.js](https://expressjs.com/) is a fast, minimalist web framework for Node.js that simplifies building APIs and web applications.
- [multer](https://www.npmjs.com/package/multer) is middleware for handling file uploads.
- [cors](https://www.npmjs.com/package/cors) (Cross-Origin Resource Sharing) is a middleware for Node.js that enables secure cross-origin requests in web applications.
- [dotenv](https://www.npmjs.com/package/dotenv) is a Node.js package that loads environment variables from a .env file into process.env for secure configuration management.
