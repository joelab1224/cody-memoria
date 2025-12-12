import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva(
  // Base styles
  `relative overflow-hidden rounded-full transition-all duration-500 ease-gentle`,
  {
    variants: {
      size: {
        sm: 'w-10 h-10',
        default: 'w-12 h-12', 
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
        xl: 'w-32 h-32',
        profile: 'w-30 h-30',  // 120px for profile cards
        voice: 'w-40 h-40'     // 160px for voice interface
      },
      variant: {
        memory: `
          bg-gradient-to-br from-[#E6B8A2] to-[#B8952F]
          border-2 border-[rgba(122,138,118,0.2)]
          shadow-[0_10px_30px_rgba(122,138,118,0.15)]
        `,
        chat: `
          bg-gradient-to-br from-[#7A8A76] to-[#E6B8A2]
          border-2 border-[rgba(122,138,118,0.3)]
          shadow-[0_0_20px_rgba(122,138,118,0.3)]
        `,
        voice: `
          bg-gradient-to-br from-[#7A8A76] to-[#E6B8A2]
          border-4 border-[rgba(122,138,118,0.15)]
          shadow-[0_0_40px_rgba(122,138,118,0.2)]
        `,
        profile: `
          bg-gradient-to-br from-[#E6B8A2] to-[#B8952F]
          border-4 border-[rgba(122,138,118,0.2)]
          shadow-[0_10px_30px_rgba(122,138,118,0.15)]
        `
      },
      animation: {
        none: '',
        shimmer: 'animate-shimmer',
        pulse: 'animate-pulse-gentle',
        rotate: 'animate-rotate-gentle'
      }
    },
    defaultVariants: {
      size: 'default',
      variant: 'memory',
      animation: 'shimmer'
    }
  }
);

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback text (usually initials) */
  fallback?: string;
  /** Show status indicator */
  showStatus?: boolean;
  /** Status color */
  statusColor?: 'online' | 'offline' | 'speaking';
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({
  className,
  size,
  variant,
  animation,
  src,
  alt,
  fallback,
  showStatus = false,
  statusColor = 'online',
  ...props
}, ref) => {
  const statusColors = {
    online: 'bg-[#B8952F]',
    offline: 'bg-[rgba(122,138,118,0.3)]',
    speaking: 'bg-[#B8952F] animate-pulse'
  };

  return (
    <div
      ref={ref}
      className={cn(avatarVariants({ size, variant, animation }), className)}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#F7F5F3] font-medium">
          {fallback || '👤'}
        </div>
      )}
      
      {/* Shimmer overlay */}
      {animation === 'shimmer' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
      )}
      
      {/* Rotating accent ring for voice interface */}
      {variant === 'voice' && (
        <div className="absolute inset-[-20px] bg-conic-gradient(transparent_0deg,rgba(122,138,118,0.3)_90deg,transparent_180deg) rounded-full animate-rotate-gentle" />
      )}
      
      {/* Status indicator */}
      {showStatus && (
        <div className={cn(
          'absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-[#F7F5F3]',
          statusColors[statusColor]
        )} />
      )}
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        @keyframes rotate-gentle {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 4s linear infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }
        
        .animate-rotate-gentle {
          animation: rotate-gentle 3s linear infinite;
        }
      `}</style>
    </div>
  );
});

Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants };
export type { AvatarProps };