/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Covers all files in the src folder
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        gradient: "linear-gradient(to right, #ff7e5f, #feb47b)",
        darkGradient: "linear-gradient(to right, #141e30, #243b55)",
      },
    },
  },
  plugins: [],
};
