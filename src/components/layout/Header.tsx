'use client'
import Link from 'next/link'
import { useState } from 'react'
import { BlackGoldButton } from '@/components/ui/BlackGoldButton'
import { ApiKeyModal } from '@/components/ApiKeyModal'

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl text-gold-primary tracking-wide">
            AICLab Builder
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-gold-bright transition">
              진단
            </Link>
            <Link href="/design" className="hover:text-gold-bright transition">
              설계도
            </Link>
            <BlackGoldButton variant="secondary" onClick={() => setOpen(true)}>
              API 키
            </BlackGoldButton>
          </nav>
        </div>
      </header>
      <ApiKeyModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
