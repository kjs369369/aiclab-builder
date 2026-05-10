'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DiagnosisForm } from '@/components/diagnosis/DiagnosisForm'
import { DiagnosisResult } from '@/components/diagnosis/DiagnosisResult'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useApiKey } from '@/lib/store/apiKey'
import { useDiagnosisStore } from '@/lib/store/diagnosis'
import { generateText } from '@/lib/ai/client'
import {
  buildDiagnosisPrompt,
  parseDiagnosisResponse,
} from '@/lib/prompts/diagnosis'
import { DiagnosisInput } from '@/types/diagnosis'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { geminiKey, openaiKey, hasAnyKey } = useApiKey()
  const { report, setReport } = useDiagnosisStore()

  const handleSubmit = async (input: DiagnosisInput) => {
    if (!hasAnyKey()) {
      setError('먼저 우측 상단 [API 키] 버튼에서 키를 입력하세요.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const raw = await generateText({
        prompt: buildDiagnosisPrompt(input),
        keys: { gemini: geminiKey, openai: openaiKey },
      })
      setReport(parseDiagnosisResponse(raw))
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
            AICLAB BUILDER
          </p>
          <h1 className="font-serif text-5xl leading-tight">
            반복 업무를 입력하세요.
            <br />
            <span className="text-gold-primary">AI가 자동화 도구를 추천</span>합니다.
          </h1>
          <p className="mt-6 text-text-muted leading-relaxed">
            업무 설명을 적으면 Gemini/OpenAI가 분석해 시간 절감 방안과 추천 도구,
            자동화 흐름을 제안합니다. 모든 호출은 사용자 브라우저에서 직접
            이루어집니다.
          </p>
        </section>

        <DiagnosisForm onSubmit={handleSubmit} loading={loading} />

        {error && (
          <p className="mt-6 text-error border border-error/40 px-4 py-3">
            {error}
          </p>
        )}
        {loading && <LoadingSpinner label="AI가 분석 중입니다..." />}
        {report && !loading && <DiagnosisResult report={report} />}
      </main>
      <Footer />
    </>
  )
}
