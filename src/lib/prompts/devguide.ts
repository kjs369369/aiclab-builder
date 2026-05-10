export function buildDevGuidePrompt(report: string): string {
  return `당신은 개발자 멘토입니다. 아래 진단보고서를 바탕으로 이 웹앱을 처음부터 만들기 위한 단계별 개발 지침서를 작성하세요.

[진단보고서]
${report}

다음 형식의 마크다운으로 작성:
# 개발 지침서

## Phase 1: 기획 및 환경 설정
## Phase 2: 백엔드 구현
## Phase 3: 프론트엔드 구현
## Phase 4: 통합 및 테스트
## Phase 5: 배포

각 Phase는 구체적인 작업 항목과 추천 라이브러리, 명령어를 포함.`
}
