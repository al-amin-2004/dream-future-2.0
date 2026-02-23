import { country, gender, role } from "@/constants/user";

type Gender = (typeof gender)[number];
type Role = (typeof role)[number];
type Country = (typeof country)[number];

export interface IUser {
  _id?: string;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  isVerifiedEmail: boolean;

  number?: string;
  isVerifiedNumber?: boolean;

  gender: Gender;
  dob?: Date;
  nationality?: Country;
  address?: string;
  avatar?: string;
  avatarId?: string;

  role: Role;

  identification?: {
    birthId?: string;
    nid?: string;
  };
}

export interface IUserWithPassword extends IUser {
  password: string;
}
