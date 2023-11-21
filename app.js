require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connection");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;

// https://api.futurafinds.com (backend)
// https://futurafinds.com (frontend)

// Rest of the packages
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "https://zainim.netlify.app",
  credentials: true,
  optionsSuccessStatus: 200
}));


// Importing Middlewares
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// Importing Routers
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Starting Server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
