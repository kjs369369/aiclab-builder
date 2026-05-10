'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DesignInput } from '@/components/design/DesignInput'
import { DesignResult } from '@/components/design/DesignResult'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useApiKey } from '@/lib/store/apiKey'
import { generateText } from '@/lib/ai/client'
import { buildDesignPrompt } from '@/lib/prompts/design'
import { buildDevGuidePrompt } from '@/lib/prompts/devguide'
import { DesignArtifact } from '@/types/design'

export default function DesignPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [artifact, setArtifact] = useState<DesignArtifact | null>(null)
  const { geminiKey, openaiKey, hasAnyKey } = useApiKey()

  const handleStart = async (text: string) => {
    if (!hasAnyKey()) {
      setError('먼저 우측 상단 [API 키] 버튼에서 키를 입력하세요.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const [blueprint, devGuide] = await Promise.all([
        generateText({
          prompt: buildDesignPrompt(text),
          keys: { gemini: geminiKey, openai: openaiKey },
        }),
        generateText({
          prompt: buildDevGuidePrompt(text),
          keys: { gemini: geminiKey, openai: openaiKey },
        }),
      ])
      setArtifact({ blueprint, devGuide, createdAt: new Date().toISOString() })
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <section className="mb-12">
          <p className="font-serif text-gold-primary text-sm tracking-widest mb-3">
            DESIGN GENERATOR
          </p>
          <h1 className="font-serif text-5xl leading-tight">
            진단보고서를 업로드하면
            <br />
            <span className="text-gold-primary">웹앱 설계도와 개발 지침서</span>를
            만듭니다.
          </h1>
          <p className="mt-6 text-text-muted leading-relaxed">
            마크다운/텍스트/PDF 업로드 또는 메인 페이지에서 자동 전달. 설계도와
            개발지침서가 동시 생성되어 각 탭에서 다운로드할 수 있습니다.
          </p>
        </section>

        <DesignInput onReady={handleStart} loading={loading} />

        {error && (
          <p className="mt-6 text-error border border-error/40 px-4 py-3">
            {error}
          </p>
        )}
        {loading && (
          <LoadingSpinner label="설계도와 개발 지침서를 동시에 생성 중..." />
        )}
        {artifact && !loading && <DesignResult artifact={artifact} />}
      </main>
      <Footer />
    </>
  )
}
