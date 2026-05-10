'use client'
import { useState, DragEvent } from 'react'

interface Props {
  accept: string
  maxSizeMb: number
  onFile: (file: File) => void
}

export function FileDropzone({ accept, maxSizeMb, onFile }: Props) {
  const [drag, setDrag] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = (file: File) => {
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`${maxSizeMb}MB를 초과했습니다.`)
      return
    }
    setError(null)
    onFile(file)
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDrag(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault()
          setDrag(true)
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        className={`block border-2 border-dashed p-12 text-center cursor-pointer transition ${
          drag ? 'border-gold-primary bg-gold-primary/5' : 'border-border'
        }`}
      >
        <p className="text-text-muted">
          파일을 끌어놓거나 클릭하여 선택 ({accept}, 최대 {maxSizeMb}MB)
        </p>
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
          }}
        />
      </label>
      {error && <p className="text-error text-sm mt-2">{error}</p>}
    </div>
  )
}
