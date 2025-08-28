import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = 'default',
      size = 'md',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || `input-${generatedId}`;

    const baseClasses = [
      'w-full',
      'border',
      'rounded-lg',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-500',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
    ];

    const variantClasses = {
      default: ['bg-white', 'border-gray-300', 'focus:border-blue-500'],
      filled: [
        'bg-gray-50',
        'border-gray-200',
        'focus:bg-white',
        'focus:border-blue-500',
      ],
    };

    const sizeClasses = {
      sm: ['px-3', 'py-1.5', 'text-sm'],
      md: ['px-4', 'py-2', 'text-base'],
      lg: ['px-5', 'py-3', 'text-lg'],
    };

    const errorClasses = error
      ? ['border-red-300', 'focus:border-red-500', 'focus:ring-red-500']
      : [];

    const paddingClasses = [];
    if (leftIcon) {
      const leftPadding = {
        sm: 'pl-9',
        md: 'pl-10',
        lg: 'pl-12',
      };
      paddingClasses.push(leftPadding[size]);
    }
    if (rightIcon) {
      const rightPadding = {
        sm: 'pr-9',
        md: 'pr-10',
        lg: 'pr-12',
      };
      paddingClasses.push(rightPadding[size]);
    }

    const inputClasses = [
      ...baseClasses,
      ...variantClasses[variant],
      ...sizeClasses[size],
      ...errorClasses,
      ...paddingClasses,
      className,
    ].join(' ');

    const iconSize = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const iconPosition = {
      sm: { left: 'left-3', right: 'right-3' },
      md: { left: 'left-3', right: 'right-3' },
      lg: { left: 'left-4', right: 'right-4' },
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={`absolute ${iconPosition[size].left} top-1/2 transform -translate-y-1/2 text-gray-400`}
            >
              <span className={iconSize[size]}>{leftIcon}</span>
            </div>
          )}

          <input ref={ref} id={inputId} className={inputClasses} {...props} />

          {rightIcon && (
            <div
              className={`absolute ${iconPosition[size].right} top-1/2 transform -translate-y-1/2 text-gray-400`}
            >
              <span className={iconSize[size]}>{rightIcon}</span>
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className="mt-1">
            {error && <p className="text-sm text-red-600">{error}</p>}
            {!error && helperText && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
