import React from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <Loader2 
        className={clsx(
          'animate-spin text-[#1C3F7C]',
          sizes[size],
          className
        )} 
      />
    </div>
  );
}