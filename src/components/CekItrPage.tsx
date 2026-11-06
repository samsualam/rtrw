import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  KECAMATAN_BONE_BOLANGO,
  KecamatanBoneBolango
} from '../data/boneBolangoKecamatan';
import { soundEffects } from '../utils/audio';
import {
  ArrowLeft,
  Compass,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Printer,
  ChevronRight,
  X,
  Layers,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Navigation,
  Map as MapIcon,
  Landmark,
  Trees,
  Network,
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  MapPin,
  Ruler,
  RotateCcw,
  Home,
  UploadCloud,
  FileCheck,
  Sliders,
  Check,
  Search,
  BookOpen,
  FolderTree,
  Sparkles,
  LocateFixed,
  Info
} from 'lucide-react';

interface CekItrPageProps {
  onBackToHome: () => void;
  onOpenKkprCalc: (zoneCode?: string) => void;
}

export type DrawerTab = 'basemap' | 'legenda' | 'layer' | 'tematik';
export type MapTheme = 'administrasi' | 'pola_ruang' | 'struktur_ruang';

export interface AturanZonasiItem {
  kodeZona: string;
  namaKawasan: string;
  luasTotal: string;
  rujukanLuas: string;
  lokasi: string;
  rujukanPemanfaatan: string;
  ketentuanPemanfaatan: {
    diperbolehkan?: string[];
    diperbolehkanBersyarat?: string[];
    dilarang?: string[];
    wajib?: string[];
    pengecualian?: string[];
    intensitas?: string;
    jarakAman?: string;
  };
  intensitasBangunan?: {
    kdbMax: number;
    klbMax: number;
    kdhMin: number;
    gsbMin: number;
  };
  color: string;
  borderColor: string;
  category: 'Kawasan Lindung' | 'Kawasan Budi Daya';
}

// DATABASE INFORMASI ZONASI (Berdasarkan PERDA Bone Bolango No. 5 Tahun 2021)
export const aturanZonasi: Record<string, AturanZonasiItem> = {
  // 1. Kode Zona: "TN" (Taman Nasional)
  TN: {
    kodeZona: 'TN',
    namaKawasan: 'Taman Nasional (Bogani Nani Wartabone)',
    luasTotal: '± 104.859 Hektar',
    rujukanLuas: 'Pasal 29, Hal 25',
    lokasi: 'Bulango Ulu, Bulango Timur, Tilongkabila, Suwawa, Suwawa Tengah, Suwawa Timur, Bone Raya, Bone, Pinogu.',
    rujukanPemanfaatan: 'Pasal 57, Hal 60-62',
    ketentuanPemanfaatan: {
      diperbolehkan: [
        'Penelitian',
        'Pendidikan konservasi alam'
      ],
      diperbolehkanBersyarat: [
        'Wisata alam terbatas dengan menjaga kelestarian fungsi lindung'
      ],
      dilarang: [
        'Merusak bentang alam',
        'Mengurangi daya dukung lingkungan',
        'Memanfaatkan biota dilindungi'
      ],
      intensitas: 'KDB Maks 10%, KLB Maks 0,1, KDH Min 90%.'
    },
    intensitasBangunan: {
      kdbMax: 10,
      klbMax: 0.1,
      kdhMin: 90,
      gsbMin: 50
    },
    color: '#052e16',
    borderColor: '#000000',
    category: 'Kawasan Lindung'
  },

  // 2. Kode Zona: "HL" (Hutan Lindung)
  HL: {
    kodeZona: 'HL',
    namaKawasan: 'Hutan Lindung',
    luasTotal: '± 15.630 Hektar',
    rujukanLuas: 'Pasal 26, Hal 24',
    lokasi: 'Bulango Utara, Bulango Ulu, Botupingge, Suwawa Selatan, Suwawa Timur, Kabila Bone, Bone Pantai, Bone.',
    rujukanPemanfaatan: 'Pasal 54, Hal 52-53',
    ketentuanPemanfaatan: {
      diperbolehkan: [
        'Kegiatan konservasi dan perlindungan hutan'
      ],
      diperbolehkanBersyarat: [
        'Wisata alam',
        'Penelitian',
        'Pemanfaatan oleh penduduk asli (luasan tetap)',
        'Latihan militer (tanpa merusak vegetasi)'
      ],
      dilarang: [
        'Penambangan yang merusak akuifer/tanah',
        'Kegiatan yang mengurangi luas kawasan hutan'
      ]
    },
    intensitasBangunan: {
      kdbMax: 0,
      klbMax: 0,
      kdhMin: 100,
      gsbMin: 30
    },
    color: '#166534',
    borderColor: '#14532d',
    category: 'Kawasan Lindung'
  },

  // 3. Kode Zona: "PK" (Permukiman Perkotaan)
  PK: {
    kodeZona: 'PK',
    namaKawasan: 'Kawasan Permukiman Perkotaan',
    luasTotal: '± 4.087 Hektar',
    rujukanLuas: 'Pasal 38, Hal 29-30',
    lokasi: 'Suwawa, Tapa, Tilongkabila, Kabila, Bone Raya.',
    rujukanPemanfaatan: 'Pasal 45, Hal 33-34',
    ketentuanPemanfaatan: {
      diperbolehkan: [
        'Pemanfaatan lahan perkotaan dengan fasilitas pemerintahan/swasta'
      ],
      wajib: [
        'Penyediaan RTH minimal 30% (20% publik, 10% privat)'
      ],
      intensitas: 'Sedang-tinggi, diperbolehkan bangunan bertingkat.'
    },
    intensitasBangunan: {
      kdbMax: 60,
      klbMax: 3.0,
      kdhMin: 20,
      gsbMin: 5
    },
    color: '#e11d48',
    borderColor: '#be123c',
    category: 'Kawasan Budi Daya'
  },

  // 4. Kode Zona: "P-1" (Kawasan Tanaman Pangan)
  'P-1': {
    kodeZona: 'P-1',
    namaKawasan: 'Kawasan Tanaman Pangan (KP2B)',
    luasTotal: '± 3.347 Hektar',
    rujukanLuas: 'Pasal 33, Hal 27',
    lokasi: 'Tersebar di 14 Kecamatan (Bulango Utara, Tapa, Bulango Ulu, Bulango Timur, Bulango Selatan, Tilongkabila, Kabila, Suwawa, Suwawa Tengah, Suwawa Selatan, Suwawa Timur, Botupingge, Bone Raya, Pinogu).',
    rujukanPemanfaatan: 'Pasal 61, Hal 74-75',
    ketentuanPemanfaatan: {
      diperbolehkan: [
        'Pertanian tanaman pangan',
        'Infrastruktur irigasi'
      ],
      dilarang: [
        'Pengembangan kawasan terbangun di lahan irigasi',
        'Alih fungsi Lahan Pertanian Pangan Berkelanjutan (LP2B)'
      ],
      pengecualian: [
        'Alih fungsi hanya untuk kepentingan umum (jalan, waduk, listrik) dengan syarat menyediakan lahan pengganti'
      ]
    },
    intensitasBangunan: {
      kdbMax: 20,
      klbMax: 0.2,
      kdhMin: 80,
      gsbMin: 10
    },
    color: '#facc15',
    borderColor: '#ca8a04',
    category: 'Kawasan Budi Daya'
  },

  // 5. Kode Zona: "MN" (Pertambangan Mineral)
  MN: {
    kodeZona: 'MN',
    namaKawasan: 'Pertambangan Mineral Logam/Batuan',
    luasTotal: '± 6.658 Hektar',
    rujukanLuas: 'Pasal 35, Hal 28',
    lokasi: 'Bone, Bone Pantai, Bone Raya, Botupingge, Bulawa, Kabila Bone, Suwawa Selatan, Suwawa Timur, Pinogu, dll.',
    rujukanPemanfaatan: 'Pasal 63, Hal 80-81',
    ketentuanPemanfaatan: {
      diperbolehkan: [
        'Eksplorasi',
        'Eksploitasi',
        'Pengolahan (wajib Izin Usaha Pertambangan)'
      ],
      dilarang: [
        'Penambangan tanpa izin',
        'Di daerah rawan bencana',
        'Lereng curam (>40%)',
        'Tanpa reklamasi pasca tambang'
      ],
      jarakAman: '1-2 km dari permukiman (jika pakai peledak) atau minimal 500 meter (tanpa peledak).'
    },
    intensitasBangunan: {
      kdbMax: 30,
      klbMax: 0.5,
      kdhMin: 70,
      gsbMin: 25
    },
    color: '#57534e',
    borderColor: '#292524',
    category: 'Kawasan Budi Daya'
  },

  // Zona Tambahan RTRW Bone Bolango
  SP: {
    kodeZona: 'SP',
    namaKawasan: 'Sempadan Pantai',
    luasTotal: '± 717 Hektar',
    rujukanLuas: 'Pasal 28, Hal 24',
    lokasi: 'Pesisir Kabila Bone, Bone Pantai, Bulawa, Bone, Bone Raya.',
    rujukanPemanfaatan: 'Pasal 55, Hal 54-56',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Pelindung pantai', 'Penanaman mangrove/vegetasi pantai', 'Fasilitas keselamatan pelayaran'],
      diperbolehkanBersyarat: ['Pariwisata bahari ramah lingkungan', 'Dermaga nelayan tradisional'],
      dilarang: ['Pembangunan hunian permanen', 'Penambangan pasir pantai', 'Kegiatan yang mempercepat abrasi pantai']
    },
    intensitasBangunan: { kdbMax: 10, klbMax: 0.1, kdhMin: 90, gsbMin: 100 },
    color: '#38bdf8',
    borderColor: '#0284c7',
    category: 'Kawasan Lindung'
  },
  SS: {
    kodeZona: 'SS',
    namaKawasan: 'Sempadan Sungai',
    luasTotal: '± 3.512 Hektar',
    rujukanLuas: 'Pasal 27, Hal 24',
    lokasi: 'Koridor sungai DAS Bone, DAS Bulango, dan anak sungai di seluruh kecamatan.',
    rujukanPemanfaatan: 'Pasal 55, Hal 56-58',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Reboisasi bantaran', 'Pengendali banjir dan tanggul', 'Bangunan intake air baku'],
      diperbolehkanBersyarat: ['Jalan inspeksi sungai', 'Jembatan penyeberangan'],
      dilarang: ['Mendirikan bangunan tempat tinggal', 'Pembuangan limbah cair/padat ke badan air']
    },
    intensitasBangunan: { kdbMax: 5, klbMax: 0.1, kdhMin: 95, gsbMin: 50 },
    color: '#0ea5e9',
    borderColor: '#0369a1',
    category: 'Kawasan Lindung'
  },
  DW: {
    kodeZona: 'DW',
    namaKawasan: 'Kawasan Sekitar Danau/Waduk',
    luasTotal: '± 450 Hektar',
    rujukanLuas: 'Pasal 28, Hal 25',
    lokasi: 'Danau Perintis (Suwawa) dan Waduk Bendungan Bulango Ulu.',
    rujukanPemanfaatan: 'Pasal 56, Hal 58-60',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Konservasi sempadan danau/waduk', 'RTH tepian air'],
      diperbolehkanBersyarat: ['Wisata tirta terbatas', 'Penelitian hidrologi'],
      dilarang: ['Keramba apung liar melebihi daya tampung', 'Pencemaran air limbah domestik']
    },
    intensitasBangunan: { kdbMax: 10, klbMax: 0.1, kdhMin: 90, gsbMin: 50 },
    color: '#60a5fa',
    borderColor: '#2563eb',
    category: 'Kawasan Lindung'
  },
  'LGE-4': {
    kodeZona: 'LGE-4',
    namaKawasan: 'Kawasan Imbuhan Air Tanah',
    luasTotal: '± 1.250 Hektar',
    rujukanLuas: 'Pasal 30, Hal 26',
    lokasi: 'Cagar alam geologi dan zona resapan air pegunungan Bone Bolango.',
    rujukanPemanfaatan: 'Pasal 58, Hal 63-65',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Sumur resapan', 'Penghijauan pohon penyerap air', 'RTH lindung'],
      dilarang: ['Pengeboran air tanah tak terkendali', 'Penutupan lahan oleh lapisan kedap air']
    },
    intensitasBangunan: { kdbMax: 10, klbMax: 0.1, kdhMin: 90, gsbMin: 20 },
    color: '#fef08a',
    borderColor: '#ca8a04',
    category: 'Kawasan Lindung'
  },
  CB: {
    kodeZona: 'CB',
    namaKawasan: 'Cagar Budaya & Spiritual',
    luasTotal: '± 85 Hektar',
    rujukanLuas: 'Pasal 31, Hal 26',
    lokasi: 'Situs makam pahlawan/raja, benteng bersejarah, dan kearifan lokal Suwawa & Tapa.',
    rujukanPemanfaatan: 'Pasal 59, Hal 65-67',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Pelestarian cagar budaya', 'Pendidikan sejarah', 'Wisata religi beradab'],
      dilarang: ['Merusak struktur peninggalan', 'Membangun fisik yang mengubah estetika situs']
    },
    intensitasBangunan: { kdbMax: 20, klbMax: 0.2, kdhMin: 80, gsbMin: 15 },
    color: '#b45309',
    borderColor: '#78350f',
    category: 'Kawasan Lindung'
  },
  KHP: {
    kodeZona: 'KHP',
    namaKawasan: 'Kawasan Hutan Produksi (HPT / HP)',
    luasTotal: '± 5.792 Hektar',
    rujukanLuas: 'Pasal 32, Hal 26',
    lokasi: 'Suwawa Timur, Pinogu, Bulawa, Bone Raya.',
    rujukanPemanfaatan: 'Pasal 60, Hal 68-73',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Pemanfaatan hasil hutan kayu berizin', 'Hasil hutan bukan kayu (HHBK)', 'Agroforestri'],
      diperbolehkanBersyarat: ['Perhutanan sosial', 'Wisata alam hutan'],
      dilarang: ['Penebangan liar (illegal logging)', 'Pembakaran lahan hutan']
    },
    intensitasBangunan: { kdbMax: 5, klbMax: 0.05, kdhMin: 95, gsbMin: 25 },
    color: '#86efac',
    borderColor: '#22c55e',
    category: 'Kawasan Budi Daya'
  },
  'P-3': {
    kodeZona: 'P-3',
    namaKawasan: 'Kawasan Perkebunan',
    luasTotal: '± 18.230 Hektar',
    rujukanLuas: 'Pasal 34, Hal 27',
    lokasi: 'Bone Pantai, Bulawa, Bone, Bone Raya, Kabila Bone, Suwawa Selatan, Botupingge.',
    rujukanPemanfaatan: 'Pasal 62, Hal 76-78',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Budidaya kelapa, cengkeh, kopi, kakao, pala', 'Pengolahan pasca panen'],
      dilarang: ['Penggunaan pestisida berlebih yang mencemari air', 'Alih fungsi ke perumahan tanpa izin']
    },
    intensitasBangunan: { kdbMax: 20, klbMax: 0.2, kdhMin: 80, gsbMin: 10 },
    color: '#ea580c',
    borderColor: '#c2410c',
    category: 'Kawasan Budi Daya'
  },
  'P-4': {
    kodeZona: 'P-4',
    namaKawasan: 'Kawasan Peternakan',
    luasTotal: '± 1.150 Hektar',
    rujukanLuas: 'Pasal 34, Hal 28',
    lokasi: 'Sentra peternakan sapi Bulango Selatan, Bulango Ulu, Tilongkabila, Suwawa.',
    rujukanPemanfaatan: 'Pasal 62, Hal 78-79',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Padang penggembalaan', 'Kandang ternak higienis', 'Pengolahan biogas limbah ternak'],
      dilarang: ['Pembuangan kotoran langsung ke sungai tanpa pengolahan']
    },
    intensitasBangunan: { kdbMax: 30, klbMax: 0.3, kdhMin: 70, gsbMin: 15 },
    color: '#78350f',
    borderColor: '#451a03',
    category: 'Kawasan Budi Daya'
  },
  'IK-2': {
    kodeZona: 'IK-2',
    namaKawasan: 'Kawasan Perikanan Budidaya',
    luasTotal: '± 820 Hektar',
    rujukanLuas: 'Pasal 36, Hal 28',
    lokasi: 'Pesisir Teluk Tomini (Bone Pantai, Bone, Bulawa) dan budidaya air tawar Bulango.',
    rujukanPemanfaatan: 'Pasal 64, Hal 82-84',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Tambak perikanan ramah lingkungan', 'Balai benih ikan', 'Tempat Pelelangan Ikan (TPI)'],
      dilarang: ['Penggunaan bahan kimia terlarang/tuba', 'Merusak terumbu karang']
    },
    intensitasBangunan: { kdbMax: 30, klbMax: 0.3, kdhMin: 70, gsbMin: 15 },
    color: '#06b6d4',
    borderColor: '#0891b2',
    category: 'Kawasan Budi Daya'
  },
  PTL: {
    kodeZona: 'PTL',
    namaKawasan: 'Kawasan Pembangkit Tenaga Listrik',
    luasTotal: '± 120 Hektar',
    rujukanLuas: 'Pasal 37, Hal 29',
    lokasi: 'PLTU Kabila Bone, PLTP Suwawa, PLTMH, Gardu Induk.',
    rujukanPemanfaatan: 'Pasal 65, Hal 84-86',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Fasilitas pembangkit listrik dan gardu induk', 'Koridor transmisi SUTT/SUTET'],
      dilarang: ['Membangun rumah di ruang bebas (ROW) SUTT', 'Aktivitas yang mengganggu keandalan transmisi']
    },
    intensitasBangunan: { kdbMax: 50, klbMax: 1.0, kdhMin: 30, gsbMin: 20 },
    color: '#eab308',
    borderColor: '#ca8a04',
    category: 'Kawasan Budi Daya'
  },
  KPI: {
    kodeZona: 'KPI',
    namaKawasan: 'Kawasan Peruntukan Industri',
    luasTotal: '± 350 Hektar',
    rujukanLuas: 'Pasal 37, Hal 29',
    lokasi: 'Kabila Bone, Bone Raya, Suwawa.',
    rujukanPemanfaatan: 'Pasal 65, Hal 86-88',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Industri pengolahan perikanan & agro', 'Gudang logistik', 'Wajib IPAL terpadu'],
      dilarang: ['Industri polutif tanpa amdal', 'Membuang limbah B3 tanpa izin']
    },
    intensitasBangunan: { kdbMax: 60, klbMax: 1.8, kdhMin: 20, gsbMin: 15 },
    color: '#c084fc',
    borderColor: '#9333ea',
    category: 'Kawasan Budi Daya'
  },
  W: {
    kodeZona: 'W',
    namaKawasan: 'Kawasan Pariwisata',
    luasTotal: '± 680 Hektar',
    rujukanLuas: 'Pasal 39, Hal 30',
    lokasi: 'Wisata Olele (Kabila Bone), Hiu Paus Botubarani, Benteng Ulantha (Suwawa), Pemandian Lombongo.',
    rujukanPemanfaatan: 'Pasal 67, Hal 90-93',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Fasilitas rekreasi & akomodasi wisata', 'Pusat cenderamata / UMKM'],
      dilarang: ['Pembangunan yang merusak estetika alam dan terumbu karang']
    },
    intensitasBangunan: { kdbMax: 40, klbMax: 1.2, kdhMin: 40, gsbMin: 15 },
    color: '#f59e0b',
    borderColor: '#d97706',
    category: 'Kawasan Budi Daya'
  },
  PD: {
    kodeZona: 'PD',
    namaKawasan: 'Kawasan Permukiman Perdesaan',
    luasTotal: '± 5.420 Hektar',
    rujukanLuas: 'Pasal 38, Hal 30',
    lokasi: 'Tersebar di wilayah perdesaan 18 kecamatan Kabupaten Bone Bolango.',
    rujukanPemanfaatan: 'Pasal 66, Hal 88-90',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Hunian perdesaan kepadatan rendah', 'Fasilitas sosial, puskesmas, sekolah', 'Home industry'],
      dilarang: ['Alih fungsi lahan LP2B tanpa izin', 'Pencemaran sumber air minum warga']
    },
    intensitasBangunan: { kdbMax: 50, klbMax: 1.0, kdhMin: 40, gsbMin: 5 },
    color: '#fef08a',
    borderColor: '#eab308',
    category: 'Kawasan Budi Daya'
  },
  HK: {
    kodeZona: 'HK',
    namaKawasan: 'Kawasan Pertahanan dan Keamanan',
    luasTotal: '± 95 Hektar',
    rujukanLuas: 'Pasal 40, Hal 31',
    lokasi: 'Pos Koramil, Polsek, pangkalan militer pertahanan negara.',
    rujukanPemanfaatan: 'Pasal 68, Hal 94-95',
    ketentuanPemanfaatan: {
      diperbolehkan: ['Instalasi militer, pertahanan, dan kepolisian'],
      dilarang: ['Aktivitas sipil tanpa izin di zona steril militer']
    },
    intensitasBangunan: { kdbMax: 40, klbMax: 1.0, kdhMin: 40, gsbMin: 20 },
    color: '#65a30d',
    borderColor: '#3f6212',
    category: 'Kawasan Budi Daya'
  }
};

// Helper lookup to match any code or feature attribute
export const getAturanZonasi = (rawCodeOrFeature: any): AturanZonasiItem => {
  let code = '';
  if (typeof rawCodeOrFeature === 'string') {
    code = rawCodeOrFeature.trim().toUpperCase();
  } else if (rawCodeOrFeature && typeof rawCodeOrFeature === 'object') {
    const props = rawCodeOrFeature.properties || rawCodeOrFeature;
    const extracted =
      props.kode_zona ||
      props.KODE_ZONA ||
      props.kode ||
      props.KODE ||
      props.zona ||
      props.ZONA ||
      props.JNSSPR ||
      props.NAMOBJ ||
      '';
    if (typeof extracted === 'string') {
      code = extracted.trim().toUpperCase();
    }
  }

  // 1. Check exact matches first
  if (aturanZonasi[code]) {
    return aturanZonasi[code];
  }

  // 2. Normalize common codes
  if (code.includes('TN') || code.includes('TAMAN NASIONAL') || code.includes('BOGANI') || code.includes('L-TN')) {
    return aturanZonasi['TN'];
  }
  if (code.includes('HL') || code.includes('HUTAN LINDUNG') || code.includes('L-HL')) {
    return aturanZonasi['HL'];
  }
  if (code === 'PK' || code.includes('PERMUKIMAN PERKOTAAN') || code.includes('B-PK')) {
    return aturanZonasi['PK'];
  }
  if (
    code === 'P-1' ||
    code === 'P1' ||
    code.includes('KP2B') ||
    code.includes('LP2B') ||
    code.includes('TANAMAN PANGAN') ||
    code.includes('B-LP2B')
  ) {
    return aturanZonasi['P-1'];
  }
  if (code.includes('MN') || code.includes('TAMBANG') || code.includes('MINERAL') || code.includes('B-MN')) {
    return aturanZonasi['MN'];
  }

  // 3. Fallback matching for other RTRW zones
  if (code.includes('SP') || code.includes('PANTAI')) return aturanZonasi['SP'];
  if (code.includes('SS') || code.includes('SUNGAI')) return aturanZonasi['SS'];
  if (code.includes('DW') || code.includes('DANAU') || code.includes('WADUK')) return aturanZonasi['DW'];
  if (code.includes('LGE') || code.includes('AIR TANAH') || code.includes('RESAPAN')) return aturanZonasi['LGE-4'];
  if (code.includes('CB') || code.includes('CAGAR')) return aturanZonasi['CB'];
  if (code.includes('KHP') || code.includes('HUTAN PRODUKSI')) return aturanZonasi['KHP'];
  if (code.includes('P-3') || code.includes('PERKEBUNAN')) return aturanZonasi['P-3'];
  if (code.includes('P-4') || code.includes('PETERNAKAN')) return aturanZonasi['P-4'];
  if (code.includes('IK') || code.includes('PERIKANAN')) return aturanZonasi['IK-2'];
  if (code.includes('PTL') || code.includes('LISTRIK')) return aturanZonasi['PTL'];
  if (code.includes('KPI') || code.includes('INDUSTRI')) return aturanZonasi['KPI'];
  if (code.includes('PARIWISATA') || code === 'W') return aturanZonasi['W'];
  if (code.includes('PERDESAAN') || code === 'PD') return aturanZonasi['PD'];
  if (code.includes('HANKAM') || code.includes('PERTAHANAN') || code === 'HK') return aturanZonasi['HK'];

  // Default fallback to PK
  return aturanZonasi['PK'];
};

interface ClickedItrResult {
  lat: number;
  lng: number;
  kecamatanName: string;
  kodeWilayah?: string;
  luasKm2?: number;
  zoneCode: string;
  zoneName: string;
  category: string;
  status: 'SESUAI' | 'BERSYARAT' | 'TIDAK_DIIZINKAN';
  statusLabel: string;
  kdbMax: number;
  klbMax: number;
  kdhMin: number;
  gsbMin: number;
  description: string;
  permitRecommendations: string[];
  aturan?: AturanZonasiItem;
  polygonProps?: any;
  isOutsideBoneBolango?: boolean;
}

// 18 Kecamatan with EXACT Hex Colors and Ordered per RTRW Hal. 106
export interface LegendKecamatanItem {
  name: string;
  codeName: string;
  colorHex: string;
  colorLabel: string;
}

export const RTRW_HAL_106_KECAMATAN_COLORS: LegendKecamatanItem[] = [
  { name: 'Kec. Suwawa', codeName: 'Suwawa', colorHex: '#B4CDA0', colorLabel: 'Hijau Teh' },
  { name: 'Kec. Suwawa Selatan', codeName: 'Suwawa Selatan', colorHex: '#D4E157', colorLabel: 'Hijau Lime' },
  { name: 'Kec. Suwawa Tengah', codeName: 'Suwawa Tengah', colorHex: '#FFA07A', colorLabel: 'Oranye Terracotta' },
  { name: 'Kec. Suwawa Timur', codeName: 'Suwawa Timur', colorHex: '#87CEEB', colorLabel: 'Biru Langit Cerah' },
  { name: 'Kec. Kabila', codeName: 'Kabila', colorHex: '#FFB6C1', colorLabel: 'Merah Muda/Pink Pastel' },
  { name: 'Kec. Tilongkabila', codeName: 'Tilongkabila', colorHex: '#AFEEEE', colorLabel: 'Hijau Tosca Muda' },
  { name: 'Kec. Botupingge', codeName: 'Botu Pingge', colorHex: '#D0F0C0', colorLabel: 'Hijau Mint' },
  { name: 'Kec. Tapa', codeName: 'Tapa', colorHex: '#FA8072', colorLabel: 'Merah Bata Muda/Salmon' },
  { name: 'Kec. Bulango Timur', codeName: 'Bulango Timur', colorHex: '#C1FFC1', colorLabel: 'Hijau Pupus' },
  { name: 'Kec. Bulango Selatan', codeName: 'Bulango Selatan', colorHex: '#E6E6FA', colorLabel: 'Ungu Lavender' },
  { name: 'Kec. Bulango Utara', codeName: 'Bulango Utara', colorHex: '#FFDAB9', colorLabel: 'Oranye Pastel' },
  { name: 'Kec. Bulango Ulu', codeName: 'Bulango Ulu', colorHex: '#FFFF99', colorLabel: 'Kuning Cerah' },
  { name: 'Kec. Kabila Bone', codeName: 'Kabila Bone', colorHex: '#8FBC8F', colorLabel: 'Hijau Zaitun Muda' },
  { name: 'Kec. Bone Raya', codeName: 'Bone Raya', colorHex: '#E0F8D8', colorLabel: 'Hijau Limau Muda' },
  { name: 'Kec. Bulawa', codeName: 'Bulawa', colorHex: '#98FB98', colorLabel: 'Hijau Muda Pastel' },
  { name: 'Kec. Bonepantai', codeName: 'Bonepantai', colorHex: '#F5DEB3', colorLabel: 'Krem/Cokelat Muda' },
  { name: 'Kec. Bone', codeName: 'Bone', colorHex: '#FFFACD', colorLabel: 'Kuning Pucat' },
  { name: 'Kec. Pinogu', codeName: 'Pinogu', colorHex: '#6B8E23', colorLabel: 'Hijau Tua/Forest Green' },
];

export interface PolaRuangCategoryStandard {
  code: string;
  subCode?: string;
  name: string;
  category: 'lindung' | 'budidaya';
  color: string;
  borderColor: string;
  colorLabel: string;
  patternLabel?: string;
  icon?: string;
  featureCount?: number;
  subcategories?: {
    code: string;
    name: string;
    color: string;
    borderColor: string;
    colorLabel: string;
    featureCount?: number;
  }[];
  description: string;
}

export const POLA_RUANG_LINDUNG_STANDAR: PolaRuangCategoryStandard[] = [
  {
    code: 'HL',
    name: 'Hutan Lindung',
    category: 'lindung',
    color: '#166534',
    borderColor: '#14532d',
    colorLabel: 'Hijau Tua',
    featureCount: 12,
    description: 'Perlindungan sistem tata air, pencegah erosi, dan mitigasi banjir.'
  },
  {
    code: 'SP',
    name: 'Sempadan Pantai',
    category: 'lindung',
    color: '#38bdf8',
    borderColor: '#0284c7',
    colorLabel: 'Biru Muda',
    patternLabel: 'Pola garis pantai',
    featureCount: 76,
    description: 'Sempadan garis pantai dan zona suaka pelestarian ekosistem pesisir Bone Bolango.'
  },
  {
    code: 'SS',
    name: 'Sempadan Sungai',
    category: 'lindung',
    color: '#0ea5e9',
    borderColor: '#0369a1',
    colorLabel: 'Biru Muda di sepanjang sungai',
    featureCount: 350,
    description: 'Sempadan sungai DAS Bone-Bulango menjaga koridor air dan sempadan banjir.'
  },
  {
    code: 'DW',
    name: 'Kawasan Sekitar Danau/Waduk',
    category: 'lindung',
    color: '#60a5fa',
    borderColor: '#2563eb',
    colorLabel: 'Biru Muda',
    featureCount: 17,
    description: 'Kawasan sempadan dan perlindungan sekitar danau serta badan air waduk.'
  },
  {
    code: 'LGE-4',
    name: 'Kawasan Imbuhan Air Tanah',
    category: 'lindung',
    color: '#fef08a',
    borderColor: '#ca8a04',
    colorLabel: 'Kuning Pucat',
    patternLabel: 'Pola tertentu (garis aksen resapan)',
    featureCount: 48,
    description: 'Kawasan imbuhan air tanah, cagar alam geologi, dan zona resapan air tanah.'
  },
  {
    code: 'TN',
    name: 'Taman Nasional',
    category: 'lindung',
    color: '#052e16',
    borderColor: '#000000',
    colorLabel: 'Hijau Gelap/Hitam',
    featureCount: 25,
    description: 'Taman Nasional Bogani Nani Wartabone (TNBNW) & suaka alam konservasi keanekaragaman hayati.'
  },
  {
    code: 'CB',
    name: 'Cagar Budaya',
    category: 'lindung',
    color: '#b45309',
    borderColor: '#78350f',
    colorLabel: 'Simbol khusus (titik/ikon)',
    icon: '🏛️',
    featureCount: 22,
    description: 'Kawasan cagar budaya, sejarah, dan nilai kearifan lokal spiritual.'
  }
];

export const POLA_RUANG_BUDIDAYA_STANDAR: PolaRuangCategoryStandard[] = [
  {
    code: 'KHP',
    name: 'Kawasan Hutan Produksi',
    category: 'budidaya',
    color: '#86efac',
    borderColor: '#22c55e',
    colorLabel: 'Hijau Muda',
    featureCount: 18,
    subcategories: [
      {
        code: 'HPT',
        name: 'Hutan Produksi Terbatas',
        color: '#86efac',
        borderColor: '#22c55e',
        colorLabel: 'Hijau Muda Pastel',
        featureCount: 14
      },
      {
        code: 'HP',
        name: 'Hutan Produksi Tetap',
        color: '#4ade80',
        borderColor: '#16a34a',
        colorLabel: 'Hijau Daun Terang',
        featureCount: 4
      }
    ],
    description: 'Kawasan hutan produksi lestari pemanfaatan hasil hutan kayu dan non-kayu.'
  },
  {
    code: 'P-1',
    name: 'Kawasan Tanaman Pangan',
    category: 'budidaya',
    color: '#facc15',
    borderColor: '#ca8a04',
    colorLabel: 'Kuning Terang',
    featureCount: 126,
    description: 'Lahan Pertanian Pangan Berkelanjutan (LP2B) produktif dilindungi.'
  },
  {
    code: 'P-3',
    name: 'Kawasan Perkebunan',
    category: 'budidaya',
    color: '#ea580c',
    borderColor: '#c2410c',
    colorLabel: 'Oranye/Cokelat Muda',
    featureCount: 401,
    description: 'Kawasan budidaya perkebunan rakyat (kelapa, cengkeh, kopi, kakao).'
  },
  {
    code: 'P-4',
    name: 'Kawasan Peternakan',
    category: 'budidaya',
    color: '#78350f',
    borderColor: '#451a03',
    colorLabel: 'Cokelat',
    featureCount: 23,
    description: 'Pengembangan kawasan sentra peternakan sapi dan ternak rakyat.'
  },
  {
    code: 'IK-2',
    name: 'Kawasan Perikanan Budidaya',
    category: 'budidaya',
    color: '#06b6d4',
    borderColor: '#0891b2',
    colorLabel: 'Biru Muda/Cyan',
    featureCount: 26,
    description: 'Budidaya perikanan air tawar/laut, sentra pengolahan, dan pelabuhan perikanan.'
  },
  {
    code: 'MN',
    name: 'Kawasan Pertambangan Mineral',
    category: 'budidaya',
    color: '#57534e',
    borderColor: '#292524',
    colorLabel: 'Abu-abu/Cokelat Tua',
    featureCount: 77,
    description: 'Wilayah peruntukan pertambangan mineral logam dan batuan berizin.'
  },
  {
    code: 'PTL',
    name: 'Kawasan Pembangkit Tenaga Listrik',
    category: 'budidaya',
    color: '#eab308',
    borderColor: '#ca8a04',
    colorLabel: 'Simbol khusus (ikon listrik)',
    icon: '⚡',
    featureCount: 2,
    description: 'Infrastruktur pembangkit dan koridor transmisi energi kelistrikan.'
  },
  {
    code: 'KPI',
    name: 'Kawasan Peruntukan Industri',
    category: 'budidaya',
    color: '#c084fc',
    borderColor: '#9333ea',
    colorLabel: 'Merah Muda/Ungu',
    featureCount: 38,
    description: 'Sentra kawasan industri besar, menengah, kecil, dan pengolahan perikanan.'
  },
  {
    code: 'W',
    name: 'Kawasan Pariwisata',
    category: 'budidaya',
    color: '#f59e0b',
    borderColor: '#d97706',
    colorLabel: 'Kuning/Oranye dengan pola',
    patternLabel: 'Pola arsiran wisata',
    featureCount: 36,
    description: 'Kawasan daya tarik pariwisata alam, budaya, dan buatan / pesisir laut.'
  },
  {
    code: 'PK',
    name: 'Permukiman Perkotaan',
    category: 'budidaya',
    color: '#e11d48',
    borderColor: '#be123c',
    colorLabel: 'Merah/Pink',
    featureCount: 794,
    description: 'Kawasan permukiman perkotaan padat fasilitas (Suwawa, Kabila, Tilongkabila, Tapa).'
  },
  {
    code: 'PD',
    name: 'Permukiman Perdesaan',
    category: 'budidaya',
    color: '#fef9c3',
    borderColor: '#eab308',
    colorLabel: 'Kuning Pucat',
    featureCount: 140,
    description: 'Lingkungan hunian perdesaan agropolitan berbasis komunitas.'
  },
  {
    code: 'HK',
    name: 'Kawasan Pertahanan dan Keamanan',
    category: 'budidaya',
    color: '#65a30d',
    borderColor: '#3f6212',
    colorLabel: 'Hijau Zaitun dengan pola',
    patternLabel: 'Pola garis pertahanan',
    featureCount: 4,
    description: 'Instalasi pangkalan militer dan pos komando kepolisian (TNI/Polri).'
  }
];

export interface PolaRuangClassifiedResult {
  code: string;
  subCode?: string;
  name: string;
  category: 'lindung' | 'budidaya';
  color: string;
  borderColor: string;
  dashArray?: string;
  colorLabel: string;
  patternLabel?: string;
  icon?: string;
  description: string;
}

// Helper to classify any feature in Pola Ruang with 100% precision
export const classifyPolaRuangFeature = (feature: any): PolaRuangClassifiedResult => {
  const p = feature?.properties || {};
  const n = (p.NAMOBJ || '').toLowerCase();
  const j = (p.JNSSPR || '').toLowerCase();
  const o1 = (p.ORDE01 || '').toLowerCase();

  // HL - Hutan Lindung: Warna Hijau Tua
  if (n.includes('hutan lindung') || (o1.includes('lindung') && n.includes('hutan') && !n.includes('produksi'))) {
    return {
      code: 'HL',
      name: 'Hutan Lindung',
      category: 'lindung' as const,
      color: '#166534',
      borderColor: '#14532d',
      colorLabel: 'Hijau Tua',
      description: 'Perlindungan sistem tata air, pencegah erosi, dan mitigasi banjir.'
    };
  }

  // TN - Taman Nasional: Warna Hijau Gelap/Hitam
  if (n.includes('taman nasional') || n.includes('tnbnw') || n.includes('bogani nani')) {
    return {
      code: 'TN',
      name: 'Taman Nasional',
      category: 'lindung' as const,
      color: '#052e16',
      borderColor: '#000000',
      colorLabel: 'Hijau Gelap/Hitam',
      description: 'Taman Nasional Bogani Nani Wartabone (TNBNW) & suaka alam konservasi hayati.'
    };
  }

  // SP - Sempadan Pantai: Warna Biru Muda dengan pola garis pantai
  if (n.includes('sempadan pantai') || n.includes('suaka pesisir') || (n.includes('pantai') && !n.includes('bonepantai'))) {
    return {
      code: 'SP',
      name: 'Sempadan Pantai',
      category: 'lindung' as const,
      color: '#38bdf8',
      borderColor: '#0284c7',
      dashArray: '5, 3',
      colorLabel: 'Biru Muda (Pola Garis Pantai)',
      description: 'Sempadan garis pantai dan zona suaka ekosistem pesisir.'
    };
  }

  // SS - Sempadan Sungai: Warna Biru Muda di sepanjang sungai
  if (n.includes('sempadan sungai') || n === 'sungai') {
    return {
      code: 'SS',
      name: 'Sempadan Sungai',
      category: 'lindung' as const,
      color: '#0ea5e9',
      borderColor: '#0369a1',
      colorLabel: 'Biru Muda di sepanjang sungai',
      description: 'Sempadan koridor sungai DAS Bone-Bulango untuk kelestarian sempadan air.'
    };
  }

  // DW - Kawasan Sekitar Danau/Waduk: Warna Biru Muda
  if (n.includes('danau') || n.includes('waduk')) {
    return {
      code: 'DW',
      name: 'Kawasan Sekitar Danau/Waduk',
      category: 'lindung' as const,
      color: '#60a5fa',
      borderColor: '#2563eb',
      colorLabel: 'Biru Muda',
      description: 'Kawasan perlindungan perairan danau dan sempadan waduk.'
    };
  }

  // LGE-4 - Kawasan Imbuhan Air Tanah: Warna Kuning Pucat dengan pola tertentu
  if (n.includes('cagar alam geologi') || n.includes('resapan air') || n.includes('mata air') || n.includes('imbuhan') || n.includes('lge-4')) {
    return {
      code: 'LGE-4',
      name: 'Kawasan Imbuhan Air Tanah',
      category: 'lindung' as const,
      color: '#fef08a',
      borderColor: '#ca8a04',
      dashArray: '4, 2',
      colorLabel: 'Kuning Pucat (Pola Tertentu)',
      description: 'Kawasan imbuhan air tanah, cagar alam geologi, dan zona resapan air.'
    };
  }

  // CB - Cagar Budaya: Simbol khusus (biasanya titik/ikon)
  if (n.includes('cagar budaya') || n.includes('spiritual') || n.includes('kearifan lokal') || n.includes('cb')) {
    return {
      code: 'CB',
      name: 'Cagar Budaya',
      category: 'lindung' as const,
      color: '#b45309',
      borderColor: '#78350f',
      icon: '🏛️',
      colorLabel: 'Simbol Khusus (Titik/Ikon Cagar Budaya)',
      description: 'Kawasan cagar budaya, sejarah, dan nilai kearifan lokal spiritual.'
    };
  }

  // KHP - Kawasan Hutan Produksi: Warna Hijau Muda (sub-kategori HPT dan HP)
  if (n.includes('hutan produksi terbatas')) {
    return {
      code: 'KHP',
      subCode: 'HPT',
      name: 'Hutan Produksi Terbatas (HPT)',
      category: 'budidaya' as const,
      color: '#86efac',
      borderColor: '#22c55e',
      colorLabel: 'Hijau Muda (HPT)',
      description: 'Kawasan Hutan Produksi Terbatas (HPT).'
    };
  }
  if (n.includes('hutan produksi')) {
    return {
      code: 'KHP',
      subCode: 'HP',
      name: 'Hutan Produksi Tetap (HP)',
      category: 'budidaya' as const,
      color: '#4ade80',
      borderColor: '#16a34a',
      colorLabel: 'Hijau Muda (HP)',
      description: 'Kawasan Hutan Produksi Tetap (HP).'
    };
  }

  // P-1 - Kawasan Tanaman Pangan: Warna Kuning Terang
  if (n.includes('tanaman pangan') || n.includes('lahan pangan') || n.includes('sawah') || n.includes('p-1') || n.includes('lp2b')) {
    return {
      code: 'P-1',
      name: 'Kawasan Tanaman Pangan',
      category: 'budidaya' as const,
      color: '#facc15',
      borderColor: '#ca8a04',
      colorLabel: 'Kuning Terang',
      description: 'Lahan Pertanian Pangan Berkelanjutan (LP2B) produktif.'
    };
  }

  // P-3 - Kawasan Perkebunan: Warna Oranye/Cokelat Muda
  if (n.includes('perkebunan') || n.includes('p-3')) {
    return {
      code: 'P-3',
      name: 'Kawasan Perkebunan',
      category: 'budidaya' as const,
      color: '#ea580c',
      borderColor: '#c2410c',
      colorLabel: 'Oranye/Cokelat Muda',
      description: 'Kawasan perkebunan rakyat komoditas kelapa, kopi, cengkeh, dan kakao.'
    };
  }

  // P-4 - Kawasan Peternakan: Warna Cokelat
  if (n.includes('peternakan') || n.includes('p-4')) {
    return {
      code: 'P-4',
      name: 'Kawasan Peternakan',
      category: 'budidaya' as const,
      color: '#78350f',
      borderColor: '#451a03',
      colorLabel: 'Cokelat',
      description: 'Kawasan budidaya dan padang penggembalaan peternakan.'
    };
  }

  // IK-2 - Kawasan Perikanan Budidaya: Warna Biru Muda/Cyan
  if (n.includes('perikanan') || n.includes('ikan') || n.includes('ik-2')) {
    return {
      code: 'IK-2',
      name: 'Kawasan Perikanan Budidaya',
      category: 'budidaya' as const,
      color: '#06b6d4',
      borderColor: '#0891b2',
      colorLabel: 'Biru Muda/Cyan',
      description: 'Kawasan budidaya perikanan air tawar/laut dan pelabuhan perikanan.'
    };
  }

  // MN - Kawasan Pertambangan Mineral: Warna Abu-abu/Cokelat Tua
  if (n.includes('pertambangan') || n.includes('mineral') || n.includes('batuan') || n.includes('mn')) {
    return {
      code: 'MN',
      name: 'Kawasan Pertambangan Mineral',
      category: 'budidaya' as const,
      color: '#57534e',
      borderColor: '#292524',
      colorLabel: 'Abu-abu/Cokelat Tua',
      description: 'Wilayah peruntukan pertambangan mineral logam dan batuan berizin.'
    };
  }

  // PTL - Kawasan Pembangkit Tenaga Listrik: Simbol khusus (ikon listrik)
  if (n.includes('pembangkit') || n.includes('listrik') || n.includes('ptl') || n.includes('plta') || n.includes('pltu')) {
    return {
      code: 'PTL',
      name: 'Kawasan Pembangkit Tenaga Listrik',
      category: 'budidaya' as const,
      color: '#eab308',
      borderColor: '#ca8a04',
      icon: '⚡',
      colorLabel: 'Simbol Khusus (Ikon Listrik ⚡)',
      description: 'Infrastruktur pembangkit dan transmisi tenaga listrik.'
    };
  }

  // KPI - Kawasan Peruntukan Industri: Warna Merah Muda/Ungu
  if (n.includes('industri') || n.includes('kpi')) {
    return {
      code: 'KPI',
      name: 'Kawasan Peruntukan Industri',
      category: 'budidaya' as const,
      color: '#c084fc',
      borderColor: '#9333ea',
      colorLabel: 'Merah Muda/Ungu',
      description: 'Sentra kawasan industri besar, menengah, dan industri kecil perikanan/agro.'
    };
  }

  // W - Kawasan Pariwisata: Warna Kuning/Oranye dengan pola
  if (n.includes('wisata') || n.includes('pariwisata')) {
    return {
      code: 'W',
      name: 'Kawasan Pariwisata',
      category: 'budidaya' as const,
      color: '#f59e0b',
      borderColor: '#d97706',
      dashArray: '5, 2',
      colorLabel: 'Kuning/Oranye dengan Pola',
      description: 'Kawasan pariwisata alam, budaya, dan buatan / pesisir.'
    };
  }

  // PK - Permukiman Perkotaan: Warna Merah/Pink
  if (n.includes('permukiman perkotaan') || n.includes('perkotaan') || n.includes('pk')) {
    return {
      code: 'PK',
      name: 'Permukiman Perkotaan',
      category: 'budidaya' as const,
      color: '#e11d48',
      borderColor: '#be123c',
      colorLabel: 'Merah/Pink',
      description: 'Kawasan permukiman perkotaan Suwawa, Kabila, Tilongkabila, Tapa.'
    };
  }

  // PD - Permukiman Perdesaan: Warna Kuning Pucat
  if (n.includes('permukiman perdesaan') || n.includes('perdesaan') || n.includes('pd')) {
    return {
      code: 'PD',
      name: 'Permukiman Perdesaan',
      category: 'budidaya' as const,
      color: '#fef9c3',
      borderColor: '#ca8a04',
      colorLabel: 'Kuning Pucat',
      description: 'Kawasan permukiman perdesaan masyarakat agropolitan.'
    };
  }

  // HK - Kawasan Pertahanan dan Keamanan: Warna Hijau Zaitun dengan pola
  if (n.includes('pertahanan') || n.includes('keamanan') || n.includes('hankam') || n.includes('militer') || n.includes('hk')) {
    return {
      code: 'HK',
      name: 'Kawasan Pertahanan dan Keamanan',
      category: 'budidaya' as const,
      color: '#65a30d',
      borderColor: '#3f6212',
      dashArray: '4, 4',
      colorLabel: 'Hijau Zaitun dengan Pola',
      description: 'Pangkalan pertahanan dan keamanan serta pos komando TNI/Polri.'
    };
  }

  // Default fallback if unknown
  return {
    code: j.includes('lindung') ? 'HL' : 'PD',
    name: p.NAMOBJ || 'Pola Ruang Lainnya',
    category: (j.includes('lindung') ? 'lindung' : 'budidaya') as 'lindung' | 'budidaya',
    color: j.includes('lindung') ? '#166534' : '#fef9c3',
    borderColor: '#334155',
    colorLabel: 'Standar Pola Ruang',
    description: p.JNSSPR || 'Kawasan peruntukan pola ruang RTRW.'
  };
};

