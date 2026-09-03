import { cn } from '@/utils/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 whitespace-nowrap';

  const variants = {
    primary:
      'bg-brand-600 text-white shadow-sm hover:bg-brand-700 hover:shadow-md active:scale-[0.98]',
    secondary:
      'bg-white text-ink-700 border border-ink-200 shadow-card hover:bg-ink-50 hover:border-ink-300 active:scale-[0.98]',
    ghost: 'text-ink-600 hover:bg-ink-100 hover:text-ink-900 active:scale-[0.98]',
    danger:
      'bg-danger-600 text-white shadow-sm hover:bg-danger-700 hover:shadow-md active:scale-[0.98]',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
