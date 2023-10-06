import express from "express";
import postRoutes from "./routes/postRoutes.js"
import userRoutes from './routes/user.js'
import cors from 'cors'
import { fileURLToPath } from "url";
import {dirname} from "path"
import "./db.js"
import { errorHandler } from "./middlewares/errorHandler.js";
const directory  = dirname(fileURLToPath(import.meta.url))

const app = express() ; 
 app.use(cors({
    origin:["http://localhost:4200"]
}))
 app.use('/images',express.static(directory + '/images'))
 app.use(express.json())
 
 app.use('/api',postRoutes)
 app.use('/api/user',userRoutes)
 app.use(errorHandler)
 
export default app;