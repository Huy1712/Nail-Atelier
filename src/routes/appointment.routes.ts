import { Router } from 'express';
import { createAppointment, updateAppointmentStatus } from '../controllers/appointment.controller';

const router = Router();

router.post('/', createAppointment);
router.patch('/:id/status', updateAppointmentStatus);

export default router;