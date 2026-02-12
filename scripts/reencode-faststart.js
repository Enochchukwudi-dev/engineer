/* eslint-disable no-console */
// Re-moves the `moov` atom to the beginning for progressive playback (faststart).
// Usage: node ./scripts/reencode-faststart.js    (will overwrite files in-place with a .tmp then rename)

const fs = require('fs')
const path = require('path')
const cp = require('child_process')

let ffmpeg = 'ffmpeg'
try {
  // prefer bundled ffmpeg (ffmpeg-static) when available in devDependencies
  ffmpeg = require('ffmpeg-static') || ffmpeg
} catch (err) {
  console.warn('ffmpeg-static not found — falling back to system ffmpeg in PATH')
}

const VIDEOS_DIR = path.join(__dirname, '..', 'public', 'videos')

if (!fs.existsSync(VIDEOS_DIR)) {
  console.error('public/videos directory not found')
  process.exit(1)
}

const files = fs.readdirSync(VIDEOS_DIR).filter((f) => f.endsWith('.mp4'))
if (!files.length) {
  console.log('No mp4 files found in public/videos')
  process.exit(0)
}

console.log(`Found ${files.length} mp4(s). Processing with -movflags +faststart...`)

for (const file of files) {
  const src = path.join(VIDEOS_DIR, file)
  const tmp = path.join(VIDEOS_DIR, `${file}.tmp.mp4`)

  const args = [
    '-y',
    '-i', src,
    '-c', 'copy',
    '-movflags', '+faststart',
    tmp
  ]

  try {
    console.log(`Rewriting ${file} -> faststart`)
    cp.execFileSync(ffmpeg, args, { stdio: 'inherit' })
    fs.renameSync(tmp, src)
    console.log(`OK: ${file}`)
  } catch (err) {
    console.error(`FAILED: ${file}`, err && err.message)
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
  }
}

console.log('Done. Commit the changed files and redeploy to Vercel.')
