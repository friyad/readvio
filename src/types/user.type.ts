import { User } from "better-auth";

export interface UserType extends User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
  creditScore: number;
  referredBy: string | null;
  referrals: string[];
  purchasedBooks: string[];
  createdAt: Date;
  updatedAt: Date;
}
