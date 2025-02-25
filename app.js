const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authGuard = require('./middleware/isApiRequestAuthorized');
const errorHandler = require('./middleware/error-handler');
require('dotenv/config');

//enable cors 
app.use(cors());
app.options('*',cors());

const productRouter = require('./routers/product');
const categoryRouter = require('./routers/category');
const orderRouter = require('./routers/order');
const userRouter = require('./routers/user');

// to understand json getting from post apis
app.use(express.json());
app.use(authGuard);
app.use(express.static(__dirname));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

app.use(errorHandler)

//Routers
app.use('/product',productRouter);
app.use('/category',categoryRouter);
app.use('/order',orderRouter);
app.use('/user',userRouter);

// https://e-shop-backend-two.vercel.app/user/register 
// http://localhost:3000/user/login direct login/register url

mongoose.connect(process.env.CONNECTION_URL,{dbName:'eshop-database'}).then(()=>console.log("database connected")).catch((err)=>console.log(err));


app.listen(3000,()=>{
    console.log("server is running");
})