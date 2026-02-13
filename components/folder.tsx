"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface YTPlayer {
  destroy: () => void
  getCurrentTime: () => number
  getDuration: () => number
  pauseVideo: () => void
  playVideo: () => void
  seekTo: (time: number, allowSeekAhead: boolean) => void
  getPlayerState: () => number
  setPlaybackQuality?: (quality: string) => void
  getPlaybackQuality?: () => string
}

interface ImageItem {
  src: string
  title: string
  alt: string
  width?: number
  height?: number
}

interface VideoItem {
  src: string
  title: string
  alt: string
  youtubeId?: string
}

const IMAGES: ImageItem[] = [
  { src: "/aaa1.jpg", title: "Image 1", alt: "Image 1" },
  { src: "/aaa2.jpg", title: "Image 2", alt: "Image 2" },
  { src: "/aaa3.jpg", title: "Image 3", alt: "Image 3" },
  { src: "/aaa4.jpg", title: "Image 4", alt: "Image 4" },
  { src: "/aaa5.jpg", title: "Image 5", alt: "Image 5" },
  { src: "/aaa6.jpg", title: "Image 6", alt: "Image 6" },
  { src: "/aaa7.jpg", title: "Image 7", alt: "Image 7" },
  { src: "/aaa8.jpg", title: "Image 8", alt: "Image 8" },
  { src: "/aaa9.jpg", title: "Image 9", alt: "Image 9" },
  { src: "/aaa10.jpg", title: "Image 10", alt: "Image 10" },
  { src: "/aaa11.jpg", title: "Image 11", alt: "Image 11" },
  { src: "/aaa12.jpg", title: "Image 12", alt: "Image 12" },
  { src: "/aaa13.jpg", title: "Image 13", alt: "Image 13" },
  { src: "/aaa14.jpg", title: "Image 14", alt: "Image 14" },
  { src: "/aaa15.jpg", title: "Image 15", alt: "Image 15" },
  { src: "/aaa16.jpg", title: "Image 16", alt: "Image 16" },
  { src: "/aaa17.jpg", title: "Image 17", alt: "Image 17" },
  { src: "/aaa18.jpg", title: "Image 18", alt: "Image 18" },
  { src: "/aaa19.jpg", title: "Image 19", alt: "Image 19" },
  { src: "/aaa20.jpg", title: "Image 20", alt: "Image 20" },
  { src: "/aaa21.jpg", title: "Image 21", alt: "Image 21" },
  { src: "/aaa22.jpg", title: "Image 22", alt: "Image 22" },
  { src: "/aaa23.jpg", title: "Image 23", alt: "Image 23" },
  { src: "/aaa24.jpg", title: "Image 24", alt: "Image 24" },
  { src: "/aaa25.jpg", title: "Image 25", alt: "Image 25" },
  { src: "/aaa26.jpg", title: "Image 26", alt: "Image 26" },
  { src: "/aaa27.jpg", title: "Image 27", alt: "Image 27" },
  { src: "/aaa28.jpg", title: "Image 28", alt: "Image 28" },
  { src: "/aaa29.jpg", title: "Image 29", alt: "Image 29" },
  { src: "/aaa30.jpg", title: "Image 30", alt: "Image 30" },
  { src: "/aaa31.jpg", title: "Image 31", alt: "Image 31" },
  { src: "/aaa32.jpg", title: "Image 32", alt: "Image 32" },
  { src: "/aaa33.jpg", title: "Image 33", alt: "Image 33" },
  { src: "/aaa34.jpg", title: "Image 34", alt: "Image 34" },
  { src: "/aaa35.jpg", title: "Image 35", alt: "Image 35" },
  { src: "/aaa36.jpg", title: "Image 36", alt: "Image 36" },
  { src: "/aaa37.jpg", title: "Image 37", alt: "Image 37" },
  { src: "/aaa38.jpg", title: "Image 38", alt: "Image 38" },
  { src: "/aaa39.jpg", title: "Image 39", alt: "Image 39" },
  { src: "/aaa40.jpg", title: "Image 40", alt: "Image 40" },
  { src: "/aaa41.jpg", title: "Image 41", alt: "Image 41" },
  { src: "/aaa42.jpg", title: "Image 42", alt: "Image 42" },
  { src: "/aaa43.jpg", title: "Image 43", alt: "Image 43" },
  { src: "/aaa44.jpg", title: "Image 44", alt: "Image 44" },
  { src: "/aaa45.jpg", title: "Image 45", alt: "Image 45" },
  { src: "/aaa46.jpg", title: "Image 46", alt: "Image 46" },
  { src: "/aaa47.jpg", title: "Image 47", alt: "Image 47" },
  { src: "/aaa48.jpg", title: "Image 48", alt: "Image 48" },
  { src: "/aaa49.jpg", title: "Image 49", alt: "Image 49" },
  { src: "/aaa50.jpg", title: "Image 50", alt: "Image 50" },
  { src: "/aaa51.jpg", title: "Image 51", alt: "Image 51" },
  { src: "/aaa52.jpg", title: "Image 52", alt: "Image 52" },
  { src: "/aaa53.jpg", title: "Image 53", alt: "Image 53" },
  { src: "/aaa54.jpg", title: "Image 54", alt: "Image 54" },
]

