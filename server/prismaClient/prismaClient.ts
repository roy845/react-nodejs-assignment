import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

// Function to create a singleton instance of the Prisma client
export const getPrismaClient = () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};

// Export the Prisma instance directly if needed
export default getPrismaClient;