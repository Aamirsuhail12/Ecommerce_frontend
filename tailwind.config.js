/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit', // JIT for faster builds
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [import('@tailwindcss/aspect-ratio'),import('@tailwindcss/forms')],
}



