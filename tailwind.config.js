/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      colors: {
        blue: {
          50: "#b3d4ff",  // light vibrant blue
          75: "#80bfff",  // medium light
          100: "#3399ff",  // bright strong blue
          200: "#0073e6",  // darker vibrant blue
          300: "#004c99",  // deep blue for accents
        },
        violet: {
          300: "#3f2bff", // bluer violet (cooler tone)
        },
        yellow: {
          100: "#a8ff3f", // lemon green (vibrant)
          300: "#baff00", // stronger lemon-lime tone
        },
      },
    },
  },
  plugins: [],
};