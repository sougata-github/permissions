import { Role } from "@/lib/auth";

export {};

declare global {
  interface CustomJwtSessionClaims {
    roles: Role[];
  }
}
