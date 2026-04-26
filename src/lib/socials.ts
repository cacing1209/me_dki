export const IG_HANDLE = 'mzk.dq'
export const IG_ACCOUNT = 'https://www.instagram.com/mzk.dq/'

export const IG_HIGHLIGHTS = {
  coding: 'https://www.instagram.com/stories/highlights/18025237619251814/',
  medical: 'https://www.instagram.com/stories/highlights/17945842952591232/',
} as const

// Mapping inferred title (from parseAbout) → IG highlight reel that documents it
export const EXPERIENCE_LINKS: Record<string, string> = {
  'IoT Engineer': IG_HIGHLIGHTS.coding,
  'Medical Equipment Technician': IG_HIGHLIGHTS.medical,
}

// Every project is documented on the coding/schematic highlight
export const PROJECT_DEFAULT_LINK = IG_HIGHLIGHTS.coding
