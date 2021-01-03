const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const proyectosSchema=new Schema({
   nombre:{
       type:String,
       trim:true,
       required:true
   },
   location:{
    type:String,
    required:true
   },
   position:{
       type:String
   },
   description:{
       type:String,
       required:true
   },
   imagen:{
       type:String
   },
   url:String

});
module.exports=mongoose.model('Proyectos',proyectosSchema)

/*

 title:{type:String,required:true,maxlength:256},
    company:{type:String,required:true,maxlength:256},
    location:{type:String,required:true,maxlength:256},
    position:{type:String,required:true,maxlength:256},
    description:{type:String,required:true,maxlength:256},
    startDate:{type:Date,maxlength:256},
    endDate:Date,
    imageUrl:String,
    url:String
*/