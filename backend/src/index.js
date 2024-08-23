import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routes/productRoute.js';
import bodyParser from 'body-parser';
import authRouter from './routes/authRoute.js';
import stripeRouter from './routes/stripeRoute.js';

dotenv.config({
    path:".env"
});
//declarations
const app = express();
const PORT = process.env.PORT || 8000;


//using the middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));


const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true
}
app.use(cors(corsOptions));

//routes
app.use('/api/products',productRouter);
app.use('/api/auth',authRouter);
app.use('/api/stripe',stripeRouter);

//mongodb connection
await mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((error)=>console.error('MongoDB connection error',error));


app.get('/',(req,res)=>{
    res.send("hello , welcome to sole spectrum API");
});

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})