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
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
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
        // Actuality Studio semantic palette
        crimson: {
          50:  'oklch(0.96 0.03 27)',
          100: 'oklch(0.90 0.07 27)',
          200: 'oklch(0.82 0.11 27)',
          300: 'oklch(0.70 0.15 27)',
          400: 'oklch(0.58 0.18 27)',
          DEFAULT: 'oklch(0.47 0.20 27)',
          600: 'oklch(0.40 0.18 27)',
          700: 'oklch(0.33 0.15 27)',
          800: 'oklch(0.25 0.10 27)',
          900: 'oklch(0.18 0.06 27)',
        },
        parchment: {
          50:  'oklch(0.98 0.01 78)',
          100: 'oklch(0.96 0.025 78)',
          200: 'oklch(0.94 0.03 78)',
          DEFAULT: 'oklch(0.92 0.04 78)',
          400: 'oklch(0.88 0.05 75)',
          500: 'oklch(0.82 0.06 73)',
        },
        // Keep terracotta alias for backward compat with any remaining refs
        terracotta: {
          50:  'oklch(0.96 0.03 27)',
          100: 'oklch(0.90 0.07 27)',
          200: 'oklch(0.82 0.11 27)',
          300: 'oklch(0.70 0.15 27)',
          400: 'oklch(0.58 0.18 27)',
          DEFAULT: 'oklch(0.47 0.20 27)',
          600: 'oklch(0.40 0.18 27)',
          700: 'oklch(0.33 0.15 27)',
          800: 'oklch(0.25 0.10 27)',
          900: 'oklch(0.18 0.06 27)',
        },
        sage: {
          50:  'oklch(0.99 0.005 148)',
          100: 'oklch(0.98 0.008 148)',
          200: 'oklch(0.97 0.012 148)',
          300: 'oklch(0.96 0.015 148)',
          DEFAULT: 'oklch(0.97 0.015 148)',
          500: 'oklch(0.88 0.03 148)',
          600: 'oklch(0.72 0.06 148)',
          700: 'oklch(0.47 0.09 148)',
          800: 'oklch(0.35 0.08 148)',
          900: 'oklch(0.24 0.06 148)',
        },
        gold: {
          50:  'oklch(0.97 0.04 72)',
          100: 'oklch(0.93 0.06 72)',
          200: 'oklch(0.89 0.08 72)',
          DEFAULT: 'oklch(0.84 0.09 72)',
          400: 'oklch(0.75 0.09 70)',
          500: 'oklch(0.65 0.09 68)',
        },
        cream: {
          50:  'oklch(0.99 0.005 78)',
          DEFAULT: 'oklch(0.96 0.025 78)',
          200: 'oklch(0.94 0.03 78)',
          300: 'oklch(0.90 0.04 75)',
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
        blush: {
          50:  'oklch(0.97 0.02 38)',
          100: 'oklch(0.93 0.04 38)',
          DEFAULT: 'oklch(0.78 0.07 38)',
          300: 'oklch(0.70 0.08 38)',
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
        // crimson glow shadows
        warm: '0 4px 20px rgba(192, 57, 43, 0.18)',
        'warm-lg': '0 8px 40px rgba(192, 57, 43, 0.15), 0 2px 8px rgba(192, 57, 43, 0.08)',
        // parchment ambient
        sage: '0 4px 20px rgba(245, 230, 200, 0.50)',
        // deep brown card shadow
        card: '0 2px 12px rgba(44, 26, 14, 0.10)',
        // Steiner glow
        'glow-sm': '0 0 12px 3px var(--theme-glow)',
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
        'pulse-crimson': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(192, 57, 43, 0.40)' },
          '50%': { boxShadow: '0 0 0 8px rgba(192, 57, 43, 0)' }
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
        'pulse-crimson': 'pulse-crimson 2s ease-in-out infinite',
        'sway': 'sway 6s ease-in-out infinite',
      }
    }
  },
  plugins: [typography, containerQueries, animate]
};
