'use client';
import { useState, useRef, useEffect } from 'react';
import { useUser, SignInButton, UserButton } from "@clerk/nextjs"; 
import { useSearchParams } from 'next/navigation';

// --- 1. ICONOS ---
const Icon = ({ path, className = "w-6 h-6" }: { path: string, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d={path} clipRule="evenodd" />
  </svg>
);

// --- 2. ADORNOS MÁGICOS (DECORATIONS) ---
const MoonCloudDecor = () => (
  <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 animate-float pointer-events-none z-0">
    <svg className="w-32 h-32 md:w-48 md:h-48 text-yellow-200 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" viewBox="0 0 24 24" fill="currentColor">
       <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
    <div className="absolute bottom-0 right-8 text-white/80 animate-pulse-slow">
       <svg className="w-16 h-16 md:w-24 md:h-24" viewBox="0 0 24 24" fill="currentColor">
         <path d="M4.5 13.5A7.5 7.5 0 0112 6a7.5 7.5 0 017.5 7.5h1.875a2.625 2.625 0 010 5.25H2.625a2.625 2.625 0 010-5.25H4.5z" />
       </svg>
    </div>
  </div>
);

const MagicSpiralDecor = () => (
  <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 pointer-events-none opacity-40">
    <svg className="w-40 h-40 text-purple-200 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
       <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /> 
    </svg>
    <div className="absolute top-0 right-0 w-4 h-4 bg-white rounded-full blur-[2px] animate-ping" style={{animationDuration: '3s'}}></div>
    <div className="absolute bottom-10 left-10 w-3 h-3 bg-yellow-300 rounded-full blur-[1px] animate-pulse" style={{animationDuration: '2s'}}></div>
  </div>
);

const GearsDecor = () => (
  <div className="absolute -bottom-10 -left-10 flex gap-[-10px] pointer-events-none opacity-10">
     <svg className="w-32 h-32 text-white animate-spin-slow" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
     </svg>
     <svg className="w-20 h-20 text-white animate-spin-reverse-slow mt-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
     </svg>
  </div>
);

const Icons = {
  User: () => <Icon path="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" className="w-5 h-5" />,
  Globe: () => <Icon path="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.547 4.51c.333.03.667.072.998.126l.365 1.825c.112.561.59.963 1.157.963h1.368c.57 0 1.052.407 1.162.97l.274 1.37a.75.75 0 00.735.604h1.958c.645 0 1.156.555 1.105 1.198l-.184 2.298c-.05.622.349 1.196.943 1.358l1.111.3c.554.15.916.678.86 1.247l-.137 1.38a9.766 9.766 0 01-4.116 3.396l-1.402-1.402c-.379-.379-.987-.457-1.456-.196l-1.442.802a.75.75 0 01-.928-.143l-1.353-1.353a.75.75 0 01-.22-.53V16.5c0-.33-.203-.633-.51-.768l-2.068-.908a.75.75 0 01-.45-.68v-1.525c0-.414.336-.75.75-.75h1.132c.303 0 .582-.163.718-.425l.515-.984a.75.75 0 00-.65-1.11h-1.3c-.32 0-.612-.19-.73-.482l-.582-1.458a.75.75 0 01.494-.997l1.59-.477a.75.75 0 00.555-.72V2.25z" className="w-5 h-5" />,
  Eye: () => <Icon path="M12 15a3 3 0 100-6 3 3 0 000 6z M1.323 11.447C2.811 6.976 7.028 3.75 12 3.75s9.189 3.226 10.677 7.697a.75.75 0 010 .506C21.189 16.424 16.972 19.65 12 19.65s-9.189-3.226-10.677-7.697a.75.75 0 010-.506z" className="w-5 h-5" />,
  Mic: () => <Icon path="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" className="w-5 h-5" />,
  Home: () => <Icon path="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />,
  VolumeUp: () => <Icon path="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 2.25 2.25 0 000-3.182.75.75 0 010-1.06z" />,
  VolumeOff: () => <Icon path="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06z" />,
  ArrowLeft: () => <Icon path="M7.28 7.72a.75.75 0 010 1.06l-3.22 3.22H21a.75.75 0 010 1.5H4.06l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z" />,
  ArrowRight: () => <Icon path="M16.72 7.72a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H3a.75.75 0 010-1.5h16.94l-3.22-3.22a.75.75 0 010-1.06z" />,
  Music: () => <Icon path="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" className="w-4 h-4" />,
  Cart: () => <Icon path="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />,
};

// --- 3. DATOS FIJOS ---
const NARRADORES = [
  { id: 'T-Rex Macho', label: 'T-Rex (Macho)', img: '/avatars/trex-macho.jpg' },
  { id: 'T-Rex Hembra', label: 'T-Rex (Hembra)', img: '/avatars/trex-hembra.jpg' },
  { id: 'León Macho', label: 'León (Macho)', img: '/avatars/leon-macho.jpg' },
  { id: 'Leona Hembra', label: 'Leona (Hembra)', img: '/avatars/leona-hembra.jpg' },
  { id: 'Capibara Macho', label: 'Capibara (Macho)', img: '/avatars/capibara-macho.jpg' },
  { id: 'Capibara Hembra', label: 'Capibara (Hembra)', img: '/avatars/capibara-hembra.jpg' },
  { id: 'Búho Macho', label: 'Búho (Macho)', img: '/avatars/buho-macho.jpg' },
  { id: 'Búho Hembra', label: 'Búho (Hembra)', img: '/avatars/buho-hembra.jpg' },
  { id: 'Unicornio Macho', label: 'Unicornio (Macho)', img: '/avatars/unicornio-macho.jpg' },
  { id: 'Unicornio Hembra', label: 'Unicornio (Hembra)', img: '/avatars/unicornio-hembra.jpg' },
];

// --- 4. BIENVENIDA MÁGICA (GLASSMORPHISM + ADORNOS) ---
const WelcomeHero = ({ onStartClick }: { onStartClick: () => void }) => (
  <div className="relative p-12 md:p-20 rounded-[3rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl max-w-4xl text-center mx-auto overflow-hidden animate-fade-in-up transition-all hover:border-white/30 group">
      
      {/* 🔮 ADORNOS FLOTANTES 🔮 */}
      <MoonCloudDecor />
      <MagicSpiralDecor />
      <GearsDecor />
      
      {/* Estrellitas extra */}
      <div className="absolute top-10 left-10 text-yellow-200 animate-pulse text-2xl">✨</div>
      <div className="absolute bottom-20 right-20 text-pink-200 animate-bounce text-xl">✦</div>

      <div className="relative z-20">
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-400 to-purple-400 mb-8 drop-shadow-xl tracking-tight leading-tight font-fredoka">
            Fábrica de <br className="md:hidden" /> Sueños
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Donde la inteligencia artificial teje cuentos mágicos. Elige tu héroe, tu aventura y observa cómo cobra vida. ✨
        </p>
        <button onClick={onStartClick} className="bg-white text-purple-900 px-14 py-5 rounded-full font-black text-2xl shadow-[0_10px_40px_rgba(255,255,255,0.3)] hover:shadow-[0_10px_40px_rgba(255,100,200,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
            🚀 COMENZAR AVENTURA
        </button>
      </div>
  </div>
);

// --- 5. COMPONENTE TIENDA ---
const TiendaModal = ({ onBuy, onClose }: { onBuy: () => void, onClose: () => void }) => (
  <div className="min-h-screen bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 fixed inset-0 animate-fade-in">
    <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-yellow-400 relative overflow-hidden animate-bounce-in">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
      <div className="flex justify-center -mt-12 mb-4">
          <div className="bg-yellow-100 p-4 rounded-full border-4 border-white shadow-lg"><Icons.Cart /></div>
      </div>
      <h2 className="text-3xl font-black text-gray-800 mb-2">¡Oh no! Sin Magia 😢</h2>
      <p className="text-gray-600 mb-8 font-medium">Te has quedado sin créditos. Recarga para seguir soñando.</p>
      <div onClick={onBuy} className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-300 mb-8 hover:border-yellow-400 transition-colors cursor-pointer group hover:bg-yellow-50">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-xl text-gray-800">Pack Mini</span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Más Popular</span>
        </div>
        <div className="text-4xl font-black text-purple-600 mb-1 group-hover:scale-110 transition-transform">$1.99 <span className="text-sm text-gray-400 font-normal">USD</span></div>
        <p className="text-sm text-gray-500">Recibe 10 Créditos Mágicos ✨</p>
      </div>
      <button onClick={onBuy} className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-black py-4 rounded-xl shadow-lg transform transition-transform hover:-translate-y-1 active:translate-y-0 text-lg flex justify-center items-center gap-2"><Icons.Cart /> COMPRAR AHORA</button>
      <button onClick={onClose} className="mt-4 text-gray-400 hover:text-gray-600 text-sm font-bold">Cancelar y volver</button>
    </div>
  </div>
);

// --- 6. APLICACIÓN PRINCIPAL ---
export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();
  const searchParams = useSearchParams();

  // Estados
  const [mostrarBienvenida, setMostrarBienvenida] = useState(true);
  const [mostrarTienda, setMostrarTienda] = useState(false);
  const [loading, setLoading] = useState(false);
  const [protagonista, setProtagonista] = useState('');
  const [tema, setTema] = useState('');
  const [apariencia, setApariencia] = useState(''); 
  const [narrador, setNarrador] = useState(NARRADORES[0]); 
  
  const [paginas, setPaginas] = useState<string[]>([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const [imagenHistoria, setImagenHistoria] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [debeLeerAlCargarImagen, setDebeLeerAlCargarImagen] = useState(false);
  
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [cargandoAudio, setCargandoAudio] = useState(false);
  const [hablando, setHablando] = useState(false);
  const [audioCache, setAudioCache] = useState<Record<number, string>>({}); 
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    if (searchParams.get('success')) { alert("¡Pago Recibido! 10 créditos añadidos 🌟"); setMostrarTienda(false); window.history.replaceState(null, '', '/'); }
    if (searchParams.get('canceled')) alert("Pago cancelado.");
  }, [searchParams]);

  // CORRECCIÓN: Separamos la limpieza del audio del narrador de la música
  useEffect(() => { 
      return () => { 
          if (audioPlayer) audioPlayer.pause(); 
          // OJO: YA NO PARAMOS LA MÚSICA AQUÍ, SÓLO EL NARRADOR
      }; 
  }, [audioPlayer]);

  // Sincronización Audio-Imagen
  useEffect(() => {
    if (imagenHistoria && paginas.length > 0 && debeLeerAlCargarImagen && !loadingImage) {
        leerPaginaActual(paginas, 0); 
        setDebeLeerAlCargarImagen(false); 
    }
  }, [imagenHistoria, loadingImage, paginas, debeLeerAlCargarImagen]);

  // --- LÓGICA DE PAGINACIÓN INTELIGENTE (Corta por frases completas) ---
  const procesarCuento = (texto: string) => {
    // 1. Dividir primero por oraciones completas (puntos seguidos)
    const oraciones = texto.match(/[^.!?]+[.!?]+["']?|[^.!?]+$/g) || [texto];
    const hojas: string[] = [];
    let hojaTemp = "";
    const LIMITE = 180; // Aprox 30-40 palabras por página

    oraciones.forEach((oracion) => {
        // Si la oración sola ya es gigante, la forzamos a una página nueva
        if (oracion.length > LIMITE) {
             if (hojaTemp.trim()) hojas.push(hojaTemp.trim());
             hojas.push(oracion.trim());
             hojaTemp = "";
        } 
        // Si cabe en la página actual, la sumamos
        else if ((hojaTemp + oracion).length < LIMITE) {
            hojaTemp += oracion + " ";
        } 
        // Si no cabe, guardamos página y empezamos otra
        else {
            if (hojaTemp.trim()) hojas.push(hojaTemp.trim());
            hojaTemp = oracion + " ";
        }
    });
    
    if (hojaTemp.trim()) hojas.push(hojaTemp.trim());
    return hojas;
  };

  const generarImagenCombinada = async (promptVisual: string) => {
    setLoadingImage(true);
    setImagenHistoria(null);
    try {
        const response = await fetch('/api/magic-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: promptVisual }),
        });
        const data = await response.json();
        if (data.url) setImagenHistoria(data.url);
    } catch (error) { console.error(error); } finally { setLoadingImage(false); }
  };

  const crearCuento = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPaginas([]); setPaginaActual(0); setImagenHistoria(null); setAudioCache({}); 
    
    // MÚSICA DE FONDO (INMORTAL)
    if (musicRef.current) {
        const t = tema.toLowerCase();
        let c = '/music/magia.mp3';
        if (t.match(/dormir|luna|noche|sueño/)) c = '/music/calma.mp3';
        if (t.match(/correr|dragón|tesoro|peligro/)) c = '/music/aventura.mp3';
        musicRef.current.src = c; 
        musicRef.current.volume = 0.05; // Volumen bajito
        musicRef.current.loop = true;
        musicRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
    }

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema, protagonista, narrador: narrador.id }),
      });

      if (res.status === 403) { setLoading(false); setMostrarTienda(true); return; }
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      if (data.story) {
          const hojas = procesarCuento(data.story); // Usamos el cortador inteligente
          setPaginas(hojas);
          setDebeLeerAlCargarImagen(true); 
          const promptParaImagen = data.imagePrompt || apariencia + " " + tema;
          generarImagenCombinada(promptParaImagen);
      }
    } catch (error) { alert('Error creando historia.'); } finally { setLoading(false); }
  };

  const detenerAudio = () => { if (audioPlayer) { audioPlayer.pause(); audioPlayer.currentTime = 0; } setHablando(false); };

  const leerPaginaActual = async (listaPaginas = paginas, indice = paginaActual) => {
    if (listaPaginas.length === 0) return;
    detenerAudio();
    if (audioCache[indice]) {
        const audio = new Audio(audioCache[indice]);
        setAudioPlayer(audio); audio.onplay = () => setHablando(true); audio.onended = () => setHablando(false);
        audio.play(); return;
    }
    setCargandoAudio(true);
    try {
      const textoLimpio = listaPaginas[indice].replace(/[*_#]/g, ""); 
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textoLimpio, voiceId: narrador.id }),
      });
      if (!response.ok) throw new Error("Error audio");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioCache(prev => ({ ...prev, [indice]: url })); 
      const audio = new Audio(url);
      setAudioPlayer(audio); audio.onplay = () => { setHablando(true); setCargandoAudio(false); }; audio.onended = () => setHablando(false);
      audio.play();
    } catch (error) { setCargandoAudio(false); }
  };

  const cambiarPagina = (direccion: 'sig' | 'ant') => {
      detenerAudio();
      const nuevaPagina = direccion === 'sig' ? paginaActual + 1 : paginaActual - 1;
      setPaginaActual(nuevaPagina);
      setTimeout(() => leerPaginaActual(paginas, nuevaPagina), 500);
  };

  const reiniciar = () => { 
      detenerAudio(); 
      // Sólo aquí detenemos la música
      if (musicRef.current) { musicRef.current.pause(); musicRef.current.currentTime = 0; }
      setMusicPlaying(false); setPaginas([]); setTema(''); setImagenHistoria(null); setAudioCache({}); 
  };
  
  const comprarCreditos = async () => {
    try { const res = await fetch('/api/checkout', { method: 'POST' }); const data = await res.json(); if (data.url) window.location.href = data.url; } catch (error) { alert("Error banco"); }
  };

  const getTextoDividido = () => {
    if (!paginas[paginaActual]) return { parte1: '', parte2: '' };
    const txt = paginas[paginaActual];
    // Cortamos inteligentemente también la vista visual para que no corte palabras
    const mitad = Math.floor(txt.length / 2);
    const corte = txt.indexOf(' ', mitad); 
    if (corte === -1) return { parte1: txt, parte2: '' };
    return { parte1: txt.substring(0, corte), parte2: txt.substring(corte) };
  };
  const { parte1, parte2 } = getTextoDividido();

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center bg-purple-900 text-white font-bold animate-pulse">Cargando Fábrica... ✨</div>;

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-5xl w-full bg-white/10 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in-up">
           <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500 mb-6 drop-shadow-xl font-fredoka">Fábrica de Sueños</h1>
           <SignInButton mode="modal"><button className="bg-white text-purple-900 px-12 py-6 rounded-full font-black text-2xl shadow-2xl hover:scale-105 transition">Continuar con Google</button></SignInButton>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-4 md:p-6 flex items-center justify-center font-sans overflow-hidden">
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
        <span className="text-white font-bold text-sm hidden md:inline">Hola, {user?.firstName}</span>
        <UserButton afterSignOutUrl="/" />
      </div>
      <audio ref={musicRef} />
      {mostrarTienda && <TiendaModal onBuy={comprarCreditos} onClose={() => setMostrarTienda(false)} />}

      <div className="max-w-6xl w-full z-10">
        {mostrarBienvenida ? ( <WelcomeHero onStartClick={() => setMostrarBienvenida(false)} /> ) : (
            <>
                {paginas.length === 0 ? (
                  <div className="bg-white/95 backdrop-blur-xl border border-white/40 p-8 rounded-[2rem] shadow-2xl animate-fade-in max-w-4xl mx-auto">
                    <h1 className="text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600 mb-8">Fábrica de Cuentos</h1>
                    <form onSubmit={crearCuento} className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="group"><label className="flex items-center text-xs font-bold text-purple-600 uppercase ml-1 mb-2"><Icons.User /> Nombre del Héroe</label><input type="text" value={protagonista} onChange={(e) => setProtagonista(e.target.value)} placeholder="Ej: Sofía" className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 font-medium" required /></div>
                        <div className="group"><label className="flex items-center text-xs font-bold text-pink-500 uppercase ml-1 mb-2"><Icons.Globe /> La Aventura</label><input type="text" value={tema} onChange={(e) => setTema(e.target.value)} placeholder="Ej: Descubre un tesoro" className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 font-medium" required /></div>
                        <div className="group"><label className="flex items-center text-xs font-bold text-blue-500 uppercase ml-1 mb-2"><Icons.Eye /> ¿Cómo se ve?</label><textarea value={apariencia} onChange={(e) => setApariencia(e.target.value)} placeholder="Ej: Es un niño con capa roja..." className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 font-medium h-32 resize-none" required /></div>
                      </div>
                      <div className="space-y-6">
                          <div><label className="flex items-center text-xs font-bold text-orange-500 uppercase ml-1 mb-2"><Icons.Mic /> Narrador</label>
                            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar p-1">
                              {NARRADORES.map((n) => (
                                <button key={n.id} type="button" onClick={() => setNarrador(n)} className={`p-2 rounded-xl text-xs font-bold transition-all border-2 flex items-center gap-3 shadow-sm text-left ${narrador.id === n.id ? 'bg-orange-50 border-orange-500 text-orange-700 ring-2 ring-orange-200' : 'bg-white border-gray-100 text-gray-600 hover:border-orange-300 hover:bg-orange-50'}`}>
                                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-200"><img src={n.img} alt="" className="w-full h-full object-cover" /></div><span>{n.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                      </div>
                      <button type="submit" disabled={loading} className={`md:col-span-2 w-full py-5 rounded-2xl font-black text-xl shadow-lg hover:scale-[1.02] transition-transform text-white ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500'}`}>{loading ? '🔮 Escribiendo...' : '🚀 ¡CREAR CUENTO!'}</button>
                    </form>
                  </div>
                ) : (
                  <div className="relative animate-fade-in-up w-full h-[85vh]">
                    <div className="bg-gray-900 text-gray-100 rounded-[2rem] shadow-2xl border-4 border-gray-800 relative overflow-hidden h-full flex flex-col z-10">
                      
                      {/* BARRA SUPERIOR */}
                      <div className="flex justify-between items-center p-4 bg-gray-900/40 backdrop-blur-md border-b border-white/10 z-30 absolute top-0 left-0 right-0 rounded-t-[2rem]">
                          <div className="flex gap-2 items-center">
                             <button onClick={reiniciar} className="px-4 py-2 rounded-full bg-black/40 border border-white/20 text-xs font-bold hover:bg-white/10 text-white flex items-center gap-2"><Icons.Home /> Inicio</button>
                          </div>
                          <div className="flex items-center gap-3">
                             <button onClick={() => setMusicPlaying(!musicPlaying)} className={`w-8 h-8 rounded-full flex items-center justify-center border border-white/20 ${musicPlaying ? 'bg-green-500 text-white' : 'bg-black/40 text-gray-400'}`}><Icons.Music /></button>
                             <div className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold">Página {paginaActual + 1} / {paginas.length}</div>
                          </div>
                      </div>

                      {/* --- ESCENA PRINCIPAL --- */}
                      <div className="relative flex-grow w-full h-full overflow-hidden flex items-center justify-center bg-black">
                        <div className="absolute inset-0 z-0">
                             {loadingImage ? ( 
                                <div className="w-full h-full flex flex-col items-center justify-center text-white/50 bg-gray-900"><div className="animate-spin text-4xl mb-2">✨</div><span className="text-xl font-bold">Dibujando magia...</span></div> 
                             ) : imagenHistoria ? ( 
                                <img src={imagenHistoria} className="w-full h-full object-cover opacity-90 transition-opacity duration-1000" alt="Escena" /> 
                             ) : ( 
                                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500"><span className="opacity-50">Esperando imagen...</span></div> 
                             )}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>
                        </div>

                        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 pointer-events-none">
                            <div className="mt-16 md:mt-20 self-start w-[90%] md:w-[40%] animate-fade-in-up">
                                <div className="bg-black/40 backdrop-blur-md p-6 rounded-[2rem] text-white border border-white/10 shadow-xl hover:bg-black/50 transition-colors pointer-events-auto">
                                    <p className="text-lg md:text-xl leading-relaxed font-serif text-shadow-lg drop-shadow-md">{parte1}</p>
                                </div>
                            </div>
                            {parte2 && (
                                <div className="mb-20 self-end w-[85%] md:w-[35%] animate-fade-in-up flex justify-end" style={{animationDelay: '0.3s'}}>
                                    <div className="bg-black/40 backdrop-blur-md p-6 rounded-[2rem] text-white border border-white/10 shadow-xl hover:bg-black/50 transition-colors pointer-events-auto mr-auto md:mr-24">
                                        <p className="text-lg md:text-xl leading-relaxed font-serif text-shadow-lg drop-shadow-md">{parte2}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* NARRADOR (Ajustado) */}
                        <div className="absolute bottom-24 right-6 z-50 flex flex-col items-end animate-fade-in pointer-events-auto">
                            <div className={`relative transition-transform duration-300 ${hablando ? 'scale-110' : 'scale-100 hover:scale-105'}`}>
                                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 shadow-2xl overflow-hidden bg-gray-800 ${hablando ? 'border-green-400 ring-4 ring-green-400/30' : 'border-white/30'}`}>
                                    <img src={narrador.img} className="w-full h-full object-cover" alt="Narrador" />
                                </div>
                                {hablando && (
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full animate-bounce shadow-lg border-2 border-white">
                                        Hablando... 🔊
                                    </div>
                                )}
                            </div>
                        </div>
                      </div>

                      {/* BARRA INFERIOR */}
                      <div className="p-4 bg-gray-900/60 backdrop-blur-xl border-t border-white/10 flex justify-between items-center z-30 absolute bottom-0 left-0 right-0 rounded-b-[2rem]">
                        <button onClick={() => cambiarPagina('ant')} disabled={paginaActual === 0} className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition disabled:opacity-30"><Icons.ArrowLeft /></button>
                        <button onClick={() => { if(hablando) detenerAudio(); else leerPaginaActual(); }} disabled={cargandoAudio} className={`px-8 py-4 rounded-full font-black text-white flex items-center gap-3 transition transform active:scale-95 shadow-lg ${hablando ? 'bg-red-500/90 animate-pulse border-2 border-red-400' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500'}`}>{hablando ? <><Icons.VolumeOff /> PAUSAR</> : <><Icons.VolumeUp /> {cargandoAudio ? 'CARGANDO...' : 'LEER'}</>}</button>
                        <button onClick={() => cambiarPagina('sig')} disabled={paginaActual === paginas.length - 1} className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition disabled:opacity-30"><Icons.ArrowRight /></button>
                      </div>
                    </div>
                  </div>
                )}
            </>
        )}
      </div>
      <style jsx global>{` .text-shadow-lg { text-shadow: 0 2px 4px rgba(0,0,0,0.8); } .animate-float { animation: float 6s ease-in-out infinite; } @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } } .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; } .animate-spin-slow { animation: spin 12s linear infinite; } .animate-spin-reverse-slow { animation: spin 15s linear infinite reverse; } .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; } @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fade-in 0.5s ease-out; } .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; } `}</style>
    </main>
  );
}