require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//My Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');



//DB Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true
}).then(()=>{
    console.log(`DB CONNECTED`)
}).catch((err)=>{
    console.log(err)
})

app.use(cors());
app.use(express.json());

//My Routes
app.use("/api/auth",authRoutes);
app.use("/api/product",productRoutes);
app.use("/api",cartRoutes);




const port = 8000;

app.listen(port,()=>{
    console.log(`Server is up and running at port ${port}`)
})

