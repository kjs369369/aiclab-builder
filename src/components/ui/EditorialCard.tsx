import { HTMLAttributes } from 'react'

export function EditorialCard({
  className = '',
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`bg-bg-card border border-border p-8 ${className}`} {...rest}>
      {children}
    </div>
  )
}
