import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-ink-200/60 shadow-card',
        hover &&
          'transition-all duration-300 hover:shadow-card-hover hover:border-ink-300/60',
        className
      )}
    >
      {children}
    </div>
  );
}
