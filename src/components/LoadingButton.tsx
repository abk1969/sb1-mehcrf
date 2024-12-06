import React from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function LoadingButton({
  isLoading = false,
  loadingText = 'Chargement...',
  children,
  className,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      className={clsx(
        'relative flex items-center justify-center transition-colors',
        isLoading && 'cursor-not-allowed',
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <span className="absolute left-4 flex items-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </span>
      )}
      <span className={clsx(isLoading && 'opacity-0')}>
        {children}
      </span>
      {isLoading && (
        <span className="absolute">{loadingText}</span>
      )}
    </button>
  );
}