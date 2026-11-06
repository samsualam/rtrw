export interface KecamatanBoneBolango {
  id: string;
  name: string;
  center: [number, number]; // [lat, lng]
  zoom: number;
  areaKm2: number;
  desaCount: number;
  dominantZone: string;
  zoneCode: string;
  category: 'Pemerintahan' | 'Pertanian' | 'Konservasi' | 'Pesisir/Bahari' | 'Pengembangan';
  summary: string;
  landmarks: string[];
  kdbMax: number;
  klbMax: number;
  kdhMin: number;
  gsbMin: number;
}

export const KECAMATAN_BONE_BOLANGO: KecamatanBoneBolango[] = [
  {
    id: 'suwawa',
    name: 'Kecamatan Suwawa',
    center: [0.5512, 123.1534],
    zoom: 14,
    areaKm2: 91.73,
    desaCount: 10,
    dominantZone: 'Pusat Pemerintahan, Permukiman & Danau Perintis',
    zoneCode: 'B-P',
    category: 'Pemerintahan',
    summary: 'Ibukota Kabupaten Bone Bolango. Menampung kompleks perkantoran bupati, fasilitas umum terpadu, pusat kebudayaan, dan daya tarik ekowisata Danau Perintis.',
    landmarks: ['Kantor Bupati Bone Bolango', 'Danau Perintis', 'Alun-alun Bone Bolango', 'RSUD Toto Kabila'],
    kdbMax: 60,
    klbMax: 1.8,
    kdhMin: 25,
    gsbMin: 8
  },
  {
    id: 'kabila',
    name: 'Kecamatan Kabila',
    center: [0.5389, 123.1121],
    zoom: 14,
    areaKm2: 14.54,
    desaCount: 12,
    dominantZone: 'Perdagangan, Jasa, & Sawah Abadi LP2B Alale',
    zoneCode: 'B-LP2B',
    category: 'Pertanian',
    summary: 'Kawasan penyangga ekonomi utama berbatasan langsung dengan Kota Gorontalo. Memiliki areal sawah irigasi teknis LP2B Alale yang dilindungi Perda RTRW 2021–2041.',
    landmarks: ['Hamparan Sawah LP2B Alale', 'Pasar Sentral Kabila', 'Masjid Besar Baiturrahim Kabila'],
    kdbMax: 50,
    klbMax: 1.5,
    kdhMin: 35,
    gsbMin: 6
  },
  {
    id: 'tilongkabila',
    name: 'Kecamatan Tilongkabila',
    center: [0.5650, 123.1250],
    zoom: 14,
    areaKm2: 32.12,
    desaCount: 14,
    dominantZone: 'Kawasan Pendidikan Tinggi & Permukiman',
    zoneCode: 'B-P',
    category: 'Pengembangan',
    summary: 'Sentra pendidikan tinggi Provinsi Gorontalo dengan kehadiran Kampus Baru UNG Bone Bolango, pemukiman terencana, serta koridor usaha kuliner dan kost mahasiswa.',
    landmarks: ['Kampus 4 Universitas Negeri Gorontalo (UNG)', 'Gedung LPMP Gorontalo', 'Kompleks Olahraga Tilongkabila'],
    kdbMax: 60,
    klbMax: 2.0,
    kdhMin: 30,
    gsbMin: 7
  },
  {
    id: 'kabila-bone',
    name: 'Kecamatan Kabila Bone',
    center: [0.4491, 123.1287],
    zoom: 13,
    areaKm2: 67.24,
    desaCount: 9,
    dominantZone: 'Kawasan Wisata Bahari & Pesisir Teluk Tomini',
    zoneCode: 'B-W',
    category: 'Pesisir/Bahari',
    summary: 'Pintu gerbang wisata bahari kelas dunia dengan ikon Whale Shark (Hiu Paus) Botubarani dan Pantai Pasir Putih Botutonuo bergaris sempadan pantai ketat 35 meter.',
    landmarks: ['Pusat Konservasi Hiu Paus Botubarani', 'Pantai Botutonuo', 'Pantai Kurenai'],
    kdbMax: 40,
    klbMax: 1.2,
    kdhMin: 40,
    gsbMin: 35
  },
  {
    id: 'suwawa-timur',
    name: 'Kecamatan Suwawa Timur',
    center: [0.5560, 123.2350],
    zoom: 13,
    areaKm2: 243.68,
    desaCount: 9,
    dominantZone: 'Penyangga Konservasi & Agrowisata Lembah Sungai',
    zoneCode: 'L-TN',
    category: 'Konservasi',
    summary: 'Wilayah koridor timur yang berbatasan langsung dengan hamparan hutan lindung DAS Bone. Diarahkan untuk ekowisata, hortikultura organik, dan perlindungan air tanah.',
    landmarks: ['Pemandian Air Panas Lombongo', 'Pintu Masuk TNBNW Jalur Tulabolo', 'Lembah Hijau DAS Bone'],
    kdbMax: 20,
    klbMax: 0.4,
    kdhMin: 75,
    gsbMin: 20
  },
  {
    id: 'suwawa-tengah',
    name: 'Kecamatan Suwawa Tengah',
    center: [0.5420, 123.2050],
    zoom: 14,
    areaKm2: 50.15,
    desaCount: 6,
    dominantZone: 'Pertanian Terpadu, Perkebunan & Permukiman',
    zoneCode: 'B-LP2B',
    category: 'Pertanian',
    summary: 'Kawasan agraris penghubung Suwawa dan kawasan hulu. Memiliki komoditas jagung, kakao, dan sawah tadah hujan yang diproteksi.',
    landmarks: ['Jembatan Kuning Suwawa', 'Kawasan Agribisnis Terpadu Duano'],
    kdbMax: 45,
    klbMax: 1.0,
    kdhMin: 45,
    gsbMin: 8
  },
  {
    id: 'suwawa-selatan',
    name: 'Kecamatan Suwawa Selatan',
    center: [0.5180, 123.1780],
    zoom: 13,
    areaKm2: 86.92,
    desaCount: 8,
    dominantZone: 'Hortikultura, Sempadan DAS & Kawasan Hutan',
    zoneCode: 'B-LP2B',
    category: 'Pertanian',
    summary: 'Daerah berbukit asri penghasil kelapa dan buah lokal dengan garis sempadan sungai Bone yang ketat untuk mencegah abrasi dan banjir luapan.',
    landmarks: ['Bendung Irigasi Alale', 'Perkebunan Buah Libungo'],
    kdbMax: 40,
    klbMax: 0.8,
    kdhMin: 50,
    gsbMin: 15
  },
  {
    id: 'botupingge',
    name: 'Kecamatan Botupingge',
    center: [0.5150, 123.1350],
    zoom: 14,
    areaKm2: 37.89,
    desaCount: 9,
    dominantZone: 'Pertanian Lahan Kering & Perbukitan Hijau',
    zoneCode: 'B-LP2B',
    category: 'Pertanian',
    summary: 'Kawasan perbukitan dan sentra palawija jagung Bone Bolango yang memiliki peran retensi air hujan bagi dataran rendah Kabila.',
    landmarks: ['Puncak Botupingge Panorama', 'Sentra Jagung Hibrida Timbuolo'],
    kdbMax: 40,
    klbMax: 0.8,
    kdhMin: 50,
    gsbMin: 10
  },
  {
    id: 'tapa',
    name: 'Kecamatan Tapa',
    center: [0.5850, 123.0920],
    zoom: 14,
    areaKm2: 12.87,
    desaCount: 7,
    dominantZone: 'Komersial Perkotaan & Sentra Kerajinan Karawo',
    zoneCode: 'B-P',
    category: 'Pemerintahan',
    summary: 'Gerbang barat Bone Bolango. Terkenal sebagai sentra kerajinan sulaman Karawo khas Gorontalo, pertokoan jasa, dan permukiman berkembang pesat.',
    landmarks: ['Sentra Sulaman Tradisional Karawo Tapa', 'Pasar Rakyat Tapa', 'Puskesmas Perawatan Tapa'],
    kdbMax: 60,
    klbMax: 2.0,
    kdhMin: 20,
    gsbMin: 5
  },
  {
    id: 'bulango-selatan',
    name: 'Kecamatan Bulango Selatan',
    center: [0.5750, 123.0760],
    zoom: 14,
    areaKm2: 6.94,
    desaCount: 10,
    dominantZone: 'Permukiman Padat & Agribisnis Irigasi Lomaya',
    zoneCode: 'B-P',
    category: 'Pemerintahan',
    summary: 'Kecamatan dengan kepadatan penduduk cukup tinggi di koridor sungai Bolango, dilengkapi jaringan irigasi teknis Lomaya untuk sawah produktif.',
    landmarks: ['Bendung Irigasi Lomaya', 'Kawasan Pertokoan Lamahu'],
    kdbMax: 65,
    klbMax: 2.0,
    kdhMin: 20,
    gsbMin: 5
  },
  {
    id: 'bulango-timur',
    name: 'Kecamatan Bulango Timur',
    center: [0.5900, 123.1140],
    zoom: 14,
    areaKm2: 10.32,
    desaCount: 5,
    dominantZone: 'Sawah Beririgasi Teknis & Hortikultura',
    zoneCode: 'B-LP2B',
    category: 'Pertanian',
    summary: 'Lahan sawah subur lumbung beras Bone Bolango dengan hamparan irigasi primer Sungai Bolango.',
    landmarks: ['Lumbung Pangan Toluwaya', 'Saluran Primer Lomaya Timur'],
    kdbMax: 35,
    klbMax: 0.7,
    kdhMin: 60,
    gsbMin: 8
  },
  {
    id: 'bulango-utara',
    name: 'Kecamatan Bulango Utara',
    center: [0.6180, 123.1320],
    zoom: 13,
    areaKm2: 39.81,
    desaCount: 9,
    dominantZone: 'Lembah Perbukitan, Perkebunan & Sempadan Hulu',
    zoneCode: 'L-DS',
    category: 'Konservasi',
    summary: 'Kawasan transisi perbukitan utara dengan panorama alam asri, perkebunan pala, dan sumber mata air jernih.',
    landmarks: ['Wisata Sungai Bulango Boidu', 'Mata Air Alami Kopi Kulo'],
    kdbMax: 30,
    klbMax: 0.6,
    kdhMin: 65,
    gsbMin: 15
  },
  {
    id: 'bulango-ulu',
    name: 'Kecamatan Bulango Ulu',
    center: [0.6780, 123.1420],
    zoom: 13,
    areaKm2: 102.58,
    desaCount: 6,
    dominantZone: 'Proyek Strategis Nasional Bendungan Bulango Ulu & Konservasi',
    zoneCode: 'L-TN',
    category: 'Konservasi',
    summary: 'Lokasi Proyek Strategis Nasional (PSN) Bendungan Bulango Ulu yang akan mengendalikan banjir, menyediakan air baku, dan PLTMH bagi Gorontalo.',
    landmarks: ['Mega Proyek Bendungan Bulango Ulu', 'Kawasan Tangkapan Air Hulu Bolango'],
    kdbMax: 10,
    klbMax: 0.2,
    kdhMin: 85,
    gsbMin: 50
  },
  {
    id: 'bonepantai',
    name: 'Kecamatan Bonepantai',
    center: [0.3950, 123.1950],
    zoom: 13,
    areaKm2: 96.53,
    desaCount: 13,
    dominantZone: 'Pesisir Bahari, Wisata Pantai & Nelayan Tangkap',
    zoneCode: 'B-W',
    category: 'Pesisir/Bahari',
    summary: 'Koridor pesisir selatan menghadap Teluk Tomini dengan potensi perikanan cakalang, tuna, serta pantai wisata Bilungala yang memikat.',
    landmarks: ['Pantai Bilungala', 'Pangkalan Pendaratan Ikan (PPI) Inengo'],
    kdbMax: 40,
    klbMax: 1.0,
    kdhMin: 40,
    gsbMin: 35
  },
  {
    id: 'bulawa',
    name: 'Kecamatan Bulawa',
    center: [0.3650, 123.2800],
    zoom: 13,
    areaKm2: 121.28,
    desaCount: 10,
    dominantZone: 'Pesisir Perbukitan & Wisata Alam Tanjung',
    zoneCode: 'B-W',
    category: 'Pesisir/Bahari',
    summary: 'Kawasan dengan tebing pantai dramatis dan panorama laut lepas Teluk Tomini, memiliki komoditas cengkeh dan kelapa pesisir.',
    landmarks: ['Tanjung Keramat Kaidundu', 'Pantai Pinotingo'],
    kdbMax: 35,
    klbMax: 0.8,
    kdhMin: 45,
    gsbMin: 35
  },
  {
    id: 'bone',
    name: 'Kecamatan Bone',
    center: [0.3350, 123.3600],
    zoom: 13,
    areaKm2: 153.25,
    desaCount: 14,
    dominantZone: 'Pesisir Kelautan, Agrowisata & Hutan Lindung',
    zoneCode: 'B-W',
    category: 'Pesisir/Bahari',
    summary: 'Salah satu kecamatan pesisir tertua dengan pelabuhan nelayan tradisional, sentra kelapa kopra, dan gugusan terumbu karang terjaga.',
    landmarks: ['Pelabuhan Rakyat Molotabu', 'Kawasan Konservasi Mangrove Permata'],
    kdbMax: 40,
    klbMax: 1.0,
    kdhMin: 40,
    gsbMin: 30
  },
  {
    id: 'bone-raya',
    name: 'Kecamatan Bone Raya',
    center: [0.3150, 123.4400],
    zoom: 13,
    areaKm2: 178.65,
    desaCount: 10,
    dominantZone: 'Pesisir Perbatasan Provinsi & Kawasan Perikanan',
    zoneCode: 'B-W',
    category: 'Pesisir/Bahari',
    summary: 'Wilayah perbatasan langsung Provinsi Gorontalo dengan Bolaang Mongondow Selatan (Sulawesi Utara). Wilayah terdepan kelautan timur.',
    landmarks: ['Tugu Batas Provinsi Gorontalo-Sulut', 'Pantai Indah Tombulilato'],
    kdbMax: 40,
    klbMax: 0.9,
    kdhMin: 40,
    gsbMin: 30
  },
  {
    id: 'pinogu',
    name: 'Kecamatan Pinogu',
    center: [0.6200, 123.3250],
    zoom: 13,
    areaKm2: 442.20,
    desaCount: 5,
    dominantZone: 'Enclave Tradisional di Jantung TN Bogani Nani Wartabone',
    zoneCode: 'L-TN',
    category: 'Konservasi',
    summary: 'Kecamatan istimewa seluas 442 km² yang berada di tengah-tengah kawasan konservasi Taman Nasional Bogani Nani Wartabone. Terkenal di mancanegara dengan Kopi Pinogu organik warisan kolonial abad ke-18.',
    landmarks: ['Perkebunan Kopi Pinogu Organik', 'Pusat Riset Flora Fauna TNBNW', 'Pusat Adat Pinogu Tradisional'],
    kdbMax: 5,
    klbMax: 0.1,
    kdhMin: 95,
    gsbMin: 50
  }
];

