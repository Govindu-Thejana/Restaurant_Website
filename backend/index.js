import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import itemRouter from './routes/itemRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
//import userRouter from './routes/userRouter.js';

const app = express();
mongoose.connect('mongodb+srv://admin:123@cluster0.3oi6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    ()=> {
        console.log("Connected to database");
    }
).catch(
    ()=> {
    }
)
// mongodb+srv://admin:123@cluster0.3oi6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.use(bodyParser.json());
app.use(
    (req,res,next)=>{

        const header = req.header ("Authorization");
       if (header !=null){
        const token = header.replace("Bearer ","");
        jwt.verify(token,"random456",(err,decoded)=>{
            console.log(decoded)
            if(decoded !=null){
                req.user = decoded;
            }
       })
    }

       next()

    }
    
)


app.use("/api/item", itemRouter);
app.use("/api/user", userRouter);


 
// Use only ONE app.listen call
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
