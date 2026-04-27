import type { Lang } from './translations'
import type { ExperienceItem, ProjectItem } from './parseAbout'

type LocalText = { title: string; description: string }
type LocalEntry = Record<Lang, LocalText>

// Keyed by the inferred English title from parseAbout — used to provide
// clean, translated copy for the Indonesian source content in aboutme.txt.
const EXPERIENCE_LOCALES: Record<string, LocalEntry> = {
  'IoT Engineer': {
    en: {
      title: 'IoT Engineer (Freelance)',
      description:
        'Building smart systems with local devices: ESP32, ESP8266, Arduino Mega, and Raspberry Pi. Stack: C++, Python, C. Currently learning Docker for the database side.',
    },
    id: {
      title: 'IoT Engineer (Serabutan)',
      description:
        'Bikin smart system dengan device lokal: ESP32, ESP8266, Arduino Mega, Raspberry Pi. Stack: C++, Python, C. Lagi belajar Docker buat sisi database.',
    },
  },
  'Medical Equipment Technician': {
    en: {
      title: 'Medical Equipment Technician',
      description:
        '@ RSSA Malang. Repaired X-ray, dental units, infusion pumps, EKG/ECG, and treadmills — debugging hardware that absolutely cannot fail.',
    },
    id: {
      title: 'Teknisi Alat Kesehatan',
      description:
        '@ RSSA Malang. Memperbaiki X-ray, dental, infusion pump, EKG/ECG, dan treadmill — debug perangkat yang benar-benar nggak boleh gagal.',
    },
  },
  'HVAC Team Lead & Field Technician': {
    en: {
      title: 'HVAC Team Lead & Field Technician',
      description:
        'AC cassette, split, and central systems. Led the field team.',
    },
    id: {
      title: 'Team Lead & Teknisi Lapangan HVAC',
      description:
        'Sistem AC cassette, split, dan sentral. Memimpin tim lapangan.',
    },
  },
}

const PROJECT_LOCALES: Record<string, LocalEntry> = {
  'IoT Engineering Builds': {
    en: {
      title: 'IoT Engineer',
      description:
        'Built: water-sensor dashboard, school locker doorlock, RFID keyless motorcycle, and nurse-call system. Designed custom PCBs end-to-end — schematic in EasyEDA, parts and boards ordered from LCSC and JLCPCB.',
    },
    id: {
      title: 'IoT Engineer',
      description:
        'Bikin: dashboard sensor air, doorlock loker sekolah, keyless motor RFID, dan sistem nurse call. PCB custom dari awal — skematik di EasyEDA, komponen dan board dipesan dari LCSC dan JLCPCB.',
    },
  },
}

export function localizeExperience(item: ExperienceItem, lang: Lang) {
  const entry = EXPERIENCE_LOCALES[item.title]
  if (!entry) return { title: item.title, description: item.description }
  return entry[lang]
}

export function localizeProject(item: ProjectItem, lang: Lang) {
  const entry = PROJECT_LOCALES[item.title]
  if (!entry) return { title: item.title, description: item.description }
  return entry[lang]
}
