import Tabla from "../database/models/Tabla.js";

export const getTabla = async (req,res) =>{
    try{
        const tablas = await Tabla.findAll();
        res.json(tablas);
    }catch(error){
        return res.status(500).json({message:error.message});    
    }
};

export const createTabla = async (req,res) =>{
    const {competicionId}  = req.body;
    try{ 
        const newTabla = await Tabla.create({competicionId:competicionId});
        res.json(newTabla);
    }catch(error){
        return res.status(500).json({message:error.message});    
    }
};

export const getTablaById = async (req,res) =>{
    const {id}  = req.params;
    try{
        const tablaById = await Tabla.findByPk(id);
        res.json(tablaById);
    }catch(error){
        return res.status(500).json({message:error.message});    
    }
};

export const deleteTabla = async(req,res)=>{
    
    try{
         const {id} = req.params;
 
         await Tabla.destroy({
             where : {
                 id,
             },
         });
 
         res.sendStatus(204);
     }
     catch(error){
     
         res.status(500).json({message:error.message});
         
     }
};
 