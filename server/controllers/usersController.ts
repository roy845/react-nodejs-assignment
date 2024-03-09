import { Request, Response } from "express";
import getPrismaClient from "../prismaClient/prismaClient";
import { User } from "@prisma/client";

const prisma = getPrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const limit: number = 4;
    const page = Number(req.query.page) || 0;
    const skip: number = page * limit;

    const users: User[] = await prisma.user.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        name: "asc",
      },
      include: {
        address: {
          select: {
            street: true,
            suite: true,
            city: true,
            zipcode: true,
          },
        },
      },
    });

    const totalUserCount: number = await prisma.user.count();

    res.json({ users, totalUserCount });
  } catch (error) {
    res.status(500).send("Failed in fetching users");
  }
};
