import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'danger' | 'gold' | 'accent' | 'experimental';
  children: ReactNode;
}

export function Badge({ variant = 'default', children, className, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

  const variants = {
    default: 'bg-secondary text-white',
    primary: 'bg-accent/20 text-accent border border-accent/30',
    secondary: 'bg-secondary text-white',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border border-red-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
    gold: 'bg-gold/20 text-gold border border-gold/30',
    accent: 'bg-accent/20 text-accent border border-accent/30',
    experimental: 'bg-accent/20 text-accent border border-accent/30',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
