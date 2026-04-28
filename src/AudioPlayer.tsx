import { useEffect, useRef, useState } from 'react'

type AudioPlayerProps = {
  src: string
  trackId: string
  activeTrackId: string | null
  onPlay: (id: string) => void
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function AudioPlayer({ src, trackId, activeTrackId, onPlay }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (activeTrackId !== trackId && isPlaying) {
      audioRef.current?.pause()
    }
  }, [activeTrackId, trackId, isPlaying])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      onPlay(trackId)
      audio.play().catch(() => undefined)
    } else {
      audio.pause()
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    const track = trackRef.current
    if (!audio || !track || !duration) return
    const rect = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * duration
    setCurrentTime(audio.currentTime)
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="flex items-center gap-4 sm:gap-5">
      <button
        type="button"
        onClick={togglePlay}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        className="group relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--color-ink)] text-[var(--color-cream)] shadow-[0_8px_24px_-8px_rgba(42,36,31,0.5)] transition-all duration-300 hover:scale-105 hover:bg-[var(--color-rose)] active:scale-95 sm:h-14 sm:w-14"
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-full bg-[var(--color-rose-soft)] transition-opacity duration-300 ${
            isHovered ? 'opacity-30' : 'opacity-0'
          }`}
        />
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-5 w-5 sm:h-6 sm:w-6">
            <rect x="6" y="5" width="4" height="14" rx="1.5" />
            <rect x="14" y="5" width="4" height="14" rx="1.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-5 w-5 translate-x-[1px] sm:h-6 sm:w-6">
            <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.06-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
          </svg>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-2">
        <div
          ref={trackRef}
          onClick={handleSeek}
          className="group relative h-1.5 cursor-pointer rounded-full bg-[var(--color-rose-soft)]/60 transition-all hover:h-2"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-rose)] transition-all"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[var(--color-ink)] opacity-0 shadow-md transition-opacity group-hover:opacity-100"
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between font-sans text-[11px] tracking-wide text-[var(--color-ink-soft)] tabular-nums sm:text-xs">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      />
    </div>
  )
}
