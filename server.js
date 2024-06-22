import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import taskRoute from "./routes/taskRoute.js"

import connectDB from "./config/conn.js";








dotenv.config();


connectDB()

const app = express();


// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// app.get("/", (req, res)=>{
//     res.send("hello welom bvghvkuyghhfygfyf");
// });

// routes
// app.use("/api", testPostController);
app.use("/api/user", authRoutes);
app.use("/api/task", taskRoute);



const PORT = process.env.PORT || 8080;
// const PORT = 8080;
//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`
      .bgCyan.white
  );
});

