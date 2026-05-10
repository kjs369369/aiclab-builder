import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { BlackGoldButton } from '@/components/ui/BlackGoldButton'

describe('BlackGoldButton', () => {
  it('primary variant은 골드 배경 + 블랙 텍스트', () => {
    render(<BlackGoldButton variant="primary">시작</BlackGoldButton>)
    const btn = screen.getByRole('button', { name: '시작' })
    expect(btn).toHaveClass('bg-gold-primary', 'text-bg-base')
  })

  it('secondary variant은 골드 보더 + 골드 텍스트', () => {
    render(<BlackGoldButton variant="secondary">취소</BlackGoldButton>)
    const btn = screen.getByRole('button', { name: '취소' })
    expect(btn).toHaveClass('border', 'border-gold-primary', 'text-gold-primary')
  })

  it('disabled 상태에서 클릭 안 됨', async () => {
    const onClick = vi.fn()
    render(
      <BlackGoldButton onClick={onClick} disabled>
        비활성
      </BlackGoldButton>
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
