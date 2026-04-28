import { useState } from 'react'
import type { Track } from './tracks'
import { AudioPlayer } from './AudioPlayer'

type SongCardProps = {
  track: Track
  index: number
  isActive: boolean
  isPlaying: boolean
  currentTime: number
  duration: number
  onPlayClick: (index: number) => void
  onTogglePlay: () => void
  onSeek: (seconds: number) => void
}

export function SongCard({
  track,
  index,
  isActive,
  isPlaying,
  currentTime,
  duration,
  onPlayClick,
  onTogglePlay,
  onSeek,
}: SongCardProps) {
  const [showLyrics, setShowLyrics] = useState(false)

  const handlePlayClick = () => {
    if (isActive) onTogglePlay()
    else onPlayClick(index)
  }

  return (
    <article
      className={`group relative overflow-hidden rounded-[28px] border border-white/60 bg-white/55 p-5 backdrop-blur-xl transition-all duration-500 sm:p-7 ${
        isActive
          ? 'shadow-[0_24px_60px_-20px_rgba(181,138,93,0.45)] ring-1 ring-[var(--color-rose)]/40'
          : 'shadow-[0_12px_32px_-16px_rgba(42,36,31,0.18)] hover:shadow-[0_20px_48px_-18px_rgba(181,138,93,0.35)]'
      }`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
        <div className="relative shrink-0 self-start overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-rose-soft)]/30 to-transparent mix-blend-multiply" />
          <img
            src={track.photo}
            alt=""
            loading="lazy"
            className="block h-28 w-28 object-cover transition-transform duration-700 group-hover:scale-105 sm:h-32 sm:w-32"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 min-w-0">
          <header className="flex flex-col gap-1">
            <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-[var(--color-gold)]">
              Track {track.number}
            </span>
            <h3 className="font-serif text-2xl font-medium leading-tight text-[var(--color-ink)] sm:text-[28px]">
              {track.title}
              {track.movement && (
                <span className="ml-3 font-light italic text-[var(--color-ink-soft)]/75 sm:ml-4">
                  {track.movement}
                </span>
              )}
            </h3>
          </header>

          <AudioPlayer
            src={track.audioFile}
            isActive={isActive}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            onPlayClick={handlePlayClick}
            onSeek={onSeek}
          />

          {track.lyrics && (
            <button
              type="button"
              onClick={() => setShowLyrics((v) => !v)}
              className="self-start text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-rose)]"
            >
              {showLyrics ? '— Hide lyrics' : '+ Show lyrics'}
            </button>
          )}
        </div>
      </div>

      {track.lyrics && (
        <div
          className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out ${
            showLyrics ? 'mt-6 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-[var(--color-rose-soft)]/60 pt-6">
              <pre className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-[var(--color-ink-soft)] sm:text-base">
                {track.lyrics}
              </pre>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
