export function MarkdownViewer({ content }: { content: string }) {
  return (
    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-text-primary">
      {content}
    </pre>
  )
}
