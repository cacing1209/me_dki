export type Lang = 'en' | 'id'

export const translations = {
  // ─── Navbar ───
  'nav.home': { en: 'home', id: 'beranda' },
  'nav.about': { en: 'about', id: 'tentang' },
  'nav.skills': { en: 'stack', id: 'stack' },
  'nav.experience': { en: 'experience', id: 'pengalaman' },
  'nav.projects': { en: 'projects', id: 'proyek' },
  'nav.contact': { en: 'contact', id: 'kontak' },
  'nav.cta': { en: 'say hi', id: 'sapa' },

  // ─── Hero ───
  'hero.badge': {
    en: 'available_for_collab.exe',
    id: 'siap_kolaborasi.exe',
  },
  'hero.greeting': { en: "hi, i'm", id: 'halo, aku' },
  'hero.role_label': { en: 'role', id: 'peran' },
  'hero.tagline_pre': {
    en: 'I build smart systems with',
    id: 'Aku bikin smart system pakai',
  },
  'hero.tagline_and': { en: 'and', id: 'dan' },
  'hero.tagline_post': {
    en: 'Soldering iron in one hand, terminal in the other — chasing flags, shipping weird hardware, learning out loud.',
    id: 'Solder di satu tangan, terminal di tangan lain — kejar flag, ngirim hardware nyeleneh, belajar terang-terangan.',
  },
  'hero.cta_projects': { en: 'view_projects', id: 'lihat_proyek' },
  'hero.cta_contact': { en: './contact.sh', id: './kontak.sh' },

  // ─── About ───
  'about.idx': { en: '01', id: '01' },
  'about.title': { en: 'who is dki?', id: 'siapa dki?' },
  'about.subtitle': { en: 'cat /etc/about-me', id: 'cat /etc/tentang-aku' },
  'about.filename': { en: '~/diki/about.md', id: '~/diki/tentang.md' },
  'about.body1_pre': { en: "I'm a hands-on", id: 'Aku' },
  'about.body1_role': {
    en: 'IoT engineer',
    id: 'IoT engineer praktis',
  },
  'about.body1_post': {
    en: 'who lives between the soldering bench and the terminal. I prototype with',
    id: 'yang hidup di antara meja solder dan terminal. Aku prototyping pakai',
  },
  'about.body1_tail': {
    en: ", wire up sensors, ship dashboards, and design my own PCBs in EasyEDA when off-the-shelf modules don't cut it.",
    id: ', sambung sensor, kirim dashboard, dan desain PCB sendiri di EasyEDA kalau modul jadi nggak cukup.',
  },
  'about.body2_pre': {
    en: 'Background as an HVAC team lead and medical-equipment technician taught me to debug systems that',
    id: 'Latar belakang sebagai team lead HVAC dan teknisi alat kesehatan ngajarin aku debug sistem yang',
  },
  'about.body2_emph': { en: 'cannot', id: 'tidak boleh' },
  'about.body2_post': {
    en: 'fail. Today I bring that mindset to smart systems, MQTT pipelines, and weekend CTFs — building things that talk to each other, with security baked in.',
    id: 'gagal. Sekarang mindset itu kubawa ke smart system, pipeline MQTT, dan CTF akhir pekan — bikin hal-hal yang ngobrol satu sama lain, security sudah jadi bagiannya.',
  },
  'about.fact_discipline': { en: 'discipline', id: 'bidang' },
  'about.fact_discipline_v': {
    en: 'IoT · Embedded · Hardware',
    id: 'IoT · Embedded · Hardware',
  },
  'about.fact_years': { en: 'years_active', id: 'tahun_aktif' },
  'about.fact_years_v': { en: '2020 → present', id: '2020 → sekarang' },
  'about.fact_learning': { en: 'currently_learning', id: 'sedang_belajar' },
  'about.fact_learning_v': {
    en: 'Docker · MQTT · CTF',
    id: 'Docker · MQTT · CTF',
  },
  'about.fact_lang': { en: 'native_lang', id: 'bahasa_utama' },
  'about.fact_lang_v': { en: 'C / C++ / Python', id: 'C / C++ / Python' },

  // ─── Skills ───
  'skills.idx': { en: '02', id: '02' },
  'skills.title': { en: 'tech stack.', id: 'tech stack.' },
  'skills.subtitle': { en: 'ls -la ~/skills', id: 'ls -la ~/keahlian' },

  // ─── Experience ───
  'exp.idx': { en: '03', id: '03' },
  'exp.title': { en: 'experience.', id: 'pengalaman.' },
  'exp.subtitle': { en: 'git log --oneline', id: 'git log --oneline' },
  'exp.role': { en: '// role', id: '// peran' },

  // ─── Projects ───
  'proj.idx': { en: '04', id: '04' },
  'proj.title': { en: 'projects shipped.', id: 'proyek yang dikirim.' },
  'proj.subtitle': {
    en: 'ls ~/projects | grep .ino',
    id: 'ls ~/proyek | grep .ino',
  },
  'proj.label': { en: 'project', id: 'proyek' },
  'proj.status': { en: 'status:', id: 'status:' },
  'proj.deployed': { en: 'deployed.exe', id: 'terdeploy.exe' },
  'proj.see_on_ig': { en: 'watch on IG →', id: 'tonton di IG →' },

  // ─── IG Highlights strip (inside Projects) ───
  'hl.eyebrow': {
    en: '// every build is on instagram',
    id: '// semua build ada di instagram',
  },
  'hl.title': {
    en: 'documented live, no edits.',
    id: 'didokumentasikan langsung, tanpa edit.',
  },
  'hl.subtitle': {
    en: 'Schematics, soldering, debugging — saved as story highlights so you can see how each thing was actually built.',
    id: 'Skematik, solder, debugging — disimpan jadi sorotan cerita biar kamu bisa lihat gimana tiap alat dibikin sebenarnya.',
  },
  'hl.coding_title': { en: 'coding & schematic', id: 'coding & skematik' },
  'hl.coding_desc': {
    en: 'Build logs, PCB design, firmware — every project from prototype to working unit.',
    id: 'Log proses build, desain PCB, firmware — tiap proyek dari prototipe sampai jadi.',
  },
  'hl.medical_title': {
    en: 'medical equipment fixes',
    id: 'perbaikan alat kesehatan',
  },
  'hl.medical_desc': {
    en: 'X-ray, infusion pumps, EKG/ECG, dental, treadmill — diagnosis and repair from the field.',
    id: 'X-ray, infusion pump, EKG/ECG, dental, treadmill — diagnosis dan perbaikan langsung dari lapangan.',
  },
  'hl.open': { en: 'open story →', id: 'buka cerita →' },
  'hl.follow': {
    en: 'follow @mzk.dq →',
    id: 'ikuti @mzk.dq →',
  },

  'exp.docs': { en: 'see docs', id: 'lihat dokumentasi' },

  // ─── Contact ───
  'contact.idx': { en: '05', id: '05' },
  'contact.title': { en: 'say hi.', id: 'sapa aku.' },
  'contact.subtitle': {
    en: 'echo $REPLY > /dev/diki',
    id: 'echo $REPLY > /dev/diki',
  },
  'contact.hint': { en: '// open_channel', id: '// buka_channel' },
  'contact.heading': {
    en: "Let's build something weird.",
    id: 'Yuk, bikin sesuatu yang nyeleneh.',
  },
  'contact.body': {
    en: 'Hardware idea that needs an antenna and an ESP32? CTF team short a player? Custom PCB you want soldered? Drop a line — I read everything.',
    id: 'Ide hardware butuh antena dan ESP32? Tim CTF kurang satu pemain? Mau PCB custom disolder? Kirim pesan — semua aku baca.',
  },
  'contact.phone_label': { en: 'phone', id: 'telepon' },
  'contact.email_label': { en: 'email', id: 'email' },
  'contact.filename': {
    en: '~/diki/contact.sh',
    id: '~/diki/kontak.sh',
  },
  'contact.online': { en: 'online', id: 'online' },
  'contact.field_name': { en: 'your_name', id: 'nama_kamu' },
  'contact.field_email': { en: 'your_email', id: 'email_kamu' },
  'contact.field_message': { en: 'message', id: 'pesan' },
  'contact.privacy': {
    en: '// opens your mail client → no data stored.',
    id: '// buka aplikasi email kamu → data tidak disimpan.',
  },
  'contact.transmit': { en: 'transmit', id: 'kirim' },
  'contact.sent': { en: 'sent ✓', id: 'terkirim ✓' },
  'contact.subject_prefix': { en: 'hi diki —', id: 'halo diki —' },
  'contact.new_msg': { en: 'new message', id: 'pesan baru' },
  'contact.from': { en: 'from:', id: 'dari:' },
  'contact.no_email': { en: '(no email)', id: '(tanpa email)' },
  'contact.empty': { en: '(empty)', id: '(kosong)' },

  // ─── Footer ───
  'footer.made': {
    en: 'made with',
    id: 'dibuat dengan',
  },
  'footer.solder': { en: '+ solder fumes', id: '+ asap solder' },
} as const

export type TKey = keyof typeof translations
