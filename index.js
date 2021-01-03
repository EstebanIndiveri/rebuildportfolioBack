const express=require('express');
const routes=require('./routes');
const mongoose=require('mongoose');
// dotenv
require('dotenv').config({path:'variables.env'});

mongoose.Promise=global.Promise;
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify:false,useCreateIndex:true});
mongoose.connection.on('error',(error)=>{
    console.log(error);
});
// crear el server
const app = express();


// rutas
app.use("/",routes());
// port
app.listen(5000);