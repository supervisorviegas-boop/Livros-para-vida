
import React from 'react';

const Cover: React.FC = () => {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#FDFBF7]">
      {/* Camada de Textura e Estética Premium */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-20 -left-20 w-80 h-80 bg-purple-200/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-amber-100/40 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      
      <div className="max-w-5xl mx-auto z-10">
        <div className="mb-10 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-purple-200"></span>
            <span className="text-[10px] uppercase tracking-[0.5em] text-purple-600 font-bold">Edição Master 2026</span>
            <span className="h-px w-10 bg-purple-200"></span>
          </div>
          
          <div className="bg-[#1A0B2E] text-white px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl mb-12">
            Volume 01
          </div>
        </div>

        <h1 className="text-6xl md:text-[8rem] font-serif text-[#1F1635] leading-[0.85] mb-12">
          Voz de <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-800 via-purple-500 to-amber-600 italic">Mulher</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed mb-16">
          O guia definitivo de oratória feminina para mulheres que desejam vencer a timidez e comunicar-se com autoridade e elegância.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
          <a href="#ebook-content" className="w-full sm:w-auto bg-[#432070] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#5A2D92] transition-all shadow-2xl hover:-translate-y-1 active:scale-95">
            Ler Ebook Completo
          </a>
          <a href="#access-portal" className="w-full sm:w-auto flex items-center justify-center gap-3 text-purple-900 font-bold px-12 py-5 rounded-2xl border-2 border-purple-100 hover:bg-white transition-all hover:border-purple-300">
            Link de Acesso
          </a>
        </div>

        <div className="pt-16 border-t border-purple-100/50 flex flex-col items-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Escrito por</p>
          <p className="text-2xl font-serif text-purple-950 font-bold tracking-tight">Viegas Vicente</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="h-1 w-1 bg-amber-500 rounded-full"></span>
            <p className="text-[11px] text-purple-500 font-bold uppercase tracking-widest">Grupo Conexões Digitais</p>
            <span className="h-1 w-1 bg-amber-500 rounded-full"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cover;
