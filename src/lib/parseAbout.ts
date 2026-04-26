export type ExperienceItem = {
  year?: string
  title: string
  description: string
  tags: string[]
}

export type ProjectItem = {
  title: string
  description: string
  tags: string[]
}

export type AboutData = {
  experience: ExperienceItem[]
  projects: ProjectItem[]
  contact: {
    phone?: string
    email?: string
    raw: string
  }
}

const TECH_TAGS: Record<string, string> = {
  esp32: 'ESP32',
  esp8266: 'ESP8266',
  esp3266: 'ESP8266',
  arduinomega: 'Arduino Mega',
  arduinomega2560: 'Arduino Mega 2560',
  raspbery: 'Raspberry Pi',
  raspberry: 'Raspberry Pi',
  ethernetshield: 'Ethernet Shield',
  rfid: 'RFID',
  aes: 'AES',
  bt: 'Bluetooth',
  mqtt: 'MQTT',
  doker: 'Docker',
  docker: 'Docker',
  python: 'Python',
  'c++': 'C++',
  c: 'C',
  easyeda: 'EasyEDA',
  lcsc: 'LCSC',
  ekg: 'EKG',
  ecg: 'ECG',
  xray: 'X-Ray',
  treadmill: 'Treadmill',
}

const TITLE_HINTS: { match: RegExp; title: string }[] = [
  { match: /iot|esp32|esp8266|mqtt|smart system/i, title: 'IoT Engineer' },
  {
    match: /alatkesehatan|xray|infuspump|ekg|ecg/i,
    title: 'Medical Equipment Technician',
  },
  {
    match: /pendingin|airconditioner|cassett|split|sentral|ac/i,
    title: 'HVAC Team Lead & Field Technician',
  },
  { match: /sensor air|dashboard/i, title: 'Water Sensor Dashboard' },
  { match: /nurse call/i, title: 'Nurse Call System' },
  { match: /doorlocke|locker|sekloah|sekolah/i, title: 'School Locker Doorlock' },
  { match: /motor|rfid|keyles/i, title: 'Motorcycle Security System' },
]

function inferTitle(line: string): string {
  for (const hint of TITLE_HINTS) {
    if (hint.match.test(line)) return hint.title
  }
  return 'Project'
}

function extractTags(line: string): string[] {
  const lower = line.toLowerCase()
  const found = new Set<string>()
  for (const [key, label] of Object.entries(TECH_TAGS)) {
    const re = new RegExp(`\\b${key.replace(/\+/g, '\\+')}\\b`, 'i')
    if (re.test(lower)) found.add(label)
  }
  return Array.from(found)
}

function extractYear(line: string): string | undefined {
  const m = line.match(/\b(19|20)\d{2}\b/)
  return m?.[0]
}

function cleanItem(line: string): string {
  return line
    .replace(/^[-*•]\s*/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanDescription(text: string): string {
  // capitalize first char, leave rest
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function parseAbout(raw: string): AboutData {
  const lines = raw.split(/\r?\n/).map((l) => l.trim())

  const sections: Record<string, string[]> = {
    experience: [],
    project: [],
    contact: [],
  }
  let current: keyof typeof sections | null = null

  for (const line of lines) {
    if (!line) continue
    const lower = line.toLowerCase()
    if (/^experience\b/.test(lower)) {
      current = 'experience'
      continue
    }
    if (/^project[s:]?\b/.test(lower) || /^projek/.test(lower)) {
      current = 'project'
      continue
    }
    if (/^contact[:\b]/.test(lower)) {
      current = 'contact'
      sections.contact.push(line.replace(/^contact:?/i, '').trim())
      continue
    }
    if (current) sections[current].push(line)
  }

  const experience: ExperienceItem[] = sections.experience
    .filter((l) => l.length)
    .map((line) => {
      const cleaned = cleanItem(line)
      const year = extractYear(cleaned)
      const title = inferTitle(cleaned)
      const tags = extractTags(cleaned)
      const description = cleanDescription(
        cleaned.replace(year ?? '', '').replace(/^[-,\s]+/, ''),
      )
      return { year, title, description, tags }
    })

  const projects: ProjectItem[] = sections.project
    .filter((l) => l.length)
    .map((line) => {
      const cleaned = cleanItem(line)
      const title = inferTitle(cleaned)
      const tags = extractTags(cleaned)
      const description = cleanDescription(cleaned)
      return { title, description, tags }
    })

  const contactRaw = sections.contact.join(' ')
  const phoneMatch = contactRaw.match(/(\+?\d[\d\s-]{7,})/)
  const emailMatch = contactRaw.match(/[\w.+-]+@[\w-]+\.[\w.-]+/)

  return {
    experience,
    projects,
    contact: {
      phone: phoneMatch?.[1].replace(/\s+/g, '').trim(),
      email: emailMatch?.[0],
      raw: contactRaw,
    },
  }
}
