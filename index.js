require('dotenv').config();

const port = process.env.PORT || 8000;
const dbUrl = process.env.DATABASE_URL;
const express = require("express");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const publicRoutes = require("./routes/public");
const cors = require("cors");

const app = express();
app.use(
  cors()
);

app.use(express.json());


app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/public", publicRoutes);

app.listen(port, async () => {
  await mongoose.connect(dbUrl);
});
