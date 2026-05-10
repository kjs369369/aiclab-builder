'use client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { DiagnosisReport } from '@/types/diagnosis'

interface State {
  report: DiagnosisReport | null
  setReport: (r: DiagnosisReport) => void
  clear: () => void
}

export const useDiagnosisStore = create<State>()(
  persist(
    (set) => ({
      report: null,
      setReport: (r) => set({ report: r }),
      clear: () => set({ report: null }),
    }),
    {
      name: 'aiclab-builder-diagnosis',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
