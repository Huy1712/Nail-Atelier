import { Request, Response } from 'express';
import prisma from '../config/db';
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Kiểm tra xem người dùng có nhập đủ thông tin không
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ email và mật khẩu.',
        data: null,
        error: 'MISSING_CREDENTIALS',
      });
      return;
    }

    // 2. Tìm kiếm user trong database theo email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác.',
        data: null,
        error: 'INVALID_CREDENTIALS',
      });
      return;
    }

    // 3. So sánh mật khẩu nhập vào với mật khẩu đã băm (passwordHash) trong DB
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác.',
        data: null,
        error: 'INVALID_CREDENTIALS',
      });
      return;
    }

    // 4. Đăng nhập thành công (Trả về thông tin cơ bản của user)
    res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công!',
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server nội bộ.',
      data: null,
      error: error.message,
    });
  }
};