import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as: Component = 'button',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'rounded-lg',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'disabled:pointer-events-none',
    ];

    const variantClasses = {
      primary: [
        'bg-blue-600',
        'text-white',
        'hover:bg-blue-700',
        'focus:ring-blue-500',
        'active:bg-blue-800',
      ],
      secondary: [
        'bg-gray-600',
        'text-white',
        'hover:bg-gray-700',
        'focus:ring-gray-500',
        'active:bg-gray-800',
      ],
      outline: [
        'border',
        'border-gray-300',
        'bg-transparent',
        'text-gray-700',
        'hover:bg-gray-50',
        'focus:ring-gray-500',
        'active:bg-gray-100',
      ],
      ghost: [
        'bg-transparent',
        'text-gray-700',
        'hover:bg-gray-100',
        'focus:ring-gray-500',
        'active:bg-gray-200',
      ],
      danger: [
        'bg-red-600',
        'text-white',
        'hover:bg-red-700',
        'focus:ring-red-500',
        'active:bg-red-800',
      ],
    };

    const sizeClasses = {
      sm: ['px-3', 'py-1.5', 'text-sm'],
      md: ['px-4', 'py-2', 'text-base'],
      lg: ['px-6', 'py-3', 'text-lg'],
    };

    const widthClasses = fullWidth ? ['w-full'] : [];

    const allClasses = [
      ...baseClasses,
      ...variantClasses[variant],
      ...sizeClasses[size],
      ...widthClasses,
      className,
    ].join(' ');

    return (
      <Component
        ref={ref}
        className={allClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="w-4 h-4 mr-2 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}

        {children}

        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
