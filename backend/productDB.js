import dotenv from "dotenv"
dotenv.config();

import  connectDB from './config/connectDB.js'

import Product  from  './models/Product.js'

import  ProductJson from  './products.json'

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany();
     await Product.create(ProductJson);
    console.log('Data push sucessfully');
  } catch (error) {
    console.log(error);
  }
};

start();
