import { describe, it, expect, beforeEach } from 'vitest'
import { useDiagnosisStore } from '@/lib/store/diagnosis'
import { DiagnosisReport } from '@/types/diagnosis'

const sample: DiagnosisReport = {
  summary: '테스트',
  recommendedTools: [],
  timeSavingHoursPerMonth: 10,
  automationFlow: ['a'],
  coachComment: 'c',
  rawMarkdown: '# r',
  createdAt: '2026-05-11',
}

describe('useDiagnosisStore', () => {
  beforeEach(() => {
    sessionStorage.clear()
    useDiagnosisStore.getState().clear()
  })

  it('초기에는 report가 null', () => {
    expect(useDiagnosisStore.getState().report).toBeNull()
  })

  it('setReport로 저장 가능', () => {
    useDiagnosisStore.getState().setReport(sample)
    expect(useDiagnosisStore.getState().report).toEqual(sample)
  })

  it('clear로 초기화', () => {
    useDiagnosisStore.getState().setReport(sample)
    useDiagnosisStore.getState().clear()
    expect(useDiagnosisStore.getState().report).toBeNull()
  })
})
