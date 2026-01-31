export type WeatherType = "fireflies" | "snow";

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accent: string;       
  buttonGradient: string;
  buttonShadow: string;
  weather: WeatherType;
}
