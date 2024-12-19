/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'text-gradient': 'text-gradient 5s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'text-gradient': {
          '0%, 100%': {
            'background-size': '200% auto',
            'background-position': '0% center',
          },
          '50%': {
            'background-size': '200% auto',
            'background-position': '100% center',
          },
        },
      },
      colors: {
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(209 213 219)',
            '--tw-prose-headings': 'rgb(255 255 255)',
            '--tw-prose-lead': 'rgb(209 213 219)',
            '--tw-prose-links': 'rgb(147 197 253)',
            '--tw-prose-bold': 'rgb(255 255 255)',
            '--tw-prose-counters': 'rgb(209 213 219)',
            '--tw-prose-bullets': 'rgb(209 213 219)',
            '--tw-prose-hr': 'rgb(55 65 81)',
            '--tw-prose-quotes': 'rgb(255 255 255)',
            '--tw-prose-quote-borders': 'rgb(55 65 81)',
            '--tw-prose-captions': 'rgb(156 163 175)',
            '--tw-prose-code': 'rgb(255 255 255)',
            '--tw-prose-pre-code': 'rgb(209 213 219)',
            '--tw-prose-pre-bg': 'rgb(31 41 55)',
            '--tw-prose-th-borders': 'rgb(55 65 81)',
            '--tw-prose-td-borders': 'rgb(55 65 81)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};