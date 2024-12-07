import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#EDEDED", // Fondo general en WhatsApp modo claro
        foreground: "#FFFFFF", // Fondos secundarios (burbujas de chat, tarjetas)
        primary: "#25D366", // Verde de WhatsApp
        secondary: "#128C7E", // Verde oscuro para elementos destacados
        accent: "#DCF8C6", // Verde claro para mensajes enviados
        textPrimary: "#111B21", // Texto principal
        textSecondary: "#667781", // Texto secundario (mensajes de sistema, hora)
        border: "#D1D7DB", // Bordes y separadores
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
