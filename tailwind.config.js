export default {
  darkMode: 'class',
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        'm2m': {
          'bg-primary': 'var(--bg-primary)',
          'bg-card': 'var(--bg-card)',
          'accent-blue': '#0066FF',
          'accent-teal': '#00D9FF',
          'accent-orange': '#F89C36',
          'text-primary': 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          'divider': 'var(--divider)',
          'success': '#36C275',
          'chart-blue': '#0066FF',
          'chart-orange': '#F89C36',
          'chart-green': '#36C275',
          'chart-yellow': '#FFD166',
          // Enhanced Neon Gradient Palette
          'neon-cyan': '#00FFFF',
          'neon-blue': '#0066FF',
          'neon-teal': '#00D9FF',
          'electric-aqua': '#00FFF5',
          'deep-navy': '#0A1929',
          'charcoal': '#0E1B2E',
          'midnight-blue': '#0A1929',
          'deep-teal': '#004D5C',
          // NEARBUY Brand Colors
          'nearbuy-green': '#3AA66B',
          'nearbuy-teal': '#2E8C95',
          'nearbuy-blue': '#1F6FB3',
          'nearbuy-mint': '#DFF5E9',
          'nearbuy-mist': '#E7F7FF',
          'nearbuy-neon': '#7CFF8A',
        }
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, #00D9FF 0%, #0066FF 50%, #00FFFF 100%)',
        'neon-gradient-hover': 'linear-gradient(225deg, #00FFFF 0%, #0066FF 50%, #00D9FF 100%)',
        'premium-gradient': 'linear-gradient(135deg, #00D9FF 0%, #0A1929 50%, #00FFFF 100%)',
        'premium-glow': 'radial-gradient(circle, rgba(0, 217, 255, 0.4) 0%, transparent 70%)',
        'ambient-gradient': 'radial-gradient(ellipse at top, rgba(0, 217, 255, 0.15), transparent 50%)',
        'nearbuy-gradient': 'linear-gradient(135deg, #3AA66B 0%, #2E8C95 50%, #1F6FB3 100%)',
        'nearbuy-soft': 'linear-gradient(135deg, #DFF5E9 0%, #E7F7FF 100%)',
        'zone-commercial': 'linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(0, 102, 255, 0.2))',
        'zone-residential': 'linear-gradient(135deg, rgba(54, 194, 117, 0.2), rgba(124, 255, 138, 0.2))',
        'zone-industrial': 'linear-gradient(135deg, rgba(100, 116, 139, 0.2), rgba(148, 163, 184, 0.2))',
        'zone-mixed': 'linear-gradient(135deg, rgba(248, 156, 54, 0.2), rgba(255, 209, 102, 0.2))',
      },
      boxShadow: {
        'neon-glow': '0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3)',
        'neon-glow-sm': '0 0 15px rgba(0, 255, 255, 0.4)',
        'neon-glow-lg': '0 0 40px rgba(0, 217, 255, 0.7)',
        'premium-depth': '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 217, 255, 0.2)',
        'floating': '0 10px 40px rgba(0, 217, 255, 0.3)',
        'nearbuy-sm': '0 2px 8px rgba(0, 217, 255, 0.15)',
        'nearbuy-md': '0 4px 16px rgba(0, 217, 255, 0.2)',
        'nearbuy-lg': '0 8px 32px rgba(0, 217, 255, 0.25)',
        'nearbuy-xl': '0 12px 48px rgba(0, 217, 255, 0.3)',
        'nearbuy-glow': '0 0 24px rgba(0, 217, 255, 0.5)',
        'zone-glow': '0 0 20px rgba(0, 217, 255, 0.4)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'gradient-flow': 'gradient-flow 6s ease infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        'zone-glow': 'zone-glow 3s ease-in-out infinite',
        'border-flow': 'border-flow 4s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)',
            transform: 'scale(1.05)',
          },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-30px) translateX(20px)' },
          '66%': { transform: 'translateY(-15px) translateX(-20px)' },
        },
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
            opacity: '1',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.8)',
            opacity: '0.8',
          },
        },
        'neon-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(0, 255, 255, 0.7)',
          },
          '50%': { 
            boxShadow: '0 0 0 10px rgba(0, 255, 255, 0)',
          },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'zone-glow': {
          '0%, 100%': { 
            filter: 'drop-shadow(0 0 10px rgba(0, 217, 255, 0.3))',
          },
          '50%': { 
            filter: 'drop-shadow(0 0 20px rgba(0, 217, 255, 0.6))',
          },
        },
        'border-flow': {
          '0%': { 
            backgroundPosition: '0% 50%',
          },
          '100%': { 
            backgroundPosition: '200% 50%',
          },
        },
      },
    }
  },
  plugins: [],
}