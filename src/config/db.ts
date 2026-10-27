import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Đã kết nối thành công với PostgreSQL 18!');
  } catch (error) {
    console.error('❌ Kết nối Database thất bại:', error);
    process.exit(1);
  }
};