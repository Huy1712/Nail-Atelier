import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { sendResponse } from '../utils/response';

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.userId);

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: { include: { images: true } } },
        },
      },
    });

    sendResponse(res, 200, true, 'Lấy thông tin giỏ hàng thành công', cart);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await prisma.cart.findUnique({ where: { userId: Number(userId) } });

    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: Number(userId) } });
    }

    const cartItem = await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: Number(productId),
        },
      },
      update: {
        quantity: { increment: quantity || 1 },
      },
      create: {
        cartId: cart.id,
        productId: Number(productId),
        quantity: quantity || 1,
      },
    });

    sendResponse(res, 200, true, 'Thêm sản phẩm vào giỏ hàng thành công', cartItem);
  } catch (error) {
    next(error);
  }
};