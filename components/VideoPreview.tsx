import React from "react";

type Props = {
  filename: string; // original MP4 filename without extension
  poster?: string; // optional image to use as poster/fallback
  className?: string; // optional className to control sizing
  autoplay?: boolean
  controls?: boolean
};

// Renders the first frame of an optimized MP4 located at /public/videos/optimized_<filename>.mp4
// Shows a poster image when available so thumbnails render reliably on all platforms
const VideoPreview: React.FC<Props> = ({ filename, poster, className, autoplay = false, controls = false }) => {
  // Hooks must be called at the top level, before any conditionals
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const triedFallback = React.useRef(false)

  const src = filename ? `/videos/optimized_${filename}.mp4` : ""
  const [failed, setFailed] = React.useState(false)

  // add simple error fallback: try the non-optimized filename if optimized fails
  React.useEffect(() => {
    if (!src) return
    const v = videoRef.current
    if (!v) return

    // reset fallback tracker when src changes
    triedFallback.current = false
    setFailed(false)

    const onError = () => {
      if (!triedFallback.current && src.includes("optimized_")) {
        triedFallback.current = true
        const fallback = src.replace("/videos/optimized_", "/videos/")
        v.src = fallback
        v.load()
        return
      }
      // fallback also failed
      setFailed(true)
    }

    v.addEventListener("error", onError)
    return () => v.removeEventListener("error", onError)
  }, [src])

  if (!filename) return null;

  if (failed) {
    return (
      <div className={className ?? ""} style={className ? undefined : { width: "100%", height: "100%", display: 'block', objectFit: 'cover' }}>
        {poster ? (
          <img src={poster} alt={filename} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }} />
        )}
        <div className="flex items-center justify-center">
          <a href={src} target="_blank" rel="noopener noreferrer" className="mt-2 underline">Open video</a>
        </div>
      </div>
    )
  }

  return (
    <video
      ref={videoRef}
      poster={poster}
      preload="metadata" /* load only metadata for low RAM usage */
      muted={autoplay}
      playsInline={true}
      controls={controls}
      autoPlay={autoplay}
      className={className}
      // default inline styles in case caller doesn't provide classes
      style={className ? undefined : { width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      aria-hidden={false}
    >
      <source src={src} type="video/mp4" />
      {/* Fallback for old browsers */}
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPreview;
