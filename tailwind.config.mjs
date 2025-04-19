import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'
import tailwind3d from 'tailwindcss-3d'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography, tailwind3d({ legacy: true })],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        sans: ['var(--font-poppins)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        cutout:
          'inset 0 0 70px 0 rgb(0 0 0 / 0.25),inset 6px 2px 10px 6px rgb(0 0 0 / 0.15),1px 1px 1px 0 rgb(255 255 255 / 0.75),-1px -1px 1px 0 rgb(0 0 0 / 0.75)',
        cutoutDark: 'inset 0 0 70px 0 rgb(0 0 0 / 0.25),inset 6px 2px 10px 6px rgb(0 0 0 / 0.15)',
        tile: '6px 2px 10px 6px rgb(0 0 0 / 0.15),inset -1px -1px 1px 0 rgb(0 0 0 / 0.75),inset 1px 1px 1px 0 rgb(255 255 255 / 0.75)',
        tileDark: '6px 2px 10px 6px rgb(0 0 0 / 0.15)',
        tileHover:
          '0 0 10px 6px rgb(255 255 255 / 0.20),inset -1px -1px 1px 0 rgb(0 0 0 / 0.75),inset 1px 1px 1px 0 rgb(255 255 255 / 0.75)',
        addTileHover:
          'inset 0 0 20px 0 rgb(0 0 0 / 0.2),1px 1px 1px 0 rgb(255 255 255 / 0.75),-1px -1px 1px 0 rgb(0 0 0 / 0.75)',
      },
      transitionProperty: {
        tile: 'min-height, height, opacity, background-color, box-shadow',
      },
    },
  },
}

export default config