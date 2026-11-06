import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { MkHeroExact } from './components/MkHeroExact';
import { MkStatement } from './components/MkStatement';
import { MkHorizontalScroll } from './components/MkHorizontalScroll';
import { MkServicesDark } from './components/MkServicesDark';
import { MkLogos } from './components/MkLogos';
import { MkRunningText } from './components/MkRunningText';
import { MkVerticalProcess } from './components/MkVerticalProcess';
import { MkFeatures } from './components/MkFeatures';
import { MkTestimonials } from './components/MkTestimonials';
import { MkFaq } from './components/MkFaq';
import { MkCta } from './components/MkCta';
import { MkFooter } from './components/MkFooter';
import { CekItrPage } from './components/CekItrPage';
import { KkprCalculatorModal } from './components/KkprCalculatorModal';
import { ZoneDetailModal } from './components/ZoneDetailModal';
import { GisMapModal } from './components/GisMapModal';
import { SpatialZone, ParcelInfo } from './types/spatial';
import { SAMPLE_PARCELS, SPATIAL_ZONES } from './data/zoningData';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'cek-itr'>(() => {
    if (typeof window !== 'undefined' && (window.location.hash === '#cek-itr' || window.location.hash === '#itr')) {
      return 'cek-itr';
    }
    return 'home';
  });

  const [selectedZone, setSelectedZone] = useState<SpatialZone | null>(null);
  const [selectedParcel, setSelectedParcel] = useState<ParcelInfo | null>(SAMPLE_PARCELS[0]);
  const [isKkprOpen, setIsKkprOpen] = useState(false);
  const [isGisMapOpen, setIsGisMapOpen] = useState(false);
  const [prefillKkprZoneCode, setPrefillKkprZoneCode] = useState<string | undefined>(undefined);
  const [prefillKkprParcel, setPrefillKkprParcel] = useState<ParcelInfo | null>(null);

  // Sync with browser hash (#cek-itr)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#cek-itr' || window.location.hash === '#itr') {
        setCurrentView('cek-itr');
      } else if (currentView === 'cek-itr') {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentView]);

  const handleOpenCekItr = () => {
    window.location.hash = '#cek-itr';
    setCurrentView('cek-itr');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    window.location.hash = '#mkh';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenKkprGeneral = () => {
    setPrefillKkprParcel(null);
    setPrefillKkprZoneCode(undefined);
    setIsKkprOpen(true);
  };

  const handleOpenKkprForZone = (zoneCode: string) => {
    setPrefillKkprParcel(null);
    setPrefillKkprZoneCode(zoneCode);
    setIsKkprOpen(true);
  };

  const handleOpenKkprForParcel = (parcel: ParcelInfo) => {
    setPrefillKkprParcel(parcel);
    setPrefillKkprZoneCode(parcel.currentZoneCode);
    setIsKkprOpen(true);
  };

  // If in Cek ITR page view
  if (currentView === 'cek-itr') {
    return (
      <div className="min-h-screen bg-[#0A2129] text-white font-onest selection:bg-[#00FFAF] selection:text-[#0A2129] overflow-x-hidden">
        <CustomCursor />
        <CekItrPage
          onBackToHome={handleBackToHome}
          onOpenKkprCalc={(zoneCode) => {
            if (zoneCode) {
              handleOpenKkprForZone(zoneCode);
            } else {
              handleOpenKkprGeneral();
            }
          }}
        />

        {/* Global KKPR Calculator Modal */}
        <KkprCalculatorModal
          isOpen={isKkprOpen}
          onClose={() => setIsKkprOpen(false)}
          prefillParcel={prefillKkprParcel}
          prefillZoneCode={prefillKkprZoneCode}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF5] text-[#0A2129] font-onest selection:bg-[#00FFAF] selection:text-[#0A2129] overflow-x-hidden">
      {/* Custom follower cursor */}
      <CustomCursor />

      {/* Hero Section: Exact Pixel-Perfect Replica from Screenshot */}
      <MkHeroExact
        onOpenKkprCalc={handleOpenKkprGeneral}
        onOpenGisMap={() => setIsGisMapOpen(true)}
        onOpenCekItr={handleOpenCekItr}
      />

      {/* Section 1: Statement Intro */}
      <MkStatement />

      {/* Section 2: Horizontal Scroll Portfolio ("Onze projecten" -> Pola Ruang) */}
      <MkHorizontalScroll
        onSelectZone={(zone) => setSelectedZone(zone)}
        onOpenKkprForZone={handleOpenKkprForZone}
      />

      {/* Section 3: Dark Services ("Alles voor een sterk digitaal merk" -> Layanan Tata Ruang) */}
      <MkServicesDark
        onOpenKkprCalc={handleOpenKkprGeneral}
        onOpenGisMap={() => setIsGisMapOpen(true)}
      />

      {/* Section 4: Partner Logos & Mitra Instansi */}
      <MkLogos />

      {/* Section 5: Running Text Banner */}
      <MkRunningText />

      {/* Section 6: Vertical Sticky Process Pipeline */}
      <MkVerticalProcess />

      {/* Section 7: Features ("Waar we goed in zijn") */}
      <MkFeatures />

      {/* Section 8: Client Feedback Testimonials */}
      <MkTestimonials />

      {/* Section 9: FAQ Accordion */}
      <MkFaq />

      {/* Section 10: CTA Block ("Zeg gerust hi") */}
      <MkCta onOpenKkprCalc={handleOpenKkprGeneral} />

      {/* Site Footer with Giant Brand Logo & 3 Cards */}
      <MkFooter
        onOpenKkprCalc={handleOpenKkprGeneral}
        onOpenGisMap={() => setIsGisMapOpen(true)}
        onOpenCekItr={handleOpenCekItr}
      />

      {/* Interactive Modals */}
      <ZoneDetailModal
        zone={selectedZone}
        onClose={() => setSelectedZone(null)}
        onOpenKkpr={handleOpenKkprForZone}
      />

      <KkprCalculatorModal
        isOpen={isKkprOpen}
        onClose={() => setIsKkprOpen(false)}
        prefillParcel={prefillKkprParcel}
        prefillZoneCode={prefillKkprZoneCode}
      />

      <GisMapModal
        isOpen={isGisMapOpen}
        onClose={() => setIsGisMapOpen(false)}
        selectedParcel={selectedParcel}
        onSelectParcel={(parcel) => setSelectedParcel(parcel)}
        onOpenKkprForParcel={handleOpenKkprForParcel}
      />
    </div>
  );
}
