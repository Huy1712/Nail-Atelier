import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import productRoutes from './routes/product.routes';
import appointmentRoutes from './routes/appointment.routes';
import customOrderRoutes from './routes/customOrder.routes';
import cartRoutes from './routes/cart.routes';

import { notFoundHandler, globalErrorHandler } from './middlewares/errorHandler';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/custom-orders', customOrderRoutes);
app.use('/api/cart', cartRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;