import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'heroSecondary' | 'whatsappGlow';
type ButtonSize = 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white border border-brand italic hover:bg-brand-dark hover:border-brand-dark shadow-[0_8px_24px_-6px_rgba(10,92,255,0.45)]',
  secondary:
    'bg-transparent text-night border border-night hover:bg-night hover:text-white',
  heroSecondary:
    'bg-transparent text-white border border-white/80 hover:bg-white hover:text-night',
  whatsappGlow:
    'bg-brand/15 text-white border-2 border-brand italic hover:bg-brand shadow-[0_0_28px_rgba(10,92,255,0.4)] hover:shadow-[0_0_34px_rgba(10,92,255,0.6)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  md: 'min-h-[44px] px-5 py-2.5 text-xs',
  lg: 'min-h-[48px] px-7 py-3.5 text-xs sm:text-sm',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-md font-display font-extrabold uppercase tracking-wide whitespace-nowrap shrink-0 cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50 disabled:cursor-not-allowed';

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children, ...rest } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  if (typeof props.href === 'string') {
    const anchorProps = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;
  return (
    <button type={buttonProps.type ?? 'button'} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
