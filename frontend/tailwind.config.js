/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Direct Semantic Light Tokens
        burgundy: {
          DEFAULT: '#8B0026',
          dark: '#65001C',
          soft: 'rgba(139, 0, 38, 0.08)',
          muted: '#FAF0E8',
        },
        wine: {
          DEFAULT: '#8B0026',
          hover: '#65001C',
          deep: '#65001C',
          soft: 'rgba(139, 0, 38, 0.08)',
        },
        cream: {
          DEFAULT: '#F3E5D0',
          soft: '#FAF5EF',
          light: '#FFF9F2',
        },
        ivory: {
          DEFAULT: '#FFF9F2',
          soft: '#FAF5EF',
          text: '#1E1B1C',
        },
        coral: {
          DEFAULT: '#D64F63',
          hover: '#E9838F',
          soft: '#E9838F',
          subtle: 'rgba(214, 79, 99, 0.1)',
        },
        yellow: {
          DEFAULT: '#F3C43E',
          soft: '#FFF1B8',
          subtle: 'rgba(243, 196, 62, 0.15)',
        },
        brand: {
          DEFAULT: '#8B0026',
          dark: '#65001C',
          soft: '#FAF0E8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          warm: '#FAF5EF',
          cream: '#F3E5D0',
          ivory: '#FFF9F2',
        },
        border: {
          DEFAULT: '#E8DED4',
          dark: '#E8DED4',
          light: '#F3ECE3',
          strong: '#D9CEC2',
          subtle: 'rgba(232, 222, 212, 0.6)',
        },
        primary: {
          DEFAULT: '#8B0026',
          hover: '#65001C',
          muted: 'rgba(139, 0, 38, 0.08)',
        },
        accent: {
          DEFAULT: '#D64F63',
          hover: '#E9838F',
          muted: 'rgba(214, 79, 99, 0.1)',
        },
        success: {
          DEFAULT: '#238B68',
          muted: 'rgba(35, 139, 104, 0.12)',
          soft: '#E8F5EE',
        },
        warning: {
          DEFAULT: '#F3C43E',
          muted: 'rgba(243, 196, 62, 0.15)',
          soft: '#FFF1B8',
        },
        danger: {
          DEFAULT: '#C63D50',
          muted: 'rgba(198, 61, 80, 0.12)',
          soft: '#FDECEF',
        },
        info: {
          DEFAULT: '#5275B8',
          muted: 'rgba(82, 117, 184, 0.12)',
          soft: '#EFF4FC',
        },
        'cool-blue': {
          DEFAULT: '#5275B8',
          soft: 'rgba(82, 117, 184, 0.12)',
        },

        // Legacy compatibility mappings remapped to Light Palette
        dark: {
          main: '#FFF9F2',      // Page background (Ivory)
          secondary: '#FAF5EF', // Secondary / Sidebar surface (Soft Surface)
          card: '#FFFFFF',      // Card surfaces
          subtle: '#F3E5D0',    // Cream accent
          hover: '#F7EFE4',     // Hover tint
        },
        slate: {
          text: '#1E1B1C',      // Dark Text
          muted: '#5F5A5C',     // Secondary Text
          dim: '#817B7E',       // Muted Text
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 2px 8px -1px rgba(30, 27, 28, 0.04)',
        'card': '0 2px 10px -2px rgba(30, 27, 28, 0.05), 0 1px 3px -1px rgba(30, 27, 28, 0.04)',
        'card-hover': '0 12px 28px -4px rgba(139, 0, 38, 0.09), 0 4px 10px -2px rgba(30, 27, 28, 0.04)',
        'wine': '0 4px 14px 0 rgba(139, 0, 38, 0.25)',
        'wine-hover': '0 6px 20px 0 rgba(139, 0, 38, 0.35)',
        'cream': '0 4px 16px -2px rgba(243, 229, 208, 0.6)',
      },
      animation: {
        'ticker': 'ticker 35s linear infinite',
        'fade-up': 'fadeUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
