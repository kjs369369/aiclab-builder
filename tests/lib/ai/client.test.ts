import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { generateText } from '@/lib/ai/client'

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('AI client fallback', () => {
  it('Gemini 성공 시 OpenAI 호출 안 함', async () => {
    let openaiCalled = false
    server.use(
      http.post(/generativelanguage\.googleapis\.com/, () =>
        HttpResponse.json({
          candidates: [{ content: { parts: [{ text: 'gemini OK' }] } }],
        })
      ),
      http.post(/api\.openai\.com/, () => {
        openaiCalled = true
        return HttpResponse.json({})
      })
    )
    const out = await generateText({
      prompt: 'hi',
      keys: { gemini: 'g', openai: 'o' },
    })
    expect(out).toBe('gemini OK')
    expect(openaiCalled).toBe(false)
  })

  it('Gemini 실패 시 OpenAI로 fallback', async () => {
    server.use(
      http.post(/generativelanguage\.googleapis\.com/, () =>
        HttpResponse.json({ error: 'rate limit' }, { status: 429 })
      ),
      http.post(/api\.openai\.com/, () =>
        HttpResponse.json({
          choices: [{ message: { content: 'openai OK' } }],
        })
      )
    )
    const out = await generateText({
      prompt: 'hi',
      keys: { gemini: 'g', openai: 'o' },
    })
    expect(out).toBe('openai OK')
  })

  it('Gemini 키만 있으면 fallback 시도 안 하고 에러', async () => {
    server.use(
      http.post(/generativelanguage\.googleapis\.com/, () =>
        HttpResponse.json({ error: 'fail' }, { status: 500 })
      )
    )
    await expect(
      generateText({ prompt: 'hi', keys: { gemini: 'g', openai: '' } })
    ).rejects.toThrow()
  })
})
