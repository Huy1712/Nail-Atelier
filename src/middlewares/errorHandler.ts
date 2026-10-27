import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response';

export const notFoundHandler = (req: Request, res: Response) => {
  sendResponse(res, 404, false, `Đường dẫn ${req.originalUrl} không tồn tại trên hệ thống.`);
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('🔥 Global Error Log:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Lỗi hệ thống nội bộ!';

  sendResponse(res, statusCode, false, message, null, process.env.NODE_ENV === 'development' ? err : null);
};