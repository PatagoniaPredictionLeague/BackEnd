import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Competicion from './Competicion.js';

class Fecha extends Model {}

Fecha.init({

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true 
    },
    name : {
        type: DataTypes.STRING,
    }
   
},{
    sequelize,
    timestamps : false
});

Competicion.hasMany(Fecha,{
    foreignKey: 'competicionId'
})



export default Fecha;