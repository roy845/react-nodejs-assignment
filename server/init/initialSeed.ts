import axios from "axios";
import getPrismaClient from "../prismaClient/prismaClient";
import { UserResponse } from "../types/userTypes";

const users_url: string = "https://jsonplaceholder.typicode.com/users";

export const init_users_db = async (): Promise<void> => {
  const prisma = getPrismaClient();
  const existingUsers = await prisma.user.findMany();

  if (existingUsers.length === 0) {
    const { data: newUsers } = await axios.get<UserResponse[]>(users_url);

    newUsers.forEach(async (user: UserResponse) => {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          address: {
            create: {
              street: user.address.street,
              suite: user.address.suite,
              city: user.address.city,
              zipcode: user.address.zipcode,
            },
          },
        },
      });
    });
  }
};
