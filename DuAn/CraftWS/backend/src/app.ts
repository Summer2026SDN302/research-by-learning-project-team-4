import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { errorMiddleware } from './middlewares/error.middleware';

// Routes
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import hostRoutes from './routes/host.routes';
import workshopRoutes from './routes/workshop.routes';
import timeslotRoutes from './routes/timeslot.routes';
import bookingRoutes from './routes/booking.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import paymentRoutes from './routes/payment.routes';
import reviewRoutes from './routes/review.routes';
import tourGuideRoutes from './routes/tourGuide.routes';

const app = express();

// Security & parsing
app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { success: false, message: 'Quá nhiều request, vui lòng thử lại sau' },
});
app.use('/api', limiter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'CraftLocal API đang hoạt động 🏺', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/host', hostRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/timeslots', timeslotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/tour-guide', tourGuideRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint không tồn tại' });
});

// Error handler
app.use(errorMiddleware);

export default app;
// Express app configuration
