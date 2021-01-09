const express=require('express');
const routes=require('./routes');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
// dotenv
require('dotenv').config({path:'variables.env'});

// Cors 
const cors=require('cors');

mongoose.Promise=global.Promise;
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify:false,useCreateIndex:true}).then(console.log('Conectado'))
mongoose.connection.on('error',(error)=>{
    console.log(error);
});

// crear el server
const app = express();
app.set('view engine','pug');
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
// habilito cors
app.use(cors());

// carpeta publica
app.use(express.static('uploads'));

// rutas
app.use("/",routes());
// port
app.listen(5000);