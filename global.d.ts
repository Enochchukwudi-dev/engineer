// Allow importing CSS and common static asset types in TS/TSX files
declare module '*.css'
declare module '*.scss'
declare module '*.sass'
declare module '*.png'
declare module '*.jpeg'
declare module '*.webp'
declare module '*.gif'
declare module '*.svg' {
  const content: any
  export default content
}

export {}
