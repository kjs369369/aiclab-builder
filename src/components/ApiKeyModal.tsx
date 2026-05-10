'use client'
import { useState, useEffect } from 'react'
import { useApiKey } from '@/lib/store/apiKey'
import { BlackGoldButton } from '@/components/ui/BlackGoldButton'

interface Props {
  open: boolean
  onClose: () => void
}

export function ApiKeyModal({ open, onClose }: Props) {
  const { geminiKey, openaiKey, setKeys } = useApiKey()
  const [gemini, setGemini] = useState(geminiKey)
  const [openai, setOpenai] = useState(openaiKey)

  useEffect(() => {
    if (open) {
      setGemini(geminiKey)
      setOpenai(openaiKey)
    }
  }, [open, geminiKey, openaiKey])

  if (!open) return null

  const handleSave = () => {
    setKeys({ geminiKey: gemini.trim(), openaiKey: openai.trim() })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-bg-elevated border border-gold-deep max-w-lg w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-serif text-2xl text-gold-primary mb-2">API 키 설정</h2>
        <p className="text-xs text-text-muted leading-relaxed mb-6">
          API 키는 브라우저(localStorage)에만 저장되며 AICLab 서버로 전송되지 않습니다.
          호출은 사용자 브라우저 → AI 제공사로 직접 이루어집니다.
        </p>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-text-muted">Gemini API Key (우선)</span>
            <input
              type="password"
              value={gemini}
              onChange={(e) => setGemini(e.target.value)}
              className="mt-1 w-full bg-bg-card border border-border px-3 py-2 text-sm focus:border-gold-primary outline-none"
              placeholder="AIza..."
            />
          </label>
          <label className="block">
            <span className="text-sm text-text-muted">OpenAI API Key (fallback)</span>
            <input
              type="password"
              value={openai}
              onChange={(e) => setOpenai(e.target.value)}
              className="mt-1 w-full bg-bg-card border border-border px-3 py-2 text-sm focus:border-gold-primary outline-none"
              placeholder="sk-..."
            />
          </label>
        </div>
        <div className="flex gap-3 justify-end mt-8">
          <BlackGoldButton variant="secondary" onClick={onClose}>
            취소
          </BlackGoldButton>
          <BlackGoldButton onClick={handleSave}>저장</BlackGoldButton>
        </div>
      </div>
    </div>
  )
}
