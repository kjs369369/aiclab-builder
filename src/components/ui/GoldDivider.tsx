export function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <hr
      className={`my-12 border-0 h-px bg-gradient-to-r from-transparent via-gold-primary to-transparent ${className}`}
    />
  )
}
