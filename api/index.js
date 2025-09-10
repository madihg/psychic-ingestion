const express = require("express");
const app = express();

// Serve static files from 'public' directory
app.use(express.static("public"));

// Serve the main page at root
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../public/index.html");
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
