import express from "express";
import "dotenv/config";
import { clerkMiddleware, getAuth } from "@clerk/express";
import cors from 'cors'
import mongoose from "mongoose";
import connectdb from "./db.js";
const PORT = process.env.PORT;
const db_uri = process.env.DB_URI;
const app = express();

connectdb(db_uri)
// Midllewares
app.use(clerkMiddleware());
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  }),
);

// routes
app.get("/health", (req, res) => {
  res.status("200").json({ message: "ok" });
});

app.listen(PORT, () => {
  console.log("server started");
});
