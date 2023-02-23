import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Competicion from './Competicion.js';
import Fecha from './Fecha.js'
import Prediccion from './Prediccion.js';

class Partido extends Model {}

Partido.init({

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true 
    },
    local:{
        type: DataTypes.STRING,
        allowNull: false
    },
    visitante:{
        type: DataTypes.STRING,
        allowNull: false
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
    fechaHora :{
        type: DataTypes.DATE,

    },
    enCurso : {
        type : DataTypes.INTEGER,
    }
    
},{
    sequelize,
    timestamps : false
});


Fecha.hasMany(Partido,{
    foreignKey : 'fechaId'
})


export default Partido;