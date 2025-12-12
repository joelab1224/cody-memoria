import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  // Base styles
  `flex w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm 
   transition-all duration-300 ease-gentle font-[Outfit] font-light
   file:border-0 file:bg-transparent file:text-sm file:font-medium
   placeholder:text-[#7A8A76] placeholder:font-light
   focus-visible:outline-none focus-visible:ring-1
   disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: `
          border-[rgba(122,138,118,0.2)] bg-[rgba(247,245,243,0.4)]
          text-[#3A4B39] backdrop-blur-sm
          focus-visible:ring-[#7A8A76] 
          focus-visible:bg-[rgba(247,245,243,0.6)]
          focus-visible:backdrop-blur-md
          focus-visible:shadow-[0_0_20px_rgba(122,138,118,0.15)]
        `,
        
        glass: `
          border-[rgba(122,138,118,0.3)] bg-[rgba(247,245,243,0.25)]
          text-[#3A4B39] backdrop-blur-md
          focus-visible:ring-[#7A8A76]
          focus-visible:bg-[rgba(247,245,243,0.4)]
          focus-visible:backdrop-blur-lg
          focus-visible:shadow-[0_0_25px_rgba(122,138,118,0.2)]
        `,
        
        chat: `
          border-0 bg-[rgba(247,245,243,0.4)] backdrop-blur-md
          text-[#3A4B39] rounded-full px-6
          focus-visible:ring-0
          focus-visible:bg-[rgba(247,245,243,0.6)]
          focus-visible:backdrop-blur-lg
          focus-visible:shadow-[0_0_20px_rgba(122,138,118,0.15)]
        `
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-9 px-3',
        lg: 'h-10 px-4',
        xl: 'h-12 px-6 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  /** Icon to show before input */
  leftIcon?: React.ReactNode;
  /** Icon to show after input */
  rightIcon?: React.ReactNode;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, leftIcon, rightIcon, error, errorMessage, type, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8A76]">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              inputVariants({ variant, size }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus-visible:ring-red-500',
              className
            )}
            ref={ref}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8A76]">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && errorMessage && (
          <p className="mt-1 text-xs text-red-600 font-light">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
export type { VariantProps };