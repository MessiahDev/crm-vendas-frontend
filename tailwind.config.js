/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // azul
        secondary: '#22c55e', // verde
        accent: '#f59e0b', // laranja
        background: '#f9fafb',
        muted: '#6b7280',

        dark: {
          background: '#111827',
          primary: '#3b82f6',
          secondary: '#10b981',
          accent: '#facc15',
          muted: '#9ca3af',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
