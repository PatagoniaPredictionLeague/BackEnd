import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Tabla from'./Tabla.js';
import User from './User.js';

class UserTabla extends Model{}

UserTabla.init({ 
  puntos:{
    type: DataTypes.INTEGER,
    allowNull: false,
    DefaultValue : 0
  },
  resultados:{
    type: DataTypes.INTEGER,
    allowNull: false,
    DefaultValue : 0
  },
  ganador:{
    type: DataTypes.INTEGER,
    allowNull: false,
    DefaultValue : 0
  }
},{
    sequelize,
    timestamps : false
});

User.belongsToMany(Tabla, { through: UserTabla });
Tabla.belongsToMany(User, { through: UserTabla });
User.hasMany(UserTabla);
UserTabla.belongsTo(User);
Tabla.hasMany(UserTabla);
UserTabla.belongsTo(Tabla);

export default UserTabla;