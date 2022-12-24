import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from 'cors'
const app=express();
import  connectDB from './config/connectDB.js'
const port=process.env.PORT
import userRoutes from './routes/userRoutes.js'
import products_routes from './routes/productRoutes.js'
// cors  policy 
app.use( cors());

//json
app.use(express.json());


//load Routes
app.use("/api/user",userRoutes)
//products Routes

app.use("/api/products",products_routes)

const start = async () => {

    try {
  
        await  connectDB(process.env.MONGODB_URL);
            
      app.listen(port, () => {
        console.log(`${port} Yes I am connected`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  start();