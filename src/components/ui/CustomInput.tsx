import React from 'react';
import { Search, X } from 'lucide-react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onClear?: () => void;
  icon?: React.ReactNode;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChange,
  onClear,
  icon,
  className = '',
  placeholder = 'Search...',
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-xs font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
          {icon || <Search className="size-4" />}
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-border bg-card py-2 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 transition-all shadow-xs ${className}`}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 flex size-5 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Clear input"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
