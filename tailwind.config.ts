import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#0032A0',
        secondary: '#4E4E4E',
        secondaryHover: '#9ca3af',
        primaryHover: '#5679c4',
        primaryButtonHover: '#203b77',
        secondaryButton: '#f3f4f6 ',
        secondaryButtonHover: '#e5e7eb',
        secondaryButtonBorder: '#e5e7eb',
      },
    },
  },
  plugins: [],
};
export default config;
