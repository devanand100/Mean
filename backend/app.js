import express from "express";
import postRoutes from "./routes/postRoutes.js"
import cors from 'cors'
import "./db.js"
import { errorHandler } from "./middlewares/errorHandler.js";

 const app = express() ; 
 app.use(cors({
    origin:["http://localhost:4200"]
}))
 app.use('/images',express.static('./images'))
 app.use(express.json())
 
 app.use('/api',postRoutes)

 app.use(errorHandler)
 
export default app;