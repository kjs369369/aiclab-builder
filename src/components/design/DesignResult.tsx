'use client'
import { useState } from 'react'
import { DesignArtifact } from '@/types/design'
import { EditorialCard } from '@/components/ui/EditorialCard'
import { BlackGoldButton } from '@/components/ui/BlackGoldButton'
import { MarkdownViewer } from '@/components/ui/MarkdownViewer'
import { downloadMarkdown } from '@/lib/download'

type Tab = 'blueprint' | 'devGuide'

export function DesignResult({ artifact }: { artifact: DesignArtifact }) {
  const [tab, setTab] = useState<Tab>('blueprint')
  const current = tab === 'blueprint' ? artifact.blueprint : artifact.devGuide

  return (
    <div className="mt-8">
      <div className="flex gap-2 border-b border-border">
        {(['blueprint', 'devGuide'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm transition ${
              tab === t
                ? 'text-gold-primary border-b-2 border-gold-primary'
                : 'text-text-muted'
            }`}
          >
            {t === 'blueprint' ? '설계도' : '개발 지침서'}
          </button>
        ))}
      </div>

      <EditorialCard className="mt-4">
        <MarkdownViewer content={current} />
      </EditorialCard>

      <div className="flex gap-3 justify-end mt-6">
        <BlackGoldButton
          variant="secondary"
          onClick={() => downloadMarkdown(`${tab}-${Date.now()}.md`, current)}
        >
          현재 탭 MD 다운로드
        </BlackGoldButton>
        <BlackGoldButton
          onClick={() => {
            downloadMarkdown(`blueprint-${Date.now()}.md`, artifact.blueprint)
            downloadMarkdown(`devguide-${Date.now()}.md`, artifact.devGuide)
          }}
        >
          전체 다운로드 (2개 파일)
        </BlackGoldButton>
      </div>
    </div>
  )
}
