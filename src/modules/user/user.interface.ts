import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
    name: string;          
    email: string;         
    password: string;       
    role: "admin" | "user"; 
    isBlocked: boolean;     
    
  }

  export interface UserModel extends Model<IUser> {
    isUserExitsByEmail(email :string): Promise<IUser>,
    isUserBlocked( email: string): Promise<boolean>,
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>,
  }

  
export type TUserRole = keyof typeof USER_ROLE;
  
