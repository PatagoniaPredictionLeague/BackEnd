import {Router} from 'express';
import {getCompeticion, createCompeticion, updateCompeticion, deleteCompeticion, getCompeticionById} from '../controllers/CompeticionControllers.js';

const router =  Router();

router.get('/competicion',getCompeticion);
router.post('/competicion',createCompeticion);
router.put('/competicion/:id',updateCompeticion);
router.delete('/competicion/:id',deleteCompeticion);
router.get('/competicion/:id',getCompeticionById);

export default router;