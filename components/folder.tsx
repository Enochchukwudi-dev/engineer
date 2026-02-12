"use client"

import { useState } from "react"
import Image from "next/image"
import VideoPreview from "@/components/VideoPreview"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

interface ImageItem {
  src: string
  filename?: string
  title: string
  alt: string
  isVideo?: boolean
  poster?: string
  width?: number
  height?: number
}

const IMAGES: ImageItem[] = [
  { src: "/w1.avif", title: "Featured 1", alt: "Featured 1" },
  { src: "/conc1.avif", title: "Featured 2", alt: "Featured 2" },
  { src: "/team.avif", title: "Featured 3", alt: "Team" },
  { src: "/roof1.avif", title: "Image 4", alt: "Roof" },
  { src: "/inte1.avif", title: "Image 5", alt: "Interior" },
  { src: "/conc2.avif", title: "Image 6", alt: "Concrete" },
  { src: "/conc3.avif", title: "Image 7", alt: "Concrete 2" },
  { src: "/w2.avif", title: "Image 8", alt: "Work" },
]

// Map to actual MP4 files in public/videos (optimized_v1.mp4 - optimized_v27.mp4), reuse image posters as fallbacks
const VIDEOS: ImageItem[] = Array.from({ length: 27 }).map((_, i) => ({
  src: `/videos/optimized_v${i + 1}.mp4`,
  filename: `v${i + 1}`,
  poster: IMAGES[i % IMAGES.length].src,
  title: `Video ${i + 1}`,
  alt: `Video ${i + 1}`,
  isVideo: true,
}))



const ITEMS_PER_PAGE = 6

export default function Folder() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [imageModal, setImageModal] = useState<ImageItem | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [mediaType, setMediaType] = useState<"images" | "videos">("images")
  const media = mediaType === "images" ? IMAGES : VIDEOS

  const handleMediaTypeChange = (type: "images" | "videos") => {
    setMediaType(type)
    setCurrentPage(0)
  }
  const totalPages = Math.ceil(media.length / ITEMS_PER_PAGE)
  const startIdx = currentPage * ITEMS_PER_PAGE
  const currentMedia = media.slice(startIdx, startIdx + ITEMS_PER_PAGE)



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

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {currentMedia.map((media, idx) => (
            <div
              key={media.src ?? `${media.title}-${idx}`}
              className="group relative h-40  overflow-hidden bg-muted hover:shadow-lg transition-shadow duration-300"
            >
              {media.isVideo ? (
                playingIndex === idx ? (
                  <div className="w-full h-full">
                    <VideoPreview
                      filename={media.filename ?? media.src.replace('/videos/optimized_','').replace('.mp4','')}
                      poster={media.poster}
                      className="w-full h-full object-cover"
                      autoplay
                      controls
                    />
                    <button onClick={() => setPlayingIndex(null)} className="absolute top-2 right-2 z-10 bg-black/40 text-white rounded-full p-1">✕</button>
                  </div>
                ) : (
                  <button onClick={() => setPlayingIndex(idx)} className="w-full h-full">
                    <Image
                      src={media.poster ?? media.src}
                      alt={media.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </button>
                )
              ) : (
                <button onClick={() => setImageModal(media)} className="w-full h-full">
                  <Image
                    src={media.poster ?? media.src}
                    alt={media.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </button>
              )}
              {!(playingIndex === idx) && (
                <>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {media.isVideo ? (
                      <Play className="w-8 h-8 text-white" />
                    ) : (
                      <span className="px-3 py-1 bg-white/90 text-black text-xs font-medium rounded-sm">View</span>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
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
              {Array.from({ length: totalPages }).map((_, idx) => (
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
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-sm bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {imageModal && (
        <div aria-modal role="dialog" className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" onClick={() => setImageModal(null)}>
          <div className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 max-w-full max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={imageModal.src} alt={imageModal.alt} className="max-w-[90vw] max-h-[80vh] object-contain shadow-lg" />
          </div>
        </div>
      )}
    </section>
  )
}
