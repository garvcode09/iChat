import express from "express";
import "dotenv/config";
import dns from "dns";
import { clerkMiddleware, getAuth } from "@clerk/express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

import connectdb from "./src/lib/db.js";

const PORT = process.env.PORT ?? 2000;
const db_uri = process.env.DB_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(),"public")

const app = express();

if (process.env.NODE_ENV !== "production") {dns.setServers(["8.8.8.8", "8.8.4.4"])}

//Connect Database


// Midllewares
app.use(express.json());
app.use(cors({origin:FRONTEND_URL,credentials: true,}));
app.use(clerkMiddleware());


// routes
app.get("/health", (req, res) => {
  res.status("200").json({ message: "ok" });
});

if(fs.existsSync(publicDir)){

  app.use(express.static(publicDir))
  app.get("/{*any}",(req,res,next)=>{
    res.sendFile(path.join(publicDir,"index.html"),(err)=>next(err))
  })

}



app.listen(PORT, () => {
  connectdb(db_uri)
  console.log("server started");
});
