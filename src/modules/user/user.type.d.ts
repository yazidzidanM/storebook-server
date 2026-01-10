export type TUser = {
  uuid: string;
  name: string;
  username: string;
  password: string;
};

export interface IUser {
  id: number;
  uuid: string;
  name: string;
  username: string;
  password: string;
  role: "admin" | "user";
}