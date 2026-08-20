/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      // borderRadius: {
      //   lg: `var(--radius)`,
      //   md: `calc(var(--radius) - 2px)`,
      //   sm: 'calc(var(--radius) - 4px)',
      // },
      fontFamily: {
        sans: ['var(--font-poppins)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        // structure: large inset edge blue, inset drop shadow, edge highlight, edge shadow
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
        stream:
          'min-height, height, width, opacity, color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow',
      },
      transitionDuration: {
        1500: '1500ms',
      },
      minHeight: {
        16: '4rem',
        container: '70rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      scrollbar: {
        width: '6px',
        trackColor: 'transparent',
        thumbColor: 'rgba(156, 163, 175, 0.5)',
        thumbBorderRadius: '3px',
      },
      maxWidth: {
        container: '80rem',
        main: '48rem',
      },
    },
  },
  plugins: [require('tailwindcss-3d')({ legacy: true })],
}
