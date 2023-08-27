import express from 'express';
import cors from 'cors';
import router from './router/route.js';
import morgan from 'morgan';
import connect from './database/conn.js';

const app=express();

//middelware

app.use(express.json())
app.use(cors())

app.use(morgan('tiny'));

app.disable('x-powered-by');


const port=8080;

//http-get req
app.get('/',(req,res)=>{
    res.status(201).json("Home get req")
})

//**api routes */
app.use('/api',router)//endpoint


connect().then(()=>{
    try {
        app.listen(port,()=>{
            console.log(`Server connected to http://localhost:${port}`)
        })
        
    } catch (error) {
        console.log("cannot connect to the server")
    }
}).catch(error=>{
    console.log("Invalid db connection");
})