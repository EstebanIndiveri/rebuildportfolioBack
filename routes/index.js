const express=require('express');
const router=express.Router();
const proyectosController=require('../controllers/proyectosController');
module.exports=function(){

    // proyectos
    router.post('/proyectos',
    proyectosController.subirArchivo
    ,proyectosController.nuevoProyecto)

    // muestra los proyectos
    router.get('/proyectos',proyectosController.mostrarProductos);

    // muestra un producto por id
    router.get('/proyectos/:idProyecto',proyectosController.mostrarProducto)
    // actprodyectos
    router.put('/proyectos/:idProyecto',
    proyectosController.subirArchivo,
    proyectosController.actualizarProyecto
    )
    // delete proyecto
    router.delete('/proyectos/:idProyecto',proyectosController.eliminarProyecto)

    // Send Email
    router.post('/sendemail',proyectosController.enviarEmail);

    return router;

}