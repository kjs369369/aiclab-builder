'use client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ApiKeyState {
  geminiKey: string
  openaiKey: string
  setKeys: (k: { geminiKey?: string; openaiKey?: string }) => void
  hasAnyKey: () => boolean
}

export const useApiKey = create<ApiKeyState>()(
  persist(
    (set, get) => ({
      geminiKey: '',
      openaiKey: '',
      setKeys: (k) => set((s) => ({ ...s, ...k })),
      hasAnyKey: () => !!(get().geminiKey || get().openaiKey),
    }),
    {
      name: 'aiclab-builder-keys',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
