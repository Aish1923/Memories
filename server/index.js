import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';



const app=express();
dotenv.config()



app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/posts',postRoutes);
app.use('/user',userRoutes);

//https://www.mongodb.com/atlas/database
//mongodb+srv://<username>:<password>@cluster0.zlzyg.mongodb.net/?retryWrites=true&w=majority

const CONNECTION_URL='?retryWrites=true&w=majority';
const PORT=process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
       .then(()=>app.listen(PORT,()=>console.log(`Server running on port ${PORT}`)))
       .catch((error)=>console.log(`error connecting the server ${error}`));
