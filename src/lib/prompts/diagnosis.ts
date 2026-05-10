import { DiagnosisInput, DiagnosisReport } from '@/types/diagnosis'

export function buildDiagnosisPrompt(input: DiagnosisInput): string {
  return `당신은 AI 자동화 컨설턴트입니다. 아래 사용자의 반복 업무를 분석하고 자동화 방안을 추천하세요.

[업무 설명]
${input.taskDescription}

[직무/업종]
${input.jobRole}

[반복 빈도]
${input.frequency}

다음 JSON 형식으로 한국어로 답변하세요. 코드블록(\`\`\`json) 안에 JSON만 작성:

{
  "summary": "한 문단 요약",
  "recommendedTools": [
    { "name": "도구명", "category": "분류", "reason": "추천 이유", "url": "공식 URL (선택)" }
  ],
  "timeSavingHoursPerMonth": 숫자,
  "automationFlow": ["1단계", "2단계", "3단계", "4단계"],
  "coachComment": "전문가 코멘트 한 문단"
}`
}

export function parseDiagnosisResponse(raw: string): DiagnosisReport {
  const match = raw.match(/```json\s*([\s\S]*?)```/)
  const createdAt = new Date().toISOString()
  const fallback: DiagnosisReport = {
    summary: raw.slice(0, 200),
    recommendedTools: [],
    timeSavingHoursPerMonth: 0,
    automationFlow: [],
    coachComment: '',
    rawMarkdown: raw,
    createdAt,
  }
  if (!match) return fallback
  try {
    const parsed = JSON.parse(match[1])
    return {
      summary: parsed.summary ?? '',
      recommendedTools: parsed.recommendedTools ?? [],
      timeSavingHoursPerMonth: parsed.timeSavingHoursPerMonth ?? 0,
      automationFlow: parsed.automationFlow ?? [],
      coachComment: parsed.coachComment ?? '',
      rawMarkdown: raw,
      createdAt,
    }
  } catch {
    return fallback
  }
}
