import { Noto_Serif, Rasa } from "next/font/google";

export const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
});

export const rasa = Rasa({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rasa",
  style: ["normal", "italic"],
});
