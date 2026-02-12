"use client"

import { useState, useEffect } from "react"
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
  { src: "https://www.youtube.com/watch?v=PuovsjZN11Y&list=PPSV", youtubeId: "PuovsjZN11Y", title: "Video", alt: "Video" },
  { src: "https://www.youtube.com/watch?v=9OLYmVN1GMU&pp=ygUfY29uc3RydWN0aW9uIHByb2plY3QgbWFuYWdlbWVudA%3D%3D", youtubeId: "9OLYmVN1GMU", title: "Construction Project Management", alt: "Construction Project Management" },
  { src: "https://www.youtube.com/shorts/cBNIOvDFGKI", youtubeId: "cBNIOvDFGKI", title: "Short", alt: "Short" },
]

export default function Folder() {
  const [imageModal, setImageModal] = useState<ImageItem | null>(null)
  const [videoModal, setVideoModal] = useState<VideoItem | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [mediaType, setMediaType] = useState<"images" | "videos">("images")
  const [isDark, setIsDark] = useState(false)
  
  useEffect(() => {
    // Check if dark mode is enabled
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
    
    // Listen for changes to the dark class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDarkMode = document.documentElement.classList.contains('dark')
          setIsDark(isDarkMode)
        }
      })
    })
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])
  
  const handleMediaTypeChange = (type: "images" | "videos") => {
    setMediaType(type)
    setCurrentPage(0)
  }
  
  const itemsPerPage = 6
  const paginatedImages = IMAGES.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
  const totalImagePages = Math.ceil(IMAGES.length / itemsPerPage)
  const paginatedVideos = VIDEOS.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
  const totalVideoPages = Math.ceil(VIDEOS.length / itemsPerPage)

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
                          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
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
          <div className="relative z-10 max-w-full max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoModal(null)}
              className="absolute top-22 right-4 z-[60] px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all text-sm font-medium"
              aria-label="Close video"
            >
              Close
            </button>
            {videoModal.youtubeId ? (
              <div style={{ position: 'relative', width: '90vw', maxWidth: '90vw', height: '80vh', overflow: 'hidden' }} className="shadow-lg">
                {/* shift iframe up so YouTube header sits outside visible area; increase iframe height to compensate */}
                <iframe
                  title={videoModal.title}
                  src={`https://www.youtube.com/embed/${videoModal.youtubeId}?autoplay=1&controls=1&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3`}
                  style={{ display: 'block', width: '100%', height: 'calc(100% + 160px)', transform: 'translateY(-120px)', border: '0' }}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />

                {/* strong visual overlays kept as fallback (pointer-events:none) */}
                <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 160, background: isDark ? 'black' : 'white', pointerEvents: 'none', zIndex: 50, opacity: 0.99 }} />
                <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: isDark ? 'black' : 'white', pointerEvents: 'none', zIndex: 50, opacity: 0.98 }} />
                <div aria-hidden style={{ position: 'absolute', bottom: 12, right: 12, width: 160, height: 64, background: isDark ? 'black' : 'white', borderRadius: 6, pointerEvents: 'none', zIndex: 52, opacity: 0.98 }} />
              </div>
            ) : (
              <video
                controls
                style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain' }}
                className="shadow-lg"
              >
                <source src={videoModal.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
