"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

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
  { src: "/s1.jpeg", title: "Image 1", alt: "Image 1" },
  { src: "/s2.jpeg", title: "Image 2", alt: "Image 2" },
  { src: "/s3.jpeg", title: "Image 3", alt: "Image 3" },
  { src: "/s4.jpeg", title: "Image 4", alt: "Image 4" },
  { src: "/s5.jpeg", title: "Image 5", alt: "Image 5" },
  { src: "/s6.jpeg", title: "Image 6", alt: "Image 6" },
  { src: "/s7.jpeg", title: "Image 7", alt: "Image 7" },
  { src: "/w1.jpeg", title: "Image 8", alt: "Image 8" },
  { src: "/w2.jpeg", title: "Image 9", alt: "Image 9" },
  { src: "/w3.jpeg", title: "Image 10", alt: "Image 10" },
  { src: "/w4.jpeg", title: "Image 11", alt: "Image 11" },
  { src: "/w5.jpeg", title: "Image 12", alt: "Image 12" },
  { src: "/w6.jpeg", title: "Image 13", alt: "Image 13" },
  { src: "/w7.jpeg", title: "Image 14", alt: "Image 14" },
  { src: "/w8.jpeg", title: "Image 15", alt: "Image 15" },
  { src: "/w9.jpeg", title: "Image 16", alt: "Image 16" },
  { src: "/w10.jpeg", title: "Image 17", alt: "Image 17" },
  { src: "/w11.jpeg", title: "Image 18", alt: "Image 18" },
  { src: "/w12.jpeg", title: "Image 19", alt: "Image 19" },
]

const VIDEOS: VideoItem[] = [
  { src: "https://youtube.com/shorts/cXu5UOszOyU?si=cTg-2m3M5tDG5TdZ", youtubeId: "cXu5UOszOyU", title: "Short", alt: "Short" },
]

export default function Folder() {
  const { theme } = useTheme()
  const [imageModal, setImageModal] = useState<ImageItem | null>(null)
  const [videoModal, setVideoModal] = useState<VideoItem | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [mediaType, setMediaType] = useState<"images" | "videos">("images")
  
  // Player state for custom controls - must be declared before effects
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const ytPlayerRef = useRef<{ destroy: () => void; getCurrentTime: () => number; getDuration: () => number; pauseVideo: () => void; playVideo: () => void; seekTo: (time: number, allowSeekAhead: boolean) => void; getPlayerState: () => number } | null>(null)
  const pollRef = useRef<number | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [ytPosterVisible, setYtPosterVisible] = useState(false)
  const seekingRef = useRef(false)
  
  // Disable scroll when video modal is open
  useEffect(() => {
    if (videoModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    if (!videoModal) setYtPosterVisible(false)
    
    return () => {
      document.body.style.overflow = 'unset'
      setYtPosterVisible(false)
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
      if ((window as any).YT && (window as any).YT.Player) return resolve()
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
      ;(window as any).onYouTubeIframeAPIReady = () => resolve()
    })

    loadYT().then(() => {
      if (!mounted) return
      const player = new (window as any).YT.Player('yt-player', {
        videoId: videoModal.youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 0,            // hide YouTube native controls
          modestbranding: 1,      // reduce branding
          rel: 0,                 // avoid external recommendations
          playsinline: 1,
          iv_load_policy: 3,      // disable annotations
          vq: 'hd720'             // prefer 720p+
        },
        events: {
          onReady: (e: any) => {
            ytPlayerRef.current = e.target
            try { if (typeof e.target.setPlaybackQuality === 'function') e.target.setPlaybackQuality('hd720') } catch (err) {}

            // set duration and start polling current time for custom seekbar
            const dur = e.target.getDuration() || 0
            setDuration(dur)
            setIsPlaying(true)

            if (pollRef.current) window.clearInterval(pollRef.current)
            pollRef.current = window.setInterval(() => {
              if (!e.target || seekingRef.current) return
              try { 
                const t = e.target.getCurrentTime()
                setCurrentTime(t)
                
                // Enforce 720p quality strictly - check every 250ms and reapply if downscaled
                const currentQuality = e.target.getPlaybackQuality?.() || ''
                if (currentQuality !== 'hd720' && typeof e.target.setPlaybackQuality === 'function') {
                  try { e.target.setPlaybackQuality('hd720') } catch (err) {}
                }
              } catch (err) {}
            }, 250)
          },
          onStateChange: (ev: any) => {
            // 1 playing, 2 paused, 0 ended
            if (ev.data === 1) {
              setIsPlaying(true)
              setYtPosterVisible(false)
              // Aggressively enforce 720p whenever playback resumes/starts
              try { if (typeof ev.target.setPlaybackQuality === 'function') ev.target.setPlaybackQuality('hd720') } catch (err) {}
            } else if (ev.data === 2) {
              // paused - show poster, hide iframe
              setIsPlaying(false)
              setYtPosterVisible(true)
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
  }, [videoModal])

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
        setYtPosterVisible(true) // replace iframe with poster when paused
      } else {
        // if poster visible, hide it and resume
        setYtPosterVisible(false)
        try { if (typeof p.seekTo === 'function') p.seekTo(currentTime, true) } catch {}
        p.playVideo()
        try { if (typeof p.setPlaybackQuality === 'function') p.setPlaybackQuality('hd720') } catch {}
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
                  onClick={() => setImageModal(media)}
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
                      onClick={() => setVideoModal(video)}
                      className="group relative h-40 overflow-hidden bg-muted hover:shadow-lg transition-shadow duration-300 rounded-sm"
                    >
                      {video.youtubeId ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                          alt={video.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
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
        <div aria-modal role="dialog" className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" onClick={() => setImageModal(null)}>
          <div className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 max-w-full max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 'min(90vw, 1200px)', height: '80vh', position: 'relative' }} className="shadow-lg">
              <Image src={imageModal.src} alt={imageModal.alt} fill className="object-contain" />
            </div>
          </div>
        </div>
      )}

      {videoModal && (
        <div aria-modal role="dialog" className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" onClick={() => setVideoModal(null)}>
          <div className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 max-w-full max-h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div style={{ width: isPlaying ? 'min(96vw, 1400px)' : 'min(90vw, 1200px)', height: isPlaying ? '85vh' : 'auto', aspectRatio: '16/9', position: 'relative', transition: 'width 300ms ease, height 300ms ease', marginTop: isPlaying ? '6rem' : '0', overflow: 'hidden' }} className="shadow-lg">
              {videoModal.youtubeId ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {/* poster displayed when paused to hide YouTube overlays */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${videoModal.youtubeId}/maxresdefault.jpg`}
                    alt="poster"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 100, display: ytPosterVisible ? 'block' : 'none', opacity: 1 }}
                  />

                  <div id="yt-player" style={{ width: '130%', height: '130%', marginLeft: '-15%', marginTop: '-15%', position: 'relative', display: ytPosterVisible ? 'none' : 'block', visibility: ytPosterVisible ? 'hidden' : 'visible' }} />
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
                      const lastTap = (e.currentTarget as any).lastTap || 0
                      const timeSinceLastTap = now - lastTap
                      if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
                        e.preventDefault()
                      }
                      ;(e.currentTarget as any).lastTap = now
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
            <div className="w-full max-w-[90vw] px-3 mt-3" style={{ maxWidth: isPlaying ? 'min(96vw, 1400px)' : 'min(90vw, 1200px)', transition: 'max-width 300ms ease' }}>
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
