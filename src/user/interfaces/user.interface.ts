import { Document } from "mongoose";

export interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
    roles: [string];
    verification: string;
    verified: boolean;
    verificationExpires: Date;
    loginAttempts?: number;
    blockExpires?: Date;
    bankAccountNumber?: string;
    bankAccountName?: string;
}