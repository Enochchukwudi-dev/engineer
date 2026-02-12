"use client"

import React from "react"

// DotLoader component (mimics react-spinners/DotLoader)
function DotLoader({ color = "#ff5400", size = 50 }: { color?: string; size?: number }) {
  const s = Math.max(12, Math.min(72, size))
  const dotStyle: React.CSSProperties = {
    background: color,
    borderRadius: "50%",
    display: "inline-block",
    margin: "0 2px",
  }
  return (
    <div className="dot-loader" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: s, height: s }}>
      <span style={{ ...dotStyle, width: s * 0.2, height: s * 0.2, animation: "dot-bounce 0.9s ease-in-out -0.18s infinite" }} />
      <span style={{ ...dotStyle, width: s * 0.2, height: s * 0.2, animation: "dot-bounce 0.9s ease-in-out -0.09s infinite" }} />
      <span style={{ ...dotStyle, width: s * 0.2, height: s * 0.2, animation: "dot-bounce 0.9s ease-in-out 0s infinite" }} />
    </div>
  )
}

export default function PageLoader() {
  const [visible, setVisible] = React.useState(false)
  const timeoutRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    // Show loader on initial mount for 4s
    setVisible(true)
    timeoutRef.current = window.setTimeout(() => setVisible(false), 4000)

    const handler = () => {
      // Show for 4s when requested
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setVisible(true)
      timeoutRef.current = window.setTimeout(() => setVisible(false), 4000)
    }

    window.addEventListener("show-loader", handler)
    return () => {
      window.removeEventListener("show-loader", handler)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="page-loader fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
      <DotLoader color="#ff5400" size={50} />
    </div>
  )
}