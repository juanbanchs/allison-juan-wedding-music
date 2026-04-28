import { tracks, heroPhoto } from './tracks'
import { SongCard } from './SongCard'
import { GlobalPlayer } from './GlobalPlayer'
import { usePlayback } from './usePlayback'

export default function App() {
  const player = usePlayback(tracks)

  return (
    <main className="relative">
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 pt-10 sm:pt-16 lg:pt-20">
          <div className="relative overflow-hidden rounded-[36px] shadow-[0_40px_80px_-30px_rgba(42,36,31,0.45)]">
            <img
              src={heroPhoto}
              alt="Allison and Juan"
              className="block h-[60vh] min-h-[460px] w-full object-cover sm:h-[72vh]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-cream)]/95" />
            <div className="absolute inset-x-0 bottom-0 px-6 pb-10 text-center sm:pb-14">
              <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.42em] text-[var(--color-ink-soft)]">
                A Wedding Remembrance
              </p>
              <h1 className="font-serif text-[clamp(3rem,9vw,7.5rem)] font-light leading-none tracking-tight text-[var(--color-ink)]">
                Allison <span className="italic text-[var(--color-rose)]">&amp;</span> Juan
              </h1>
              <div className="mx-auto mt-6 h-px w-16 bg-[var(--color-gold)]/60" />
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-2xl px-2 text-center sm:mt-20">
            <p className="font-serif text-xl italic leading-relaxed text-[var(--color-ink-soft)] sm:text-2xl">
              "Place me like a seal over your heart, like a seal on your arm;
              for love is as strong as death."
            </p>
            <p className="mt-3 font-sans text-xs uppercase tracking-[0.32em] text-[var(--color-gold)]">
              Song of Songs 8:6
            </p>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <header className="mb-10 text-center sm:mb-12">
          <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.42em] text-[var(--color-gold)]">
            The Music
          </p>
          <h2 className="font-serif text-4xl font-light tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Nine songs, one love story
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-sm leading-relaxed text-[var(--color-ink-soft)] sm:text-base">
            Juan's father, Rafael Banchs, created these tracks with the help of
            AI as a gift to us for our wedding. We hope you enjoy them as much
            as we did!
          </p>
        </header>

        <div className="mb-8 sm:mb-10">
          <GlobalPlayer
            tracks={tracks}
            state={{
              activeIndex: player.activeIndex,
              isPlaying: player.isPlaying,
              currentTime: player.currentTime,
              duration: player.duration,
              shuffle: player.shuffle,
            }}
            controls={{
              playIndex: player.playIndex,
              togglePlayPause: player.togglePlayPause,
              toggleShuffle: player.toggleShuffle,
              next: player.next,
              prev: player.prev,
              skipBy: player.skipBy,
              seekTo: player.seekTo,
            }}
          />
        </div>

        <div className="flex flex-col gap-5 sm:gap-6">
          {tracks.map((track, index) => {
            if (track.bonus) return null
            const isActive = player.activeIndex === index
            return (
              <SongCard
                key={track.id}
                track={track}
                index={index}
                isActive={isActive}
                isPlaying={isActive && player.isPlaying}
                currentTime={isActive ? player.currentTime : 0}
                duration={isActive ? player.duration : 0}
                onPlayClick={player.playIndex}
                onTogglePlay={player.togglePlayPause}
                onSeek={player.seekTo}
              />
            )
          })}

          {tracks.some((t) => t.bonus) && (
            <>
              <div className="my-2 flex items-center gap-3 sm:my-4">
                <div className="flex-1 border-t border-dashed border-[var(--color-gold)]/40" />
                <span className="font-sans text-[10px] uppercase tracking-[0.42em] text-[var(--color-gold)]">
                  Encore
                </span>
                <div className="flex-1 border-t border-dashed border-[var(--color-gold)]/40" />
              </div>
              <p className="mx-auto -mt-1 max-w-md text-center font-sans text-sm leading-relaxed text-[var(--color-ink-soft)] sm:text-base">
                Juan's dear friend and groomsman Justin Yeo, created a Chinese
                instrument version of one of Allison and Juan's favorite Spanish
                songs. Enjoy!
              </p>
            </>
          )}

          {tracks.map((track, index) => {
            if (!track.bonus) return null
            const isActive = player.activeIndex === index
            return (
              <SongCard
                key={track.id}
                track={track}
                index={index}
                isActive={isActive}
                isPlaying={isActive && player.isPlaying}
                currentTime={isActive ? player.currentTime : 0}
                duration={isActive ? player.duration : 0}
                onPlayClick={player.playIndex}
                onTogglePlay={player.togglePlayPause}
                onSeek={player.seekTo}
              />
            )
          })}
        </div>
      </section>

      <footer className="mx-auto max-w-3xl px-6 pb-16 text-center sm:pb-24">
        <div className="mx-auto h-px w-12 bg-[var(--color-gold)]/50" />
        <p className="mt-6 font-serif text-lg italic text-[var(--color-ink-soft)]">
          With love, from Allison &amp; Juan
        </p>
        <p className="mt-2 font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-ink-soft)]/70">
          Two become Juan
        </p>
      </footer>
    </main>
  )
}
