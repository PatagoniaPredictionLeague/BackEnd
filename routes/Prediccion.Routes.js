import {Router} from 'express';
import {getPrediccion,getPrediccionById,createPrediccion,updatePrediccion,getPrediccionByPartidoId} from '../controllers/PrediccionControllers.js';

const router =  Router();


router.get('/prediccion',getPrediccion); 
router.post('/prediccion',createPrediccion); 
router.put('/prediccion/:id',updatePrediccion); 
router.get('/prediccion/:id',getPrediccionById); 
router.get('/prediccionPartido/:id',getPrediccionByPartidoId); 

export default router;