export const CekItrPage: React.FC<CekItrPageProps> = ({
  onBackToHome,
  onOpenKkprCalc,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const inspectionMarkerRef = useRef<L.Marker | null>(null);
  const measureLineRef = useRef<L.Polyline | null>(null);
  const uploadedLayerRef = useRef<L.GeoJSON | null>(null);

  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const capitalsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const kecamatanLayersMapRef = useRef<Map<string, L.Path>>(new Map());

  // Pola Ruang & Struktur Ruang Layer Refs
  const polaRuangLayerRef = useRef<L.GeoJSON | null>(null);
  const strukturRuangLayerRef = useRef<L.GeoJSON | null>(null);

  // UI State matching Modern GIS Portal Reference
  const [activeDrawer, setActiveDrawer] = useState<DrawerTab | null>('layer');
  const [mapTheme, setMapTheme] = useState<MapTheme>('administrasi');
  const [selectedBasemap, setSelectedBasemap] = useState<'osm' | 'satelit' | 'positron' | 'topo'>('osm');

  // Layer Controls State (matching Image 2)
  const [showAdministrasi, setShowAdministrasi] = useState<boolean>(true);
  const [adminOpacity, setAdminOpacity] = useState<number>(0.75);
  const [showBatasProvinsi, setShowBatasProvinsi] = useState<boolean>(true);
  const [showBatasKabupaten, setShowBatasKabupaten] = useState<boolean>(true);
  const [showBatasKecamatan, setShowBatasKecamatan] = useState<boolean>(true);
  const [showCapitals, setShowCapitals] = useState<boolean>(true);

  // Pola Ruang Layer State
  const [showPolaRuang, setShowPolaRuang] = useState<boolean>(false);
  const [polaRuangOpacity, setPolaRuangOpacity] = useState<number>(0.75);
  const [isPolaRuangLoaded, setIsPolaRuangLoaded] = useState<boolean>(false);
  const [polaRuangFileName, setPolaRuangFileName] = useState<string>('');
  const [polaRuangSearch, setPolaRuangSearch] = useState<string>('');
  const [selectedPolaCodeFilter, setSelectedPolaCodeFilter] = useState<string | null>(null);

  // Struktur Ruang Layer State
  const [showStrukturRuang, setShowStrukturRuang] = useState<boolean>(false);
  const [strukturRuangOpacity, setStrukturRuangOpacity] = useState<number>(0.75);
  const [isStrukturRuangLoaded, setIsStrukturRuangLoaded] = useState<boolean>(false);
  const [strukturRuangFileName, setStrukturRuangFileName] = useState<string>('');
  const [strukturRuangSearch, setStrukturRuangSearch] = useState<string>('');

  const [showIzinOnline, setShowIzinOnline] = useState<boolean>(true);
  const [activeLegendSubtab, setActiveLegendSubtab] = useState<'administrasi' | 'pola_ruang' | 'struktur_ruang'>('administrasi');

  // Measure / Tool Mode
  const [isMeasuring, setIsMeasuring] = useState<boolean>(false);
  const [measurePoints, setMeasurePoints] = useState<L.LatLng[]>([]);
  const [measureDistance, setMeasureDistance] = useState<number | null>(null);

  // Live Coordinates at bottom right
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number }>({
    lat: 0.5340,
    lng: 123.2300,
  });

  // Selected ITR & Modals
  const [selectedKecamatanName, setSelectedKecamatanName] = useState<string>('');
  const [selectedItr, setSelectedItr] = useState<ClickedItrResult | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Exact Symbology mapping based on BAGIAN 1 (Hal. 106)
  const getKecamatanColor = (adm3_name: string): string => {
    const norm = adm3_name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (norm === 'bonepantai') return '#F5DEB3';
    if (norm === 'kabilabone') return '#8FBC8F';
    if (norm === 'bulawa') return '#98FB98';
    if (norm === 'bone') return '#FFFACD';
    if (norm === 'boneraya') return '#E0F8D8';
    if (norm === 'kabila') return '#FFB6C1';
    if (norm === 'tilongkabila') return '#AFEEEE';
    if (norm === 'botupingge') return '#D0F0C0';
    if (norm === 'tapa') return '#FA8072';
    if (norm === 'bulangoselatan') return '#E6E6FA';
    if (norm === 'bulangotimur') return '#C1FFC1';
    if (norm === 'bulangoutara') return '#FFDAB9';
    if (norm === 'bulangoulu') return '#FFFF99';
    if (norm === 'suwawa') return '#B4CDA0';
    if (norm === 'suwawatengah') return '#FFA07A';
    if (norm === 'suwawaselatan') return '#D4E157';
    if (norm === 'suwawatimur') return '#87CEEB';
    if (norm === 'pinogu') return '#6B8E23';
    return '#B4CDA0';
  };

  // Color mapping for Pola Ruang mode (RTRW 2021-2041 Standards)
  const getPolaRuangColor = (adm3_name: string): { color: string; label: string } => {
    const norm = adm3_name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (norm === 'pinogu' || norm === 'suwawatimur' || norm === 'bulangoulu') {
      return { color: '#052e16', label: 'TN (Taman Nasional Bogani Nani Wartabone)' };
    }
    if (norm === 'boneraya' || norm === 'bulawa' || norm === 'bonepantai' || norm === 'bone') {
      return { color: '#166534', label: 'HL (Hutan Lindung & Sempadan Pantai SP)' };
    }
    if (norm === 'kabila' || norm === 'tilongkabila' || norm === 'suwawa' || norm === 'tapa') {
      return { color: '#e11d48', label: 'PK (Permukiman Perkotaan Pusat Kawasan)' };
    }
    return { color: '#facc15', label: 'P-1 (Kawasan Tanaman Pangan LP2B)' };
  };

  // Color mapping for Struktur Ruang mode
  const getStrukturRuangColor = (adm3_name: string): { color: string; label: string } => {
    const norm = adm3_name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (norm === 'suwawa') {
      return { color: '#4f46e5', label: 'Pusat Kegiatan Lokal (PKL) Suwawa' };
    }
    if (norm === 'kabila' || norm === 'tapa' || norm === 'tilongkabila') {
      return { color: '#7c3aed', label: 'Pusat Pelayanan Kawasan (PPK)' };
    }
    return { color: '#475569', label: 'Pusat Pelayanan Lingkungan (PPL)' };
  };

  const findMatchingKecamatanPreset = (adm3_name: string): KecamatanBoneBolango => {
    const cleanName = adm3_name.toLowerCase().replace(/[^a-z]/g, '');
    const found = KECAMATAN_BONE_BOLANGO.find((k) => {
      const kClean = k.name.toLowerCase().replace('kecamatan', '').replace(/[^a-z]/g, '');
      return cleanName === kClean || cleanName.includes(kClean) || kClean.includes(cleanName);
    });
    return found || KECAMATAN_BONE_BOLANGO[0];
  };

  // Convert decimal degrees to DMS for clean display
  const toDMS = (dec: number, isLat: boolean) => {
    const dir = isLat ? (dec >= 0 ? 'N' : 'S') : dec >= 0 ? 'E' : 'W';
    const abs = Math.abs(dec);
    const deg = Math.floor(abs);
    const minDec = (abs - deg) * 60;
    const min = Math.floor(minDec);
    const sec = Math.round((minDec - min) * 60);
    return `${deg}°${min}'${sec}"${dir}`;
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initialCenter: [number, number] = [0.5340, 123.2300];
    const initialZoom = 11;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: false
    });

    // Basemap: Default Clean OpenStreetMap
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    // Track Cursor Coordinates
    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      setCursorCoords({
        lat: Number(e.latlng.lat.toFixed(5)),
        lng: Number(e.latlng.lng.toFixed(5)),
      });
    });

    // Capitals Layer Group
    const capitalsGroup = L.layerGroup().addTo(map);
    capitalsLayerGroupRef.current = capitalsGroup;
    renderCapitalMarkers(capitalsGroup);

    // Load 18 Kecamatan GeoJSON
    fetch('/batas_administrasi_lengkap.geojson')
      .then((res) => {
        if (!res.ok) throw new Error('File GeoJSON tidak ditemukan');
        return res.json();
      })
      .then((geoData) => {
        const geoLayer = L.geoJSON(geoData, {
          style: (feature) => {
            const admName = feature?.properties?.adm3_name || '';
            const color = getKecamatanColor(admName);
            return {
              color: '#000000',
              weight: 1.2,
              dashArray: '4, 4',
              opacity: 0.85,
              fillColor: color,
              fillOpacity: 0.75
            };
          },
          onEachFeature: (feature, layer) => {
            const admName = feature.properties?.adm3_name || 'Kecamatan';
            const area = feature.properties?.area_sqkm
              ? `${Number(feature.properties.area_sqkm).toFixed(2)} km²`
              : '';
            const pcode = feature.properties?.adm3_pcode || '';
            const hexColor = getKecamatanColor(admName);

            kecamatanLayersMapRef.current.set(admName, layer as L.Path);

            layer.bindTooltip(
              `<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; padding: 4px 6px; min-width: 170px; color: #0f172a;">
                <div style="display: flex; align-items: center; gap: 7px; margin-bottom: 4px;">
                  <span style="display: inline-block; width: 12px; height: 12px; border-radius: 3px; background-color: ${hexColor}; border: 1.5px solid #0f172a; flex-shrink: 0; box-shadow: 0 1px 2px rgba(0,0,0,0.15);"></span>
                  <strong style="color: #0f172a; font-size: 12px; font-weight: 800; letter-spacing: -0.01em;">Kecamatan ${admName}</strong>
                </div>
                <div style="color: #475569; font-size: 10.5px; line-height: 1.35; padding-top: 3px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between;">
                  <span>Kode: <strong style="color: #0f172a;">${pcode}</strong></span>
                  <span style="font-weight: 600; color: #2563eb;">${area}</span>
                </div>
              </div>`,
              { sticky: true }
            );

            layer.on({
              mouseover: (e) => {
                const target = e.target;
                target.setStyle({
                  weight: 2.5,
                  color: '#000000',
                  dashArray: '',
                  fillOpacity: 0.9
                });
              },
              mouseout: (e) => {
                const target = e.target;
                target.setStyle({
                  weight: 1.2,
                  color: '#000000',
                  dashArray: '4, 4',
                  fillOpacity: adminOpacity
                });
              },
              click: (e) => {
                L.DomEvent.stopPropagation(e);
                soundEffects.playClick();
                handleGeoJsonFeatureClick(feature, e.latlng, layer as L.Polygon, map);
              }
            });
          }
        }).addTo(map);

        geoJsonLayerRef.current = geoLayer;
        map.fitBounds(geoLayer.getBounds(), { padding: [25, 25] });
      })
      .catch((err) => {
        console.warn('Gagal memuat GeoJSON:', err);
      });

    // Map Click: Deselect inspection
    map.on('click', () => {
      setSelectedItr(null);
    });

    mapInstanceRef.current = map;

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update styles when Theme or Opacity changes
  useEffect(() => {
    if (!geoJsonLayerRef.current) return;

    if (!showAdministrasi) {
      if (mapInstanceRef.current && mapInstanceRef.current.hasLayer(geoJsonLayerRef.current)) {
        mapInstanceRef.current.removeLayer(geoJsonLayerRef.current);
      }
      return;
    } else {
      if (mapInstanceRef.current && !mapInstanceRef.current.hasLayer(geoJsonLayerRef.current)) {
        geoJsonLayerRef.current.addTo(mapInstanceRef.current);
      }
    }

    geoJsonLayerRef.current.setStyle((feature) => {
      const admName = feature?.properties?.adm3_name || '';

      if (mapTheme === 'administrasi') {
        const color = getKecamatanColor(admName);
        return {
          color: '#000000',
          weight: showBatasKecamatan ? 1.2 : 0,
          dashArray: '4, 4',
          opacity: 0.85,
          fillColor: color,
          fillOpacity: adminOpacity
        };
      }

      if (mapTheme === 'pola_ruang') {
        const { color } = getPolaRuangColor(admName);
        return {
          color: '#1e293b',
          weight: 1.5,
          dashArray: '',
          opacity: 0.9,
          fillColor: color,
          fillOpacity: adminOpacity
        };
      }

      // struktur_ruang
      const { color } = getStrukturRuangColor(admName);
      return {
        color: '#334155',
        weight: 1.5,
        dashArray: '6, 3',
        opacity: 0.9,
        fillColor: color,
        fillOpacity: adminOpacity
      };
    });
  }, [mapTheme, showAdministrasi, adminOpacity, showBatasKecamatan]);

  // Update Capitals Visibility
  useEffect(() => {
    if (!capitalsLayerGroupRef.current || !mapInstanceRef.current) return;
    if (showCapitals) {
      if (!mapInstanceRef.current.hasLayer(capitalsLayerGroupRef.current)) {
        capitalsLayerGroupRef.current.addTo(mapInstanceRef.current);
      }
    } else {
      if (mapInstanceRef.current.hasLayer(capitalsLayerGroupRef.current)) {
        mapInstanceRef.current.removeLayer(capitalsLayerGroupRef.current);
      }
    }
  }, [showCapitals]);

  // Pola Ruang Layer Visibility & Opacity Effect
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (!showPolaRuang) {
      if (polaRuangLayerRef.current && map.hasLayer(polaRuangLayerRef.current)) {
        map.removeLayer(polaRuangLayerRef.current);
      }
    } else {
      if (polaRuangLayerRef.current) {
        if (!map.hasLayer(polaRuangLayerRef.current)) {
          polaRuangLayerRef.current.addTo(map);
        }
        polaRuangLayerRef.current.setStyle((feature) => getPolaRuangFeatureStyle(feature, polaRuangOpacity));
      }
    }
  }, [showPolaRuang, polaRuangOpacity, selectedPolaCodeFilter]);

  // Struktur Ruang Layer Visibility & Opacity Effect
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (!showStrukturRuang) {
      if (strukturRuangLayerRef.current && map.hasLayer(strukturRuangLayerRef.current)) {
        map.removeLayer(strukturRuangLayerRef.current);
      }
    } else {
      if (strukturRuangLayerRef.current) {
        if (!map.hasLayer(strukturRuangLayerRef.current)) {
          strukturRuangLayerRef.current.addTo(map);
        }
        strukturRuangLayerRef.current.setStyle({
          fillOpacity: strukturRuangOpacity,
          opacity: 0.95
        });
      }
    }
  }, [showStrukturRuang, strukturRuangOpacity]);

  // Helper for Pola Ruang Polygons Style with 100% precision matching RTRW standards
  const getPolaRuangFeatureStyle = (feature: any, opacity: number) => {
    const c = classifyPolaRuangFeature(feature);
    const isFiltered = selectedPolaCodeFilter && c.code !== selectedPolaCodeFilter;

    return {
      color: isFiltered ? '#94a3b8' : c.borderColor,
      weight: isFiltered ? 0.7 : selectedPolaCodeFilter === c.code ? 2.5 : 1.2,
      dashArray: c.dashArray || undefined,
      fillColor: isFiltered ? '#cbd5e1' : c.color,
      fillOpacity: isFiltered ? 0.2 : opacity,
      opacity: isFiltered ? 0.35 : 0.95
    };
  };

  // Helper for Struktur Ruang Features Style matching RTRW Standard
  const getStrukturRuangFeatureStyle = (feature: any) => {
    const cat = feature?.properties?._srCategory || '';
    const name = (feature?.properties?.NAMOBJ || feature?.properties?.NAMA_ || feature?.properties?.REMARK || '').toLowerCase();

    // 1. Transportasi Darat
    if (name.includes('arteri') || name.includes('jkp-1') || name.includes('lintas')) {
      return { color: '#ea580c', weight: 4, opacity: 0.95 }; // Jalan Arteri Primer: Garis tebal Merah/Oranye
    }
    if (name.includes('kolektor primer') || name.includes('jkp-2') || (name.includes('kolektor') && !name.includes('sekunder'))) {
      return { color: '#eab308', weight: 3, opacity: 0.95 }; // Jalan Kolektor Primer: Garis tebal Kuning
    }
    if (name.includes('strategis')) {
      return { color: '#22c55e', weight: 2.2, dashArray: '6, 4', opacity: 0.95 }; // Jalan Strategis: Garis putus-putus Hijau
    }
    if (name.includes('kereta') || name.includes('ka ') || name.includes('rel')) {
      return { color: '#000000', weight: 2.5, dashArray: '8, 4', opacity: 0.95 }; // Kereta Api (Rencana): Putus-putus Hitam
    }
    if (name.includes('lokal') || name.includes('lingkungan') || name.includes('sekunder')) {
      return { color: '#facc15', weight: 1.8, opacity: 0.9 }; // Jalan Lokal Primer: Garis tipis Kuning
    }

    // 2. Transportasi Laut
    if (name.includes('pelayaran') || name.includes('alur')) {
      return { color: '#2563eb', weight: 2.2, dashArray: '6, 4', opacity: 0.95 }; // Alur Pelayaran: Putus-putus Biru
    }

    // 3. Jaringan Energi
    if (name.includes('sutt') || name.includes('sutet') || name.includes('tegangan tinggi') || name.includes('tegangan ekstra')) {
      return { color: '#dc2626', weight: 2.5, opacity: 0.95 }; // SUTT: Garis lurus panjang Merah
    }
    if (name.includes('sutm') || name.includes('tegangan menengah')) {
      return { color: '#2563eb', weight: 2, opacity: 0.95 }; // SUTM: Garis lurus panjang Biru
    }

    // 4. Telekomunikasi
    if (cat === 'telekomunikasi' || name.includes('telekomunikasi') || name.includes('serat optik') || name.includes('fiber')) {
      return { color: '#16a34a', weight: 2, dashArray: '5, 3', opacity: 0.95 }; // Serat Optik: Putus-putus Hijau
    }

    // 5. Sumber Daya Air
    if (name.includes('irigasi primer') || name.includes('primer')) {
      return { color: '#0284c7', weight: 3.5, opacity: 0.95 }; // Irigasi Primer: Garis biru tebal
    }
    if (name.includes('irigasi sekunder') || name.includes('sekunder') || name.includes('tanggul')) {
      return { color: '#38bdf8', weight: 2, opacity: 0.9 }; // Irigasi Sekunder: Garis biru tipis
    }
    if (name.includes('air baku') || name.includes('spam') || name.includes('bersih')) {
      return { color: '#0ea5e9', weight: 2.2, dashArray: '6, 3', opacity: 0.9 }; // Air Baku SPAM: Putus-putus Biru
    }
    if (cat === 'sumber_daya_air') {
      return { color: '#0284c7', weight: 2.5, opacity: 0.9 };
    }

    // 6. Prasarana Lainnya
    if (name.includes('evakuasi') || name.includes('bencana')) {
      return { color: '#f97316', weight: 2.5, dashArray: '6, 3', opacity: 0.95 }; // Jalur Evakuasi Bencana: Putus-putus Oranye/Merah
    }

    return { color: '#64748b', weight: 1.8, opacity: 0.85 };
  };

  // Helper to create point marker icon for Struktur Ruang
  const getStrukturRuangPointMarker = (feature: any, latlng: L.LatLng) => {
    const cat = feature?.properties?._srCategory || '';
    const rawName = feature?.properties?.NAMOBJ || feature?.properties?.NAMA_ || feature?.properties?.REMARK || '';
    const name = rawName.toLowerCase();
    const ket = feature?.properties?.KETOBJ || feature?.properties?.KETERANGAN || '';

    // 1. Sistem Perkotaan (Pusat Pelayanan) - Simbol Segitiga Berwarna-warni
    if (cat === 'pusat_permukiman' || name.includes('pkl') || name.includes('ppk') || name.includes('ppl')) {
      const isPkl = name.includes('pkl') || name.includes('kegiatan lokal');
      const isPpk = name.includes('ppk') || name.includes('pelayanan kawasan');
      const color = isPkl ? '#EF4444' : isPpk ? '#3B82F6' : '#10B981';
      const label = isPkl ? 'PKL' : isPpk ? 'PPK' : 'PPL';
      const coverage = isPkl
        ? 'Meliputi Kec. Suwawa, Tapa, Tilongkabila, dan Bone Raya'
        : isPpk
        ? 'Meliputi Kec. Kabila, Kabila Bone, Bone Pantai, Bone, Botupingge, dan Bulango Selatan'
        : 'Tersebar di desa-desa tertentu seperti Kaidundu, Bulotalangi, Duano, dll';

      const triangleIcon = L.divIcon({
        className: 'sr-triangle-marker',
        html: `<div style="display:flex; flex-direction:column; align-items:center; cursor:pointer;">
          <svg width="26" height="26" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35));">
            <polygon points="12,2 23,21 1,21" fill="${color}" stroke="#ffffff" stroke-width="2" />
          </svg>
          <span style="font-size:9px; font-weight:900; color:#ffffff; background-color:${color}; padding:0px 4px; border-radius:3px; margin-top:-3px; border:1px solid #ffffff; box-shadow:0 1px 3px rgba(0,0,0,0.25);">${label}</span>
        </div>`,
        iconSize: [26, 32],
        iconAnchor: [13, 19]
      });

      return L.marker(latlng, { icon: triangleIcon }).bindTooltip(
        `<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11.5px; color: #0f172a; padding: 2px; min-width: 175px;">
          <strong style="color: ${color}; font-size: 12px; font-weight: 800; display: block; margin-bottom: 2px;">[${label}] ${rawName}</strong>
          <span style="font-size: 10px; color: #475569; line-height: 1.3; display: block;">${coverage}</span>
        </div>`,
        { sticky: true }
      );
    }

    // 2. Simpul Transportasi (Terminal B, Terminal C, Stasiun KA, Pelabuhan Pengumpan, Terminal Khusus)
    if (name.includes('terminal') && (name.includes('tipe b') || name.includes(' b'))) {
      const iconB = L.divIcon({
        className: 'sr-node-marker',
        html: `<div style="width:20px; height:20px; background:#000000; color:#ffffff; font-weight:900; font-size:11px; display:flex; align-items:center; justify-content:center; border-radius:3px; border:1.5px solid #ffffff; box-shadow:0 2px 4px rgba(0,0,0,0.3);">B</div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      return L.marker(latlng, { icon: iconB }).bindTooltip(`<strong>Terminal Penumpang Tipe B</strong>`, { sticky: true });
    }

    if (name.includes('terminal') && (name.includes('tipe c') || name.includes(' c'))) {
      const iconC = L.divIcon({
        className: 'sr-node-marker',
        html: `<div style="width:20px; height:20px; background:#000000; color:#ffffff; font-weight:900; font-size:11px; display:flex; align-items:center; justify-content:center; border-radius:3px; border:1.5px solid #ffffff; box-shadow:0 2px 4px rgba(0,0,0,0.3);">C</div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      return L.marker(latlng, { icon: iconC }).bindTooltip(`<strong>Terminal Penumpang Tipe C</strong>`, { sticky: true });
    }

    if (name.includes('stasiun')) {
      const iconRail = L.divIcon({
        className: 'sr-node-marker',
        html: `<div style="width:22px; height:22px; background:#0f172a; color:#ffffff; font-size:12px; display:flex; align-items:center; justify-content:center; border-radius:50%; border:2px solid #ffffff; box-shadow:0 2px 4px rgba(0,0,0,0.3);">🚆</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });
      return L.marker(latlng, { icon: iconRail }).bindTooltip(`<strong>Stasiun Kereta Api</strong><br/>Jalur Bitung-Gorontalo-Isimu`, { sticky: true });
    }

    if (name.includes('pelabuhan pengumpan') || name.includes('pengumpan') || name.includes('ppi')) {
      const iconPort = L.divIcon({
        className: 'sr-node-marker',
        html: `<div style="width:22px; height:22px; background:#2563eb; color:#ffffff; font-size:12px; display:flex; align-items:center; justify-content:center; border-radius:50%; border:2px solid #ffffff; box-shadow:0 2px 4px rgba(0,0,0,0.3);">⚓</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });
      return L.marker(latlng, { icon: iconPort }).bindTooltip(`<strong>Pelabuhan Pengumpan Lokal</strong>`, { sticky: true });
    }

    if (name.includes('terminal khusus') || name.includes('pelabuhan khusus')) {
      const iconSpec = L.divIcon({
        className: 'sr-node-marker',
        html: `<div style="width:14px; height:14px; background:#000000; border:1.5px solid #ffffff; box-shadow:0 2px 4px rgba(0,0,0,0.3); border-radius:2px;"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });
      return L.marker(latlng, { icon: iconSpec }).bindTooltip(`<strong>Terminal Khusus (Pelabuhan Khusus)</strong><br/>Perikanan, Pertambangan & PLTU`, { sticky: true });
    }

    // 3. Jaringan Energi
    if (name.includes('gardu') || name.includes('plta') || name.includes('pltu') || name.includes('pltp') || name.includes('pltmh') || name.includes('plts') || name.includes('pltm')) {
      const iconPower = L.divIcon({
        className: 'sr-node-marker',
        html: `<div style="width:22px; height:22px; background:#eab308; color:#000000; font-size:12px; display:flex; align-items:center; justify-content:center; border-radius:50%; border:2px solid #ffffff; box-shadow:0 2px 4px rgba(0,0,0,0.3); font-weight:bold;">⚡</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });
      return L.marker(latlng, { icon: iconPower }).bindTooltip(`<strong>[Energi] ${rawName}</strong><br/>${ket}`, { sticky: true });
    }

    // 4. Telekomunikasi (Menara BTS)
    if (name.includes('bts') || name.includes('menara') || cat === 'telekomunikasi') {
      const iconBts = L.divIcon({
        className: 'sr-node-marker',
        html: `<div style="width:22px; height:22px; background:#dc2626; color:#ffffff; font-size:12px; display:flex; align-items:center; justify-content:center; border-radius:50%; border:2px solid #ffffff; box-shadow:0 2px 4px rgba(0,0,0,0.3);">🗼</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });
      return L.marker(latlng, { icon: iconBts }).bindTooltip(`<strong>Menara BTS (Jaringan Bergerak)</strong>`, { sticky: true });
    }

    // 5. Sumber Daya Air (Bendungan Bulango Ulu, Waduk, Embung)
    if (name.includes('bendungan') || name.includes('waduk') || name.includes('embung') || cat === 'titik_sda') {
      const iconDam = L.divIcon({
        className: 'sr-node-marker',
        html: `<div style="width:22px; height:22px; background:#0284c7; color:#ffffff; font-size:12px; display:flex; align-items:center; justify-content:center; border-radius:6px; border:2px solid #ffffff; box-shadow:0 2px 4px rgba(0,0,0,0.3);">🌊</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });
      return L.marker(latlng, { icon: iconDam }).bindTooltip(`<strong>Bendungan / Prasarana SDA</strong><br/>${rawName}`, { sticky: true });
    }

    // 6. Prasarana Lainnya (TPA, IPAL, B3, Evakuasi)
    if (name.includes('tpa') || name.includes('sampah')) {
      const iconTpa = L.divIcon({
        className: 'sr-node-marker',
        html: `<div style="width:22px; height:22px; background:#44403c; color:#ffffff; font-size:12px; display:flex; align-items:center; justify-content:center; border-radius:6px; border:2px solid #ffffff; box-shadow:0 2px 4px rgba(0,0,0,0.3);">🗑️</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });
      return L.marker(latlng, { icon: iconTpa }).bindTooltip(`<strong>Tempat Pemrosesan Akhir (TPA)</strong><br/>Kec. Tilongkabila`, { sticky: true });
    }

    if (name.includes('ipal') || name.includes('iplt') || (name.includes('limbah') && !name.includes('b3'))) {
      const iconIpal = L.divIcon({
        className: 'sr-node-marker',
        html: `<div style="width:22px; height:22px; background:#0e7490; color:#ffffff; font-size:12px; display:flex; align-items:center; justify-content:center; border-radius:6px; border:2px solid #ffffff; box-shadow:0 2px 4px rgba(0,0,0,0.3);">💧</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });
      return L.marker(latlng, { icon: iconIpal }).bindTooltip(`<strong>Instalasi Pengolahan Air Limbah (IPAL)</strong>`, { sticky: true });
    }

    if (name.includes('b3')) {
      const iconB3 = L.divIcon({
        className: 'sr-node-marker',
        html: `<div style="width:22px; height:22px; background:#f59e0b; color:#000000; font-size:12px; display:flex; align-items:center; justify-content:center; border-radius:6px; border:2px solid #ffffff; box-shadow:0 2px 4px rgba(0,0,0,0.3); font-weight:bold;">☣️</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });
      return L.marker(latlng, { icon: iconB3 }).bindTooltip(`<strong>Sistem Pengelolaan Limbah B3</strong><br/>Kec. Tilongkabila & Bone Raya`, { sticky: true });
    }

    if (name.includes('evakuasi')) {
      const iconEvac = L.divIcon({
        className: 'sr-node-marker',
        html: `<div style="width:22px; height:22px; background:#ea580c; color:#ffffff; font-size:12px; display:flex; align-items:center; justify-content:center; border-radius:50%; border:2px solid #ffffff; box-shadow:0 2px 4px rgba(0,0,0,0.3);">🚨</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });
      return L.marker(latlng, { icon: iconEvac }).bindTooltip(`<strong>Ruang / Titik Evakuasi Bencana</strong>`, { sticky: true });
    }

    return L.circleMarker(latlng, {
      radius: 5,
      fillColor: '#4f46e5',
      color: '#ffffff',
      weight: 1.5,
      opacity: 1,
      fillOpacity: 0.9
    }).bindTooltip(`<strong>${rawName || 'Simpul Struktur Ruang'}</strong>`, { sticky: true });
  };

  // Check and auto-load Pola Ruang and Struktur Ruang JSON from /public
  useEffect(() => {
    fetch('/pola_ruang.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        const layer = L.geoJSON(data, {
          style: (feature) => getPolaRuangFeatureStyle(feature, polaRuangOpacity),
          onEachFeature: (feature, l) => {
            const p = feature?.properties || {};
            const c = classifyPolaRuangFeature(feature);
            const name = p.NAMOBJ || p.ZONA || c.name;
            const luas = p.LUASHA ? `Luas: ${Number(p.LUASHA).toFixed(1)} Ha` : '';
            const codeBadge = `[${c.code}${c.subCode ? ` / ${c.subCode}` : ''}]`;

            l.bindTooltip(
              `<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11.5px; min-width: 195px; color: #0f172a; padding: 2px;">
                <div style="display: flex; align-items: center; gap: 7px; margin-bottom: 5px;">
                  <span style="display: inline-block; width: 13px; height: 13px; border-radius: 3px; background-color: ${c.color}; border: 1.5px solid ${c.borderColor || '#334155'}; flex-shrink: 0; box-shadow: 0 1px 2px rgba(0,0,0,0.15);"></span>
                  <strong style="color: #0f172a; font-size: 12px; font-weight: 800; letter-spacing: -0.01em;">${codeBadge} ${c.name}</strong>
                </div>
                <div style="font-size: 11px; font-weight: 600; color: #334155; line-height: 1.35; margin-bottom: 5px; word-break: break-word;">${name}</div>
                <div style="font-size: 10px; color: #475569; padding-top: 5px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 700; color: ${c.category === 'lindung' ? '#047857' : '#0284c7'};">${c.category === 'lindung' ? '🛡️ Kawasan Lindung' : '🌾 Kawasan Budi Daya'}</span>
                  <span style="font-weight: 700; color: #64748b; font-family: monospace;">${luas}</span>
                </div>
              </div>`,
              { sticky: true }
            );

            l.on('click', (e) => {
              L.DomEvent.stopPropagation(e);
              soundEffects.playClick();
              const rawKode = p.kode_zona || p.KODE_ZONA || p.KODE || p.kode || p.zona || p.ZONA || c.code;
              const aturan = getAturanZonasi(rawKode);
              const isLindung = aturan.category === 'Kawasan Lindung';
              const isTN = aturan.kodeZona === 'TN';
              const statusVal: 'SESUAI' | 'BERSYARAT' | 'TIDAK_DIIZINKAN' = isTN ? 'TIDAK_DIIZINKAN' : isLindung ? 'BERSYARAT' : 'SESUAI';
              const statusLabelVal = isTN
                ? 'Kawasan Konservasi Mutlak (TN Bogani Nani Wartabone)'
                : isLindung
                ? 'Pemanfaatan Bersyarat Ketat (Kawasan Lindung)'
                : 'Sesuai Arahan RTRW Kab. Bone Bolango';

              if (inspectionMarkerRef.current) {
                inspectionMarkerRef.current.setLatLng(e.latlng);
              } else if (mapInstanceRef.current) {
                const marker = L.marker(e.latlng, { icon: createPinIcon(aturan.color || '#2563eb') }).addTo(mapInstanceRef.current);
                inspectionMarkerRef.current = marker;
              }

              setSelectedItr({
                lat: Number(e.latlng.lat.toFixed(5)),
                lng: Number(e.latlng.lng.toFixed(5)),
                kecamatanName: p.WADMKC || p.KECAMATAN || 'Kabupaten Bone Bolango',
                kodeWilayah: aturan.kodeZona,
                luasKm2: p.LUASHA ? Number((Number(p.LUASHA) / 100).toFixed(2)) : undefined,
                zoneCode: aturan.kodeZona,
                zoneName: aturan.namaKawasan,
                category: aturan.category,
                status: statusVal,
                statusLabel: statusLabelVal,
                kdbMax: aturan.intensitasBangunan?.kdbMax ?? (isLindung ? 0 : 60),
                klbMax: aturan.intensitasBangunan?.klbMax ?? (isLindung ? 0 : 2.0),
                kdhMin: aturan.intensitasBangunan?.kdhMin ?? (isLindung ? 90 : 20),
                gsbMin: aturan.intensitasBangunan?.gsbMin ?? 5,
                description: `${aturan.namaKawasan} (${aturan.luasTotal} - ${aturan.rujukanLuas}). Ketentuan pemanfaatan: ${aturan.rujukanPemanfaatan}.`,
                permitRecommendations: aturan.ketentuanPemanfaatan.diperbolehkan || [],
                aturan: aturan,
                polygonProps: p,
                isOutsideBoneBolango: false
              });
              setActiveDrawer(null);
            });
          }
        });
        polaRuangLayerRef.current = layer;
        setIsPolaRuangLoaded(true);
        setPolaRuangFileName('pola_ruang.json');
      })
      .catch((err) => {
        console.warn('Pola Ruang belum termuat:', err);
      });

    fetch('/struktur_ruang.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        const layer = L.geoJSON(data, {
          style: (feature) => getStrukturRuangFeatureStyle(feature),
          pointToLayer: (feature, latlng) => getStrukturRuangPointMarker(feature, latlng),
          onEachFeature: (feature, l) => {
            const p = feature?.properties || {};
            const name = p.NAMOBJ || p.NAMA_ || p.REMARK || 'Jaringan Struktur Ruang';
            const cat = (p._srCategory || '').replace(/_/g, ' ');
            l.bindTooltip(
              `<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11.5px; min-width: 175px; color: #0f172a; padding: 2px;">
                <strong style="color: #0f172a; font-size: 12px; font-weight: 800; display: block; margin-bottom: 3px;">${name}</strong>
                <div style="font-size: 10px; color: #475569; padding-top: 3px; border-top: 1px solid #f1f5f9; display: flex; align-items: center; gap: 4px;">
                  <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #6366f1;"></span>
                  <span style="font-weight: 600; text-transform: capitalize;">${cat}</span>
                </div>
              </div>`,
              { sticky: true }
            );
          }
        });
        strukturRuangLayerRef.current = layer;
        setIsStrukturRuangLoaded(true);
        setStrukturRuangFileName('struktur_ruang.json');
      })
      .catch((err) => {
        console.warn('Struktur Ruang belum termuat:', err);
      });
  }, []);

  // Direct File Upload for Pola Ruang JSON
  const handleUploadPolaRuangFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !mapInstanceRef.current) return;
    const currentMap = mapInstanceRef.current;
    soundEffects.playSuccess();
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (polaRuangLayerRef.current && currentMap.hasLayer(polaRuangLayerRef.current)) {
          currentMap.removeLayer(polaRuangLayerRef.current);
        }
        const layer = L.geoJSON(parsed, {
          style: (feature) => getPolaRuangFeatureStyle(feature, polaRuangOpacity),
          onEachFeature: (feature, l) => {
            const p = feature?.properties || {};
            const c = classifyPolaRuangFeature(feature);
            const name = p.NAMOBJ || p.ZONA || c.name;
            const codeBadge = `[${c.code}${c.subCode ? ` / ${c.subCode}` : ''}]`;
            l.bindTooltip(
              `<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11.5px; min-width: 195px; color: #0f172a; padding: 2px;">
                <div style="display: flex; align-items: center; gap: 7px; margin-bottom: 5px;">
                  <span style="display: inline-block; width: 13px; height: 13px; border-radius: 3px; background-color: ${c.color}; border: 1.5px solid ${c.borderColor || '#334155'}; flex-shrink: 0; box-shadow: 0 1px 2px rgba(0,0,0,0.15);"></span>
                  <strong style="color: #0f172a; font-size: 12px; font-weight: 800; letter-spacing: -0.01em;">${codeBadge} ${c.name}</strong>
                </div>
                <div style="font-size: 11px; font-weight: 600; color: #334155; line-height: 1.35; margin-bottom: 5px; word-break: break-word;">${name}</div>
                <div style="font-size: 10px; color: #475569; padding-top: 5px; border-top: 1px solid #e2e8f0;">
                  <span style="font-weight: 700; color: ${c.category === 'lindung' ? '#047857' : '#0284c7'};">${c.category === 'lindung' ? '🛡️ Kawasan Lindung' : '🌾 Kawasan Budi Daya'}</span>
                </div>
              </div>`,
              { sticky: true }
            );

            l.on('click', (e) => {
              L.DomEvent.stopPropagation(e);
              soundEffects.playClick();
              const rawKode = p.kode_zona || p.KODE_ZONA || p.KODE || p.kode || p.zona || p.ZONA || c.code;
              const aturan = getAturanZonasi(rawKode);
              const isLindung = aturan.category === 'Kawasan Lindung';
              const isTN = aturan.kodeZona === 'TN';
              const statusVal: 'SESUAI' | 'BERSYARAT' | 'TIDAK_DIIZINKAN' = isTN ? 'TIDAK_DIIZINKAN' : isLindung ? 'BERSYARAT' : 'SESUAI';
              const statusLabelVal = isTN
                ? 'Kawasan Konservasi Mutlak (TN Bogani Nani Wartabone)'
                : isLindung
                ? 'Pemanfaatan Bersyarat Ketat (Kawasan Lindung)'
                : 'Sesuai Arahan RTRW Kab. Bone Bolango';

              if (inspectionMarkerRef.current) {
                inspectionMarkerRef.current.setLatLng(e.latlng);
              } else if (mapInstanceRef.current) {
                const marker = L.marker(e.latlng, { icon: createPinIcon(aturan.color || '#2563eb') }).addTo(mapInstanceRef.current);
                inspectionMarkerRef.current = marker;
              }

              setSelectedItr({
                lat: Number(e.latlng.lat.toFixed(5)),
                lng: Number(e.latlng.lng.toFixed(5)),
                kecamatanName: p.WADMKC || p.KECAMATAN || 'Kabupaten Bone Bolango',
                kodeWilayah: aturan.kodeZona,
                luasKm2: p.LUASHA ? Number((Number(p.LUASHA) / 100).toFixed(2)) : undefined,
                zoneCode: aturan.kodeZona,
                zoneName: aturan.namaKawasan,
                category: aturan.category,
                status: statusVal,
                statusLabel: statusLabelVal,
                kdbMax: aturan.intensitasBangunan?.kdbMax ?? (isLindung ? 0 : 60),
                klbMax: aturan.intensitasBangunan?.klbMax ?? (isLindung ? 0 : 2.0),
                kdhMin: aturan.intensitasBangunan?.kdhMin ?? (isLindung ? 90 : 20),
                gsbMin: aturan.intensitasBangunan?.gsbMin ?? 5,
                description: `${aturan.namaKawasan} (${aturan.luasTotal} - ${aturan.rujukanLuas}). Ketentuan pemanfaatan: ${aturan.rujukanPemanfaatan}.`,
                permitRecommendations: aturan.ketentuanPemanfaatan.diperbolehkan || [],
                aturan: aturan,
                polygonProps: p,
                isOutsideBoneBolango: false
              });
              setActiveDrawer(null);
            });
          }
        });
        polaRuangLayerRef.current = layer;
        layer.addTo(currentMap);
        currentMap.fitBounds(layer.getBounds(), { padding: [30, 30] });
        setIsPolaRuangLoaded(true);
        setShowPolaRuang(true);
        setPolaRuangFileName(file.name);
      } catch (err) {
        alert('File JSON Pola Ruang tidak valid!');
      }
    };
    reader.readAsText(file);
  };

  // Direct File Upload for Struktur Ruang JSON
  const handleUploadStrukturRuangFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !mapInstanceRef.current) return;
    const currentMap = mapInstanceRef.current;
    soundEffects.playSuccess();
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (strukturRuangLayerRef.current && currentMap.hasLayer(strukturRuangLayerRef.current)) {
          currentMap.removeLayer(strukturRuangLayerRef.current);
        }
        const layer = L.geoJSON(parsed, {
          style: (feature) => getStrukturRuangFeatureStyle(feature),
          pointToLayer: (feature, latlng) => getStrukturRuangPointMarker(feature, latlng),
          onEachFeature: (feature, l) => {
            const p = feature?.properties || {};
            const name = p.NAMOBJ || p.NAMA_ || p.REMARK || p.FUNGSI || 'Struktur Ruang';
            const cat = (p._srCategory || '').replace(/_/g, ' ');
            l.bindTooltip(
              `<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11.5px; min-width: 175px; color: #0f172a; padding: 2px;">
                <strong style="color: #0f172a; font-size: 12px; font-weight: 800; display: block; margin-bottom: 3px;">${name}</strong>
                <div style="font-size: 10px; color: #475569; padding-top: 3px; border-top: 1px solid #f1f5f9; display: flex; align-items: center; gap: 4px;">
                  <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #6366f1;"></span>
                  <span style="font-weight: 600; text-transform: capitalize;">${cat}</span>
                </div>
              </div>`,
              { sticky: true }
            );
          }
        });
        strukturRuangLayerRef.current = layer;
        layer.addTo(currentMap);
        currentMap.fitBounds(layer.getBounds(), { padding: [30, 30] });
        setIsStrukturRuangLoaded(true);
        setShowStrukturRuang(true);
        setStrukturRuangFileName(file.name);
      } catch (err) {
        alert('File JSON Struktur Ruang tidak valid!');
      }
    };
    reader.readAsText(file);
  };

  // Change Basemap
  const handleChangeBasemap = (type: 'osm' | 'satelit' | 'positron' | 'topo') => {
    setSelectedBasemap(type);
    soundEffects.playClick();
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let maxZoom = 19;

    if (type === 'satelit') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    } else if (type === 'positron') {
      url = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    } else if (type === 'topo') {
      url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      maxZoom = 17;
    }

    const newTile = L.tileLayer(url, { maxZoom }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newTile;
  };

  // Render Capital Markers (Bagian 2.B)
  const renderCapitalMarkers = (layerGroup: L.LayerGroup) => {
    layerGroup.clearLayers();

    // Ibu Kota Kabupaten Suwawa: Simbol lingkaran dobel bersih tanpa panel label penutup
    const regencyCapitalIcon = L.divIcon({
      className: 'capital-kabupaten-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <div style="
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid #000000;
            background: #ffffff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 12px;
              height: 12px;
              border-radius: 50%;
              border: 1.5px solid #000000;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="width: 4px; height: 4px; border-radius: 50%; background: #000000;"></div>
            </div>
          </div>
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const suwawaMarker = L.marker([0.5512, 123.1534], { icon: regencyCapitalIcon });
    suwawaMarker.bindTooltip('<strong>Ibu Kota Kabupaten Bone Bolango (Suwawa)</strong>', { sticky: true });
    layerGroup.addLayer(suwawaMarker);

    // Ibu Kota Kecamatan: Lingkaran tunggal dengan titik tengah
    KECAMATAN_BONE_BOLANGO.forEach((kec) => {
      if (kec.id === 'suwawa') return;

      const subdistrictIcon = L.divIcon({
        className: 'capital-kecamatan-marker',
        html: `
          <div style="
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 1.8px solid #000000;
            background: #ffffff;
            box-shadow: 0 1px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          ">
            <div style="width: 4px; height: 4px; border-radius: 50%; background: #000000;"></div>
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const marker = L.marker(kec.center, { icon: subdistrictIcon });
      marker.bindTooltip(`<span>Ibu Kota ${kec.name}</span>`, { sticky: true });
      layerGroup.addLayer(marker);
    });
  };

  const handleOutsideAreaClick = (latlng: L.LatLng, map: L.Map) => {
    if (inspectionMarkerRef.current) {
      inspectionMarkerRef.current.setLatLng(latlng);
    } else {
      const marker = L.marker(latlng, { icon: createPinIcon('#64748b') }).addTo(map);
      inspectionMarkerRef.current = marker;
    }

    setSelectedItr({
      lat: Number(latlng.lat.toFixed(5)),
      lng: Number(latlng.lng.toFixed(5)),
      kecamatanName: 'Di Luar Kabupaten Bone Bolango',
      zoneCode: 'LUAR-WILAYAH',
      zoneName: 'Di Luar Batas Administrasi Bone Bolango',
      category: 'Luar Yurisdiksi',
      status: 'TIDAK_DIIZINKAN',
      statusLabel: 'Di Luar Cakupan Perda RTRW Bone Bolango',
      kdbMax: 0,
      klbMax: 0,
      kdhMin: 0,
      gsbMin: 0,
      description: 'Titik di luar wilayah hukum 18 kecamatan Kabupaten Bone Bolango.',
      permitRecommendations: ['Konsultasikan dengan Dinas PUPR / PTSP Pemda Terkait'],
      isOutsideBoneBolango: true
    });
  };

  const handleGeoJsonFeatureClick = (
    feature: any,
    latlng: L.LatLng,
    layer: L.Polygon,
    map: L.Map
  ) => {
    const props = feature.properties || {};
    const admName = props.adm3_name || 'Bone Bolango';
    setSelectedKecamatanName(admName);

    if (inspectionMarkerRef.current) {
      inspectionMarkerRef.current.setLatLng(latlng);
    } else {
      const marker = L.marker(latlng, { icon: createPinIcon('#2563eb') }).addTo(map);
      inspectionMarkerRef.current = marker;
    }

    const preset = findMatchingKecamatanPreset(admName);
    const rawZone = props.kode_zona || props.KODE_ZONA || preset.zoneCode;
    const aturan = getAturanZonasi(rawZone);
    const isConservation = preset.zoneCode === 'L-TN' || admName.toLowerCase().includes('pinogu') || aturan.kodeZona === 'TN';
    const isConditional = preset.zoneCode === 'B-LP2B' || preset.zoneCode === 'L-DS' || aturan.category === 'Kawasan Lindung';

    setSelectedItr({
      lat: Number(latlng.lat.toFixed(5)),
      lng: Number(latlng.lng.toFixed(5)),
      kecamatanName: `Kecamatan ${admName}`,
      kodeWilayah: props.adm3_pcode || preset.id,
      luasKm2: props.area_sqkm ? Number(Number(props.area_sqkm).toFixed(2)) : preset.areaKm2,
      zoneCode: aturan.kodeZona,
      zoneName: aturan.namaKawasan,
      category: aturan.category,
      status: isConservation ? 'TIDAK_DIIZINKAN' : isConditional ? 'BERSYARAT' : 'SESUAI',
      statusLabel: isConservation
        ? 'Kawasan Konservasi (TN Bogani Nani Wartabone)'
        : isConditional
        ? 'Diizinkan Bersyarat (LP2B / Sempadan DAS)'
        : 'Dapat Diterbitkan ITR (Diizinkan)',
      kdbMax: aturan.intensitasBangunan?.kdbMax ?? preset.kdbMax,
      klbMax: aturan.intensitasBangunan?.klbMax ?? preset.klbMax,
      kdhMin: aturan.intensitasBangunan?.kdhMin ?? preset.kdhMin,
      gsbMin: aturan.intensitasBangunan?.gsbMin ?? preset.gsbMin,
      description: `${aturan.namaKawasan} (${aturan.luasTotal} - ${aturan.rujukanLuas}). ${preset.summary}`,
      permitRecommendations: aturan.ketentuanPemanfaatan.diperbolehkan || [
        'Konfirmasi KKPR Otomatis',
        'Persetujuan Bangunan Gedung (PBG)'
      ],
      aturan: aturan,
      polygonProps: props,
      isOutsideBoneBolango: false
    });
    setActiveDrawer(null);
  };

  const createPinIcon = (color: string) => {
    return L.divIcon({
      className: 'custom-pin-marker',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
          <div style="
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            background: ${color};
            transform: rotate(-45deg);
            border: 2.5px solid #ffffff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="width: 7px; height: 7px; background: white; border-radius: 50%; transform: rotate(45deg);"></div>
          </div>
        </div>
      `,
      iconSize: [30, 40],
      iconAnchor: [15, 36]
    });
  };

  // Zoom to Kecamatan
  const handleFocusKecamatan = (codeName: string) => {
    setSelectedKecamatanName(codeName);
    soundEffects.playClick();
    if (!mapInstanceRef.current) return;

    const layer = kecamatanLayersMapRef.current.get(codeName);
    if (layer && 'getBounds' in layer) {
      mapInstanceRef.current.fitBounds((layer as any).getBounds(), {
        padding: [50, 50],
        maxZoom: 14
      });
      (layer as any).fire('click');
    } else {
      const preset = findMatchingKecamatanPreset(codeName);
      mapInstanceRef.current.flyTo(preset.center, preset.zoom, { duration: 1.2 });
    }
  };

  // Reset to full Bone Bolango
  const handleResetHome = () => {
    soundEffects.playClick();
    setSelectedKecamatanName('');
    if (mapInstanceRef.current && geoJsonLayerRef.current) {
      mapInstanceRef.current.fitBounds(geoJsonLayerRef.current.getBounds(), {
        padding: [30, 30]
      });
    }
  };

  // Geolocation
  const handleLocateUser = () => {
    soundEffects.playClick();
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.locate({ setView: true, maxZoom: 14 });
  };

  // Upload Spasial Handler (GeoJSON file picker)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !mapInstanceRef.current) return;
    soundEffects.playSuccess();
    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        if (!mapInstanceRef.current) return;
        const currentMap = mapInstanceRef.current;

        if (uploadedLayerRef.current && currentMap.hasLayer(uploadedLayerRef.current)) {
          currentMap.removeLayer(uploadedLayerRef.current);
        }

        const newLayer = L.geoJSON(parsed, {
          style: {
            color: '#dc2626',
            weight: 2,
            fillColor: '#ef4444',
            fillOpacity: 0.5
          }
        }).addTo(currentMap);

        uploadedLayerRef.current = newLayer;
        currentMap.fitBounds(newLayer.getBounds(), { padding: [40, 40] });
        setIsUploadModalOpen(false);
      } catch (err) {
        alert('File JSON/GeoJSON tidak valid!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="relative w-screen h-screen bg-[#f1f5f9] text-slate-900 flex flex-col overflow-hidden font-sans select-none">
      {/* =========================================================================
          1. CLEAN TOP HEADER BAR (MODERN & SLIM)
         ========================================================================= */}
      <header className="relative z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between gap-3 shadow-xs font-sans">
        {/* Left: Back & Branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              onBackToHome();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
            <span>Kembali</span>
          </button>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              BB
            </div>
            <div>
              <h1 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                WebGIS Tata Ruang &bull; <span className="text-blue-600 font-extrabold">Bone Bolango</span>
              </h1>
              <span className="text-[10px] text-slate-500 font-medium">
                Peta Administrasi &bull; Perda No. 5 Tahun 2021
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Status & Theme Pill */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            18 Kecamatan Terintegrasi
          </span>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveDrawer(activeDrawer === 'layer' ? null : 'layer');
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Panel Layer</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. MAP CANVAS (FULL VIEWPORT) + FLOATING TOOLBARS
         ========================================================================= */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {/* LEAFLET MAP ELEMENT */}
        <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-10" />

        {/* -----------------------------------------------------------------------
            A. TOP-CENTER FLOATING REGION BADGE (MATCHING REFERENCE IMAGE 1 & 2)
           ----------------------------------------------------------------------- */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-6 py-2 shadow-lg flex flex-col items-center">
            <span className="font-black text-xs sm:text-sm tracking-wider uppercase text-slate-900 font-sans">
              KABUPATEN BONE BOLANGO
            </span>
            <span className="text-[10px] font-medium text-slate-500 tracking-normal">
              Provinsi Gorontalo &bull; RTRW 2021–2041
            </span>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            B. LEFT GIS FLOATING TOOLBARS (MATCHING REFERENCE IMAGE 1)
           ----------------------------------------------------------------------- */}
        {/* Top-Left Tool Group */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
          <div className="bg-white rounded-xl shadow-md border border-slate-200/80 p-1 flex flex-col gap-1">
            <button
              onClick={() => {
                soundEffects.playClick();
                mapInstanceRef.current?.zoomIn();
              }}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              title="Perbesar (Zoom In)"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                mapInstanceRef.current?.zoomOut();
              }}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              title="Perkecil (Zoom Out)"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200/80 p-1 flex flex-col gap-1">
            <button
              onClick={() => {
                soundEffects.playClick();
                handleResetHome();
              }}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              title="Home (Fokus Seluruh Wilayah)"
            >
              <Home className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={handleLocateUser}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              title="Lokasi Saya (GPS)"
            >
              <LocateFixed className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                handleResetHome();
              }}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              title="Reset Orientasi Peta"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            C. BOTTOM-LEFT FLOATING: UPLOAD SPASIAL (MATCHING REFERENCE IMAGE 1)
           ----------------------------------------------------------------------- */}
        <div className="absolute bottom-5 left-4 z-20 hidden sm:block">
          <div
            onClick={() => {
              soundEffects.playClick();
              setIsUploadModalOpen(true);
            }}
            className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-2.5 pr-4 shadow-lg flex items-center gap-3 cursor-pointer hover:shadow-xl transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {uploadedFileName ? `Aktif: ${uploadedFileName}` : 'Coba Upload Spasial'}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                GeoJSON &bull; SHP &bull; KML
              </div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            D. CENTER-BOTTOM FLOATING CAPSULE DOCK (MATCHING REFERENCE IMAGE 1 & 2)
           ----------------------------------------------------------------------- */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
          <nav className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-full px-2 py-1.5 shadow-xl flex items-center gap-1.5 sm:gap-2">
            {/* 1. Basemap */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveDrawer(activeDrawer === 'basemap' ? null : 'basemap');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeDrawer === 'basemap'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Basemap</span>
            </button>

            {/* 2. Legenda */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveDrawer(activeDrawer === 'legenda' ? null : 'legenda');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeDrawer === 'legenda'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Legenda</span>
            </button>

            {/* 3. Layer (Active in Image 2) */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveDrawer(activeDrawer === 'layer' ? null : 'layer');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeDrawer === 'layer'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              <span>Layer</span>
            </button>

            {/* 4. Tematik */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveDrawer(activeDrawer === 'tematik' ? null : 'tematik');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeDrawer === 'tematik'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Tematik</span>
            </button>
          </nav>
        </div>

        {/* -----------------------------------------------------------------------
            E. BOTTOM-RIGHT LIVE COORDINATES (MATCHING REFERENCE IMAGE 1)
           ----------------------------------------------------------------------- */}
        <div className="absolute bottom-4 right-4 z-20 hidden md:block pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-lg px-2.5 py-1.5 shadow-sm text-right font-mono text-[10px] text-slate-600 leading-tight">
            <div>
              XY: <span className="font-bold text-slate-800">{cursorCoords.lat}, {cursorCoords.lng}</span>
            </div>
            <div className="text-[9px] text-slate-500">
              DMS: {toDMS(cursorCoords.lat, true)} {toDMS(cursorCoords.lng, false)}
            </div>
            <div className="text-[8px] text-slate-400 mt-0.5">
              Skala 1:50.000 &bull; Leaflet &bull; &copy; OpenStreetMap
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            F. PANEL INFORMASI ZONASI (SIDEBAR / POP-UP DI SISI KANAN LAYAR)
            Berdasarkan PERDA Kabupaten Bone Bolango No. 5 Tahun 2021
           ----------------------------------------------------------------------- */}
        {selectedItr && (
          <aside className="fixed sm:absolute top-14 sm:top-16 bottom-3 right-0 sm:right-4 md:right-6 w-full sm:w-[410px] md:w-[450px] z-40 max-h-[calc(100vh-76px)] flex flex-col bg-white/98 backdrop-blur-xl border border-slate-300 rounded-none sm:rounded-3xl shadow-2xl overflow-hidden font-sans animate-in fade-in slide-in-from-right duration-250 select-text">
            {/* 1. STICKY HEADER DENGAN TOMBOL TUTUP (X) */}
            <div className="p-4 sm:p-4.5 border-b border-slate-200 bg-white/95 backdrop-blur-md flex items-start justify-between gap-3 shrink-0">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
                    PERDA NO. 5 TAHUN 2021
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">
                    RTRW KABUPATEN BONE BOLANGO
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  Panel Informasi Zonasi
                </h2>
              </div>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedItr(null);
                }}
                title="Tutup (X)"
                aria-label="Tutup Panel Informasi"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 2. SCROLLABLE BODY (FORMAT TEKS TEBAL & BULLET POINTS) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs text-slate-800 leading-relaxed no-scrollbar">
              
              {/* KODE ZONA & NAMA KAWASAN */}
              <div className="p-3.5 rounded-2xl border bg-slate-50/80 border-slate-200 flex items-start gap-3 shadow-2xs">
                <div
                  className="w-13 h-13 rounded-xl flex items-center justify-center font-black text-white text-base shadow-sm shrink-0 border border-black/20"
                  style={{ backgroundColor: selectedItr.aturan?.color || '#2563eb' }}
                >
                  {selectedItr.aturan?.kodeZona || selectedItr.zoneCode}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Kode Zona: <strong>&quot;{selectedItr.aturan?.kodeZona || selectedItr.zoneCode}&quot;</strong>
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {selectedItr.aturan?.category || selectedItr.category}
                    </span>
                  </div>
                  <h3 className="font-black text-sm sm:text-base text-slate-950 leading-snug">
                    {selectedItr.aturan?.namaKawasan || selectedItr.zoneName}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-black ${
                        selectedItr.status === 'SESUAI'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : selectedItr.status === 'BERSYARAT'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-rose-100 text-rose-900 border border-rose-300'
                      }`}
                    >
                      {selectedItr.status === 'SESUAI' ? '✓ ' : selectedItr.status === 'BERSYARAT' ? '⚠️ ' : '⛔ '}
                      {selectedItr.statusLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* DATA LUAS TOTAL & RUJUKAN PERDA */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between text-slate-900 pb-1.5 border-b border-slate-100">
                  <span className="font-bold text-[11px] uppercase tracking-wide text-slate-500">
                    Luas Wilayah & Legalitas
                  </span>
                  {selectedItr.aturan?.rujukanLuas && (
                    <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 font-bold">
                      Rujukan: {selectedItr.aturan.rujukanLuas}
                    </span>
                  )}
                </div>

                <div className="text-[12px] text-slate-900">
                  <strong>Luas Total:</strong>{' '}
                  <span className="font-black text-slate-950 text-sm">
                    {selectedItr.aturan?.luasTotal || 'Mengikuti Ketentuan RTRW'}
                  </span>
                  {selectedItr.aturan?.rujukanLuas && (
                    <span className="text-[11px] text-slate-500 ml-1.5">
                      (Rujukan: <strong>{selectedItr.aturan.rujukanLuas}</strong>)
                    </span>
                  )}
                </div>

                <div className="text-[11.5px] text-slate-800 pt-1 border-t border-slate-100">
                  <strong>Lokasi:</strong>{' '}
                  <span className="text-slate-700 leading-relaxed">
                    {selectedItr.aturan?.lokasi || selectedItr.kecamatanName}
                  </span>
                </div>

                {/* Detail Poligon Spasial yang Diklik */}
                <div className="bg-slate-50 rounded-xl p-2.5 text-[10.5px] font-mono text-slate-600 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <strong>Titik Koordinat:</strong> {selectedItr.lat}&deg; N, {selectedItr.lng}&deg; E
                  </div>
                  {selectedItr.luasKm2 ? (
                    <div>
                      <strong>Luas Poligon:</strong> {selectedItr.luasKm2} km²
                    </div>
                  ) : null}
                </div>
              </div>

              {/* KETENTUAN PEMANFAATAN (FORMAT TEKS TEBAL & BULLET POINTS) */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <h4 className="font-black text-xs uppercase tracking-wide text-slate-900">
                    Ketentuan Pemanfaatan
                  </h4>
                  {selectedItr.aturan?.rujukanPemanfaatan && (
                    <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                      Rujukan: {selectedItr.aturan.rujukanPemanfaatan}
                    </span>
                  )}
                </div>

                {/* 1. Diperbolehkan */}
                {selectedItr.aturan?.ketentuanPemanfaatan?.diperbolehkan && selectedItr.aturan.ketentuanPemanfaatan.diperbolehkan.length > 0 && (
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950">
                    <strong className="text-emerald-900 text-xs flex items-center gap-1.5 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      Diperbolehkan:
                    </strong>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-emerald-950 pl-1 font-medium">
                      {selectedItr.aturan.ketentuanPemanfaatan.diperbolehkan.map((item, idx) => (
                        <li key={idx} className="leading-snug">
                          <strong>{item}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 2. Diperbolehkan Bersyarat */}
                {selectedItr.aturan?.ketentuanPemanfaatan?.diperbolehkanBersyarat && selectedItr.aturan.ketentuanPemanfaatan.diperbolehkanBersyarat.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950">
                    <strong className="text-amber-900 text-xs flex items-center gap-1.5 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                      Diperbolehkan Bersyarat:
                    </strong>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-950 pl-1 font-medium">
                      {selectedItr.aturan.ketentuanPemanfaatan.diperbolehkanBersyarat.map((item, idx) => (
                        <li key={idx} className="leading-snug">
                          <strong>{item}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 3. Dilarang */}
                {selectedItr.aturan?.ketentuanPemanfaatan?.dilarang && selectedItr.aturan.ketentuanPemanfaatan.dilarang.length > 0 && (
                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-rose-950">
                    <strong className="text-rose-900 text-xs flex items-center gap-1.5 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                      Dilarang:
                    </strong>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-rose-950 pl-1 font-medium">
                      {selectedItr.aturan.ketentuanPemanfaatan.dilarang.map((item, idx) => (
                        <li key={idx} className="leading-snug">
                          <strong>{item}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 4. Wajib */}
                {selectedItr.aturan?.ketentuanPemanfaatan?.wajib && selectedItr.aturan.ketentuanPemanfaatan.wajib.length > 0 && (
                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-950">
                    <strong className="text-blue-900 text-xs flex items-center gap-1.5 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      Wajib:
                    </strong>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-blue-950 pl-1 font-medium">
                      {selectedItr.aturan.ketentuanPemanfaatan.wajib.map((item, idx) => (
                        <li key={idx} className="leading-snug">
                          <strong>{item}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 5. Pengecualian */}
                {selectedItr.aturan?.ketentuanPemanfaatan?.pengecualian && selectedItr.aturan.ketentuanPemanfaatan.pengecualian.length > 0 && (
                  <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-950">
                    <strong className="text-indigo-900 text-xs flex items-center gap-1.5 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      Pengecualian:
                    </strong>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-indigo-950 pl-1 font-medium">
                      {selectedItr.aturan.ketentuanPemanfaatan.pengecualian.map((item, idx) => (
                        <li key={idx} className="leading-snug">
                          <strong>{item}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 6. Intensitas Khusus */}
                {selectedItr.aturan?.ketentuanPemanfaatan?.intensitas && (
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 text-[11.5px] leading-relaxed">
                    <strong>Intensitas:</strong> {selectedItr.aturan.ketentuanPemanfaatan.intensitas}
                  </div>
                )}

                {/* 7. Jarak Aman */}
                {selectedItr.aturan?.ketentuanPemanfaatan?.jarakAman && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-[11.5px] leading-relaxed">
                    <strong>Jarak Aman:</strong> {selectedItr.aturan.ketentuanPemanfaatan.jarakAman}
                  </div>
                )}
              </div>

              {/* PARAMETER INTENSITAS BANGUNAN */}
              {!selectedItr.isOutsideBoneBolango && (
                <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-2xs space-y-2">
                  <span className="font-bold text-[11px] uppercase tracking-wide text-slate-500 block">
                    Parameter Intensitas Bangunan
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center font-mono py-1">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[9px] text-slate-500 font-sans">KDB Maks</div>
                      <div className="font-black text-blue-700 text-xs mt-0.5">{selectedItr.kdbMax}%</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[9px] text-slate-500 font-sans">KLB Maks</div>
                      <div className="font-black text-blue-700 text-xs mt-0.5">{selectedItr.klbMax}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[9px] text-slate-500 font-sans">KDH Min</div>
                      <div className="font-black text-blue-700 text-xs mt-0.5">{selectedItr.kdhMin}%</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[9px] text-slate-500 font-sans">GSB Min</div>
                      <div className="font-black text-blue-700 text-xs mt-0.5">{selectedItr.gsbMin}m</div>
                    </div>
                  </div>
                </div>
              )}

              {/* TOMBOL AKSI CEPAT */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onOpenKkprCalc(selectedItr.aturan?.kodeZona || selectedItr.zoneCode);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span>Simulasi KKPR</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setIsPrintModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
                >
                  <Printer className="w-4 h-4 text-blue-600" />
                  <span>Cetak ITR</span>
                </button>
              </div>

            </div>
          </aside>
        )}

        {/* -----------------------------------------------------------------------
            G. RIGHT DRAWER PANEL (MATCHING REFERENCE IMAGE 2)
           ----------------------------------------------------------------------- */}
        {activeDrawer && (
          <aside className="absolute top-0 right-0 bottom-0 w-full sm:w-[380px] md:w-[420px] bg-white border-l border-slate-200 shadow-2xl z-30 flex flex-col font-sans animate-in slide-in-from-right duration-200">
            {/* Drawer Header (Exact Match Image 2: "Layer" + Close Button) */}
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
              <h2 className="font-extrabold text-base text-slate-900 capitalize">
                {activeDrawer === 'layer'
                  ? 'Layer'
                  : activeDrawer === 'legenda'
                  ? 'Legenda Resmi (Hal. 106)'
                  : activeDrawer === 'tematik'
                  ? 'Peta Tematik'
                  : 'Pilihan Basemap'}
              </h2>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveDrawer(null);
                }}
                className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
                title="Tutup Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* =================================================================
                  TAB 1: LAYER (MATCHING REFERENCE IMAGE 2)
                 ================================================================= */}
              {activeDrawer === 'layer' && (
                <div className="space-y-4 text-xs font-sans">
                  {/* Card 1: Administrasi with Sub-layers */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-900 text-sm">
                        <input
                          type="checkbox"
                          checked={showAdministrasi}
                          onChange={(e) => setShowAdministrasi(e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span>Administrasi</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.05"
                          value={adminOpacity}
                          onChange={(e) => setAdminOpacity(Number(e.target.value))}
                          className="w-16 h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          title="Transparansi Layer"
                        />
                        <span className="text-[10px] text-slate-500 font-mono">6 layer</span>
                      </div>
                    </div>

                    {/* Sub-layers checklist (Exact replica of Image 2) */}
                    <div className="pl-6 space-y-2.5 pt-1 border-t border-slate-200/80">

                      <div className="flex items-center justify-between text-slate-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={showBatasProvinsi}
                            onChange={(e) => setShowBatasProvinsi(e.target.checked)}
                            className="w-3.5 h-3.5 rounded text-blue-600"
                          />
                          <span>Batas Provinsi</span>
                        </label>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      <div className="flex items-center justify-between text-slate-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={showBatasKabupaten}
                            onChange={(e) => setShowBatasKabupaten(e.target.checked)}
                            className="w-3.5 h-3.5 rounded text-blue-600"
                          />
                          <span>Batas Kabupaten</span>
                        </label>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      <div className="flex items-center justify-between text-slate-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={showBatasKecamatan}
                            onChange={(e) => setShowBatasKecamatan(e.target.checked)}
                            className="w-3.5 h-3.5 rounded text-blue-600"
                          />
                          <span>Batas Kecamatan (Putus-putus)</span>
                        </label>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      <div className="flex items-center justify-between text-slate-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={showAdministrasi}
                            onChange={(e) => setShowAdministrasi(e.target.checked)}
                            className="w-3.5 h-3.5 rounded text-blue-600"
                          />
                          <span>Administrasi 18 Kecamatan</span>
                        </label>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      <div className="flex items-center justify-between text-slate-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={showCapitals}
                            onChange={(e) => setShowCapitals(e.target.checked)}
                            className="w-3.5 h-3.5 rounded text-blue-600"
                          />
                          <span>Ibu Kota Suwawa & Kecamatan</span>
                        </label>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: POLA RUANG (Di Bawah Administrasi) */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-900 text-sm">
                        <input
                          type="checkbox"
                          checked={showPolaRuang}
                          onChange={(e) => {
                            setShowPolaRuang(e.target.checked);
                            soundEffects.playClick();
                          }}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span>Pola Ruang</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.05"
                          value={polaRuangOpacity}
                          onChange={(e) => setPolaRuangOpacity(Number(e.target.value))}
                          className="w-16 h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                          title="Transparansi Layer Pola Ruang"
                        />
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isPolaRuangLoaded ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {isPolaRuangLoaded ? 'Aktif' : 'JSON Ready'}
                        </span>
                      </div>
                    </div>

                    {/* Sub-layers Pola Ruang */}
                    <div className="pl-6 space-y-2 pt-1 border-t border-slate-200/80 text-[11px] text-slate-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-xs bg-[#047857]"></span>
                          <span>Kawasan Lindung (TNBNW & Hutan Lindung)</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]"></span>
                          <span>Kawasan Budi Daya (Pertanian LP2B & Permukiman)</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      {/* File Upload Trigger for Pola Ruang */}
                      <div className="pt-1.5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-mono truncate max-w-[170px]">
                          {isPolaRuangLoaded ? polaRuangFileName : 'pola_ruang.json'}
                        </span>
                        <label className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold cursor-pointer transition-colors shadow-2xs">
                          <UploadCloud className="w-3 h-3" />
                          <span>{isPolaRuangLoaded ? 'Ganti JSON' : 'Pilih JSON'}</span>
                          <input
                            type="file"
                            accept=".json,.geojson"
                            onChange={handleUploadPolaRuangFile}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: STRUKTUR RUANG (Di Bawah Pola Ruang) */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-900 text-sm">
                        <input
                          type="checkbox"
                          checked={showStrukturRuang}
                          onChange={(e) => {
                            setShowStrukturRuang(e.target.checked);
                            soundEffects.playClick();
                          }}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <span>Struktur Ruang</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.05"
                          value={strukturRuangOpacity}
                          onChange={(e) => setStrukturRuangOpacity(Number(e.target.value))}
                          className="w-16 h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          title="Transparansi Layer Struktur Ruang"
                        />
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isStrukturRuangLoaded ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {isStrukturRuangLoaded ? 'Aktif' : 'JSON Ready'}
                        </span>
                      </div>
                    </div>

                    {/* Sub-layers Struktur Ruang */}
                    <div className="pl-6 space-y-2 pt-1 border-t border-slate-200/80 text-[11px] text-slate-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]"></span>
                          <span>Sistem Pusat Pelayanan (PKL, PPK, PPL)</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-0.5 bg-[#F59E0B]"></span>
                          <span>Jaringan Transportasi (Jalan Arteri & Kolektor)</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-0.5 border-t border-dashed border-blue-600"></span>
                          <span>Jaringan Energi Listrik & Irigasi SDA</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      {/* File Upload Trigger for Struktur Ruang */}
                      <div className="pt-1.5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-mono truncate max-w-[170px]">
                          {isStrukturRuangLoaded ? strukturRuangFileName : 'struktur_ruang.json'}
                        </span>
                        <label className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold cursor-pointer transition-colors shadow-2xs">
                          <UploadCloud className="w-3 h-3" />
                          <span>{isStrukturRuangLoaded ? 'Ganti JSON' : 'Pilih JSON'}</span>
                          <input
                            type="file"
                            accept=".json,.geojson"
                            onChange={handleUploadStrukturRuangFile}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: PERIZINAN (Image 2) */}
                  <div className="pt-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2 px-1">
                      PERIZINAN & LAYANAN SPASIAL
                    </span>
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3.5 flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                        <input
                          type="checkbox"
                          checked={showIzinOnline}
                          onChange={(e) => setShowIzinOnline(e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-600"
                        />
                        <span>Pengecekan ITR & KKPR Mandiri</span>
                      </label>
                      <span className="text-[10px] text-slate-500 font-mono">Real-time</span>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================================
                  TAB 2: LEGENDA (ADMINISTRASI, POLA RUANG, STRUKTUR RUANG)
                 ================================================================= */}
              {activeDrawer === 'legenda' && (
                <div className="space-y-4 text-xs font-sans text-slate-900">
                  {/* Subtab Segmented Switcher in Legenda */}
                  <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setActiveLegendSubtab('administrasi');
                      }}
                      className={`py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        activeLegendSubtab === 'administrasi'
                          ? 'bg-white text-blue-600 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Landmark className="w-3.5 h-3.5" />
                      <span>Administrasi</span>
                    </button>

                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setActiveLegendSubtab('pola_ruang');
                      }}
                      className={`py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        activeLegendSubtab === 'pola_ruang'
                          ? 'bg-white text-emerald-600 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Trees className="w-3.5 h-3.5" />
                      <span>Pola Ruang</span>
                    </button>

                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setActiveLegendSubtab('struktur_ruang');
                      }}
                      className={`py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        activeLegendSubtab === 'struktur_ruang'
                          ? 'bg-white text-indigo-600 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Network className="w-3.5 h-3.5" />
                      <span>Struktur</span>
                    </button>
                  </div>

                  {/* -------------------------------------------------------------
                      1. LEGENDA ADMINISTRASI (STANDAR KARTOGRAFI RESMI HAL. 106)
                     ------------------------------------------------------------- */}
                  {activeLegendSubtab === 'administrasi' && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200 text-blue-900 text-[11px] leading-relaxed">
                        Legenda Administrasi mengikuti <strong>Halaman 106</strong> Dokumen Perda No. 5 Tahun 2021 tentang RTRW Kabupaten Bone Bolango 2021–2041.
                      </div>

                      {/* A. Batas Administrasi */}
                      <div className="border border-slate-200 rounded-xl p-3 bg-white">
                        <h4 className="font-bold text-[11px] uppercase tracking-wide text-slate-900 border-b border-slate-200 pb-1 mb-2">
                          A. Batas Administrasi
                        </h4>
                        <ul className="space-y-2 text-[11px] text-slate-800">
                          <li className="flex items-center gap-2.5">
                            <svg className="w-9 h-3 shrink-0" viewBox="0 0 36 10">
                              <line x1="0" y1="5" x2="36" y2="5" stroke="#000000" strokeWidth="2.8" strokeDasharray="8, 3" />
                            </svg>
                            <span>Batas Provinsi (Putus-putus tebal)</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <svg className="w-9 h-3 shrink-0" viewBox="0 0 36 10">
                              <line x1="0" y1="5" x2="36" y2="5" stroke="#000000" strokeWidth="2" strokeDasharray="9, 2, 2, 2" />
                            </svg>
                            <span>Batas Kabupaten/Kota (Putus-titik)</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <svg className="w-9 h-3 shrink-0" viewBox="0 0 36 10">
                              <line x1="0" y1="5" x2="36" y2="5" stroke="#000000" strokeWidth="1.2" strokeDasharray="4, 4" />
                            </svg>
                            <span>Batas Kecamatan (Putus-putus tipis)</span>
                          </li>
                        </ul>
                      </div>

                      {/* B. Ibu Kota Pemerintahan */}
                      <div className="border border-slate-200 rounded-xl p-3 bg-white">
                        <h4 className="font-bold text-[11px] uppercase tracking-wide text-slate-900 border-b border-slate-200 pb-1 mb-2">
                          B. Ibu Kota Pemerintahan
                        </h4>
                        <ul className="space-y-2 text-[11px] text-slate-800">
                          <li className="flex items-center gap-2.5">
                            <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20">
                              <circle cx="10" cy="10" r="8" fill="none" stroke="#000000" strokeWidth="1.6" />
                              <circle cx="10" cy="10" r="5" fill="none" stroke="#000000" strokeWidth="1.2" />
                              <circle cx="10" cy="10" r="2.2" fill="#000000" />
                            </svg>
                            <span>Ibu Kota Kabupaten (Suwawa - Lingkaran ganda)</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20">
                              <circle cx="10" cy="10" r="6.5" fill="none" stroke="#000000" strokeWidth="1.5" />
                              <circle cx="10" cy="10" r="2.2" fill="#000000" />
                            </svg>
                            <span>Ibu Kota Kecamatan (Lingkaran tunggal)</span>
                          </li>
                        </ul>
                      </div>

                      {/* C. Jalan & D. Perairan */}
                      <div className="border border-slate-200 rounded-xl p-3 bg-white">
                        <h4 className="font-bold text-[11px] uppercase tracking-wide text-slate-900 border-b border-slate-200 pb-1 mb-2">
                          C. Jalan & D. Perairan
                        </h4>
                        <ul className="space-y-2 text-[11px] text-slate-800">
                          <li className="flex items-center gap-2.5">
                            <svg className="w-9 h-3 shrink-0" viewBox="0 0 36 10">
                              <line x1="0" y1="5" x2="36" y2="5" stroke="#F59E0B" strokeWidth="3.2" />
                            </svg>
                            <span>Jalan Arteri Primer</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <svg className="w-9 h-3 shrink-0" viewBox="0 0 36 10">
                              <line x1="0" y1="5" x2="36" y2="5" stroke="#EAB308" strokeWidth="1.8" />
                            </svg>
                            <span>Jalan Kolektor Primer</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <svg className="w-9 h-3 shrink-0" viewBox="0 0 36 10">
                              <path d="M0,5 Q9,0 18,5 T36,5" fill="none" stroke="#3B82F6" strokeWidth="1.8" />
                            </svg>
                            <span>Sungai DAS Bone-Bulango</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <div className="w-6 h-3.5 bg-[#93C5FD] border border-blue-400 shrink-0"></div>
                            <span>Badan Air / Danau</span>
                          </li>
                        </ul>
                      </div>

                      {/* E. Daftar 18 Kecamatan */}
                      <div className="border border-slate-200 rounded-xl p-3 bg-white">
                        <h4 className="font-bold text-[11px] uppercase tracking-wide text-slate-900 border-b border-slate-200 pb-1 mb-2 flex items-center justify-between">
                          <span>E. Daftar 18 Kecamatan (Warna)</span>
                          <span className="text-[10px] text-slate-500 font-mono">Klik untuk fokus</span>
                        </h4>
                        <div className="space-y-1.5 text-[11px] text-slate-800 max-h-64 overflow-y-auto pr-1">
                          {RTRW_HAL_106_KECAMATAN_COLORS.map((item, idx) => (
                            <div
                              key={item.codeName}
                              onClick={() => handleFocusKecamatan(item.codeName)}
                              className={`flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group ${
                                selectedKecamatanName === item.codeName ? 'bg-blue-50 font-bold border border-blue-200' : ''
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-slate-400 w-4">{idx + 1}.</span>
                                <div
                                  className="w-4 h-4 rounded-xs shrink-0 border border-black/40 shadow-xs"
                                  style={{ backgroundColor: item.colorHex }}
                                />
                                <span className="group-hover:text-blue-600 transition-colors">
                                  {item.name}
                                </span>
                              </div>
                              <span className="text-[9px] text-slate-400 font-mono">{item.colorHex}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Elemen Pelengkap */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div className="flex flex-col items-center">
                          <svg className="w-9 h-9" viewBox="0 0 40 40">
                            <polygon points="20,2 24,18 20,15 16,18" fill="#000000" />
                            <polygon points="20,38 24,22 20,25 16,22" fill="#94a3b8" />
                            <polygon points="38,20 22,24 25,20 22,16" fill="#cbd5e1" />
                            <polygon points="2,20 18,24 15,20 18,16" fill="#cbd5e1" />
                            <circle cx="20" cy="20" r="2" fill="#000000" />
                            <text x="20" y="3" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000000" dy="-4">U</text>
                          </svg>
                          <span className="text-[8px] font-bold text-slate-700">UTARA</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-black text-slate-900 block">Skala 1 : 50.000</span>
                          <div className="mt-1 flex items-center justify-end">
                            <div className="w-5 h-2 bg-black"></div>
                            <div className="w-5 h-2 bg-white border border-black"></div>
                            <div className="w-5 h-2 bg-black"></div>
                            <div className="w-5 h-2 bg-white border border-black"></div>
                          </div>
                          <div className="flex justify-between text-[8px] text-slate-500 font-mono mt-0.5">
                            <span>0</span>
                            <span>2.5</span>
                            <span>5 km</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-[9px] text-slate-500 pt-1 leading-tight">
                        <strong>Sumber:</strong> Peta Rupa Bumi Indonesia (RBI), Badan Informasi Geospasial (BIG), Dokumen RTRW Kab. Bone Bolango 2021–2041 (Halaman 106).
                      </div>
                    </div>
                  )}

                  {/* -------------------------------------------------------------
                      2. LEGENDA POLA RUANG (SESUAI STANDAR RTRW KAB. BONE BOLANGO)
                     ------------------------------------------------------------- */}
                  {activeLegendSubtab === 'pola_ruang' && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      {/* Status / Compliance Banner */}
                      <div className="bg-emerald-50/90 p-3.5 rounded-2xl border border-emerald-300 shadow-2xs">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <div className="text-[11px] leading-relaxed text-emerald-950">
                            <strong>Standar Visual Peta Pola Ruang RTRW 2021–2041</strong>
                            <p className="text-emerald-800 text-[10px] mt-0.5">
                              Sesuai Perda No. 5/2021: 19 klasifikasi resmi dengan simbologi warna baku, pola kartografi, serta memuat 2.233 zona spasial Kabupaten Bone Bolango.
                            </p>
                          </div>
                        </div>

                        {/* Search & Filter Bar */}
                        <div className="mt-3 relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                          <input
                            type="text"
                            placeholder="Cari kode (HL, P-1, PK) atau nama kawasan..."
                            value={polaRuangSearch}
                            onChange={(e) => setPolaRuangSearch(e.target.value)}
                            className="w-full bg-white pl-8 pr-7 py-1.5 text-[11px] rounded-xl border border-emerald-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                          {polaRuangSearch && (
                            <button
                              onClick={() => setPolaRuangSearch('')}
                              className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {selectedPolaCodeFilter && (
                          <div className="mt-2 flex items-center justify-between bg-emerald-100/80 px-2 py-1 rounded-lg text-[10px] text-emerald-900 font-semibold">
                            <span>Filter Aktif: Kode [{selectedPolaCodeFilter}]</span>
                            <button
                              onClick={() => setSelectedPolaCodeFilter(null)}
                              className="text-emerald-700 hover:text-emerald-950 underline font-bold"
                            >
                              Reset Filter
                            </button>
                          </div>
                        )}
                      </div>

                      {/* BAGIAN A: LEGENDA KAWASAN LINDUNG */}
                      <div className="border border-emerald-200 rounded-2xl p-3.5 bg-white shadow-2xs space-y-2.5">
                        <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                          <div>
                            <h4 className="font-bold text-[11px] uppercase tracking-wide text-emerald-950 flex items-center gap-1.5">
                              <span>A. Legenda Kawasan Lindung</span>
                            </h4>
                            <span className="text-[10px] text-emerald-700">Warna / Simbol Konservasi & Perlindungan Lingkungan</span>
                          </div>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                            7 Simbol
                          </span>
                        </div>

                        <div className="space-y-2">
                          {POLA_RUANG_LINDUNG_STANDAR
                            .filter((item) => {
                              if (!polaRuangSearch) return true;
                              const q = polaRuangSearch.toLowerCase();
                              return (
                                item.code.toLowerCase().includes(q) ||
                                item.name.toLowerCase().includes(q) ||
                                item.colorLabel.toLowerCase().includes(q)
                              );
                            })
                            .map((item) => {
                              const isSelected = selectedPolaCodeFilter === item.code;
                              return (
                                <div
                                  key={item.code}
                                  onClick={() => {
                                    soundEffects.playClick();
                                    if (!showPolaRuang) setShowPolaRuang(true);
                                    setSelectedPolaCodeFilter(isSelected ? null : item.code);
                                  }}
                                  className={`p-2 rounded-xl border transition-all cursor-pointer group flex items-start gap-2.5 ${
                                    isSelected
                                      ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                                      : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
                                  }`}
                                >
                                  {/* Symbol Swatch */}
                                  <div className="shrink-0 mt-0.5">
                                    {item.icon ? (
                                      <div
                                        className="w-5 h-5 rounded-md flex items-center justify-center text-xs shadow-2xs border border-amber-700"
                                        style={{ backgroundColor: item.color }}
                                      >
                                        {item.icon}
                                      </div>
                                    ) : item.patternLabel ? (
                                      <div
                                        className="w-5 h-5 rounded-md border-2 relative overflow-hidden shadow-2xs"
                                        style={{
                                          backgroundColor: item.color,
                                          borderColor: item.borderColor
                                        }}
                                      >
                                        <div
                                          className="absolute inset-0 opacity-40"
                                          style={{
                                            backgroundImage:
                                              'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)'
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <div
                                        className="w-5 h-5 rounded-md shadow-2xs border"
                                        style={{
                                          backgroundColor: item.color,
                                          borderColor: item.borderColor
                                        }}
                                      />
                                    )}
                                  </div>

                                  {/* Details */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="font-mono font-black text-[11px] text-slate-900 group-hover:text-emerald-700 transition-colors">
                                          {item.code} ({item.name})
                                        </span>
                                      </div>
                                      <span className="text-[9px] font-mono text-slate-400 shrink-0">
                                        {item.color}
                                      </span>
                                    </div>
                                    <div className="text-[10px] text-slate-600 mt-0.5 font-medium">
                                      Warna: <span className="font-semibold text-slate-800">{item.colorLabel}</span>
                                      {item.patternLabel && ` &bull; ${item.patternLabel}`}
                                    </div>
                                    <div className="text-[9px] text-slate-400 mt-0.5 leading-tight flex items-center justify-between">
                                      <span>{item.description}</span>
                                      {item.featureCount && (
                                        <span className="font-mono text-emerald-800 bg-emerald-100/80 px-1.5 py-0.2 rounded ml-1 shrink-0">
                                          {item.featureCount} zona
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      {/* BAGIAN B: LEGENDA KAWASAN BUDIDAYA */}
                      <div className="border border-slate-200 rounded-2xl p-3.5 bg-white shadow-2xs space-y-2.5">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <div>
                            <h4 className="font-bold text-[11px] uppercase tracking-wide text-slate-900 flex items-center gap-1.5">
                              <span>B. Legenda Kawasan Budidaya</span>
                            </h4>
                            <span className="text-[10px] text-slate-500">Warna / Simbol Pemanfaatan, Produksi & Permukiman</span>
                          </div>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                            12 Simbol
                          </span>
                        </div>

                        <div className="space-y-2">
                          {POLA_RUANG_BUDIDAYA_STANDAR
                            .filter((item) => {
                              if (!polaRuangSearch) return true;
                              const q = polaRuangSearch.toLowerCase();
                              return (
                                item.code.toLowerCase().includes(q) ||
                                item.name.toLowerCase().includes(q) ||
                                item.colorLabel.toLowerCase().includes(q)
                              );
                            })
                            .map((item) => {
                              const isSelected = selectedPolaCodeFilter === item.code;
                              return (
                                <div
                                  key={item.code}
                                  onClick={() => {
                                    soundEffects.playClick();
                                    if (!showPolaRuang) setShowPolaRuang(true);
                                    setSelectedPolaCodeFilter(isSelected ? null : item.code);
                                  }}
                                  className={`p-2 rounded-xl border transition-all cursor-pointer group flex items-start gap-2.5 ${
                                    isSelected
                                      ? 'bg-amber-50 border-amber-500 shadow-xs'
                                      : 'border-slate-100 hover:border-amber-200 hover:bg-slate-50'
                                  }`}
                                >
                                  {/* Symbol Swatch */}
                                  <div className="shrink-0 mt-0.5">
                                    {item.icon ? (
                                      <div
                                        className="w-5 h-5 rounded-md flex items-center justify-center text-xs shadow-2xs border border-amber-600 bg-amber-400 text-slate-950 font-bold"
                                      >
                                        {item.icon}
                                      </div>
                                    ) : item.patternLabel ? (
                                      <div
                                        className="w-5 h-5 rounded-md border-2 relative overflow-hidden shadow-2xs"
                                        style={{
                                          backgroundColor: item.color,
                                          borderColor: item.borderColor
                                        }}
                                      >
                                        <div
                                          className="absolute inset-0 opacity-30"
                                          style={{
                                            backgroundImage:
                                              'repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(0,0,0,0.6) 2px, rgba(0,0,0,0.6) 4px)'
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <div
                                        className="w-5 h-5 rounded-md shadow-2xs border"
                                        style={{
                                          backgroundColor: item.color,
                                          borderColor: item.borderColor
                                        }}
                                      />
                                    )}
                                  </div>

                                  {/* Details */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="font-mono font-black text-[11px] text-slate-900 group-hover:text-amber-700 transition-colors">
                                          {item.code} ({item.name})
                                        </span>
                                      </div>
                                      <span className="text-[9px] font-mono text-slate-400 shrink-0">
                                        {item.color}
                                      </span>
                                    </div>

                                    {/* Sub-categories (e.g. HPT & HP under KHP) */}
                                    {item.subcategories && (
                                      <div className="mt-1 flex items-center gap-2 pl-1 border-l-2 border-emerald-300 py-0.5">
                                        {item.subcategories.map((sub) => (
                                          <div key={sub.code} className="flex items-center gap-1 text-[10px]">
                                            <span
                                              className="w-3 h-3 rounded-xs border border-black/30 inline-block"
                                              style={{ backgroundColor: sub.color }}
                                            />
                                            <span className="font-mono font-bold text-slate-800">{sub.code}</span>
                                            <span className="text-slate-400 font-mono text-[9px]">({sub.featureCount} zona)</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    <div className="text-[10px] text-slate-600 mt-0.5 font-medium">
                                      Warna: <span className="font-semibold text-slate-800">{item.colorLabel}</span>
                                      {item.patternLabel && ` &bull; ${item.patternLabel}`}
                                    </div>
                                    <div className="text-[9px] text-slate-400 mt-0.5 leading-tight flex items-center justify-between">
                                      <span>{item.description}</span>
                                      {item.featureCount && (
                                        <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded ml-1 shrink-0">
                                          {item.featureCount} zona
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      {/* Quick Map Controls for Pola Ruang */}
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-800">
                            Layer Pola Ruang pada Peta
                          </span>
                          <button
                            onClick={() => {
                              soundEffects.playClick();
                              setShowPolaRuang(!showPolaRuang);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                              showPolaRuang
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            {showPolaRuang ? 'Layer Aktif ✓' : 'Tampilkan Layer'}
                          </button>
                        </div>

                        {showPolaRuang && (
                          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-3">
                            <span className="text-[10px] text-slate-600 font-medium">Transparansi Poligon:</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.05"
                                value={polaRuangOpacity}
                                onChange={(e) => setPolaRuangOpacity(Number(e.target.value))}
                                className="w-24 h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                              />
                              <span className="text-[10px] font-mono text-slate-600 w-8 text-right">
                                {Math.round(polaRuangOpacity * 100)}%
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* -------------------------------------------------------------
                      3. LEGENDA STRUKTUR RUANG (SESUAI DOKUMEN RTRW & STANDAR KARTOGRAFI)
                     ------------------------------------------------------------- */}
                  {activeLegendSubtab === 'struktur_ruang' && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      {/* Header / Compliance Card */}
                      <div className="bg-indigo-50/90 p-3.5 rounded-2xl border border-indigo-200 shadow-2xs">
                        <div className="flex items-start gap-2.5">
                          <Network className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                          <div className="text-[11px] leading-relaxed text-indigo-950">
                            <strong>Standar Visual Peta Struktur Ruang RTRW 2021–2041</strong>
                            <p className="text-indigo-800 text-[10px] mt-0.5">
                              Memuat sistem perkotaan hierarki pusat pelayanan (simbol segitiga), jaringan transportasi darat/laut, energi, telekomunikasi, sumber daya air, dan prasarana lingkungan.
                            </p>
                          </div>
                        </div>

                        {/* Search Bar */}
                        <div className="mt-3 relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                          <input
                            type="text"
                            placeholder="Cari pusat pelayanan, jalan, energi, SDA..."
                            value={strukturRuangSearch}
                            onChange={(e) => setStrukturRuangSearch(e.target.value)}
                            className="w-full bg-white pl-8 pr-7 py-1.5 text-[11px] rounded-xl border border-indigo-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                          {strukturRuangSearch && (
                            <button
                              onClick={() => setStrukturRuangSearch('')}
                              className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* 1. SISTEM PERKOTAAN (PUSAT PELAYANAN) - SIMBOL SEGITIGA BERWARNA-WARNI */}
                      <div className="border border-indigo-200 rounded-2xl p-3.5 bg-white shadow-2xs space-y-2.5">
                        <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                          <div>
                            <h4 className="font-bold text-[11px] uppercase tracking-wide text-indigo-950">
                              1. Sistem Perkotaan (Pusat Pelayanan)
                            </h4>
                            <span className="text-[10px] text-indigo-700">Ditandai dengan simbol segitiga berwarna-warni pada peta</span>
                          </div>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                            3 Simbol Segitiga
                          </span>
                        </div>

                        <ul className="space-y-2 text-[11px] text-slate-800">
                          {/* PKL */}
                          <li className="p-2 rounded-xl border border-red-100 bg-red-50/40 hover:bg-red-50 transition-colors flex items-start gap-2.5">
                            <div className="shrink-0 mt-0.5 flex flex-col items-center">
                              <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-xs">
                                <polygon points="12,2 23,21 1,21" fill="#EF4444" stroke="#ffffff" strokeWidth="2" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <strong className="text-red-900 block font-bold">
                                  PKL (Pusat Kegiatan Lokal)
                                </strong>
                                <span className="text-[9px] font-mono text-red-600 font-bold bg-white px-1.5 py-0.5 rounded border border-red-200">
                                  Segitiga Merah
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-600 block mt-0.5">
                                Meliputi <strong>Kec. Suwawa, Tapa, Tilongkabila, dan Bone Raya</strong> sebagai pusat administrasi, perdagangan, dan pelayanan kabupaten.
                              </span>
                            </div>
                          </li>

                          {/* PPK */}
                          <li className="p-2 rounded-xl border border-blue-100 bg-blue-50/40 hover:bg-blue-50 transition-colors flex items-start gap-2.5">
                            <div className="shrink-0 mt-0.5 flex flex-col items-center">
                              <svg width="20" height="20" viewBox="0 0 24 24" className="drop-shadow-xs">
                                <polygon points="12,2 23,21 1,21" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <strong className="text-blue-900 block font-bold">
                                  PPK (Pusat Pelayanan Kawasan)
                                </strong>
                                <span className="text-[9px] font-mono text-blue-600 font-bold bg-white px-1.5 py-0.5 rounded border border-blue-200">
                                  Segitiga Biru
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-600 block mt-0.5">
                                Meliputi <strong>Kec. Kabila, Kabila Bone, Bone Pantai, Bone, Botupingge, dan Bulango Selatan</strong> untuk melayani skala antar-kecamatan.
                              </span>
                            </div>
                          </li>

                          {/* PPL */}
                          <li className="p-2 rounded-xl border border-emerald-100 bg-emerald-50/40 hover:bg-emerald-50 transition-colors flex items-start gap-2.5">
                            <div className="shrink-0 mt-0.5 flex flex-col items-center">
                              <svg width="18" height="18" viewBox="0 0 24 24" className="drop-shadow-xs">
                                <polygon points="12,2 23,21 1,21" fill="#10B981" stroke="#ffffff" strokeWidth="2" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <strong className="text-emerald-900 block font-bold">
                                  PPL (Pusat Pelayanan Lingkungan)
                                </strong>
                                <span className="text-[9px] font-mono text-emerald-600 font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-200">
                                  Segitiga Hijau
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-600 block mt-0.5">
                                Tersebar di desa-desa tertentu seperti <strong>Kaidundu, Bulotalangi, Duano</strong>, dan sentra permukiman perdesaan.
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>

                      {/* 2. SISTEM JARINGAN PRASARANA */}
                      <div className="space-y-3">
                        {/* A. Jaringan Transportasi Darat */}
                        <div className="border border-slate-200 rounded-2xl p-3.5 bg-white shadow-2xs space-y-2">
                          <h4 className="font-bold text-[11px] uppercase tracking-wide text-slate-900 border-b border-slate-100 pb-1.5">
                            A. Jaringan Transportasi Darat
                          </h4>
                          <ul className="space-y-2 text-[11px] text-slate-800">
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-1.5 bg-[#ea580c] rounded-xs shrink-0 shadow-2xs" />
                                <span>Jalan Arteri Primer</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Garis tebal Merah/Oranye</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-1 bg-[#eab308] rounded-xs shrink-0 shadow-2xs" />
                                <span>Jalan Kolektor Primer</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Garis tebal Kuning</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-0.5 bg-[#facc15] rounded-xs shrink-0" />
                                <span>Jalan Lokal Primer</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Garis tipis Kuning</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-0.5 border-t-2 border-dashed border-[#22c55e] shrink-0" />
                                <span>Jalan Strategis</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Garis putus-putus Hijau</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-0.5 border-t-2 border-dashed border-[#000000] shrink-0" />
                                <span>Jalan Kereta Api (Rencana Bitung-Gorontalo-Isimu)</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Garis putus-putus Hitam</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 bg-black text-white text-[10px] font-black flex items-center justify-center rounded border border-white shadow-2xs shrink-0">B</div>
                                <span>Terminal Penumpang Tipe B</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Ikon kotak hitam &quot;B&quot;</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 bg-black text-white text-[10px] font-black flex items-center justify-center rounded border border-white shadow-2xs shrink-0">C</div>
                                <span>Terminal Penumpang Tipe C</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Ikon kotak hitam &quot;C&quot;</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 bg-slate-900 text-white text-[11px] flex items-center justify-center rounded-full border border-white shadow-2xs shrink-0">🚆</div>
                                <span>Stasiun Kereta Api</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Ikon khusus kereta</span>
                            </li>
                          </ul>
                        </div>

                        {/* B. Jaringan Transportasi Laut */}
                        <div className="border border-slate-200 rounded-2xl p-3.5 bg-white shadow-2xs space-y-2">
                          <h4 className="font-bold text-[11px] uppercase tracking-wide text-slate-900 border-b border-slate-100 pb-1.5">
                            B. Jaringan Transportasi Laut
                          </h4>
                          <ul className="space-y-2 text-[11px] text-slate-800">
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-0.5 border-t-2 border-dashed border-[#2563eb] shrink-0" />
                                <span>Alur Pelayaran</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Garis putus-putus Biru</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 bg-blue-600 text-white text-[11px] flex items-center justify-center rounded-full border border-white shadow-2xs shrink-0">⚓</div>
                                <span>Pelabuhan Pengumpan Lokal</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Ikon jangkar</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-3.5 h-3.5 bg-black rounded-xs border border-white shadow-2xs shrink-0 ml-0.5" />
                                <span>Terminal Khusus (Pelabuhan Khusus)</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Perikanan, tambang, PLTU</span>
                            </li>
                          </ul>
                        </div>

                        {/* C. Jaringan Energi */}
                        <div className="border border-slate-200 rounded-2xl p-3.5 bg-white shadow-2xs space-y-2">
                          <h4 className="font-bold text-[11px] uppercase tracking-wide text-slate-900 border-b border-slate-100 pb-1.5">
                            C. Jaringan Energi
                          </h4>
                          <ul className="space-y-2 text-[11px] text-slate-800">
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-1 bg-[#dc2626] rounded-xs shrink-0 shadow-2xs" />
                                <span>SUTT (Saluran Udara Tegangan Tinggi / Ekstra)</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Garis lurus Merah</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-0.5 bg-[#2563eb] rounded-xs shrink-0" />
                                <span>SUTM (Saluran Udara Tegangan Menengah)</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Garis lurus Biru</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-4 h-4 bg-amber-400 border border-red-600 rounded-xs shrink-0 flex items-center justify-center text-[8px] font-bold">GI</div>
                                <span>Gardu Induk</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Ikon kotak Kuning/Merah</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 bg-amber-400 text-black text-[11px] flex items-center justify-center rounded-full border border-white shadow-2xs font-bold shrink-0">⚡</div>
                                <span>Pembangkit (PLTU, PLTP, PLTA, PLTMH, PLTS, PLTM)</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">PLTU Kabila Bone, PLTP Suwawa</span>
                            </li>
                          </ul>
                        </div>

                        {/* D. Jaringan Telekomunikasi */}
                        <div className="border border-slate-200 rounded-2xl p-3.5 bg-white shadow-2xs space-y-2">
                          <h4 className="font-bold text-[11px] uppercase tracking-wide text-slate-900 border-b border-slate-100 pb-1.5">
                            D. Jaringan Telekomunikasi
                          </h4>
                          <ul className="space-y-2 text-[11px] text-slate-800">
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-0.5 border-t-2 border-dashed border-[#16a34a] shrink-0" />
                                <span>Jaringan Tetap (Serat Optik)</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Garis putus-putus Hijau</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 bg-red-600 text-white text-[11px] flex items-center justify-center rounded-full border border-white shadow-2xs shrink-0">🗼</div>
                                <span>Menara BTS (Jaringan Bergerak)</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Ikon menara Merah</span>
                            </li>
                          </ul>
                        </div>

                        {/* E. Jaringan Sumber Daya Air */}
                        <div className="border border-slate-200 rounded-2xl p-3.5 bg-white shadow-2xs space-y-2">
                          <h4 className="font-bold text-[11px] uppercase tracking-wide text-slate-900 border-b border-slate-100 pb-1.5">
                            E. Jaringan Sumber Daya Air
                          </h4>
                          <ul className="space-y-2 text-[11px] text-slate-800">
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-1.5 bg-[#0284c7] rounded-xs shrink-0 shadow-2xs" />
                                <span>Jaringan Irigasi Primer</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Garis biru tebal</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-0.5 bg-[#38bdf8] rounded-xs shrink-0" />
                                <span>Jaringan Irigasi Sekunder</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Garis biru tipis</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-0.5 border-t-2 border-dashed border-[#0ea5e9] shrink-0" />
                                <span>Jaringan Air Baku Air Bersih (SPAM)</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Garis putus-putus Biru</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 bg-sky-600 text-white text-[11px] flex items-center justify-center rounded-md border border-white shadow-2xs shrink-0">🌊</div>
                                <span>Bendungan</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Bendungan Bulango Ulu & Waduk</span>
                            </li>
                          </ul>
                        </div>

                        {/* F. Jaringan Prasarana Lainnya */}
                        <div className="border border-slate-200 rounded-2xl p-3.5 bg-white shadow-2xs space-y-2">
                          <h4 className="font-bold text-[11px] uppercase tracking-wide text-slate-900 border-b border-slate-100 pb-1.5">
                            F. Jaringan Prasarana Lainnya
                          </h4>
                          <ul className="space-y-2 text-[11px] text-slate-800">
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 bg-stone-700 text-white text-[11px] flex items-center justify-center rounded-md border border-white shadow-2xs shrink-0">🗑️</div>
                                <span>TPA (Tempat Pemrosesan Akhir Sampah)</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Kec. Tilongkabila</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 bg-cyan-700 text-white text-[11px] flex items-center justify-center rounded-md border border-white shadow-2xs shrink-0">💧</div>
                                <span>IPAL (Instalasi Pengolahan Air Limbah)</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Ikon khusus sanitasi</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 bg-amber-500 text-black text-[11px] font-bold flex items-center justify-center rounded-md border border-black shadow-2xs shrink-0">☣️</div>
                                <span>Sistem Pengelolaan Limbah B3</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Tilongkabila & Bone Raya</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-0.5 border-t-2 border-dashed border-[#f97316] shrink-0" />
                                <span>Jalur Evakuasi Bencana</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">Putus-putus Oranye/Merah</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Quick Map Controls for Struktur Ruang */}
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-800">
                            Layer Struktur Ruang pada Peta
                          </span>
                          <button
                            onClick={() => {
                              soundEffects.playClick();
                              setShowStrukturRuang(!showStrukturRuang);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                              showStrukturRuang
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            {showStrukturRuang ? 'Layer Aktif ✓' : 'Tampilkan Layer'}
                          </button>
                        </div>

                        {showStrukturRuang && (
                          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-3">
                            <span className="text-[10px] text-slate-600 font-medium">Transparansi Jaringan:</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.05"
                                value={strukturRuangOpacity}
                                onChange={(e) => setStrukturRuangOpacity(Number(e.target.value))}
                                className="w-24 h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                              />
                              <span className="text-[10px] font-mono text-slate-600 w-8 text-right">
                                {Math.round(strukturRuangOpacity * 100)}%
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =================================================================
                  TAB 3: TEMATIK (ADMINISTRASI, POLA RUANG, STRUKTUR RUANG)
                 ================================================================= */}
              {activeDrawer === 'tematik' && (
                <div className="space-y-3 text-xs font-sans">
                  {/* Theme 1: Administrasi */}
                  <div
                    onClick={() => {
                      soundEffects.playClick();
                      setMapTheme('administrasi');
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      mapTheme === 'administrasi'
                        ? 'bg-blue-50/80 border-blue-500 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-blue-600" />
                        <h4 className="font-bold text-slate-900">Peta Administrasi 18 Kecamatan</h4>
                      </div>
                      {mapTheme === 'administrasi' && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Sesuai Halaman 106 Perda No. 5/2021 dengan 18 warna pastel kecamatan resmi dan pusat kabupaten di Suwawa.
                    </p>
                  </div>

                  {/* Theme 2: Pola Ruang */}
                  <div
                    onClick={() => {
                      soundEffects.playClick();
                      setMapTheme('pola_ruang');
                      setShowPolaRuang(true);
                      setActiveLegendSubtab('pola_ruang');
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      mapTheme === 'pola_ruang'
                        ? 'bg-emerald-50/80 border-emerald-500 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Trees className="w-4 h-4 text-emerald-600" />
                        <h4 className="font-bold text-slate-900">Peta Pola Ruang (55,5% Lindung)</h4>
                      </div>
                      {mapTheme === 'pola_ruang' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      )}
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Menampilkan Kawasan Konservasi Taman Nasional Bogani Nani Wartabone (TNBNW), Hutan Lindung, dan LP2B produktif.
                    </p>
                  </div>

                  {/* Theme 3: Struktur Ruang */}
                  <div
                    onClick={() => {
                      soundEffects.playClick();
                      setMapTheme('struktur_ruang');
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      mapTheme === 'struktur_ruang'
                        ? 'bg-indigo-50/80 border-indigo-500 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Network className="w-4 h-4 text-indigo-600" />
                        <h4 className="font-bold text-slate-900">Peta Struktur Ruang</h4>
                      </div>
                      {mapTheme === 'struktur_ruang' && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      )}
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Hierarki sistem pusat permukiman (PKL Suwawa, PPK, PPL) dan sistem jaringan transportasi/energi wilayah.
                    </p>
                  </div>
                </div>
              )}

              {/* =================================================================
                  TAB 4: BASEMAP (MATCHING REFERENCE IMAGE 1 & 2)
                 ================================================================= */}
              {activeDrawer === 'basemap' && (
                <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                  {/* Basemap 1: OSM */}
                  <div
                    onClick={() => handleChangeBasemap('osm')}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                      selectedBasemap === 'osm'
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="h-16 rounded-xl bg-slate-200 mb-2 flex items-center justify-center font-bold text-slate-500 text-xs overflow-hidden border border-slate-300">
                      Standard OSM
                    </div>
                    <span className="font-bold text-slate-900 block text-xs">OpenStreetMap</span>
                    <span className="text-[10px] text-slate-500">Peta Vektor Standar</span>
                  </div>

                  {/* Basemap 2: Satelit */}
                  <div
                    onClick={() => handleChangeBasemap('satelit')}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                      selectedBasemap === 'satelit'
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="h-16 rounded-xl bg-slate-800 text-white mb-2 flex items-center justify-center font-bold text-xs overflow-hidden border border-slate-700">
                      Citra Satelit
                    </div>
                    <span className="font-bold text-slate-900 block text-xs">Esri Imagery</span>
                    <span className="text-[10px] text-slate-500">Foto Udara Resolusi Tinggi</span>
                  </div>

                  {/* Basemap 3: Positron (Minimalis Bersih) */}
                  <div
                    onClick={() => handleChangeBasemap('positron')}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                      selectedBasemap === 'positron'
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="h-16 rounded-xl bg-slate-100 text-slate-600 mb-2 flex items-center justify-center font-bold text-xs overflow-hidden border border-slate-300">
                      Positron Bersih
                    </div>
                    <span className="font-bold text-slate-900 block text-xs">CartoDB Light</span>
                    <span className="text-[10px] text-slate-500">Minimalis & Kontras Poligon</span>
                  </div>

                  {/* Basemap 4: Topo */}
                  <div
                    onClick={() => handleChangeBasemap('topo')}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                      selectedBasemap === 'topo'
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="h-16 rounded-xl bg-amber-50 text-amber-800 mb-2 flex items-center justify-center font-bold text-xs overflow-hidden border border-amber-200">
                      Kontur Topo
                    </div>
                    <span className="font-bold text-slate-900 block text-xs">OpenTopoMap</span>
                    <span className="text-[10px] text-slate-500">Garis Ketinggian / Morfologi</span>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between">
              <span>Simtaru Bone Bolango</span>
              <span className="font-mono text-blue-600 font-bold">WGS 84 / UTM 51N</span>
            </div>
          </aside>
        )}
      </div>

      {/* =========================================================================
          3. UPLOAD SPASIAL MODAL (SHP / KML / GEOJSON)
         ========================================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative border border-slate-200 text-slate-900">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Upload Data Spasial</h3>
                <p className="text-xs text-slate-500">Tampilkan layer SHP, KML, atau GeoJSON Anda di peta</p>
              </div>
            </div>

            <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-slate-50/50">
              <FileCheck className="w-8 h-8 text-blue-600" />
              <span className="text-xs font-bold text-slate-800">Pilih file GeoJSON atau JSON</span>
              <span className="text-[10px] text-slate-400">Maksimum ukuran 15 MB</span>
              <input
                type="file"
                accept=".json,.geojson"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <div className="mt-4 text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              Data yang Anda unggah diproses langsung di browser secara aman tanpa disimpan di server luar.
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          4. PRINT OFFICIAL ITR SHEET MODAL
         ========================================================================= */}
      {isPrintModalOpen && selectedItr && !selectedItr.isOutsideBoneBolango && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
          <div className="bg-white text-slate-900 max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative my-6 animate-in fade-in zoom-in-95 duration-150 font-sans border border-slate-200">
            <button
              onClick={() => setIsPrintModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center pb-3 border-b-2 border-slate-900 mb-4">
              <h3 className="font-black text-sm uppercase tracking-tight text-slate-900">
                PEMERINTAH KABUPATEN BONE BOLANGO
              </h3>
              <h4 className="font-bold text-xs uppercase text-slate-700">
                DINAS PEKERJAAN UMUM DAN TATA RUANG
              </h4>
              <p className="text-[10px] text-slate-500 font-sans mt-0.5">
                LEMBAR INFORMASI TATA RUANG (ITR) MANDIRI &bull; PERDA NO. 5 TAHUN 2021 (HAL. 106)
              </p>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 block">KECAMATAN</span>
                  <span className="font-bold text-slate-900">{selectedItr.kecamatanName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">KODE / LUAS</span>
                  <span className="font-mono font-bold text-slate-900">
                    {selectedItr.kodeWilayah || '-'} ({selectedItr.luasKm2} km²)
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-500 block">KOORDINAT TITIK</span>
                  <span className="font-mono font-bold text-slate-900">
                    {selectedItr.lat}&deg; N, {selectedItr.lng}&deg; E
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-500 block">PERUNTUKAN RUANG</span>
                  <span className="font-bold text-slate-900">
                    [{selectedItr.zoneCode}] {selectedItr.zoneName}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-800 block mb-1">
                  Status Kesesuaian Ruang:
                </span>
                <div className="p-2 rounded-xl border bg-slate-50 font-bold text-slate-900">
                  {selectedItr.statusLabel}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-800 block mb-1">
                  Ketentuan Intensitas Bangunan:
                </span>
                <table className="w-full border-collapse border border-slate-200 text-slate-800 text-[11px]">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="p-2 bg-slate-50">Koefisien Dasar Bangunan (KDB Maks)</td>
                      <td className="p-2 font-bold text-right">{selectedItr.kdbMax}%</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2 bg-slate-50">Koefisien Lantai Bangunan (KLB Maks)</td>
                      <td className="p-2 font-bold text-right">{selectedItr.klbMax}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2 bg-slate-50">Koefisien Dasar Hijau (KDH Min)</td>
                      <td className="p-2 font-bold text-right">{selectedItr.kdhMin}%</td>
                    </tr>
                    <tr>
                      <td className="p-2 bg-slate-50">Garis Sempadan Bangunan (GSB Min)</td>
                      <td className="p-2 font-bold text-right">{selectedItr.gsbMin} Meter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Lembar ITR</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
