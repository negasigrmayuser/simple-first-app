import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./router/router.js"
import userRouter from "./router/userRouter.js"
import errorhandler from "./middelware/errorhandler.js"
import noFound from "./middelware/noFound.js"
import colors from "colors"
dotenv.config()
await connectDB();

   // get port from env file and create express app
const port=process.env.PORT || 8000;
const app=express()
  
// middelware for json and urlencoded data
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/goals", router);
app.use("/api/users", userRouter);
   // middelware for not found and error handler
app.use(noFound);
app.use(errorhandler);
  
  // start the server
app.listen(port,()=>{
    console.log(`server is runing http://localhost:${port}`)
}
)














