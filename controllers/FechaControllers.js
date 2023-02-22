import { where } from 'sequelize';
import Fecha from '../database/models/Fecha.js';

export const getFechas = async (req,res) =>{

    const {competicionId} = req.body

    try{

        const fechas = await Fecha.findAll( {
            where : {
                competicionId : competicionId
            }
        });

        res.json(fechas);

    }catch(error){

        return res.status(500).json({message:error.message});    
    }

};

export const createFecha = async (req,res) =>{

    const {name,competicionId}  = req.body;

    try{
        
        const newFecha = await Fecha.create({
            name : name,
            competicionId:competicionId,
        });

        res.json(newFecha);

    }catch(error){

        return res.status(500).json({message:error.message});    
    }

    

};

export const updateFecha = async(req,res)=>{
    
    const {id} = req.params;
    const {name} = req.body

    try{
            
       const updatedFecha = await Fecha.findByPk(id);

        updatedFecha.name = name;

       await updatedFecha.save();

       res.json(updatedFecha);
    }

    catch(error){

        return res.status(500).json({message:error.message});    

    }
};

export const getFechaById = async (req,res) =>{

    const {id}  = req.params;

    try{

        const fechaById = await Fecha.findByPk(id);

        res.json(fechaById);

    }catch(error){

        return res.status(500).json({message:error.message});    
    }

};

export const getFechaByCompId = async (req,res) =>{

    const {compId}  = req.params;

    try{

        const fechasByCompId = await Fecha.findAll({
            where:{
                competicionId : compId
        }});

        res.json(fechasByCompId);

    }catch(error){

        return res.status(500).json({message:error.message});    
    }

};