// GeoJSON-like Spatial Zone Polygons for Kabupaten Bone Bolango Perda No. 5/2021
export interface SpatialPolygonZone {
  id: string;
  name: string;
  code: string;
  category: string;
  color: string;
  fillColor: string;
  fillOpacity: number;
  weight: number;
  description: string;
  coordinates: [number, number][]; // Lat, Lng array
  kdbMax: number;
  klbMax: number;
  kdhMin: number;
  gsbMin: number;
}

export const SPATIAL_POLYGONS_BONE_BOLANGO: SpatialPolygonZone[] = [
  {
    id: 'poly-tnbnw',
    name: 'Kawasan Konservasi TN Bogani Nani Wartabone (55,5% Wilayah)',
    code: 'L-TN',
    category: 'Lindung Mutlak',
    color: '#00DF8F',
    fillColor: '#00DF8F',
    fillOpacity: 0.28,
    weight: 2,
    description: 'Kawasan konservasi taman nasional dan hutan lindung DAS Bone seluas ±110.000 Ha (55,5% wilayah Bone Bolango). Dilarang keras alih fungsi atau kegiatan budi daya komersial.',
    coordinates: [
      [0.720, 123.210],
      [0.745, 123.320],
      [0.690, 123.460],
      [0.560, 123.490],
      [0.480, 123.390],
      [0.530, 123.290],
      [0.580, 123.230],
      [0.660, 123.190],
      [0.720, 123.210]
    ],
    kdbMax: 0,
    klbMax: 0,
    kdhMin: 100,
    gsbMin: 50
  },
  {
    id: 'poly-lp2b-alale',
    name: 'Kawasan Sawah Abadi LP2B Suwawa - Kabila - Bulango',
    code: 'B-LP2B',
    category: 'Pertanian Pangan Abadi',
    color: '#EAB308',
    fillColor: '#EAB308',
    fillOpacity: 0.32,
    weight: 2,
    description: 'Hamparan sawah irigasi teknis Lomaya-Alale yang dilindungi Perda LP2B. Wajib dipertahankan demi kedaulatan pangan Bone Bolango.',
    coordinates: [
      [0.575, 123.090],
      [0.595, 123.118],
      [0.560, 123.155],
      [0.535, 123.135],
      [0.525, 123.105],
      [0.550, 123.080],
      [0.575, 123.090]
    ],
    kdbMax: 10,
    klbMax: 0.2,
    kdhMin: 85,
    gsbMin: 10
  },
  {
    id: 'poly-permukiman-suwawa',
    name: 'Pusat Ibukota & Permukiman Perkotaan Suwawa',
    code: 'B-P',
    category: 'Permukiman & Pemerintahan',
    color: '#06B6D4',
    fillColor: '#06B6D4',
    fillOpacity: 0.30,
    weight: 2,
    description: 'Pusat perkantoran pemerintahan daerah, permukiman warga, pusat perdagangan, sarana kesehatan, dan pendidikan.',
    coordinates: [
      [0.562, 123.140],
      [0.565, 123.170],
      [0.540, 123.175],
      [0.535, 123.145],
      [0.562, 123.140]
    ],
    kdbMax: 60,
    klbMax: 1.8,
    kdhMin: 25,
    gsbMin: 8
  },
  {
    id: 'poly-danau-perintis',
    name: 'Zona Perlindungan Sempadan Danau Perintis',
    code: 'L-DS',
    category: 'Sempadan Danau & Air Bersih',
    color: '#3B82F6',
    fillColor: '#3B82F6',
    fillOpacity: 0.35,
    weight: 2,
    description: 'Sempadan badan air Danau Perintis berjarak 50 meter dari muka air tertinggi. Diperuntukkan untuk ekowisata hijau dan resapan alami.',
    coordinates: [
      [0.564, 123.158],
      [0.566, 123.167],
      [0.555, 123.168],
      [0.554, 123.159],
      [0.564, 123.158]
    ],
    kdbMax: 5,
    klbMax: 0.1,
    kdhMin: 90,
    gsbMin: 50
  },
  {
    id: 'poly-wisata-pesisir',
    name: 'Koridor Wisata Bahari Botutonuo - Botubarani',
    code: 'B-W',
    category: 'Pariwisata Bahari & Pesisir',
    color: '#F97316',
    fillColor: '#F97316',
    fillOpacity: 0.30,
    weight: 2,
    description: 'Zona pesisir Teluk Tomini untuk ekowisata hiu paus, homestay ramah lingkungan, dan wisata pantai dengan sempadan 35 meter.',
    coordinates: [
      [0.470, 123.110],
      [0.450, 123.140],
      [0.410, 123.170],
      [0.370, 123.230],
      [0.340, 123.210],
      [0.380, 123.150],
      [0.430, 123.110],
      [0.470, 123.110]
    ],
    kdbMax: 40,
    klbMax: 1.2,
    kdhMin: 40,
    gsbMin: 35
  }
];
