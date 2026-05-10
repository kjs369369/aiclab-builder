import { callGemini } from './gemini'
import { callOpenAI } from './openai'

interface Args {
  prompt: string
  keys: { gemini: string; openai: string }
}

export async function generateText({ prompt, keys }: Args): Promise<string> {
  if (keys.gemini) {
    try {
      return await callGemini(prompt, keys.gemini)
    } catch (err) {
      if (!keys.openai) throw err
    }
  }
  if (keys.openai) {
    return await callOpenAI(prompt, keys.openai)
  }
  throw new Error('API 키가 설정되지 않았습니다.')
}
