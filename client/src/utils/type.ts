export interface UserStateType {
  token: string,
  id: string,
  role: string
}

export interface TokenType {
  user: string,
  role: string
}

export interface LoginParamsType {
  email: string,
  password: string,
}

export interface LoginResponseType {
  token: string;
  user: User;
}

interface User {
  Id: string;
  username: string;
  email: string;
  orders: [];
  _v: number;
}
