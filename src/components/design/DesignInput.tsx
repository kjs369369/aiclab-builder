'use client'
import { useEffect, useState } from 'react'
import { useDiagnosisStore } from '@/lib/store/diagnosis'
import { FileDropzone } from '@/components/ui/FileDropzone'
import { BlackGoldButton } from '@/components/ui/BlackGoldButton'
import { EditorialCard } from '@/components/ui/EditorialCard'
import { extractPdfText } from '@/lib/pdf/extractText'

interface Props {
  onReady: (text: string) => void
  loading: boolean
}

export function DesignInput({ onReady, loading }: Props) {
  const { report } = useDiagnosisStore()
  const [text, setText] = useState('')
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (report?.rawMarkdown) setText(report.rawMarkdown)
  }, [report])

  const handleFile = async (file: File) => {
    setErr(null)
    try {
      if (file.name.endsWith('.pdf')) {
        setText(await extractPdfText(file))
      } else {
        setText(await file.text())
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : '파일 처리 실패')
    }
  }

  const handleStart = () => {
    if (!text.trim()) {
      setErr('보고서 내용이 비어있습니다.')
      return
    }
    onReady(text)
  }

  return (
    <div className="space-y-6">
      {report && (
        <EditorialCard className="border-gold-deep">
          <p className="text-sm text-gold-bright">
            ✨ 메인 페이지에서 생성된 진단보고서가 자동으로 불러와졌습니다.
          </p>
          <p className="text-xs text-text-muted mt-2">{report.summary}</p>
        </EditorialCard>
      )}

      <FileDropzone accept=".md,.txt,.pdf" maxSizeMb={10} onFile={handleFile} />

      <details className="text-sm text-text-muted">
        <summary className="cursor-pointer hover:text-gold-bright">
          또는 샘플 보고서 다운로드
        </summary>
        <div className="mt-2 space-x-3">
          <a href="/samples/sample-1.md" download className="hover:text-gold-bright">
            샘플 1 (마케팅)
          </a>
          <a href="/samples/sample-2.md" download className="hover:text-gold-bright">
            샘플 2 (HR)
          </a>
          <a href="/samples/sample-3.md" download className="hover:text-gold-bright">
            샘플 3 (개발)
          </a>
        </div>
      </details>

      {text && (
        <EditorialCard>
          <p className="text-sm text-text-muted mb-2">현재 입력 내용 미리보기</p>
          <pre className="whitespace-pre-wrap text-xs max-h-40 overflow-y-auto">
            {text.slice(0, 800)}
            {text.length > 800 && '...'}
          </pre>
        </EditorialCard>
      )}

      {err && <p className="text-error text-sm">{err}</p>}

      <BlackGoldButton onClick={handleStart} disabled={!text.trim() || loading}>
        {loading ? '생성 중...' : '설계도 + 개발지침 생성'}
      </BlackGoldButton>
    </div>
  )
}
