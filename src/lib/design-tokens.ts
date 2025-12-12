/**
 * Cody Memoria Design Tokens
 * Gentle Memories Design System
 * 
 * These tokens define the core visual language of the application
 */

export const tokens = {
  // Colors
  colors: {
    // Base palette
    cream: '#F7F5F3',
    warmBeige: '#E8D5B7',
    sage: '#7A8A76',
    sageDark: '#4A5D49',
    sageLight: '#A8B5A0',
    softGold: '#B8952F',
    peach: '#E6B8A2',

    // Semantic colors
    text: {
      primary: '#3A4B39',
      secondary: '#5A6B59',
      light: '#7A8A76',
      inverse: '#F7F5F3'
    },

    // Surface colors
    surface: {
      primary: '#F7F5F3',
      secondary: '#E8D5B7',
      tertiary: '#A8B5A0'
    },

    // Glass morphism
    glass: {
      background: 'rgba(247, 245, 243, 0.25)',
      border: 'rgba(122, 138, 118, 0.3)',
      hover: 'rgba(247, 245, 243, 0.35)'
    },

    // Interactive states
    interactive: {
      primary: '#7A8A76',
      primaryHover: '#B8952F',
      secondary: 'rgba(122, 138, 118, 0.1)',
      secondaryHover: 'rgba(122, 138, 118, 0.2)'
    }
  },

  // Typography
  typography: {
    fonts: {
      primary: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },

    sizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
    },

    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600
    },

    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.6,
      loose: 2
    },

    letterSpacing: {
      tight: '-0.02em',
      normal: '0em',
      wide: '0.01em',
      wider: '0.05em'
    }
  },

  // Spacing
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    3.5: '0.875rem',   // 14px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    9: '2.25rem',      // 36px
    10: '2.5rem',      // 40px
    11: '2.75rem',     // 44px
    12: '3rem',        // 48px
    14: '3.5rem',      // 56px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem'         // 128px
  },

  // Border radius
  radii: {
    none: '0',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px'
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    
    // Gentle Memories specific shadows
    gentle: '0 8px 32px rgba(122, 138, 118, 0.1)',
    gentleHover: '0 16px 64px rgba(122, 138, 118, 0.15)',
    avatar: '0 10px 30px rgba(122, 138, 118, 0.15)',
    glass: '0 12px 40px rgba(0, 0, 0, 0.1)'
  },

  // Transitions
  transitions: {
    fast: '150ms',
    base: '300ms',
    slow: '600ms',
    gentle: '800ms',
    
    // Easing functions
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      gentle: 'cubic-bezier(0.23, 1, 0.320, 1)'
    }
  },

  // Animations
  animations: {
    // Duration
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '600ms',
      gentle: '800ms',
      breath: '6s',
      shimmer: '4s'
    },

    // Keyframes (for CSS-in-JS or CSS variables)
    keyframes: {
      breathe: {
        '0%, 100%': { transform: 'scale(1)', backdropFilter: 'blur(20px)' },
        '50%': { transform: 'scale(1.02)', backdropFilter: 'blur(25px)' }
      },
      shimmer: {
        '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
        '100%': { transform: 'translateX(100%) translateY(100%) rotate(45deg)' }
      },
      pulse: {
        '0%, 100%': { transform: 'scale(1)', opacity: '1' },
        '50%': { transform: 'scale(1.1)', opacity: '0.8' }
      },
      float: {
        '0%': { transform: 'translateY(100vh) translateX(0px)', opacity: '0' },
        '10%': { opacity: '0.3' },
        '90%': { opacity: '0.3' },
        '100%': { transform: 'translateY(-100px) translateX(100px)', opacity: '0' }
      }
    }
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  }
} as const;

// Type exports for TypeScript
export type DesignTokens = typeof tokens;
export type ColorTokens = typeof tokens.colors;
export type TypographyTokens = typeof tokens.typography;
export type SpacingTokens = typeof tokens.spacing;