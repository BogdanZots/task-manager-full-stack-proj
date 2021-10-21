require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const PORT = process.env.PORT || 5003;
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", router);
app.use(errorMiddleware);
const start = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    autoIncrement.initialize(connection);
    console.log("hi");
    app.listen(PORT, () => console.log(`Server1 startesd on po1rt ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

