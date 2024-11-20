import { Membership } from "./Membership";

// src/entities/User.ts
export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public name: string | null,
    public lastname: string | null,
    public membership?: Membership,
    public lead?: string
  ) {}
}
