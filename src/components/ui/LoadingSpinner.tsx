export function LoadingSpinner({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="h-8 w-8 border-2 border-gold-primary border-t-transparent rounded-full animate-spin" />
      {label && <p className="text-text-muted text-sm">{label}</p>}
    </div>
  )
}
