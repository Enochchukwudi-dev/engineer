const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

// Use ffmpeg-static so users don't need system ffmpeg installed
let ffmpegPath
try {
  ffmpegPath = require('ffmpeg-static')
} catch (e) {
  console.error('ffmpeg-static not found. Run `npm i -D ffmpeg-static` and try again.')
  process.exit(1)
}

const videosDir = path.join(__dirname, '..', 'public', 'videos')
if (!fs.existsSync(videosDir)) {
  console.error('Directory not found:', videosDir)
  process.exit(1)
}

const files = fs.readdirSync(videosDir).filter((f) => f.toLowerCase().endsWith('.mp4'))
if (files.length === 0) {
  console.log('No MP4 files found in', videosDir)
  process.exit(0)
}

console.log(`Found ${files.length} mp4 file(s). Starting re-encode with ${ffmpegPath}`)

for (const file of files) {
  const input = path.join(videosDir, file)
  const tmp = path.join(videosDir, `${file}.tmp.mp4`)
  console.log('\n---')
  console.log('Processing:', file)

  // ffmpeg args: re-encode to h264/aac, baseline/profile for max compatibility
  const args = [
    '-i', input,
    '-c:v', 'libx264',
    '-profile:v', 'baseline',
    '-level', '3.0',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-movflags', '+faststart',
    '-y', tmp
  ]

  const res = spawnSync(ffmpegPath, args, { stdio: 'inherit' })
  if (res.error) {
    console.error('FFmpeg failed:', res.error)
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
    continue
  }

  if (res.status !== 0) {
    console.error('FFmpeg returned non-zero exit code for', file)
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
    continue
  }

  // Replace original file
  try {
    fs.renameSync(tmp, input)
    console.log('Re-encoded:', file)
  } catch (err) {
    console.error('Failed to replace original file:', err)
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
  }
}

console.log('\nRe-encoding finished. Commit and push the updated files, then redeploy to Vercel.')