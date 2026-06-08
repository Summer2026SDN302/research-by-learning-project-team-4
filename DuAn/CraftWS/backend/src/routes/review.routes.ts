import { Router } from 'express';
import { createReview, getWorkshopReviews } from '../controllers/review.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createReviewSchema } from '../validations/review.validation';

const router = Router();

router.get('/workshop/:workshopId', getWorkshopReviews);
router.post('/', authMiddleware, roleMiddleware('TOURIST'), validate(createReviewSchema), createReview);

export default router;
