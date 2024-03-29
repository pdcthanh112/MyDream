/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        status_active: {
          text: '#1BC5BD',
          background: '#C9F7F5',
        },
        status_inactive: {
          text: '#F64E60',
          background: '#FFE2E5',
        },
      }
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false // <== disable this!
  // },
}
