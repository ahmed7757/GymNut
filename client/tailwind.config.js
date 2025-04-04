/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('src/assets/light.jpg')",
        "dark-hero-pattern": "url('src/assets/dark.jpg')"
      },
    },
    },
    
    plugins: [
      require('daisyui'),
    ],
    daisyui: {
      themes: ["light", "dark"],
    },
    darkMode: ['selector', '[data-theme="dark"]'],
};
