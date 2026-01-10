export type AuthType = {
  user_id: number;
  token: string;
  is_revoked: boolean;
}

export interface AuthInterface{
  id: number;
  user_id: number;
  token: string;
  is_revoked: boolean;
  created_at: Date;
}