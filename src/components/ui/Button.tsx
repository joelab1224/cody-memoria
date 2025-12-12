import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md 
   text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.23,1,0.320,1)]
   focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7A8A76]
   disabled:pointer-events-none disabled:opacity-50 font-[Outfit]`,
  {
    variants: {
      variant: {
        // Primary button with sage to gold gradient
        primary: `
          bg-gradient-to-r from-[#7A8A76] to-[#B8952F]
          text-[#F7F5F3] shadow-md
          hover:shadow-[0_15px_35px_rgba(122,138,118,0.3)]
          hover:translate-y-[-5px] hover:scale-[1.05]
          before:absolute before:inset-0 before:rounded-[inherit]
          before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
          before:translate-x-[-100%] before:transition-transform before:duration-800
          hover:before:translate-x-[100%]
          relative overflow-hidden
        `,
        
        // Secondary button with subtle sage background
        secondary: `
          bg-[rgba(122,138,118,0.08)] text-[#5A6B59] border border-[rgba(122,138,118,0.15)]
          hover:bg-[rgba(122,138,118,0.15)] hover:translate-y-[-2px]
          hover:shadow-[0_4px_15px_rgba(122,138,118,0.2)]
        `,
        
        // Outline button
        outline: `
          border border-[rgba(122,138,118,0.3)] text-[#5A6B59] bg-transparent
          hover:bg-[rgba(122,138,118,0.1)] hover:text-[#3A4B39]
          hover:border-[rgba(122,138,118,0.5)]
        `,
        
        // Ghost button
        ghost: `
          text-[#5A6B59] hover:bg-[rgba(122,138,118,0.08)] 
          hover:text-[#3A4B39]
        `,
        
        // Voice button variants
        voicePrimary: `
          bg-[#7A8A76] text-[#F7F5F3] rounded-full w-15 h-15
          hover:bg-[#B8952F] hover:translate-y-[-3px] hover:scale-110
          hover:shadow-[0_10px_25px_rgba(122,138,118,0.3)]
        `,
        
        voiceSecondary: `
          bg-[rgba(122,138,118,0.1)] text-[#5A6B59] rounded-full w-15 h-15
          hover:bg-[rgba(122,138,118,0.2)] hover:translate-y-[-3px] hover:scale-110
          hover:shadow-[0_10px_25px_rgba(122,138,118,0.3)]
        `
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-9 px-4 py-2',
        lg: 'h-10 px-8',
        xl: 'h-12 px-10 text-base',
        
        // Icon sizes
        icon: 'h-9 w-9',
        iconSm: 'h-8 w-8',
        iconLg: 'h-12 w-12',
        
        // Voice button sizes
        voice: 'h-15 w-15 p-0',
        voiceLg: 'h-20 w-20 p-0'
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      rounded: 'lg'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Show loading spinner */
  loading?: boolean;
  /** Icon to show before text */
  leftIcon?: React.ReactNode;
  /** Icon to show after text */
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    rounded,
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export type { VariantProps };