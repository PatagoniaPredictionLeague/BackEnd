import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Prediccion from './Prediccion.js';


class User  extends Model {}

User.init({
    id:{
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true 
    },
    name : {
        type: DataTypes.STRING,
        allowNull : false
    },
    email:{
        type: DataTypes.STRING,
        allowNull : false
    },
    password : {
        type: DataTypes.STRING,
        allowNull : false
    }

},{
    sequelize,
    modelName : "User",
    timestamps : false
});

User.hasOne(Prediccion,{
    foreignKey: 'userId'
});


export default User;