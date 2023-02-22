import {Router} from 'express';
import {getFechas,getFechaById,createFecha,updateFecha,getFechaByCompId} from '../controllers/FechaControllers.js';

const router =  Router();

router.get('/fecha',getFechas);
router.post('/fecha',createFecha);
router.put('/fecha/:id',updateFecha);
router.get('/fecha/:id',getFechaById);
router.get('/fechaByComp/:compId',getFechaByCompId); // !Eliminar a futuro

export default router;