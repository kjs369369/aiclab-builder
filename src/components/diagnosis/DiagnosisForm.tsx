'use client'
import { useState, FormEvent } from 'react'
import { DiagnosisInput } from '@/types/diagnosis'
import { BlackGoldButton } from '@/components/ui/BlackGoldButton'
import { EditorialCard } from '@/components/ui/EditorialCard'

interface Props {
  onSubmit: (input: DiagnosisInput) => void
  loading: boolean
}

export function DiagnosisForm({ onSubmit, loading }: Props) {
  const [taskDescription, setTask] = useState('')
  const [jobRole, setJob] = useState('')
  const [frequency, setFreq] = useState<DiagnosisInput['frequency']>('weekly')

  const valid = taskDescription.trim() && jobRole.trim()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return
    onSubmit({ taskDescription, jobRole, frequency })
  }

  return (
    <EditorialCard>
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block">
          <span className="text-sm text-text-muted">업무 설명 *</span>
          <textarea
            value={taskDescription}
            onChange={(e) => setTask(e.target.value)}
            rows={4}
            className="mt-2 w-full bg-bg-base border border-border px-3 py-2 text-sm focus:border-gold-primary outline-none"
            placeholder="예: 매주 월요일에 엑셀 보고서를 모아서 부서별로 정리"
          />
        </label>
        <label className="block">
          <span className="text-sm text-text-muted">직무 / 업종 *</span>
          <input
            value={jobRole}
            onChange={(e) => setJob(e.target.value)}
            className="mt-2 w-full bg-bg-base border border-border px-3 py-2 text-sm focus:border-gold-primary outline-none"
            placeholder="예: 마케팅, HR, 개발"
          />
        </label>
        <label className="block">
          <span className="text-sm text-text-muted">반복 빈도</span>
          <select
            value={frequency}
            onChange={(e) =>
              setFreq(e.target.value as DiagnosisInput['frequency'])
            }
            className="mt-2 w-full bg-bg-base border border-border px-3 py-2 text-sm focus:border-gold-primary outline-none"
          >
            <option value="daily">매일</option>
            <option value="weekly">매주</option>
            <option value="monthly">매월</option>
          </select>
        </label>
        <BlackGoldButton type="submit" disabled={!valid || loading}>
          {loading ? '분석 중...' : '진단 시작'}
        </BlackGoldButton>
      </form>
    </EditorialCard>
  )
}
