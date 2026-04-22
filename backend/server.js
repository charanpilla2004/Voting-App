
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import pollRoutes from "./routes/pollRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/polls", pollRoutes);

app.listen(8000, () => {
  console.log("Server running on port 8000 🚀");
});