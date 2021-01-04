const Proyectos=require('../models/Proyectos')

const multer=require('multer');
const shortid=require('shortid');

const configurationMulter={
    storage:fileStorage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,__dirname+'../../uploads/');
        },
        filename:(req,file,cb)=>{
            const extension=file.mimetype.split('/')[1];
            cb(null,`${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,cb){
        if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/gif'){
            cb(null,true);
        }else{
            cb(new Error('Formato No válido'))
        }
    },
}
const upload=multer(configurationMulter).single('imagen');

// sube archivo
exports.subirArchivo=(req,res,next)=>{
    upload(req,res,function(error){
        if(error){
            res.json({mensaje:error})
        }
        return next();
    })
}

// nuevo proyecto
exports.nuevoProyecto=async(req,res,next)=>{
    console.log(req.body)
    const proyecto=new Proyectos(req.body);

    try {
        if(req.file.filename){
            proyecto.imagen=req.file.filename
        }
        await proyecto.save();
        res.json({mensaje:'Se agrego un nuevo proyecto'})
    } catch (error) {
        console.log(error);
        next();
    }
}

// muestra todos los productos
exports.mostrarProductos=async(req,res,next)=>{
    try {
        const proyectos=await Proyectos.find({});
        res.json(proyectos);
    } catch (error) {
        console.log(error);
        next();
        
    }
}

// proyecto por id
exports.mostrarProducto=async(req,res,next)=>{
    const proyecto=await Proyectos.findById(req.params.idProyecto);
    if(!proyecto){
        res.json({mensaje:'Ese producto no existe'});
        return next();
    }
    // Mostrar proy
    res.json(proyecto);
}
// actualizar prod por id
exports.actualizarProyecto=async(req,res,next)=>{
    try {
        let proyectoAnterior=await Proyectos.findById(req.params.idProyecto);
        // construir nuevo proyecto
        let nuevoProyecto=req.body;
        // si hay imagen nueva
        if(req.file){
            nuevoProyecto.imagen=req.file.filename;
        }else{
            nuevoProyecto.imagen=proyectoAnterior.imagen;
        }
        const proyecto=await Proyectos.findOneAndUpdate({_id:req.params.idProyecto},nuevoProyecto,{
            new:true
        });
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        next();
    }
}
// delete por id
exports.eliminarProyecto=async(req,res,next)=>{
    try {
        await Proyectos.findOneAndDelete({_id:req.params.idProyecto});
        res.json({mensaje:'El producto se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
        
    }
}