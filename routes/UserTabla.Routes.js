import {Router} from 'express';
import {getUserTablaByTablaId,createUserTabla} from '../controllers/UserTablaControllers.js';

const router =  Router();

router.post('/userTabla',createUserTabla);
router.get('/userTabla/:tablaId',getUserTablaByTablaId);

export default router;