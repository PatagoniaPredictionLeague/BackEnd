import {Sequelize} from 'sequelize';
import { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME} from '../config.js';

console.log(DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME);

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);


export default sequelize;