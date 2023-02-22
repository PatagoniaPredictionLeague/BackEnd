import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Competicion from './Competicion.js';

class Tabla extends Model {}

Tabla.init({
    
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true 
    }
},{
    sequelize,
    timestamps : false
});

Competicion.hasOne(Tabla,{
    foreignKey : 'competicionId'
});


export default Tabla;