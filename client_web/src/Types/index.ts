export type WeatherType = "fireflies" | "rain" | "snow";

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
