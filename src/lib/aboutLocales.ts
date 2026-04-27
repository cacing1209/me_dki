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
        'AC cassette, split, and central systems. Led the field team and bridged a partnership with PT GEA.',
    },
    id: {
      title: 'Team Lead & Teknisi Lapangan HVAC',
      description:
        'Sistem AC cassette, split, dan sentral. Memimpin tim lapangan dan jadi jembatan kerja sama dengan PT GEA.',
    },
  },
}

const PROJECT_LOCALES: Record<string, LocalEntry> = {
  'Nurse Call System': {
    en: {
      title: 'Nurse Call System',
      description:
        'Hospital nurse-call controller running on Arduino Mega 2560 with a Raspberry Pi gateway.',
    },
    id: {
      title: 'Sistem Nurse Call',
      description:
        'Controller nurse call rumah sakit pakai Arduino Mega 2560 dengan gateway Raspberry Pi.',
    },
  },
  'Motorcycle Security System': {
    en: {
      title: 'Motorcycle Security System',
      description:
        'RFID + Bluetooth keyless entry secured with AES on ESP32. Custom schematic, PCB, and modules designed in EasyEDA — parts sourced from LCSC.',
    },
    id: {
      title: 'Sistem Keamanan Motor',
      description:
        'RFID + keyless lewat Bluetooth dengan enkripsi AES di ESP32. Skematik, PCB, dan modul custom didesain sendiri di EasyEDA — komponen dari LCSC.',
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
