import { Router } from 'express';
import { createPaymentUrl, mockSuccess, getPaymentStatus, vnpayCallback, momoCallback } from '../controllers/payment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/create-payment-url', authMiddleware, createPaymentUrl);
router.get('/vnpay-callback', vnpayCallback);
router.post('/momo-callback', momoCallback);
router.get('/:id/status', authMiddleware, getPaymentStatus);
router.post('/mock-success/:id', authMiddleware, mockSuccess);

export default router;
