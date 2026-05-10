import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { DiagnosisForm } from '@/components/diagnosis/DiagnosisForm'

describe('DiagnosisForm', () => {
  it('빈 입력으로 제출하면 onSubmit 안 호출', async () => {
    const onSubmit = vi.fn()
    render(<DiagnosisForm onSubmit={onSubmit} loading={false} />)
    await userEvent.click(screen.getByRole('button', { name: /진단 시작/ }))
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('모든 필드 입력 후 제출 시 onSubmit 호출', async () => {
    const onSubmit = vi.fn()
    render(<DiagnosisForm onSubmit={onSubmit} loading={false} />)
    await userEvent.type(screen.getByLabelText(/업무 설명/), '엑셀 정리')
    await userEvent.type(screen.getByLabelText(/직무/), '마케팅')
    await userEvent.click(screen.getByRole('button', { name: /진단 시작/ }))
    expect(onSubmit).toHaveBeenCalledWith({
      taskDescription: '엑셀 정리',
      jobRole: '마케팅',
      frequency: 'weekly',
    })
  })

  it('loading=true면 버튼 비활성화', () => {
    render(<DiagnosisForm onSubmit={() => {}} loading={true} />)
    expect(screen.getByRole('button', { name: /진단|분석/ })).toBeDisabled()
  })
})
