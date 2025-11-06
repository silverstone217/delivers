// types/user.ts
export type UserRow = {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  image: string | null;
  createdAt: Date;
};
