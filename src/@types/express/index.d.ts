import { AuthUser } from "../../shared/types/auth"; // sesuaikan path

declare global {
  namespace Express {
    interface Request {
      user: AuthUser; // Optional, bisa ada atau tidak
    }
  }
}

export {};
