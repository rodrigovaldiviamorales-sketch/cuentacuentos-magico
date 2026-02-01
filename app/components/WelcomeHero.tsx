'use client';

import React from 'react';

// --- ICONOS SVG ---
const MoonIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.5 10.5 0 11-14.165-14.165.75.75 0 01.819.162z" clipRule="evenodd" />
  </svg>
);

const FairyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 002.4 10.057a.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
    <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 0110.94 15.473a.75.75 0 011.06 0zM10.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
  </svg>
);

const GearIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.113-.333.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.819l1.019-.382c.115-.043.283-.03.45.082.312.214.641.405.985.57.182.088.277.228.297.348l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.112.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.433-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.819l-1.02.382c-.114.043-.282.03-.45-.083a7.491 7.491 0 00-.985-.57c-.182-.088-.277-.228-.297-.348l-.178-1.072c-.151-.904-.933-1.567-1.85-1.567h-1.844zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" /></svg>
);
const CloudIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.25-10.5z" clipRule="evenodd" /></svg>
);
const MagicBookIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" /><path d="M14.25 5.25a.75.75 0 000 1.5h2.25a.75.75 0 000-1.5h-2.25zM14.25 8.25a.75.75 0 000 1.5h2.25a.75.75 0 000-1.5h-2.25zM18 10.5a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75z" /></svg>
);

// Componente para partículas estáticas
const MagicParticle = ({ className, delay }: { className?: string; delay?: string }) => (
    <div className={`absolute rounded-full animate-pulse ${className}`} style={{ animationDelay: delay }}></div>
);

