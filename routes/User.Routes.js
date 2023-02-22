import {Router} from 'express';
import { verify } from 'jsonwebtoken';
import {getUser, createUser, updateUser, deleteUser, getUserById, getUserByCompeticionId, loginUser} from '../controllers/UserControllers.js';
import {verifyToken} from './validate-token.js';

const router =  Router();

router.post('/login',loginUser );
router.get('/user',getUser);  
router.post('/user',createUser); 
router.put('/user/:id',verifyToken,updateUser);
router.delete('/user/:id',deleteUser); 
router.get('/user/:id',verifyToken,getUserById); 
router.get('/user/tablas/:id',getUserByCompeticionId) // NO DOCUMENTADA

export default router;