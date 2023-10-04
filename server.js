
import http from 'http'
import app from './backend/app.js';

const port = 3000 ;
app.set('port' , port)
const server =  http.createServer(app);

server.listen(port,()=>console.log(`server running on ${port}`));