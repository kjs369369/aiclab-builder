import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AICLab Builder — 웹앱 설계도 생성'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0A0A0A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: '0.3em',
            color: '#C9A96E',
            marginBottom: 32,
          }}
        >
          DESIGN GENERATOR
        </div>
        <div
          style={{
            fontSize: 80,
            color: '#F5F1E8',
            lineHeight: 1.15,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>진단보고서 →</div>
          <div>
            <span style={{ color: '#C9A96E' }}>웹앱 설계도</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            height: 1,
            width: 320,
            background: '#C9A96E',
          }}
        />
        <div style={{ marginTop: 24, fontSize: 24, color: '#8A8378' }}>
          AICLab Builder · 개발 지침서까지 한 번에
        </div>
      </div>
    ),
    { ...size }
  )
}
