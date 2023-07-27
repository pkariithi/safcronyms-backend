require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { isAuthenticated } = require("./src/middleware/auth");

// connect to mongodb
const mongoString = process.env.DB_URI;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.once('connected', () => {
  console.log('Database Connected');
});
database.on('error', (e) => {
  console.log(e);
});

// new app
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', require("./src/routes/auth.routes"));
app.use('/api/users', isAuthenticated, require("./src/routes/user.routes"));
app.use('/api/categories', isAuthenticated, require("./src/routes/category.routes"));
app.use('/api/acronyms', isAuthenticated, require("./src/routes/acronym.routes"));
app.use('/api/roles', isAuthenticated, require("./src/routes/role.routes"));
app.use('/api/permissions', isAuthenticated, require("./src/routes/permission.routes"));

// the 404 Route
app.use('*', (req, res) => {
  res.status(404).send('Route not found. Check that the METHOD and URL match');
});

// error handling
app.use((err, req, res, next) => {
  if(err.status == 500) {
    console.error(err);
  }
  res
    .status(err.status || 500)
    .send(err.message || "Internal Server Error");
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});