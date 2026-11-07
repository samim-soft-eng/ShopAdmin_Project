import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon: Icon,
      endAdornment,
      type = 'text',
      id,
      name,
      value,
      onChange,
      placeholder,
      required = false,
      disabled = false,
      className = '',
      wrapperClassName = '',
      ...props
    },
    ref
  ) => {
    const inputId = id || name || `input-${Math.random().toString(36).substring(2, 7)}`;

    return (
      <div className={`w-full ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <div className="relative rounded-lg shadow-sm">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Icon className="w-4 h-4" />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className={`w-full rounded-lg border text-sm transition-colors duration-150 py-2.5 px-3.5 outline-none
              ${Icon ? 'pl-9' : ''}
              ${endAdornment ? 'pr-10' : ''}
              ${
                error
                  ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                  : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary'
              }
              ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' : ''}
              ${className}
            `}
            {...props}
          />

          {endAdornment && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {endAdornment}
            </div>
          )}
        </div>

        {error ? (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
