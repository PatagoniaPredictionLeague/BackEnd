import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';



class Competicion  extends Model {}

Competicion.init({
    id:{
       type: DataTypes.INTEGER,
       primaryKey : true,
       autoIncrement: true 
    },
    name : {
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName : "Competicion",
    timestamps : false
});


export default Competicion;
