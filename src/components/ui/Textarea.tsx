import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  // Base styles
  `flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm 
   transition-all duration-300 ease-[cubic-bezier(0.23,1,0.320,1)] font-[Outfit] font-light
   placeholder:text-[#7A8A76] placeholder:font-light
   focus-visible:outline-none focus-visible:ring-1
   disabled:cursor-not-allowed disabled:opacity-50
   resize-none`,
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
      },
      size: {
        sm: 'min-h-[60px] px-2 py-1 text-xs',
        default: 'min-h-[100px] px-3 py-2',
        lg: 'min-h-[120px] px-4 py-3',
        xl: 'min-h-[150px] px-6 py-4 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, error, errorMessage, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          className={cn(
            textareaVariants({ variant, size }),
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        
        {error && errorMessage && (
          <p className="mt-1 text-xs text-red-600 font-light">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };

