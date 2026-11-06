import { SpatialZone, ParcelInfo, GisLayer } from '../types/spatial';

export const SPATIAL_ZONES: SpatialZone[] = [
  {
    id: 'zona-tnbnw',
    code: 'L-TN',
    name: 'Kawasan Lindung Taman Nasional & Konservasi',
    category: 'lindung',
    categoryLabel: 'Kawasan Konservasi Primer',
    description: 'Kawasan Taman Nasional Bogani Nani Wartabone (TNBNW) dan hutan lindung DAS Bone yang berfungsi sebagai paru-paru ekologis dan resapan air utama Kabupaten Bone Bolango.',
    allowedUses: ['Penelitian & Riset Keanekaragaman Hayati', 'Ekowisata Terbatas Tanpa Mengubah Bentang Alam', 'Pengamanan Kawasan Hutan Adat', 'Pemantauan Flora & Fauna Endemik'],
    conditionalUses: ['Jalur Patroli Kehutanan Ramah Lingkungan', 'Pos Pantau Sensor Hidrometeorologi'],
    prohibitedUses: ['Perambahan Hutan & Alih Fungsi Lahan', 'Pertambangan Tanpa Izin', 'Pembangunan Pemukiman Permanen', 'Penebangan Kayu Komersial'],
    kdbMax: 0,
    klbMax: 0,
    kdhMin: 100,
    gsbMin: 50,
    maxHeight: 0,
    color: 'from-emerald-700/20 to-teal-800/10',
    accentHex: '#00DF8F',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    subZones: [
      { code: 'L-TN.1', name: 'Zona Inti TN Bogani Nani Wartabone', specificRules: 'Perlindungan mutlak habitat Anoa, Maleo, dan Babirusa. Nol aktivitas budi daya.' },
      { code: 'L-HL.2', name: 'Hutan Lindung Hulu DAS Bone', specificRules: 'Dilarang segala bentuk pembukaan tutupan vegetasi pohon pelindung tebing.' }
    ]
  },
  {
    id: 'zona-lp2b',
    code: 'B-LP2B',
    name: 'Kawasan Pertanian Pangan Berkelanjutan (LP2B)',
    category: 'industri',
    categoryLabel: 'Pertanian Pangan Abadi',
    description: 'Lahan sawah beririgasi teknis Lomaya-Alale dan sentra ketahanan pangan yang dilindungi secara mutlak dari konversi perumahan komersial atau industri.',
    allowedUses: ['Budidaya Padi Sawah & Palawija', 'Jaringan Irigasi Tersier & Kuarter', 'Gudang Pengeringan Gabah & Rice Milling', 'Jalan Usaha Tani'],
    conditionalUses: ['Rumah Tinggal Petani Pemilik (Maks 10% kaveling)', 'Kios Sarana Produksi Tani Mandiri'],
    prohibitedUses: ['Pembangunan Perumahan Real Estate / Klaster', 'Kawasan Industri Pabrik Kimia', 'Tempat Pembuangan Sampah', 'Pusat Perbelanjaan Modern'],
    kdbMax: 10,
    klbMax: 0.2,
    kdhMin: 85,
    gsbMin: 10,
    maxHeight: 2,
    color: 'from-amber-600/20 to-yellow-600/10',
    accentHex: '#eab308',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    subZones: [
      { code: 'LP2B-1', name: 'Sawah Irigasi Teknis Suwawa-Kabila', specificRules: 'Wajib dipertahankan abadi sesuai Perda LP2B Bone Bolango.' },
      { code: 'LP2B-2', name: 'Kawasan Hortikultura Tapa-Bulango', specificRules: 'Pengembangan komoditas sayur dan buah unggulan daerah.' }
    ]
  },
  {
    id: 'zona-permukiman',
    code: 'B-P',
    name: 'Kawasan Permukiman Perkotaan & Perdesaan',
    category: 'hunian',
    categoryLabel: 'Pusat Hunian Penduduk',
    description: 'Kawasan permukiman di koridor Suwawa, Kabila, Tilongkabila, dan Tapa dengan kelengkapan sarana utilitas publik, fasilitas ibadah, pendidikan, dan sanitasi.',
    allowedUses: ['Rumah Tinggal Tunggal & Kopel', 'Fasilitas Pendidikan TK-SMA', 'Puskesmas & Posyandu', 'Taman Terbuka Lingkungan', 'Pertokoan & Kios Warga'],
    conditionalUses: ['Kantor Pemerintahan Kecamatan & Desa', 'Gudang Hasil Bumi Non-B3 Skala Kecil', 'Bengkel Motor Lingkungan'],
    prohibitedUses: ['Pabrik Manufaktur Skala Besar', 'Peternakan Ayam/Babi Komersial Padat Populasi', 'Depot Bahan Peledak & B3'],
    kdbMax: 60,
    klbMax: 1.8,
    kdhMin: 25,
    gsbMin: 5,
    maxHeight: 4,
    color: 'from-emerald-500/20 to-teal-500/10',
    accentHex: '#10b981',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    subZones: [
      { code: 'P-KOT', name: 'Permukiman Perkotaan Kabila & Suwawa', specificRules: 'Ketinggian maksimal 4 lantai, lebar jalan akses minimum 6 meter.' },
      { code: 'P-DES', name: 'Permukiman Perdesaan Bonepantai', specificRules: 'Mempertahankan halaman terbuka hijau minimal 30% kaveling.' }
    ]
  },
  {
    id: 'zona-bahari',
    code: 'B-W',
    name: 'Kawasan Wisata Bahari & Pesisir',
    category: 'komersial',
    categoryLabel: 'Pariwisata Pesisir',
    description: 'Koridor pesisir pantai Botutonuo, Pantai Kurenai, dan sanctuary Hiu Paus Botubarani yang dikembangkan sebagai pusat pariwisata bahari ramah lingkungan.',
    allowedUses: ['Homestay & Penginapan Tradisional Berwawasan Lingkungan', 'Dermaga Perahu Wisata & Pusat Selam', 'Sentra Kuliner Olahan Ikan Segar', 'Pusat Informasi Konservasi Laut'],
    conditionalUses: ['Resor Tepi Pantai Terbatas (Wajib Kajian Daya Dukung)', 'Tempat Hiburan Seni Budaya Terbuka'],
    prohibitedUses: ['Reklamasi Pantai Tanpa Izin Lingkungan', 'Pembuangan Air Limbah Langsung ke Laut', 'Pembangunan Beton Masif di Pasang Tertinggi'],
    kdbMax: 40,
    klbMax: 1.2,
    kdhMin: 40,
    gsbMin: 35,
    maxHeight: 3,
    color: 'from-cyan-500/20 to-blue-600/10',
    accentHex: '#06b6d4',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    subZones: [
      { code: 'W-PES', name: 'Koridor Pantai Botutonuo - Bilungala', specificRules: 'Garis sempadan pantai minimal 35 meter dari pasang air laut tertinggi.' },
      { code: 'W-KON', name: 'Zona Konservasi Hiu Paus Botubarani', specificRules: 'Ketentuan khusus zonasi perairan dan pembatasan daya tampung wisatawan.' }
    ]
  },
  {
    id: 'zona-perintis',
    code: 'L-DS',
    name: 'Kawasan Sempadan Danau Perintis & Sungai Bone',
    category: 'lindung',
    categoryLabel: 'Perlindungan Hidrologis',
    description: 'Kawasan sabuk lindung sempadan Danau Perintis dan bantaran Sungai Bone guna mencegah sedimentasi, menjaga kualitas cadangan air tawar, dan mitigasi banjir.',
    allowedUses: ['Ruang Terbuka Hijau & Hutan Kota', 'Jalur Pejalan Kaki & Jogging Track Berpori', 'Kolam Retensi Pengendali Banjir', 'Taman Edukasi Air'],
    conditionalUses: ['Gazebo Kayu Tanpa Pondasi Beton Masif', 'Dermaga Perahu Dayung Tradisional'],
    prohibitedUses: ['Pembangunan Rumah / Bangunan Permanen', 'Galian Pasir dan Batu Liar di Bantaran', 'Pembuangan Sampah & Limbah Domestik'],
    kdbMax: 5,
    klbMax: 0.1,
    kdhMin: 90,
    gsbMin: 50,
    maxHeight: 1,
    color: 'from-blue-600/20 to-indigo-600/10',
    accentHex: '#3b82f6',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    subZones: [
      { code: 'L-DANAU', name: 'Sempadan Danau Perintis Suwawa', specificRules: 'Radius 50 meter dari bibir danau dilarang mendirikan bangunan permanen.' },
      { code: 'L-SUNGAI', name: 'Bantaran Sungai Bone', specificRules: 'Wajib penghijauan dengan tanaman berakar kuat penahan erosi.' }
    ]
  }
];

export const SAMPLE_PARCELS: ParcelInfo[] = [
  {
    id: 'bb-001',
    parcelNo: 'P-001/SUWAWA/RTRW-BB',
    nib: '21.04.01.01.00281',
    address: 'Jl. Prof. Dr. Aloei Saboe, Kompleks Perkantoran',
    subdistrict: 'Ulanta',
    district: 'Suwawa',
    coordinates: [0.5512, 123.1534],
    areaM2: 2400,
    currentZoneCode: 'B-P',
    zoneName: 'Kawasan Permukiman & Pemerintahan Suwawa',
    statusKesesuaian: 'Sesuai',
    kdbMax: 60,
    klbMax: 1.8,
    kdhMin: 25,
    gsbMin: 8,
    ownerType: 'Pemerintah'
  },
  {
    id: 'bb-002',
    parcelNo: 'P-042/KABILA/LP2B-BB',
    nib: '21.04.02.04.00812',
    address: 'Hamparan Sawah Alale - Oluhuta',
    subdistrict: 'Alale',
    district: 'Kabila',
    coordinates: [0.5389, 123.1121],
    areaM2: 8500,
    currentZoneCode: 'B-LP2B',
    zoneName: 'Kawasan Pertanian Pangan Berkelanjutan (LP2B)',
    statusKesesuaian: 'Sesuai',
    kdbMax: 10,
    klbMax: 0.2,
    kdhMin: 85,
    gsbMin: 10,
    ownerType: 'Perorangan'
  },
  {
    id: 'bb-003',
    parcelNo: 'P-118/BOTUTONUO/WISATA-BB',
    nib: '21.04.08.02.00419',
    address: 'Pesisir Pantai Botutonuo Km 14',
    subdistrict: 'Botutonuo',
    district: 'Kabila Bone',
    coordinates: [0.4491, 123.1287],
    areaM2: 3200,
    currentZoneCode: 'B-W',
    zoneName: 'Kawasan Wisata Bahari & Pesisir',
    statusKesesuaian: 'Sesuai',
    kdbMax: 40,
    klbMax: 1.2,
    kdhMin: 40,
    gsbMin: 35,
    ownerType: 'Badan Usaha'
  },
  {
    id: 'bb-004',
    parcelNo: 'P-089/PERINTIS/LINDUNG-BB',
    nib: '21.04.01.03.00015',
    address: 'Sabuk Sempadan Danau Perintis',
    subdistrict: 'Huluduotamo',
    district: 'Suwawa',
    coordinates: [0.5598, 123.1612],
    areaM2: 4500,
    currentZoneCode: 'L-DS',
    zoneName: 'Kawasan Sempadan Danau Perintis',
    statusKesesuaian: 'Bersyarat',
    kdbMax: 5,
    klbMax: 0.1,
    kdhMin: 90,
    gsbMin: 50,
    ownerType: 'Pemerintah'
  },
  {
    id: 'bb-005',
    parcelNo: 'P-302/TNBNW/KONSERVASI-BB',
    nib: '21.04.14.01.00001',
    address: 'Kawasan Hutan TN Bogani Nani Wartabone',
    subdistrict: 'Pinogu Indah',
    district: 'Pinogu',
    coordinates: [0.6124, 123.2845],
    areaM2: 52000,
    currentZoneCode: 'L-TN',
    zoneName: 'Kawasan Lindung Taman Nasional & Konservasi',
    statusKesesuaian: 'Tidak Sesuai',
    kdbMax: 0,
    klbMax: 0,
    kdhMin: 100,
    gsbMin: 50,
    ownerType: 'Pemerintah'
  }
];

export const GIS_LAYERS: GisLayer[] = [
  {
    id: 'layer-pola-ruang',
    name: 'Peta Pola Ruang RTRW Kab. Bone Bolango',
    description: 'Distribusi kawasan lindung TNBNW dan kawasan budi daya resmi Perda RTRW 2021–2041.',
    type: 'vector',
    active: true,
    opacity: 0.9,
    featuresCount: 1840
  },
  {
    id: 'layer-lp2b',
    name: 'Peta Lahan Pertanian Pangan Berkelanjutan (LP2B)',
    description: 'Lahan sawah irigasi abadi Lomaya-Alale yang dilindungi dari alih fungsi.',
    type: 'vector',
    active: true,
    opacity: 0.85,
    featuresCount: 920
  },
  {
    id: 'layer-rawan-bencana',
    name: 'Peta Kawasan Rawan Bencana (Banjir DAS Bone & Longsor)',
    description: 'Zona bahaya hidrometeorologi banjir luapan Sungai Bone dan kerentanan longsor perbukitan.',
    type: 'hazard',
    active: false,
    opacity: 0.75,
    featuresCount: 310
  },
  {
    id: 'layer-citra-satelit',
    name: 'Citra Ortofoto Udara Resolusi Tinggi Bone Bolango',
    description: 'Pemetaan tutupan vegetasi dan bentang alam aktual se-Kabupaten Bone Bolango.',
    type: 'raster',
    active: true,
    opacity: 1.0,
    featuresCount: 1
  }
];

export const STANDARD_ACTIVITIES = [
  { id: 'act-1', name: 'Rumah Tinggal Tunggal / Permukiman Warga', category: 'hunian', zoneMatch: 'B-P' },
  { id: 'act-2', name: 'Budidaya Tanaman Padi Sawah / Palawija', category: 'industri', zoneMatch: 'B-LP2B' },
  { id: 'act-3', name: 'Penginapan Wisata / Homestay Pesisir', category: 'komersial', zoneMatch: 'B-W' },
  { id: 'act-4', name: 'Ekowisata & Riset Keanekaragaman Hayati', category: 'lindung', zoneMatch: 'L-TN' },
  { id: 'act-5', name: 'Taman Edukasi Alam & Jalur Pejalan Kaki Danau', category: 'lindung', zoneMatch: 'L-DS' },
  { id: 'act-6', name: 'Toko Ritel & Kios Usaha Lingkungan', category: 'hunian', zoneMatch: 'B-P' }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Identifikasi Titik Koordinat Kaveling',
    subtitle: 'Overlay dengan Peta RTRW Bone Bolango',
    duration: 'Seketika',
    legalBasis: 'Perda RTRW Kab. Bone Bolango 2021–2041',
    desc: 'Pemohon memasukkan koordinat geografis atau batas bidang tanah di 18 kecamatan Kabupaten Bone Bolango untuk dipetakan secara digital.',
    milestones: ['Ekstraksi koordinat batas bidang', 'Pengecekan batas kecamatan & desa', 'Identifikasi fungsi kawasan RTRW']
  },
  {
    step: '02',
    title: 'Validasi Kawasan Lindung & LP2B',
    subtitle: 'Pengecekan TNBNW & Sawah Abadi',
    duration: '< 5 Menit',
    legalBasis: 'UU No. 41/2009 & PP No. 21/2021',
    desc: 'Sistem memverifikasi apakah kaveling bersinggungan dengan batas Taman Nasional Bogani Nani Wartabone, sempadan sungai/danau, atau lahan LP2B abadi.',
    milestones: ['Cek tumpang tindih kawasan konservasi', 'Perlindungan lahan sawah beririgasi', 'Audit kawasan rawan bencana']
  },
  {
    step: '03',
    title: 'Rekomendasi Kesesuaian Tata Ruang',
    subtitle: 'Konfirmasi Pemanfaatan Ruang Resmi',
    duration: 'Instan',
    legalBasis: 'Terintegrasi Bappeda & Dinas PUPR Bone Bolango',
    desc: 'Penerbitan surat telaah kesesuaian ruang RTRW Kabupaten Bone Bolango sebagai dasar legalitas perizinan berusaha dan persetujuan bangunan.',
    milestones: ['Penerbitan telaah spasial digital', 'Rekomendasi intensitas kaveling', 'Panduan teknis penataan lingkungan']
  }
];

export const FAQ_ITEMS = [
  {
    question: 'Apa saja pembagian kawasan utama dalam RTRW Kabupaten Bone Bolango?',
    answer: 'RTRW Kabupaten Bone Bolango secara garis besar membagi wilayah menjadi dua fungsi utama: Kawasan Lindung (termasuk Taman Nasional Bogani Nani Wartabone, hutan lindung DAS Bone, dan sempadan Danau Perintis) yang mencakup lebih dari 60% luas kabupaten, serta Kawasan Budi Daya (kawasan pertanian pangan berkelanjutan LP2B, permukiman Suwawa-Kabila, dan wisata pesisir pantai selatan).'
  },
  {
    question: 'Apakah lahan sawah beririgasi teknis di Bone Bolango boleh dialihfungsikan menjadi perumahan?',
    answer: 'Tidak. Lahan sawah beririgasi teknis yang telah ditetapkan sebagai Kawasan Pertanian Pangan Berkelanjutan (LP2B) dalam RTRW Bone Bolango dilindungi secara ketat oleh undang-undang dan dilarang dialihfungsikan menjadi perumahan komersial atau bangunan industri guna menjaga ketahanan pangan daerah.'
  },
  {
    question: 'Bagaimana ketentuan mendirikan bangunan di dekat Danau Perintis dan sempadan Sungai Bone?',
    answer: 'Berdasarkan ketentuan pola ruang RTRW Bone Bolango, sempadan Danau Perintis (radius 50 meter) dan bantaran Sungai Bone merupakan kawasan lindung hidrologis. Pendirian bangunan permanen dilarang keras, dan hanya diizinkan untuk penataan ruang terbuka hijau serta fasilitas penahan erosi dan mitigasi banjir.'
  },
  {
    question: 'Bagaimana masyarakat dapat mengecek status kesesuaian ruang kavelingnya di Bone Bolango?',
    answer: 'Masyarakat dan calon investor dapat menggunakan radar spasial pada platform SITARU Bone Bolango ini dengan memasukkan koordinat atau memilih lokasi kecamatan/desa untuk langsung mengetahui apakah peruntukan lahan sesuai dengan dokumen Perda RTRW Kabupaten Bone Bolango 2021–2041.'
  }
];
