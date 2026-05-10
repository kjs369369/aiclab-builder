import { test, expect } from '@playwright/test'

test('메인에서 만든 진단보고서가 /design에서 자동 표시', async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem(
      'aiclab-builder-diagnosis',
      JSON.stringify({
        state: {
          report: {
            summary: 'E2E 테스트 보고서 요약',
            recommendedTools: [],
            timeSavingHoursPerMonth: 5,
            automationFlow: ['수집', '정리'],
            coachComment: '',
            rawMarkdown: '# 보고서',
            createdAt: '2026-05-11',
          },
        },
        version: 0,
      })
    )
  })

  await page.goto('/design')
  await expect(
    page.getByText('메인 페이지에서 생성된 진단보고서가 자동으로 불러와졌습니다.')
  ).toBeVisible()
  await expect(page.getByText('E2E 테스트 보고서 요약')).toBeVisible()
})

test('홈페이지에 진단 폼이 표시된다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByLabel(/업무 설명/)).toBeVisible()
  await expect(
    page.getByRole('button', { name: /진단 시작/ })
  ).toBeVisible()
})
