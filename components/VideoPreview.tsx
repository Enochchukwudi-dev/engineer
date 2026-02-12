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

  // add simple error fallback: try the non-optimized filename if optimized fails
  React.useEffect(() => {
    if (!src) return
    const v = videoRef.current
    if (!v) return

    // reset fallback tracker when src changes
    triedFallback.current = false

    const onError = () => {
      if (!triedFallback.current && src.includes("optimized_")) {
        triedFallback.current = true
        const fallback = src.replace("/videos/optimized_", "/videos/")
        v.src = fallback
        v.load()
      }
    }

    v.addEventListener("error", onError)
    return () => v.removeEventListener("error", onError)
  }, [src])

  if (!filename) return null;

  return (
    <video
      ref={videoRef}
      src={src}
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
    />
  );
};

export default VideoPreview;
