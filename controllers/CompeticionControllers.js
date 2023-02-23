import Competicion from "../database/models/Competicion.js"


export const getCompeticion = async (req,res) =>{

    try{

        const competiciones = await Competicion.findAll();

        res.json(competiciones);

    }catch(error){

        return res.status(500).json({message:error.message});    
    }

    

};

export const createCompeticion = async (req,res) =>{

    const {id,name}  = req.body;

    try{
        
        const newCompeticion = await Competicion.create({ id:id,name:name});

        res.json(newCompeticion);

    }catch(error){

        return res.status(500).json({message:error.message});    
    }

    

};

export const updateCompeticion = async(req,res)=>{
    
    const {id} = req.params;
    const {name} = req.body;

    try{

       const updatedCompeticion = await Competicion.findByPk(id);

       updatedCompeticion.name = name;

       await updatedCompeticion.save();

       res.json(updatedCompeticion);
    }

    catch(error){

        return res.status(500).json({message:error.message});    

    }
};

export const getCompeticionById = async (req,res) =>{

    const {id}  = req.params;

    try{

        const competicionById = await Competicion.findByPk(id);

        res.json(competicionById);

    }catch(error){

        return res.status(500).json({message:error.message});    
    }

    

};

export const deleteCompeticion = async(req,res)=>{
    
    try{
         const {id} = req.params;
 
         await Competicion.destroy({
             where : {
                 id:id,
             },
         });
 
         res.sendStatus(204);
     }
     catch(error){
     
         res.status(500).json({message:error.message});
         
     }
};
