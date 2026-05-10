import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gold-primary text-bg-base hover:bg-gold-bright transition-colors duration-300',
  secondary:
    'border border-gold-primary text-gold-primary hover:bg-gold-primary/10 transition-colors duration-300',
}

export const BlackGoldButton = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', className = '', children, ...rest }, ref) => (
    <button
      ref={ref}
      className={`px-6 py-3 font-medium tracking-wide disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
)
BlackGoldButton.displayName = 'BlackGoldButton'
