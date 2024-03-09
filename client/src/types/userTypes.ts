export type Address = {
  street: string;
  zipcode: string;
  suite: string;
  city: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  address: Address;
};

export type UserResponse = {
  users: User[];
  totalUserCount: number;
};
