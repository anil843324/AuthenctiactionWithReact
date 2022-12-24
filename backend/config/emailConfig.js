import dotenv from 'dotenv'
dotenv.config();

import nodemailer from 'nodemailer';


let transporter = nodemailer.createTransport({
  
    service:"gmail",
   
     secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Admin Gmail ID
      pass: process.env.EMAIL_PASSWORD, // Admin Gmail password
    },
    port: 465,
    host:"smtp.gmail.com"
  });

  export default transporter

