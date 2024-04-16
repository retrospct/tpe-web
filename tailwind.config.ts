import headlessuiPlugin from '@headlessui/tailwindcss'
import formsPlugin from '@tailwindcss/forms'
import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
    // fontSize: {
    //   xs: ['0.75rem', { lineHeight: '1rem' }],
    //   sm: ['0.875rem', { lineHeight: '1.5rem' }],
    //   base: ['1rem', { lineHeight: '1.75rem' }],
    //   lg: ['1.125rem', { lineHeight: '2rem' }],
    //   xl: ['1.25rem', { lineHeight: '2rem' }],
    //   '2xl': ['1.5rem', { lineHeight: '2rem' }],
    //   '3xl': ['2rem', { lineHeight: '2.5rem' }],
    //   '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
    //   '5xl': ['3rem', { lineHeight: '3.5rem' }],
    //   '6xl': ['3.75rem', { lineHeight: '1' }],
    //   '7xl': ['4.5rem', { lineHeight: '1.1' }],
    //   '8xl': ['6rem', { lineHeight: '1' }],
    //   '9xl': ['8rem', { lineHeight: '1' }]
    // },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        almond: '#EFE4D9',
        pink: '#EEC8CB',
        red: '#9E3811',
        brown: '#5B3613',
        beige: '#F8F3EE',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2rem'
      },
      fontFamily: {
        base: ['var(--font-crimson)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-crimson)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-belgant)', ...defaultTheme.fontFamily.serif]
        // display: ['var(--font-crimson)', 'ui-serif']
      },
      maxWidth: {
        '2xl': '40rem'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), formsPlugin, headlessuiPlugin]
} satisfies Config

export default config

// https://ui.aceternity.com/docs/add-utilities
// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
// function addVariablesForColors({ addBase, theme }: any) {
//   let allColors = flattenColorPalette(theme('colors'))
//   let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))
//   addBase({ ':root': newVars })
// }
