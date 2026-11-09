import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { X, Check, Copy, Download, Sparkles, Layers, Box, ShieldCheck, Palette } from 'lucide-react';

interface LogoConcept {
  id: string;
  name: string;
  tagline: string;
  image: string;
  style: string;
  palette: { name: string; hex: string }[];
  typography: string;
  description: string;
  svgCode: string;
}

export const THREEDY_LOGOS: LogoConcept[] = [
  {
    id: 'concept_isometric',
    name: '01. Isometric Precision',
    tagline: 'Titanio Mate & Azul Cobalto',
    image: '/src/assets/images/threedy_logo_isometric_1794235037774.jpg',
    style: 'Luxury Tech / Espacial Tridimensional',
    palette: [
      { name: 'Cobalto Eléctrico', hex: '#0055ff' },
      { name: 'Titanio Satinado', hex: '#cfd6e0' },
      { name: 'Grafito Ónix', hex: '#111625' }
    ],
    typography: 'Plus Jakarta Sans Bold & JetBrains Mono',
    description: 'Monograma hexagonal isométrico que fusiona el dígito "3" y la letra "D" en un bloque sólido biselado. Proyecta solidez arquitectónica, ingeniería espacial y diseño de alta gama.',
    svgCode: `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="50%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <linearGradient id="cobalt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
  </defs>
  <!-- Hexagonal Isometric Frame -->
  <polygon points="120,20 205,70 205,170 120,220 35,170 35,70" stroke="url(#metal)" stroke-width="12" fill="#090D16"/>
  <!-- Internal 3D Prism Paths -->
  <path d="M120 40 L185 78 L185 158 L120 196 L55 158 L55 78 Z" fill="none" stroke="url(#cobalt)" stroke-width="8"/>
  <path d="M120 40 L120 120 L185 158" stroke="url(#cobalt)" stroke-width="6"/>
  <path d="M120 120 L55 158" stroke="url(#metal)" stroke-width="6"/>
  <text x="120" y="165" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">3D</text>
</svg>`
  },
  {
    id: 'concept_iridescent',
    name: '02. Glass Morphism & Liquid Chrome',
    tagline: 'Vidrio Holográfico & Refracción Espectral',
    image: '/src/assets/images/threedy_logo_iridescent_1794235039233.jpg',
    style: 'Contemporary Creative / Neo-Aesthetic',
    palette: [
      { name: 'Refracción Cyan', hex: '#67e8f9' },
      { name: 'Prisma Lavanda', hex: '#c084fc' },
      { name: 'Aurora Sunset', hex: '#fde047' },
      { name: 'Cristal Puro', hex: '#f8fafc' }
    ],
    typography: 'Outfit Display & Public Sans',
    description: 'Monograma fluido escultural en cristal acrílico con dispersión de luz iridiscente. Ideal para una marca de software creativo, metaverso, animación 3D o diseño contemporáneo con estética estilo Apple y Teenage Engineering.',
    svgCode: `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="irid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="35%" stop-color="#818CF8"/>
      <stop offset="70%" stop-color="#F472B6"/>
      <stop offset="100%" stop-color="#FBBF24"/>
    </linearGradient>
    <filter id="glassBlur">
      <feGaussianBlur stdDeviation="4" result="blur"/>
    </filter>
  </defs>
  <rect x="20" y="20" width="200" height="200" rx="48" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>
  <path d="M70 70 C 85 45, 155 45, 170 70 C 185 95, 160 120, 135 125 C 165 135, 185 160, 165 185 C 145 205, 95 200, 75 175" 
        stroke="url(#irid)" stroke-width="22" stroke-linecap="round" fill="none"/>
  <circle cx="120" cy="120" r="16" fill="url(#irid)"/>
</svg>`
  },
  {
    id: 'concept_cyberpunk',
    name: '03. Cyber Kinetic Prism',
    tagline: 'Neón Cyan & Carbono Biselado',
    image: '/src/assets/images/threedy_logo_cyberpunk_1794235038362.jpg',
    style: 'Futuristic Web3 / Gaming & Spatial Tech',
    palette: [
      { name: 'Neón Cyan', hex: '#06b6d4' },
      { name: 'Violeta Profundo', hex: '#7c3aed' },
      { name: 'Fibra de Carbono', hex: '#0f172a' }
    ],
    typography: 'Space Grotesk & Orbitron',
    description: 'Insignia espacial de corte angular con ranuras luminiscentes y biseles en fibra de carbono. Comunica potencia gráfica en tiempo real, renderizado GPU y presencia imponente para comunidades gaming y Web3.',
    svgCode: `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
  <polygon points="120,25 210,75 210,175 120,225 30,175 30,75" fill="#0B0F19" stroke="url(#neonGlow)" stroke-width="8"/>
  <polygon points="120,50 185,88 185,162 120,200 55,162 55,88" fill="#131B2E" stroke="#06B6D4" stroke-width="4"/>
  <path d="M85 85 H155 L120 120 H155 V155 H85" stroke="url(#neonGlow)" stroke-width="10" stroke-linecap="square" fill="none"/>
</svg>`
  }
];

export const ThreedyBrandStudioModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { updateUser, addCustomNotification } = useSocial();
  const [selectedConcept, setSelectedConcept] = useState<LogoConcept>(THREEDY_LOGOS[0]);
  const [copiedSvg, setCopiedSvg] = useState(false);
  const [appliedAsAvatar, setAppliedAsAvatar] = useState(false);

  if (!isOpen) return null;

  const handleCopySvg = () => {
    navigator.clipboard?.writeText(selectedConcept.svgCode);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([selectedConcept.svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `threedy_logo_${selectedConcept.id}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleApplyToProfile = () => {
    updateUser({
      avatar: selectedConcept.image,
      bio: `Miembro oficial y creador de Threedy Studio 3D 🌐⚡`,
      name: 'Threedy Creator'
    });

    addCustomNotification({
      type: 'system',
      actor: {
        name: 'Threedy Brand Studio',
        handle: 'threedy_design',
        avatar: selectedConcept.image,
        archetypeId: 'tech_cyber'
      },
      targetContent: `Has adoptado la identidad "${selectedConcept.name}" como avatar oficial.`
    });

    setAppliedAsAvatar(true);
    setTimeout(() => setAppliedAsAvatar(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold shadow-md">
              3D
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Threedy Brand Studio</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  Conceptos Oficiales
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Identidad visual tridimensional, paleta cromática, especificaciones vectoriales y descargas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Concept Tabs Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {THREEDY_LOGOS.map((concept) => {
              const isSelected = selectedConcept.id === concept.id;
              return (
                <button
                  key={concept.id}
                  onClick={() => setSelectedConcept(concept)}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 shadow-sm ring-2 ring-blue-500/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <img
                    src={concept.image}
                    alt={concept.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {concept.name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {concept.tagline}
                    </p>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Concept Showcase: Two Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: High-Res Render Card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-slate-950 border border-slate-800 shadow-xl group">
                <img
                  src={selectedConcept.image}
                  alt={selectedConcept.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-400">
                    Renderizado 3D Oficial
                  </span>
                  <h3 className="text-lg font-extrabold">{selectedConcept.name}</h3>
                  <p className="text-xs text-slate-300">{selectedConcept.tagline}</p>
                </div>
              </div>

              {/* Action Buttons for this Logo */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleApplyToProfile}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{appliedAsAvatar ? '¡Aplicado al Perfil! ✓' : 'Usar como Avatar de Red'}</span>
                </button>

                <button
                  onClick={handleDownloadSvg}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Descargar SVG vectorial"
                >
                  <Download className="w-4 h-4" />
                  <span>SVG</span>
                </button>

                <button
                  onClick={handleCopySvg}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Copiar código SVG"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedSvg ? 'Copiado ✓' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Identity Specs, Color Palette & Concept Philosophy */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Concept Philosophy */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <Box className="w-4 h-4 text-blue-500" />
                  <span>Filosofía de Diseño</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedConcept.description}
                </p>
              </div>

              {/* Color System */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <Palette className="w-4 h-4 text-emerald-500" />
                  <span>Paleta Cromática Oficial</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedConcept.palette.map((color) => (
                    <div 
                      key={color.hex}
                      onClick={() => {
                        navigator.clipboard?.writeText(color.hex);
                        alert(`Color ${color.hex} copiado al portapapeles`);
                      }}
                      className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-2 cursor-pointer hover:border-blue-400 transition-colors"
                      title="Haz clic para copiar HEX"
                    >
                      <span 
                        className="w-5 h-5 rounded-lg shrink-0 shadow-xs border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-900 dark:text-white truncate">
                          {color.name}
                        </p>
                        <p className="text-[10px] font-mono text-slate-500">
                          {color.hex}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography & Brand Applications */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <Layers className="w-4 h-4 text-purple-500" />
                  <span>Tipografía & Aplicaciones</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <p><strong className="text-slate-900 dark:text-white">Tipografía recomendada:</strong> {selectedConcept.typography}</p>
                  <p><strong className="text-slate-900 dark:text-white">Formatos óptimos:</strong> Favicon, icono de app móvil (iOS/Android), avatar social, header 3D y marcas de agua de video.</p>
                </div>
              </div>

              {/* Vector SVG Code Box */}
              <div className="p-4 rounded-2xl bg-slate-950 text-slate-300 font-mono text-[11px] space-y-2 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Código SVG Vectorial</span>
                  <button 
                    onClick={handleCopySvg}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {copiedSvg ? '¡Copiado!' : 'Copiar SVG'}
                  </button>
                </div>
                <pre className="max-h-28 overflow-y-auto bg-slate-900/90 p-2.5 rounded-xl text-slate-400 select-all whitespace-pre-wrap break-all">
                  {selectedConcept.svgCode}
                </pre>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
