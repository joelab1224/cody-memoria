import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  // Base styles - inherits from Glass component
  `backdrop-blur-[20px] border border-[rgba(122,138,118,0.3)] rounded-[20px]
   shadow-[0_8px_32px_rgba(122,138,118,0.1)]
   transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.320,1)]
   hover:backdrop-blur-[30px] hover:shadow-[0_16px_64px_rgba(122,138,118,0.15)]
   hover:translate-y-[-5px]`,
  {
    variants: {
      variant: {
        memory: `
          bg-[rgba(247,245,243,0.25)] hover:bg-[rgba(247,245,243,0.35)]
          p-8 text-center
        `,
        
        profile: `
          bg-[rgba(247,245,243,0.25)] hover:bg-[rgba(247,245,243,0.35)]
          p-12 text-center max-w-md mx-auto
        `,
        
        chat: `
          bg-[rgba(247,245,243,0.25)] hover:bg-[rgba(247,245,243,0.35)]
          p-8
        `,
        
        voice: `
          bg-[rgba(247,245,243,0.25)] hover:bg-[rgba(247,245,243,0.35)]
          p-16 text-center max-w-2xl mx-auto
        `,
        
        flow: `
          bg-[rgba(247,245,243,0.25)] hover:bg-[rgba(247,245,243,0.35)]
          p-14
        `,
        
        simple: `
          bg-[rgba(247,245,243,0.25)] hover:bg-[rgba(247,245,243,0.35)]
          p-6
        `
      },
      animate: {
        none: '',
        breathe: 'animate-[breathe_10s_ease-in-out_infinite]',
        breatheSlow: 'animate-[breathe_15s_ease-in-out_infinite]'
      }
    },
    defaultVariants: {
      variant: 'simple',
      animate: 'breathe'
    }
  }
);

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  /** Animation delay in seconds */
  animationDelay?: number;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  className,
  variant,
  animate,
  animationDelay = 0,
  style,
  ...props
}, ref) => {
  const animationStyle = {
    animationDelay: animationDelay ? `${animationDelay}s` : undefined,
    ...style
  };

  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, animate }), className)}
      style={animationStyle}
      {...props}
    >
      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            backdrop-filter: blur(20px);
          }
          50% {
            transform: scale(1.02);
            backdrop-filter: blur(25px);
          }
        }
      `}</style>
      {props.children}
    </div>
  );
});

Card.displayName = 'Card';

// Card sub-components for better composition
const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 mb-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'font-[Outfit] text-2xl font-medium leading-none tracking-tight text-[#3A4B39]',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-[#7A8A76] font-light', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-6 mt-6 border-t border-[rgba(122,138,118,0.1)]', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants
};

export type { CardProps };