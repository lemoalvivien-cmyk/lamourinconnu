import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'gradient';
}

export function Card({ children, variant = 'default', className, ...props }: CardProps) {
  const baseStyles = 'rounded-xl p-6 transition-all duration-200';

  const variants = {
    default: 'bg-secondary/50 backdrop-blur-sm border border-accent/20',
    gradient: 'bg-gradient-to-br from-accent/20 to-gold/20 backdrop-blur-sm border border-accent/30',
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
