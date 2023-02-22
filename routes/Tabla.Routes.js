import {Router} from 'express';
import {getTabla,getTablaById,createTabla,deleteTabla} from '../controllers/TablaControllers.js';

const router =  Router();


router.get('/tabla',getTabla);
router.post('/tabla',createTabla);
router.delete('/tabla/:id',deleteTabla);
router.get('/tabla/:id',getTablaById);

export default router;