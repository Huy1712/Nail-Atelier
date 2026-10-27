import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { sendResponse } from '../utils/response';
import { AppointmentStatus } from '@prisma/client';

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerName, phone, serviceName, appointmentDate, notes, userId } = req.body;

    const appointment = await prisma.appointment.create({
      data: {
        customerName,
        phone,
        serviceName,
        appointmentDate: new Date(appointmentDate),
        notes,
        userId: userId ? Number(userId) : null,
      },
    });

    sendResponse(res, 201, true, 'Đặt lịch hẹn thành công!', appointment);
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status: status as AppointmentStatus },
    });

    sendResponse(res, 200, true, 'Cập nhật trạng thái lịch hẹn thành công', updated);
  } catch (error) {
    next(error);
  }
};