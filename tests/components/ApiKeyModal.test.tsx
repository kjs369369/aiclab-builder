import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ApiKeyModal } from '@/components/ApiKeyModal'
import { useApiKey } from '@/lib/store/apiKey'

describe('ApiKeyModal', () => {
  beforeEach(() => {
    localStorage.clear()
    useApiKey.setState({ geminiKey: '', openaiKey: '' })
  })

  it('open=false면 보이지 않음', () => {
    render(<ApiKeyModal open={false} onClose={() => {}} />)
    expect(screen.queryByText('API 키 설정')).not.toBeInTheDocument()
  })

  it('open=true면 Gemini/OpenAI 입력 두 개 표시', () => {
    render(<ApiKeyModal open={true} onClose={() => {}} />)
    expect(screen.getByLabelText(/Gemini/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/OpenAI/i)).toBeInTheDocument()
  })

  it('보안 안내문이 있다', () => {
    render(<ApiKeyModal open={true} onClose={() => {}} />)
    expect(
      screen.getByText(/AICLab 서버로 전송되지 않습니다/)
    ).toBeInTheDocument()
  })

  it('저장 클릭 시 onClose 호출', async () => {
    const onClose = vi.fn()
    render(<ApiKeyModal open={true} onClose={onClose} />)
    await userEvent.click(screen.getByRole('button', { name: '저장' }))
    expect(onClose).toHaveBeenCalled()
  })
})
