export interface AuthUser {
  uuid: string;         
  username: string;
  type?: "access" | "refresh";
  role?: "user" | "admin";
}
