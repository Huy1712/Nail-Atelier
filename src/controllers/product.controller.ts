import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { sendResponse } from '../utils/response';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { featured } = req.query;
    const isFeatured = featured === 'true';

    const products = await prisma.product.findMany({
      where: featured !== undefined ? { isFeatured } : {},
      include: {
        images: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    sendResponse(res, 200, true, 'Lấy danh sách sản phẩm thành công', products);
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: true,
        reviews: {
          include: { user: { select: { fullName: true } } },
        },
      },
    });

    if (!product) {
      return sendResponse(res, 404, false, 'Không tìm thấy mẫu nail này');
    }

    sendResponse(res, 200, true, 'Lấy chi tiết sản phẩm thành công', product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, slug, description, price, stock, isFeatured, images } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        stock,
        isFeatured,
        images: {
          create: images || [],
        },
      },
      include: { images: true },
    });

    sendResponse(res, 201, true, 'Thêm mẫu nail mới thành công', newProduct);
  } catch (error) {
    next(error);
  }
};