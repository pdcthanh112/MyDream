import { Request } from "express";
import { Customer } from "./account.interface";

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface LoginError {
  id:number;
  accountId: string;
  failedAttempts: number;
  lockedUntil: Date;
}

export interface RequestWithUser extends Request {
  user: Customer;
}
