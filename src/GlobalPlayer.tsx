import { useRef } from 'react'
import type { Track } from './tracks'
import type { PlaybackControls, PlaybackState } from './usePlayback'

type GlobalPlayerProps = {
  tracks: Track[]
  state: PlaybackState
  controls: PlaybackControls
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function GlobalPlayer({ tracks, state, controls }: GlobalPlayerProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const { activeIndex, isPlaying, currentTime, duration, shuffle, playOnce } = state

  const activeTrack = activeIndex !== null ? tracks[activeIndex] : null
  const isIdle = activeIndex === null
  const progress = duration ? (currentTime / duration) * 100 : 0

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !duration) return
    const rect = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    controls.seekTo(ratio * duration)
  }

  const photo = activeTrack ? (
    <img
      src={activeTrack.photo}
      alt=""
      className="h-14 w-14 shrink-0 rounded-xl object-cover shadow-md sm:h-16 sm:w-16"
    />
  ) : (
    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[var(--color-rose-soft)]/40 text-[var(--color-gold)] sm:h-16 sm:w-16">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M9 17V5l12-2v12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6" cy="17" r="3" />
        <circle cx="18" cy="15" r="3" />
      </svg>
    </div>
  )

  const trackInfo = (
    <>
      <p className="truncate font-sans text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold)]">
        {isIdle ? 'Press play' : activeTrack!.bonus ? 'Encore' : `Track ${activeTrack!.number} of IX`}
      </p>
      <p className="truncate font-serif text-lg leading-tight text-[var(--color-ink)] sm:text-xl">
        {activeTrack ? (
          <>
            {activeTrack.title}
            {activeTrack.movement && (
              <span className="ml-2 font-light italic text-[var(--color-ink-soft)]/75">
                {activeTrack.movement}
              </span>
            )}
          </>
        ) : (
          'Play all'
        )}
      </p>
    </>
  )

  return (
    <section
      aria-label="Playback controls"
      className="relative overflow-hidden rounded-[28px] border border-white/60 bg-gradient-to-br from-white/80 to-[var(--color-cream-deep)]/80 p-5 shadow-[0_24px_60px_-30px_rgba(42,36,31,0.35)] backdrop-blur-xl sm:p-7"
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex items-center justify-center gap-4 sm:justify-between sm:gap-6">
          <div className="hidden min-w-0 items-center gap-4 sm:flex sm:flex-1">
            {photo}
            <div className="min-w-0 sm:w-[260px]">
              {trackInfo}
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
            <button
              type="button"
              onClick={controls.togglePlayOnce}
              aria-label={playOnce ? 'Disable play once' : 'Enable play once'}
              aria-pressed={playOnce}
              className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
                playOnce
                  ? 'bg-[var(--color-rose)]/15 text-[var(--color-rose)]'
                  : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]'
              }`}
            >
              <span className="font-sans text-[12px] font-semibold leading-none tracking-tight">
                1×
              </span>
            </button>

            <button
              type="button"
              onClick={controls.toggleShuffle}
              aria-label={shuffle ? 'Disable shuffle' : 'Enable shuffle'}
              aria-pressed={shuffle}
              className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
                shuffle
                  ? 'bg-[var(--color-rose)]/15 text-[var(--color-rose)]'
                  : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
                <line x1="4" y1="4" x2="9" y2="9" />
              </svg>
            </button>

            <button
              type="button"
              onClick={controls.prev}
              aria-label="Previous track"
              className="grid h-10 w-10 place-items-center rounded-full text-[var(--color-ink)] transition-transform hover:scale-105 hover:text-[var(--color-rose)] active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M6 5a1 1 0 0 1 2 0v14a1 1 0 0 1-2 0Zm12.5-.86a1 1 0 0 0-1.5.86v13.72a1 1 0 0 0 1.5.86l-9.5-6.86a1 1 0 0 1 0-1.72Z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => controls.skipBy(-15)}
              aria-label="Skip back 15 seconds"
              className="relative grid h-10 w-10 place-items-center rounded-full text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
                <polyline points="3 3 3 8 8 8" />
              </svg>
              <span className="absolute font-sans text-[8px] font-semibold tracking-tight">15</span>
            </button>

            <button
              type="button"
              onClick={controls.togglePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="grid h-14 w-14 place-items-center rounded-full bg-[var(--color-ink)] text-[var(--color-cream)] shadow-[0_10px_28px_-10px_rgba(42,36,31,0.6)] transition-all hover:scale-105 hover:bg-[var(--color-rose)] active:scale-95 sm:h-16 sm:w-16"
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 sm:h-7 sm:w-7">
                  <rect x="6" y="5" width="4" height="14" rx="1.5" />
                  <rect x="14" y="5" width="4" height="14" rx="1.5" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 translate-x-[1px] sm:h-7 sm:w-7">
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.06-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => controls.skipBy(15)}
              aria-label="Skip forward 15 seconds"
              className="relative grid h-10 w-10 place-items-center rounded-full text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 -scale-x-100">
                <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
                <polyline points="3 3 3 8 8 8" />
              </svg>
              <span className="absolute font-sans text-[8px] font-semibold tracking-tight">15</span>
            </button>

            <button
              type="button"
              onClick={controls.next}
              aria-label="Next track"
              className="grid h-10 w-10 place-items-center rounded-full text-[var(--color-ink)] transition-transform hover:scale-105 hover:text-[var(--color-rose)] active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M16 5a1 1 0 0 1 2 0v14a1 1 0 0 1-2 0Zm-10.5-.86a1 1 0 0 1 1.5.86v13.72a1 1 0 0 1-1.5.86l9.5-6.86a1 1 0 0 0 0-1.72Z" />
              </svg>
            </button>

            <div aria-hidden="true" className="h-9 w-9 shrink-0 sm:hidden" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 sm:hidden">
          {photo}
          <div className="min-w-0">
            {trackInfo}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-10 shrink-0 text-right font-sans text-[11px] tabular-nums text-[var(--color-ink-soft)]">
            {formatTime(currentTime)}
          </span>
          <div
            ref={trackRef}
            onClick={handleSeek}
            className="group relative h-1.5 flex-1 cursor-pointer rounded-full bg-[var(--color-rose-soft)]/60 transition-all hover:h-2"
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-rose)]"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[var(--color-ink)] opacity-0 shadow-md transition-opacity group-hover:opacity-100"
              style={{ left: `${progress}%` }}
            />
          </div>
          <span className="w-10 shrink-0 font-sans text-[11px] tabular-nums text-[var(--color-ink-soft)]">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </section>
  )
}
