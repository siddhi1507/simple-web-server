// Import the http module
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port number
const PORT = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Define the file paths for different routes
    let filePath;
    switch (req.url) {
        case '/home':
            filePath = path.join(__dirname, 'home.html');
            break;
        case '/about':
            filePath = path.join(__dirname, 'about.html');
            break;
        case '/contact':
            filePath = path.join(__dirname, 'contact.html');
            break;
        default:
            filePath = path.join(__dirname, '404.html');
            res.statusCode = 404;
            break;
    }

    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Server Error');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', getContentType(filePath));
            res.end(data);
        }
    });
});

// Function to determine the content type based on file extension
function getContentType(filePath) {
    const ext = path.extname(filePath);
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        default:
            return 'application/octet-stream';
    }
}

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
