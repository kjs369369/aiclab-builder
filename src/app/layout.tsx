import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://builder.aiclab.kr'),
  title: {
    default: 'AI 자동화 진단 | AICLab Builder',
    template: '%s | AICLab Builder',
  },
  description:
    '반복 업무를 입력하세요. AI가 최적의 자동화 도구와 시간 절감 방안을 추천해드립니다.',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'AICLab Builder',
    url: 'https://builder.aiclab.kr/',
    title: 'AI 자동화 진단 — 당신의 업무를 AI로 바꾸세요',
    description:
      '반복 업무를 입력하세요. AI가 최적의 자동화 도구와 시간 절감 방안을 추천해드립니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI 자동화 진단 — AICLab Builder',
    description: '반복 업무를 AI로 자동화하세요.',
  },
  icons: { icon: '/favicon.ico' },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  )
}
