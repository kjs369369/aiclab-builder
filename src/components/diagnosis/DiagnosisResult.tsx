'use client'
import { useRouter } from 'next/navigation'
import { DiagnosisReport } from '@/types/diagnosis'
import { EditorialCard } from '@/components/ui/EditorialCard'
import { BlackGoldButton } from '@/components/ui/BlackGoldButton'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { downloadMarkdown } from '@/lib/download'

interface Props {
  report: DiagnosisReport
}

export function DiagnosisResult({ report }: Props) {
  const router = useRouter()
  return (
    <div className="space-y-8 mt-8">
      <EditorialCard>
        <h2 className="font-serif text-3xl text-gold-primary mb-4">진단 보고서</h2>
        <p className="leading-relaxed">{report.summary}</p>
        <p className="mt-6 text-gold-bright">
          예상 시간 절감: 월 {report.timeSavingHoursPerMonth} 시간
        </p>
      </EditorialCard>

      {report.recommendedTools.length > 0 && (
        <EditorialCard>
          <h3 className="text-xl mb-4 text-gold-primary">추천 AI 도구</h3>
          <ul className="space-y-3">
            {report.recommendedTools.map((t, i) => (
              <li key={i} className="border-l-2 border-gold-deep pl-4">
                <p className="font-medium">
                  {t.name}{' '}
                  <span className="text-text-muted text-sm">· {t.category}</span>
                </p>
                <p className="text-sm text-text-muted mt-1">{t.reason}</p>
                {t.url && (
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-gold-bright hover:underline"
                  >
                    {t.url}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </EditorialCard>
      )}

      {report.automationFlow.length > 0 && (
        <EditorialCard>
          <h3 className="text-xl mb-4 text-gold-primary">자동화 흐름</h3>
          <ol className="space-y-2 list-decimal list-inside">
            {report.automationFlow.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </EditorialCard>
      )}

      {report.coachComment && (
        <EditorialCard>
          <h3 className="text-xl mb-4 text-gold-primary">코치 코멘트</h3>
          <p className="leading-relaxed text-text-muted">{report.coachComment}</p>
        </EditorialCard>
      )}

      <GoldDivider />

      <div className="flex flex-wrap gap-3 justify-end">
        <BlackGoldButton
          variant="secondary"
          onClick={() =>
            downloadMarkdown(`diagnosis-${Date.now()}.md`, report.rawMarkdown)
          }
        >
          MD 다운로드
        </BlackGoldButton>
        <BlackGoldButton onClick={() => router.push('/design?from=diagnosis')}>
          ⭐ 이 보고서로 설계도 만들기
        </BlackGoldButton>
      </div>
    </div>
  )
}
