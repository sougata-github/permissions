import { Role } from "@/lib/auth";

export {};

declare global {
  interface CustomJwtSessionClaims {
    role: Role;
  }
}
