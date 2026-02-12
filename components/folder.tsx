"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

const VIDEOS: VideoItem[] = [
  { src: "/videos/optimized_v1.mp4", title: "Video 1", alt: "Video 1" },
  { src: "/videos/optimized_v2.mp4", title: "Video 2", alt: "Video 2" },
  { src: "/videos/optimized_v3.mp4", title: "Video 3", alt: "Video 3" },
  { src: "/videos/optimized_v4.mp4", title: "Video 4", alt: "Video 4" },
  { src: "/videos/optimized_v5.mp4", title: "Video 5", alt: "Video 5" },
  { src: "/videos/optimized_v6.mp4", title: "Video 6", alt: "Video 6" },
  { src: "/videos/optimized_v7.mp4", title: "Video 7", alt: "Video 7" },
  { src: "/videos/optimized_v8.mp4", title: "Video 8", alt: "Video 8" },
  { src: "/videos/optimized_v9.mp4", title: "Video 9", alt: "Video 9" },
  { src: "/videos/optimized_v10.mp4", title: "Video 10", alt: "Video 10" },
  { src: "/videos/optimized_v11.mp4", title: "Video 11", alt: "Video 11" },
  { src: "/videos/optimized_v12.mp4", title: "Video 12", alt: "Video 12" },
  { src: "/videos/optimized_v13.mp4", title: "Video 13", alt: "Video 13" },
  { src: "/videos/optimized_v14.mp4", title: "Video 14", alt: "Video 14" },
  { src: "/videos/optimized_v15.mp4", title: "Video 15", alt: "Video 15" },
  { src: "/videos/optimized_v16.mp4", title: "Video 16", alt: "Video 16" },
  { src: "/videos/optimized_v17.mp4", title: "Video 17", alt: "Video 17" },
  { src: "/videos/optimized_v18.mp4", title: "Video 18", alt: "Video 18" },
  { src: "/videos/optimized_v19.mp4", title: "Video 19", alt: "Video 19" },
  { src: "/videos/optimized_v20.mp4", title: "Video 20", alt: "Video 20" },
  { src: "/videos/optimized_v21.mp4", title: "Video 21", alt: "Video 21" },
  { src: "/videos/optimized_v22.mp4", title: "Video 22", alt: "Video 22" },
  { src: "/videos/optimized_v23.mp4", title: "Video 23", alt: "Video 23" },
  { src: "/videos/optimized_v24.mp4", title: "Video 24", alt: "Video 24" },
  { src: "/videos/optimized_v25.mp4", title: "Video 25", alt: "Video 25" },
  { src: "/videos/optimized_v26.mp4", title: "Video 26", alt: "Video 26" },
  { src: "/videos/optimized_v27.mp4", title: "Video 27", alt: "Video 27" },
]



const ITEMS_PER_PAGE = 6

export default function Folder() {
  const [imageModal, setImageModal] = useState<ImageItem | null>(null)
  const [videoModal, setVideoModal] = useState<VideoItem | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [mediaType, setMediaType] = useState<"images" | "videos">("images")
  
  const handleMediaTypeChange = (type: "images" | "videos") => {
    setMediaType(type)
    setCurrentPage(0)
  }
  
  const currentMedia = mediaType === "images" ? IMAGES : VIDEOS
  const itemsPerPage = 6
  const totalPages = Math.ceil(currentMedia.length / itemsPerPage)
  const startIdx = currentPage * itemsPerPage
  const paginatedMedia = currentMedia.slice(startIdx, startIdx + itemsPerPage)



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
              {paginatedMedia.map((media, idx) => (
                <button
                  key={media.src ?? `${media.title}-${idx}`}
                  onClick={() => setImageModal(media as ImageItem)}
                  className="group relative h-40 overflow-hidden bg-muted hover:shadow-lg transition-shadow duration-300 rounded-sm"
                >
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="px-3 py-1 bg-white/90 text-black text-xs font-medium rounded-sm">View</span>
                  </div>
                </button>
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
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {paginatedMedia.map((video, idx) => (
                <button
                  key={video.src ?? `${video.title}-${idx}`}
                  onClick={() => setVideoModal(video as VideoItem)}
                  className="group relative h-40 overflow-hidden bg-muted hover:shadow-lg transition-shadow duration-300 rounded-sm"
                >
                  <video
                    src={video.src}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="px-3 py-1 bg-white/90 text-black text-xs font-medium rounded-sm">Play</span>
                  </div>
                </button>
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
          </>
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

      {videoModal && (
        <div aria-modal role="dialog" className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" onClick={() => setVideoModal(null)}>
          <div className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 max-w-full max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <video src={videoModal.src} controls autoPlay className="max-w-[90vw] max-h-[80vh] object-contain shadow-lg" />
          </div>
        </div>
      )}
    </section>
  )
}
