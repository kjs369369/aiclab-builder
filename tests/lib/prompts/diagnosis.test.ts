import { describe, it, expect } from 'vitest'
import {
  buildDiagnosisPrompt,
  parseDiagnosisResponse,
} from '@/lib/prompts/diagnosis'

describe('buildDiagnosisPrompt', () => {
  it('입력 필드를 모두 포함한다', () => {
    const p = buildDiagnosisPrompt({
      taskDescription: '엑셀 보고서 정리',
      jobRole: '마케팅',
      frequency: 'weekly',
    })
    expect(p).toContain('엑셀 보고서 정리')
    expect(p).toContain('마케팅')
    expect(p).toContain('weekly')
    expect(p).toMatch(/JSON/i)
  })
})

describe('parseDiagnosisResponse', () => {
  it('JSON 코드블록 안의 응답을 파싱', () => {
    const raw = `결과:\n\`\`\`json\n${JSON.stringify({
      summary: 's',
      recommendedTools: [{ name: 'X', category: 'c', reason: 'r' }],
      timeSavingHoursPerMonth: 5,
      automationFlow: ['1'],
      coachComment: 'cc',
    })}\n\`\`\``
    const r = parseDiagnosisResponse(raw)
    expect(r.summary).toBe('s')
    expect(r.recommendedTools[0].name).toBe('X')
    expect(r.timeSavingHoursPerMonth).toBe(5)
    expect(r.rawMarkdown).toBe(raw)
  })

  it('JSON이 없으면 raw 그대로 + 빈 필드', () => {
    const raw = '그냥 텍스트'
    const r = parseDiagnosisResponse(raw)
    expect(r.rawMarkdown).toBe(raw)
    expect(r.recommendedTools).toEqual([])
  })
})
