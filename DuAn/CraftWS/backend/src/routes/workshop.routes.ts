import { Router } from 'express';
import { getWorkshops, getWorkshopById } from '../controllers/workshop.controller';

const router = Router();
router.get('/', getWorkshops);
router.get('/:id', getWorkshopById);

export default router;