const VIDEOS: VideoItem[] = [
  // use the regular YouTube watch URL (or rely on youtubeId) — avoids loading YouTube Shorts UI/watermark
  { src: "https://www.youtube.com/watch?v=cXu5UOszOyU", youtubeId: "cXu5UOszOyU", title: "Short", alt: "Short" },
]

export default function Folder() {
  useTheme()
  const [imageModal, setImageModal] = useState<ImageItem | null>(null)
  const [videoModal, setVideoModal] = useState<VideoItem | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [mediaType, setMediaType] = useState<"images" | "videos">("images")
  
  // Hide YouTube player's big play button on mount
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .ytp-big-play-button,
      .ytp-large-play-button {
        display: none !important;
      }
    `
    document.head.appendChild(style)
    return () => style.remove()
  }, [])
  
  // Player state for custom controls - must be declared before effects
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const ytPlayerRef = useRef<YTPlayer | null>(null)
  const pollRef = useRef<number | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const seekingRef = useRef(false)
  
  // Disable scroll when video modal is open & close modals on Escape
  useEffect(() => {
    if (videoModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVideoModal(null)
        setImageModal(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = 'unset'
    }
  }, [videoModal])

  // Native video listeners
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const onTime = () => {
      if (!seekingRef.current) setCurrentTime(v.currentTime)
    }
    const onLoaded = () => setDuration(v.duration || 0)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onLoaded)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)

    return () => {
      if (!v) return
      try {
        v.removeEventListener('timeupdate', onTime)
        v.removeEventListener('loadedmetadata', onLoaded)
        v.removeEventListener('play', onPlay)
        v.removeEventListener('pause', onPause)
      } catch {}
    }
  }, [videoModal])

  // YouTube IFrame API setup for custom controls (forces 720p+ and hides YouTube UI)
  useEffect(() => {
    if (!videoModal?.youtubeId) {
      // cleanup existing player when not showing a YouTube modal
      if (ytPlayerRef.current?.destroy) {
        try { ytPlayerRef.current.destroy() } catch {}
        ytPlayerRef.current = null
      }
      if (pollRef.current) {
        window.clearInterval(pollRef.current)
        pollRef.current = null
      }
      return
    }

    let mounted = true

    const loadYT = () => new Promise<void>((resolve) => {
      if (typeof window === 'undefined') return resolve()
      if ((window as unknown as { YT?: { Player: unknown } }).YT && (window as unknown as { YT: { Player: unknown } }).YT.Player) return resolve()
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
      ;(window as unknown as { onYouTubeIframeAPIReady?: () => void }).onYouTubeIframeAPIReady = () => resolve()
    })

    loadYT().then(() => {
      if (!mounted) return
      new (window as unknown as { YT: { Player: new (arg0: string, arg1: unknown) => YTPlayer } }).YT.Player('yt-player', {
        videoId: videoModal.youtubeId,
        playerVars: {
          autoplay: 1,            // auto-play when ready
          controls: 0,            // hide YouTube native controls
          modestbranding: 1,      // reduce branding
          rel: 0,                 // avoid external recommendations
          playsinline: 1,
          iv_load_policy: 3,      // disable annotations
          fs: 0,                  // disable fullscreen button
          vq: 'hd720'             // ENFORCE 720p minimum - never drop below 720p
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            ytPlayerRef.current = e.target
            try { if (typeof e.target.setPlaybackQuality === 'function') e.target.setPlaybackQuality('hd720') } catch {}

            // set duration and start polling current time for custom seekbar
            const dur = e.target.getDuration() || 0
            setDuration(dur)
            setIsPlaying(false)  // keep as not playing until user clicks play
            // Auto-play when ready
            e.target.playVideo()

            if (pollRef.current) window.clearInterval(pollRef.current)
            pollRef.current = window.setInterval(() => {
              if (!e.target || seekingRef.current) return
              try { 
                const t = e.target.getCurrentTime()
                setCurrentTime(t)
                
                // STRICT 720p: check every 100ms, block any quality below hd720
                const currentQuality = e.target.getPlaybackQuality?.() || ''
                if (currentQuality !== 'hd720' && currentQuality !== 'hd1080' && currentQuality !== 'highres' && typeof e.target.setPlaybackQuality === 'function') {
                  try { e.target.setPlaybackQuality('hd720') } catch {}
                }
              } catch {}
            }, 100)
          },
          onStateChange: (ev: { data: number; target: YTPlayer }) => {
            // 1 playing, 2 paused, 0 ended, 3 buffering
            if (ev.data === 1) {
              setIsPlaying(true)
              // CRITICAL: Force 720p the INSTANT video starts playing
              try { if (typeof ev.target.setPlaybackQuality === 'function') ev.target.setPlaybackQuality('hd720') } catch {}
            } else if (ev.data === 2) {
              // paused - just update state, video stays visible
              setIsPlaying(false)
            } else if (ev.data === 3) {
              // buffering - ensure 720p before buffering
              try { if (typeof ev.target.setPlaybackQuality === 'function') ev.target.setPlaybackQuality('hd720') } catch {}
            } else if (ev.data === 0) {
              // video ended - auto close
              setVideoModal(null)
            } else {
              setIsPlaying(false)
            }
            if (ev.data === 0) setCurrentTime(duration)
          }
        }
      })
    })

    return () => {
      mounted = false
      if (pollRef.current) { 
        window.clearInterval(pollRef.current)
        pollRef.current = null 
      }
      if (ytPlayerRef.current?.destroy) {
        try { ytPlayerRef.current.destroy() } catch {}
      }
      ytPlayerRef.current = null
    }
  }, [videoModal, duration])

  const handleMediaTypeChange = (type: "images" | "videos") => {
    setMediaType(type)
    setCurrentPage(0)
  }
  
  const itemsPerPage = 6
  const paginatedImages = IMAGES.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
  const totalImagePages = Math.ceil(IMAGES.length / itemsPerPage)
  const paginatedVideos = VIDEOS.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
  const totalVideoPages = Math.ceil(VIDEOS.length / itemsPerPage)

  const formatTime = (s: number) => {
    if (!s || !isFinite(s)) return '0:00'
    const mm = Math.floor(s / 60)
    const ss = Math.floor(s % 60).toString().padStart(2, '0')
    return `${mm}:${ss}`
  }

  // Toggle play/pause for native video or YouTube player
  const togglePlay = () => {
    if (videoModal?.youtubeId) {
      const p = ytPlayerRef.current
      if (!p) return
      const state = p.getPlayerState?.() ?? p.getPlayerState()
      // YT states: 1 playing, 2 paused
      if (state === 1) {
        p.pauseVideo()
        setIsPlaying(false)
      } else {
        // resume playback
        try { if (typeof p.seekTo === 'function') p.seekTo(currentTime, true) } catch {}
        p.playVideo()
        try { if (typeof (p as unknown as { setPlaybackQuality?: (quality: string) => void }).setPlaybackQuality === 'function') (p as unknown as { setPlaybackQuality: (quality: string) => void }).setPlaybackQuality('hd720') } catch {}
        setIsPlaying(true)
      }
    } else {
      const v = videoRef.current
      if (!v) return
      if (v.paused) {
        v.play()
        setIsPlaying(true)
      } else {
        v.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleSeek = (time: number) => {
    seekingRef.current = true
    setCurrentTime(time)
    if (videoModal?.youtubeId) {
      const p = ytPlayerRef.current
      if (p && typeof p.seekTo === 'function') p.seekTo(time, true)
    } else {
      const v = videoRef.current
      if (v) v.currentTime = time
    }
    // release seeking flag after a short delay
    setTimeout(() => (seekingRef.current = false), 300)
  }

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-5xl px-6 mt-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold">My Projects</h2>
          <p className="mt-3 text-gray-500 dark:text-muted-foreground max-w-2xl mx-auto">
            Real projects that reflect our attention to detail, clear communication, and the measurable value we deliver from first sketch to final handover.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => handleMediaTypeChange("images")}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                mediaType === "images"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Images
            </button>
            <button
              onClick={() => handleMediaTypeChange("videos")}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                mediaType === "videos"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Videos
            </button>
          </div>
        </div>

        {mediaType === "images" ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {paginatedImages.map((media, idx) => (
                <button
                  key={media.src ?? `${media.title}-${idx}`}
                  onClick={() => { setImageModal(media); setVideoModal(null); }}
                  className="group relative h-40 overflow-hidden bg-muted hover:shadow-lg transition-shadow duration-300 rounded-sm"
                >
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 dark:bg-black/60 dark:group-hover:bg-black/70 transition-colors pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="px-3 py-1 bg-white/90 dark:bg-black/80 text-black dark:text-white text-xs font-medium rounded-sm">View</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalImagePages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="p-2 rounded-sm bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalImagePages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`w-10 h-10 rounded-sm font-medium transition-colors ${
                        currentPage === idx
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalImagePages - 1, currentPage + 1))}
                  disabled={currentPage === totalImagePages - 1}
                  className="p-2 rounded-sm bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {paginatedVideos.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-lg text-gray-500 dark:text-muted-foreground">No videos yet</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {paginatedVideos.map((video, idx) => (
                    <button
                      key={video.src ?? `${video.title}-${idx}`}
                      onClick={() => { setVideoModal(video); setImageModal(null); }}
                      className="group relative h-40 overflow-hidden bg-muted hover:shadow-lg transition-shadow duration-300 rounded-sm"
                    >
                      {video.youtubeId ? (
                        <Image
                          src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                          alt={video.alt}
                          fill
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      ) : (
                        <video
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        >
                          <source src={video.src} type="video/mp4" />
                        </video>
                      )}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 dark:bg-black/60 dark:group-hover:bg-black/70 transition-colors pointer-events-none" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <span className="px-3 py-1 bg-white/90 dark:bg-black/80 text-black dark:text-white text-xs font-medium rounded-sm">Play</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalVideoPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <button
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      className="p-2 rounded-sm bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalVideoPages }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentPage(idx)}
                          className={`w-10 h-10 rounded-sm font-medium transition-colors ${
                            currentPage === idx
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalVideoPages - 1, currentPage + 1))}
                      disabled={currentPage === totalVideoPages - 1}
                      className="p-2 rounded-sm bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {imageModal && (
        <div aria-modal role="dialog" className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" onClick={() => { setImageModal(null); setVideoModal(null); }}>
          <div
            className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-sm cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => { setImageModal(null); setVideoModal(null); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') { setImageModal(null); setVideoModal(null); } }}
            aria-label="Close image modal"
          />
          <div className="relative z-10 max-w-full max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 'min(90vw, 1200px)', height: '80vh', position: 'relative' }} className="shadow-lg">
              <Image src={imageModal.src} alt={imageModal.alt} fill className="object-contain" />
              <button
                onClick={() => { setImageModal(null); setVideoModal(null); }}
                className="absolute top-3 right-3 z-[70] px-3 py-1 rounded-full bg-white/20 hover:bg-white/40 text-white text-sm font-medium transition-colors backdrop-blur-sm"
                aria-label="Close image"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {videoModal && (
        <div aria-modal role="dialog" className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" onClick={() => setVideoModal(null)}>
          <div
            className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-sm cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => setVideoModal(null)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') setVideoModal(null); }}
            aria-label="Close video modal"
          />
          <div className="relative z-10 max-w-full max-h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 'min(96vw, 1400px)', height: '85vh', aspectRatio: '16/9', position: 'relative', overflow: 'hidden', marginTop: '4rem' }} className="shadow-lg">
              {videoModal.youtubeId ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <div id="yt-player" style={{ width: '130%', height: '130%', marginLeft: '-15%', marginTop: '-15%', position: 'relative' }} />
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src={videoModal.src}
                  className="w-full h-full object-cover bg-black"
                  playsInline
                  onTouchEnd={(e) => {
                    // Prevent double-tap fullscreen
                    if (e.touches.length === 0) {
                      const now = Date.now()
                      const lastTap = (e.currentTarget as unknown as { lastTap?: number }).lastTap || 0
                      const timeSinceLastTap = now - lastTap
                      if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
                        e.preventDefault()
                      }
                      ;(e.currentTarget as unknown as { lastTap?: number }).lastTap = now
                    }
                  }}
                />
              )}
              <button
                onClick={() => setVideoModal(null)}
                className="absolute top-3 right-3 z-[70] px-3 py-1 rounded-full bg-white/20 hover:bg-white/40 text-white text-sm font-medium transition-colors backdrop-blur-sm"
                aria-label="Close video"
              >
                Close
              </button>
            </div>
            {/* custom seekbar + controls */}
            <div className="w-full max-w-[90vw] px-3 mt-3" style={{ maxWidth: 'min(96vw, 1400px)' }}>
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/80 transition-colors"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>

                <div className="flex-1">
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 dark:bg-zinc-700 rounded-lg accent-primary"
                  />
                </div>

                <div className="text-xs text-muted-foreground tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
