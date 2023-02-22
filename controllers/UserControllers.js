import Competicion from "../database/models/Competicion.js";
import User from "../database/models/User.js";
import UserTabla from "../database/models/UserTabla.js";
import Joi from '@hapi/joi'
import bcrypt from 'bcrypt'
import { Op } from "sequelize";
import jwt from 'jsonwebtoken'


export const loginUser = async (req,res) => {

  let {user,password} = req.body;
  
  try {
    
    const userExists = await User.findOne( { 
      where : {
        [Op.or] : [
            {email : user},
            {name : user}
        ]
      }
    });
    
    if (!userExists) return res.status(400).json({ error: 'Usuario no encontrado' });
  
    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
    const token = jwt.sign({
      name: userExists.name,
      id: userExists.id
    }, process.env.TOKEN_SECRET)
  
    res.header('auth-token', token).json({
        token
    })

    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getUser = async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  //Creo las validaciones
  //************************************************************************************ */
  const schemaRegister = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(255).required()
  })
  
  const {error} = schemaRegister.validate(req.body);

  if (error) {
    return res.status(400).json(
        {error: error.details[0].message}
    )
  }
  const isUserExist = await User.findOne({ where : { name : name } });

  if (isUserExist) {
    return res.status(400).json(
        {error: 'Nombre de usuario ya registrado'}
    )
  }
  const isEmailExist = await User.findOne({ where : { email : email } });
  if (isEmailExist) {
    return res.status(400).json(
        {error: 'Email ya registrado'}
    )
  }

   //************************************************************************************ */

   // Hasheo la contraseña

   const salt = await bcrypt.genSalt(10);
   const passwordHashed = await bcrypt.hash(password, salt);
  try {
    const newUser = await User.create({ name: name, email: email, password:passwordHashed });

    res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedUser = await User.findByPk(id);

    updatedUser.name = name;

    await updatedUser.save();

    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: {
        id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userById = await User.findByPk(id);
    res.json(userById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserByCompeticionId = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findByPk(id, { include: UserTabla });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
