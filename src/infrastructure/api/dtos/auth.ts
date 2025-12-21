export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  email: string;
  password: string;
  name: string;
  role: "client" | "host";
  phone?: string;
}

export interface UserDto {
  _id: string;
  email: string;
  name: string;
  role: "client" | "host" | "admin";
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponseDto {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequestDto {
  refreshToken: string;
}

export interface RefreshTokenResponseDto {
  accessToken: string;
  refreshToken: string;
}
