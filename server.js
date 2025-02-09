import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToMongoDB } from "./config/DBconfig.js";
import router from "./Routers/userRouter.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8000;

// CORS options
const corsOptions = {
  // origin: process.env.CLIENT_ROOT_URL,
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Authorization",
  ],
  credentials: true,
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Middleware to parse cookies
app.use(cookieParser());
// Parses URL-encoded data

// app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON request bodies
app.use(express.json());

// check  route
app.get("/", (req, res) => {
  res.send(" hello node JS");
});

//connnect to mongoDb
connectToMongoDB();

//routes | API endpoints
app.use("/api/user", router);

// start server
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at  'http://localhost:${PORT}'`);
});
