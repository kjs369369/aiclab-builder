'use client'

interface PdfTextItem {
  str: string
}

export async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import('pdfjs-dist')
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
  const buf = await file.arrayBuffer()
  const pdf = await pdfjs.getDocument({ data: buf }).promise
  const parts: string[] = []
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const tc = await page.getTextContent()
    parts.push((tc.items as PdfTextItem[]).map((it) => it.str).join(' '))
  }
  const text = parts.join('\n\n').trim()
  if (!text) {
    throw new Error('텍스트를 추출할 수 없는 PDF입니다 (이미지 PDF는 미지원).')
  }
  return text
}
