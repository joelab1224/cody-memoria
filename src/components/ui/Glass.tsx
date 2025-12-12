import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { tokens } from '@/lib/design-tokens';

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Breathing animation variant */
  animate?: 'breathe' | 'none';
  /** Animation delay in seconds */
  animationDelay?: number;
  /** Glass intensity */
  intensity?: 'light' | 'medium' | 'strong';
  children: React.ReactNode;
}

const Glass = forwardRef<HTMLDivElement, GlassProps>(({
  className,
  animate = 'breathe',
  animationDelay = 0,
  intensity = 'medium',
  children,
  style,
  ...props
}, ref) => {
  const baseClasses = `
    backdrop-blur-[20px]
    border border-[rgba(122,138,118,0.3)]
    rounded-[20px]
    shadow-[0_8px_32px_rgba(122,138,118,0.1)]
    transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.320,1)]
    hover:backdrop-blur-[30px]
    hover:shadow-[0_16px_64px_rgba(122,138,118,0.15)]
    hover:translate-y-[-5px]
  `;

  const intensityClasses = {
    light: 'bg-[rgba(247,245,243,0.15)] hover:bg-[rgba(247,245,243,0.25)]',
    medium: 'bg-[rgba(247,245,243,0.25)] hover:bg-[rgba(247,245,243,0.35)]',
    strong: 'bg-[rgba(247,245,243,0.35)] hover:bg-[rgba(247,245,243,0.45)]'
  };

  const animationClasses = {
    breathe: 'animate-[breathe_10s_ease-in-out_infinite]',
    none: ''
  };

  const animationStyle = {
    animationDelay: animationDelay ? `${animationDelay}s` : undefined,
    ...style
  };

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        intensityClasses[intensity],
        animationClasses[animate],
        className
      )}
      style={animationStyle}
      {...props}
    >
      {children}
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
    </div>
  );
});

Glass.displayName = 'Glass';

export { Glass };
export type { GlassProps };