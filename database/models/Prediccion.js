import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Partido from './Partido.js';
import User from './User.js';

class Prediccion extends Model {}

Prediccion.init({
    
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true 
    },
   
    golLocal:{
        type: DataTypes.INTEGER,
        allowNull: true,
        DefaultValue : null
    },
    golVisitante:{
        type: DataTypes.INTEGER,
        allowNull: true,
        DefaultValue : null
    },
    estado :{
        type: DataTypes.INTEGER,
        DefaultValue : 0
        //Estado = 0 Partido No Comenzado
        //Estado = 1 Acierta resultado
        //Estado = 2 Acierta goles
        //Estado = 3 Erra
    }
},{
    sequelize,
    timestamps : false
});

Partido.hasMany(Prediccion,{
    foreignKey: 'partidoId'
})


export default Prediccion;
