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

  const playIndex = useCallback((index: number) => {
    const audio = audioRef.current
    if (!audio) return
    const list = tracksRef.current
    if (index < 0 || index >= list.length) return

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
      if (list.length === 1) {
        playIndex(0)
        return
      }
      let nextIdx = Math.floor(Math.random() * list.length)
      while (nextIdx === current) {
        nextIdx = Math.floor(Math.random() * list.length)
      }
      playIndex(nextIdx)
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
    const prevIdx = current === null ? 0 : (current - 1 + list.length) % list.length
    playIndex(prevIdx)
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

  const toggleShuffle = useCallback(() => setShuffle((s) => !s), [])

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
