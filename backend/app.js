import express from "express";
import postRoutes from "./routes/postRoutes.js"
import userRoutes from './routes/user.js'
import cors from 'cors'
import { fileURLToPath } from "url";
    import path , {dirname } from "path"
import "./db.js"
import { errorHandler } from "./middlewares/errorHandler.js";
const directory  = dirname(fileURLToPath(import.meta.url))

const app = express() ;
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.send();
  });

  app.use(cors({
    origin:["http://localhost:4200", "http://127.0.0.1:5500/","http://127.0.0.1:5500/","127.0.0.1:5500/"]
}))

 app.use('/images',express.static(directory + '/images'))
 app.use(express.json())
 
 app.use('/api',postRoutes)
 app.use('/api/user',userRoutes)
 app.use("/" , express.static(path.join(directory , "angular" )))
 app.use((req,res,next)=>{
    res.sendFile(path.join(directory , "angular",'index.html'))
 })
 app.use(errorHandler)
 
 
export default app;