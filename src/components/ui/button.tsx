import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', className = '', ...props }, ref) => {
    const baseStyles = 'font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      default: 'bg-gradient-to-r from-purple-700 to-purple-900 text-white hover:shadow-lg hover:shadow-purple-500/40 hover:scale-105',
      outline: 'border-2 border-purple-700 text-purple-900 hover:border-purple-900 hover:text-purple-900 hover:bg-purple-50',
      ghost: 'text-purple-900 hover:bg-purple-100'
    };

    const sizes = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-6 py-2 text-base',
      lg: 'px-8 py-3 text-lg'
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
