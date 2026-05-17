import { DiagnosisInput, DiagnosisReport } from '@/types/diagnosis'

export function buildDiagnosisPrompt(input: DiagnosisInput): string {
  return `당신은 AI 자동화 컨설턴트입니다. 아래 사용자의 반복 업무를 분석하고 자동화 방안을 추천하세요.

[업무 설명]
${input.taskDescription}

[직무/업종]
${input.jobRole}

[반복 빈도]
${input.frequency}

[도구 추천 기준 — 반드시 준수]
- recommendedTools 항목에는 **AI 어시스턴트·코딩 에이전트만** 포함합니다. 업무 성격에 맞게 다음 도구들 중에서 선택하세요:
  - Claude Code (Anthropic, 터미널 코딩 에이전트)
  - Claude Cowork / Projects (Anthropic, 문서·지식 공동작업)
  - OpenAI Codex (코드 자동화 에이전트)
  - ChatGPT / GPTs (OpenAI, 맞춤형 GPT)
  - Google Gemini Gems (구글, 맞춤형 어시스턴트)
  - 기타 LLM 기반 에이전트/어시스턴트 (Cursor, Cline, Aider 등)
- **자피어(Zapier), n8n, 메이크(Make/Integromat) 등 워크플로우 자동화 플랫폼은 recommendedTools 목록에 절대 넣지 마세요.** 사용자는 이런 도구를 주력으로 사용하지 않습니다.
- 예외: 외부 시스템(웹훅·스케줄러·SaaS 트리거)이 반드시 필요한 경우에 한해, coachComment 마지막에 "참고: n8n으로 보조 트리거 가능" 식으로 **한 줄만** 언급할 수 있습니다. recommendedTools에는 넣지 않습니다.
- automationFlow는 위 AI 도구들을 사용해 사용자가 직접 실행하는 단계로 구성하세요.
- 각 도구의 reason에는 "이 업무의 어떤 부분을 어떻게 해결하는지" 구체적으로 적습니다.

다음 JSON 형식으로 한국어로 답변하세요. 코드블록(\`\`\`json) 안에 JSON만 작성:

{
  "summary": "한 문단 요약",
  "recommendedTools": [
    { "name": "도구명", "category": "AI 어시스턴트 | 코딩 에이전트", "reason": "추천 이유", "url": "공식 URL (선택)" }
  ],
  "timeSavingHoursPerMonth": 숫자,
  "automationFlow": ["1단계", "2단계", "3단계", "4단계"],
  "coachComment": "전문가 코멘트 한 문단 (외부 트리거가 꼭 필요하면 마지막에 'n8n 참고' 한 줄만 추가 가능)"
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
