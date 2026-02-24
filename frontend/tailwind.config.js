import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))'
        },
        chart: {
          1: 'oklch(var(--chart-1))',
          2: 'oklch(var(--chart-2))',
          3: 'oklch(var(--chart-3))',
          4: 'oklch(var(--chart-4))',
          5: 'oklch(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'oklch(var(--sidebar))',
          foreground: 'oklch(var(--sidebar-foreground))',
          primary: 'oklch(var(--sidebar-primary))',
          'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
          accent: 'oklch(var(--sidebar-accent))',
          'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
          border: 'oklch(var(--sidebar-border))',
          ring: 'oklch(var(--sidebar-ring))'
        },
        // Autumn/Spring semantic palette tokens
        terracotta: {
          50:  'oklch(0.96 0.03 38)',
          100: 'oklch(0.91 0.05 38)',
          200: 'oklch(0.84 0.08 38)',
          300: 'oklch(0.74 0.10 38)',
          400: 'oklch(0.65 0.11 38)',
          DEFAULT: 'oklch(0.57 0.12 38)',
          600: 'oklch(0.50 0.11 38)',
          700: 'oklch(0.42 0.09 38)',
          800: 'oklch(0.33 0.07 38)',
          900: 'oklch(0.24 0.05 38)',
        },
        sage: {
          50:  'oklch(0.97 0.02 162)',
          100: 'oklch(0.93 0.03 162)',
          200: 'oklch(0.88 0.04 162)',
          300: 'oklch(0.84 0.05 162)',
          DEFAULT: 'oklch(0.79 0.06 162)',
          500: 'oklch(0.70 0.07 162)',
          600: 'oklch(0.60 0.08 162)',
          700: 'oklch(0.50 0.08 162)',
        },
        gold: {
          50:  'oklch(0.97 0.04 65)',
          100: 'oklch(0.93 0.07 63)',
          200: 'oklch(0.88 0.10 62)',
          DEFAULT: 'oklch(0.76 0.13 60)',
          400: 'oklch(0.68 0.13 58)',
          500: 'oklch(0.60 0.12 55)',
        },
        blush: {
          50:  'oklch(0.97 0.02 38)',
          100: 'oklch(0.93 0.04 38)',
          DEFAULT: 'oklch(0.78 0.07 38)',
          300: 'oklch(0.70 0.08 38)',
        },
        cream: {
          50:  'oklch(0.99 0.005 80)',
          DEFAULT: 'oklch(0.96 0.02 80)',
          200: 'oklch(0.93 0.025 78)',
          300: 'oklch(0.90 0.03 75)',
        },
        forest: {
          50:  'oklch(0.94 0.03 145)',
          100: 'oklch(0.88 0.05 145)',
          200: 'oklch(0.75 0.07 145)',
          300: 'oklch(0.62 0.09 145)',
          DEFAULT: 'oklch(0.47 0.10 145)',
          600: 'oklch(0.38 0.09 145)',
          700: 'oklch(0.30 0.07 145)',
          800: 'oklch(0.22 0.05 145)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        none: '0px',
        full: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
        warm: '0 4px 20px oklch(0.57 0.12 38 / 0.2)',
        'warm-lg': '0 8px 40px oklch(0.57 0.12 38 / 0.15), 0 2px 8px oklch(0.57 0.12 38 / 0.08)',
        sage: '0 4px 20px oklch(0.79 0.06 162 / 0.25)',
        card: '0 2px 12px oklch(0.28 0.04 40 / 0.08)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'pulse-terracotta': {
          '0%, 100%': { boxShadow: '0 0 0 0 oklch(0.57 0.12 38 / 0.4)' },
          '50%': { boxShadow: '0 0 0 8px oklch(0.57 0.12 38 / 0)' }
        },
        'sway': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'pulse-terracotta': 'pulse-terracotta 2s ease-in-out infinite',
        'sway': 'sway 6s ease-in-out infinite',
      }
    }
  },
  plugins: [typography, containerQueries, animate]
};
