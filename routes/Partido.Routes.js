import {Router} from 'express';
import {getPartido,getPartidoByFecha,getPartidoById,createPartido,updatePartidoEnCurso,updatePartido,updatePartidoFinal} from '../controllers/PartidoControllers.js';

const router =  Router();

router.get('/partido/:fechaId',getPartido); 
router.post('/partido',createPartido);  
router.put('/partido/:id',updatePartido); 
router.put('/partidoFinal/:id',updatePartidoFinal); 
router.put('/partidoEnCurso/:id',updatePartidoEnCurso); 
router.get('/partido/:id',getPartidoById);
router.get('/partidoFecha',getPartidoByFecha);

export default router;