import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { sendResponse } from '../utils/response';
import { NailSize, NailShape } from '@prisma/client';

export const createCustomOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerName, phone, nailSize, nailShape, customNotes, designImage, userId } = req.body;

    const customOrder = await prisma.customOrder.create({
      data: {
        customerName,
        phone,
        nailSize: nailSize as NailSize,
        nailShape: nailShape as NailShape,
        customNotes,
        designImage,
        userId: userId ? Number(userId) : null,
      },
    });

    sendResponse(res, 201, true, 'Gửi yêu cầu thiết kế móng thành công', customOrder);
  } catch (error) {
    next(error);
  }
};