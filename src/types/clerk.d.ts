import { Role } from "@/lib/rbac";

export {};

declare global {
  interface CustomJwtSessionClaims {
    roles: Role[];
  }
}
