export type ZoneCategory = 'komersial' | 'hunian' | 'industri' | 'lindung' | 'publik';

export interface SpatialZone {
  id: string;
  code: string; // e.g. K.1, R.2, I.1, RTH-1, SPU
  name: string;
  category: ZoneCategory;
  categoryLabel: string;
  description: string;
  allowedUses: string[];
  conditionalUses: string[];
  prohibitedUses: string[];
  kdbMax: number; // Koefisien Dasar Bangunan (%)
  klbMax: number; // Koefisien Lantai Bangunan
  kdhMin: number; // Koefisien Dasar Hijau (%)
  gsbMin: number; // Garis Sempadan Bangunan (meter)
  maxHeight: number; // Lantai maksimal
  color: string;
  accentHex: string;
  imageUrl: string;
  subZones: {
    code: string;
    name: string;
    specificRules: string;
  }[];
}

export interface ParcelInfo {
  id: string;
  parcelNo: string;
  nib: string; // Nomor Induk Bidang
  address: string;
  subdistrict: string;
  district: string;
  coordinates: [number, number]; // lat, lng
  areaM2: number;
  currentZoneCode: string;
  zoneName: string;
  statusKesesuaian: 'Sesuai' | 'Bersyarat' | 'Tidak Sesuai';
  kdbMax: number;
  klbMax: number;
  kdhMin: number;
  gsbMin: number;
  ownerType: 'Perorangan' | 'Badan Usaha' | 'Pemerintah';
}

export interface KKPRCalculationInput {
  zoneCode: string;
  proposedActivity: string;
  landAreaM2: number;
  buildingFootprintM2: number;
  totalFloorAreaM2: number;
  openGreenSpaceM2: number;
  buildingFloors: number;
  frontSetbackM: number;
}

export interface KKPRCalculationResult {
  isFeasible: boolean;
  status: 'SESUAI' | 'BERSYARAT' | 'TIDAK_SESUAI';
  kdbAchieved: number;
  kdbStatus: boolean;
  klbAchieved: number;
  klbStatus: boolean;
  kdhAchieved: number;
  kdhStatus: boolean;
  gsbStatus: boolean;
  notes: string[];
  requiredStudies: string[];
  recommendationCode: string;
}

export interface GisLayer {
  id: string;
  name: string;
  description: string;
  type: 'vector' | 'raster' | 'hazard' | 'infrastructure';
  active: boolean;
  opacity: number;
  featuresCount: number;
}
