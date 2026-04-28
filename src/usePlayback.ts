import { useCallback, useEffect, useRef, useState } from 'react'
import type { Track } from './tracks'

export type PlaybackControls = {
  playIndex: (index: number) => void
  togglePlayPause: () => void
  toggleShuffle: () => void
  next: () => void
  prev: () => void
  skipBy: (seconds: number) => void
  seekTo: (seconds: number) => void
}

export type PlaybackState = {
  activeIndex: number | null
  isPlaying: boolean
  currentTime: number
  duration: number
  shuffle: boolean
}

function buildShuffleOrder(length: number, startIdx: number): number[] {
  const others: number[] = []
  for (let i = 0; i < length; i++) {
    if (i !== startIdx) others.push(i)
  }
  for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[others[i], others[j]] = [others[j], others[i]]
  }
  return [startIdx, ...others]
}

export function usePlayback(tracks: Track[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  if (!audioRef.current) {
    audioRef.current = typeof Audio !== 'undefined' ? new Audio() : null
  }

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [shuffle, setShuffle] = useState(false)

  const tracksRef = useRef(tracks)
  tracksRef.current = tracks

  const activeIndexRef = useRef<number | null>(null)
  activeIndexRef.current = activeIndex

  const shuffleRef = useRef(shuffle)
  shuffleRef.current = shuffle

  const shuffleOrderRef = useRef<number[]>([])
  const shufflePositionRef = useRef(0)

  const playIndex = useCallback((index: number) => {
    const audio = audioRef.current
    if (!audio) return
    const list = tracksRef.current
    if (index < 0 || index >= list.length) return

    if (shuffleRef.current) {
      const order = shuffleOrderRef.current
      const pos = order.indexOf(index)
      if (pos >= 0) {
        shufflePositionRef.current = pos
      } else {
        shuffleOrderRef.current = buildShuffleOrder(list.length, index)
        shufflePositionRef.current = 0
      }
    }

    const target = list[index]
    const targetSrc = new URL(target.audioFile, window.location.href).toString()
    if (audio.src !== targetSrc) {
      audio.src = target.audioFile
      setDuration(0)
      setCurrentTime(0)
    }
    setActiveIndex(index)
    audio.play().catch(() => undefined)
  }, [])

  const next = useCallback(() => {
    const list = tracksRef.current
    if (list.length === 0) return
    const current = activeIndexRef.current
    if (shuffleRef.current) {
      let order = shuffleOrderRef.current
      if (order.length === 0) {
        const startIdx = current ?? 0
        order = buildShuffleOrder(list.length, startIdx)
        shuffleOrderRef.current = order
        shufflePositionRef.current = 0
      }
      const newPos = (shufflePositionRef.current + 1) % order.length
      shufflePositionRef.current = newPos
      playIndex(order[newPos])
    } else {
      const nextIdx = current === null ? 0 : (current + 1) % list.length
      playIndex(nextIdx)
    }
  }, [playIndex])

  const prev = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }
    const list = tracksRef.current
    const current = activeIndexRef.current
    if (shuffleRef.current) {
      const order = shuffleOrderRef.current
      if (order.length === 0) return
      const newPos = (shufflePositionRef.current - 1 + order.length) % order.length
      shufflePositionRef.current = newPos
      playIndex(order[newPos])
    } else {
      const prevIdx = current === null ? 0 : (current - 1 + list.length) % list.length
      playIndex(prevIdx)
    }
  }, [playIndex])

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (activeIndexRef.current === null) {
      playIndex(0)
      return
    }
    if (audio.paused) audio.play().catch(() => undefined)
    else audio.pause()
  }, [playIndex])

  const skipBy = useCallback((seconds: number) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds))
  }, [])

  const seekTo = useCallback((seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = seconds
  }, [])

  const toggleShuffle = useCallback(() => {
    setShuffle((s) => {
      const newVal = !s
      if (newVal) {
        const list = tracksRef.current
        const startIdx = activeIndexRef.current ?? 0
        shuffleOrderRef.current = buildShuffleOrder(list.length, startIdx)
        shufflePositionRef.current = 0
      } else {
        shuffleOrderRef.current = []
        shufflePositionRef.current = 0
      }
      return newVal
    })
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onTime = () => setCurrentTime(audio.currentTime)
    const onMeta = () => setDuration(audio.duration)
    const onEnded = () => next()

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('durationchange', onMeta)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('durationchange', onMeta)
      audio.removeEventListener('ended', onEnded)
    }
  }, [next])

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    const session = navigator.mediaSession
    session.setActionHandler('play', () => togglePlayPause())
    session.setActionHandler('pause', () => togglePlayPause())
    session.setActionHandler('previoustrack', () => prev())
    session.setActionHandler('nexttrack', () => next())
    return () => {
      session.setActionHandler('play', null)
      session.setActionHandler('pause', null)
      session.setActionHandler('previoustrack', null)
      session.setActionHandler('nexttrack', null)
    }
  }, [togglePlayPause, prev, next])

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    if (activeIndex === null) {
      navigator.mediaSession.metadata = null
      return
    }
    const track = tracksRef.current[activeIndex]
    if (!track) return
    const title = track.movement ? `${track.title} — ${track.movement}` : track.title
    const artworkUrl = new URL(track.photo, window.location.href).toString()
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist: 'Allison & Juan',
      album: 'A Wedding Remembrance',
      artwork: [{ src: artworkUrl, sizes: '512x512', type: 'image/jpeg' }],
    })
  }, [activeIndex])

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'
  }, [isPlaying])

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    if (typeof navigator.mediaSession.setPositionState !== 'function') return
    if (!Number.isFinite(duration) || duration <= 0) return
    const position = Math.max(0, Math.min(currentTime, duration))
    navigator.mediaSession.setPositionState({
      duration,
      playbackRate: 1,
      position,
    })
  }, [duration, currentTime])

  const state: PlaybackState = { activeIndex, isPlaying, currentTime, duration, shuffle }
  const controls: PlaybackControls = {
    playIndex,
    togglePlayPause,
    toggleShuffle,
    next,
    prev,
    skipBy,
    seekTo,
  }

  return { ...state, ...controls }
}