const WelcomeHero = ({ onStartClick }: { onStartClick: () => void }) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto my-8 font-sans perspective-1000 group">
      
      {/* Sombra de piso */}
      <div className="absolute -bottom-12 left-10 right-10 h-12 bg-black/40 blur-3xl rounded-[50%] transform scale-x-90 z-0"></div>

      {/* EL CONTENEDOR PRINCIPAL 3D */}
      <div className="relative overflow-hidden rounded-[3rem] border border-white/20 shadow-2xl transition-all duration-500 ease-out transform group-hover:rotate-x-1 group-hover:-translate-y-1 z-10 bg-[#2b1055]">
        
        {/* --- FONDO BASE --- */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-black/90"></div>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-30%] right-[-10%] w-[70%] h-[70%] bg-pink-600/15 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>
        </div>

        {/* --- NUEVO: HADAS VIAJERAS (DESTELLOS) --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Grupo Esquina Superior Izquierda (Viajan hacia el centro) */}
            <div className="absolute top-10 left-[-20px] w-3 h-3 bg-yellow-200 rounded-full blur-[2px] animate-float-tl"></div>
            <div className="absolute top-24 left-[-10px] w-2 h-2 bg-cyan-200 rounded-full blur-[1px] animate-float-tl delay-2000"></div>
            <div className="absolute top-40 left-[-30px] w-2.5 h-2.5 bg-purple-200 rounded-full blur-[2px] animate-float-tl delay-4000"></div>

            {/* Grupo Esquina Inferior Derecha (Viajan subiendo) */}
            <div className="absolute bottom-[-20px] right-20 w-3 h-3 bg-pink-300 rounded-full blur-[2px] animate-float-br"></div>
            <div className="absolute bottom-[-10px] right-40 w-2 h-2 bg-yellow-200 rounded-full blur-[1px] animate-float-br delay-3000"></div>
            <div className="absolute bottom-[-30px] right-10 w-2.5 h-2.5 bg-white rounded-full blur-[2px] animate-float-br delay-5000"></div>
        </div>


        {/* --- CAPA 1: ESQUINA SUPERIOR DERECHA (NOCHE MÁGICA) --- */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-8 right-8 text-yellow-200/90 drop-shadow-[0_0_25px_rgba(253,224,71,0.6)] animate-bounce-slow">
                <MoonIcon className="w-32 h-32 transform -rotate-12" />
            </div>
            <CloudIcon className="absolute top-24 right-32 w-48 h-48 text-blue-200/10 blur-md" />
            <CloudIcon className="absolute top-4 right-56 w-32 h-32 text-purple-200/10 blur-sm" />
            <MagicParticle className="top-16 right-48 w-2 h-2 bg-white" delay="0s" />
            <MagicParticle className="top-32 right-20 w-3 h-3 bg-yellow-200" delay="1.5s" />
            <MagicParticle className="top-10 right-72 w-2 h-2 bg-cyan-200" delay="3s" />
            <div className="absolute top-40 right-60 text-yellow-300/60 animate-spin-slow">✨</div>
        </div>

        {/* --- CAPA 2: ESQUINA INFERIOR IZQUIERDA (ESPIRAL) --- */}
        <div className="absolute bottom-[-10%] left-[-25%] w-[85%] h-[85%] pointer-events-none z-0 animate-[spin_60s_linear_infinite]">
            <svg viewBox="0 0 500 500" className="w-full h-full opacity-20 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]" style={{ filter: 'blur(1px)' }}>
                <path d="M250,250 C250,150 350,150 350,250 C350,350 150,350 150,150 C150,-50 450,-50 450,250 C450,550 -50,550 -50,250" 
                      fill="none" stroke="url(#spiral-gradient)" strokeWidth="8" strokeLinecap="round" />
                <defs>
                    <linearGradient id="spiral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f0abfc" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="absolute top-[45%] left-[45%] text-yellow-200 animate-[spin_10s_linear_reverse_infinite]">
                <FairyIcon className="w-12 h-12 drop-shadow-[0_0_10px_white] translate-x-32" />
            </div>
             <div className="absolute top-[50%] left-[50%] text-pink-300 animate-[spin_15s_linear_infinite]">
                <FairyIcon className="w-8 h-8 drop-shadow-[0_0_10px_white] -translate-x-48" />
            </div>
            <MagicParticle className="top-1/2 left-1/2 w-4 h-4 bg-cyan-300 translate-y-40" delay="0.5s" />
             <div className="absolute top-[50%] left-[50%] text-white/70 animate-[spin_25s_linear_reverse_infinite]">
                <GearIcon className="w-24 h-24 -translate-x-64 translate-y-20" />
            </div>
        </div>

        {/* --- EFECTO CRISTAL SUPERIOR --- */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10"></div>

        {/* --- CONTENIDO CENTRAL --- */}
        <div className="relative p-12 md:p-20 flex flex-col items-center text-center backdrop-blur-[2px] z-20">
            <div className="mb-8 animate-bounce-slow filter drop-shadow-[0_0_20px_rgba(250,204,21,0.7)]">
                 <MagicBookIcon className="w-24 h-24 text-yellow-300 transform -rotate-6" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight drop-shadow-2xl relative z-10">
                <span className="block text-2xl md:text-3xl text-purple-200 uppercase tracking-[0.2em] font-bold mb-3 drop-shadow-lg">Bienvenido a la</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fff500] via-[#ff4d4d] to-[#c700ff] filter drop-shadow-[0_5px_10px_rgba(0,0,0,0.6)] leading-none">
                    Fábrica de Sueños
                </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100/95 max-w-3xl mb-12 leading-relaxed drop-shadow-lg font-medium border-t border-b border-white/10 py-6">
                Donde la imaginación cobra vida. Creamos cuentos mágicos e irrepetibles para tus pequeños héroes.
            </p>
            <button 
                onClick={onStartClick}
                className="group relative inline-flex items-center gap-4 px-14 py-6 bg-gradient-to-tr from-[#ff8800] via-[#ff0055] to-[#9900ff] text-white rounded-full font-black text-3xl shadow-[0_12px_0_#7e22ce,0_20px_30px_rgba(0,0,0,0.5)] active:shadow-[0_0px_0_#7e22ce,0_5px_10px_rgba(0,0,0,0.5)] active:translate-y-[12px] transition-all duration-200 z-20 overflow-hidden hover:scale-105"
            >
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 group-hover:animate-shine" />
                <GearIcon className="w-10 h-10 animate-spin-slow drop-shadow-md" />
                <span className="tracking-wide drop-shadow-md">VAMOS A LA MAGIA</span>
                <span className="text-4xl filter drop-shadow-[0_0_10px_white] animate-pulse">✨</span>
            </button>
            <p className="mt-10 text-base text-purple-300/70 font-semibold tracking-wider uppercase flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_#4ade80]"></span>
                Presiona el botón para encender la máquina
            </p>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-x-1 { transform: rotateX(1deg); }
        .animate-bounce-slow { animation: bounce 5s infinite ease-in-out; }
        .animate-spin-slow { animation: spin 15s linear infinite; }
        .animate-pulse-slow { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes shine { 0% { left: -100%; } 100% { left: 200%; } }
        .group-hover\:animate-shine:hover { animation: shine 1s infinite; }

        /* NUEVAS ANIMACIONES PARA LAS HADAS VIAJERAS */
        @keyframes float-tl {
            0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
            20% { opacity: 0.8; }
            100% { transform: translate(200px, 150px) scale(1.2); opacity: 0; }
        }
        .animate-float-tl { animation: float-tl 18s linear infinite; }

        @keyframes float-br {
            0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
            20% { opacity: 0.8; }
            100% { transform: translate(-150px, -200px) scale(1.2); opacity: 0; }
        }
        .animate-float-br { animation: float-br 22s linear infinite; }
      `}</style>
    </div>
  );
};

export default WelcomeHero;