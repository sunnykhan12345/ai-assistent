import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import router from "./routes/user.router.js";
import userRouter from "./routes/user.routes.js";
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Medical Chatbot API is running",
  });
});
// middleware
app.use("/api/auth", router);
app.use("/api/user", userRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
