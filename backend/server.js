import express from "express";
import dotenv from "dotenv";
import router from "./router/router.js"
import errorhandler from "./middelware/errorhandler.js"
import noFound from "./middelware/noFound.js"
dotenv.config()

   // get port from env file and create express app
const port=process.env.PORT;
const app=express()
  
// middelware for json and urlencoded data
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/goals", router);
   // middelware for not found and error handler
app.use(noFound);
app.use(errorhandler);
  
  // start the server
app.listen(port,()=>{
    console.log(`server is runing http://localhost:${port}`)
}
)














