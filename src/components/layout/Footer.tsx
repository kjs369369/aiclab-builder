import { GoldDivider } from '@/components/ui/GoldDivider'

export function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 pb-16">
      <GoldDivider />
      <div className="grid md:grid-cols-2 gap-8 text-sm text-text-muted">
        <div>
          <p className="font-serif text-lg text-gold-primary mb-2">KAEA & AICLab</p>
          <p>대표 김진수</p>
          <p className="mt-2">서울특별시 서초구 서초중앙로2길 35 (서초동)</p>
          <p>010-8921-9536 · info@aiclab2020.com</p>
          <p>
            홈페이지:{' '}
            <a
              href="https://kimjinsoo.vercel.app/"
              className="hover:text-gold-bright transition"
              target="_blank"
              rel="noreferrer"
            >
              kimjinsoo.vercel.app
            </a>
          </p>
        </div>
        <div className="md:text-right">
          <p>© 2026 AICLab. AI builder by KAEA.</p>
          <p className="mt-2 text-xs leading-relaxed">
            이 도구는 사용자 브라우저에서 직접 AI를 호출하며,
            <br />
            입력 내용은 AICLab 서버에 저장되지 않습니다.
          </p>
        </div>
      </div>
    </footer>
  )
}
