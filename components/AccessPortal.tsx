
import React, { useState } from 'react';

const AccessPortal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="access-portal" className="bg-[#0F0819] py-28 px-6 relative overflow-hidden border-t border-white/5">
      {/* Efeitos de Luz de Fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-purple-600/10 rounded-full blur-[150px]"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-1.5 bg-purple-500/10 rounded-full text-purple-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 border border-purple-500/20">
            Infraestrutura Digital 2026
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">O Link da sua <span className="text-amber-500 italic">Liberdade.</span></h2>
          <p className="text-purple-200/50 max-w-2xl mx-auto text-xl font-light leading-relaxed">
            Acesse, salve ou compartilhe este treinamento. Este link é a porta de entrada para uma nova fase da sua comunicação pessoal e profissional.
          </p>
        </div>

        {/* Card de Link Premium */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[4rem] p-10 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col md:flex-row items-center gap-16">
            
            {/* Visual do QR Pass */}
            <div className="shrink-0 relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600 to-amber-500 rounded-[3rem] opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
              <div className="w-56 h-56 bg-white p-6 rounded-[2.5rem] shadow-2xl flex items-center justify-center relative">
                <div className="w-full h-full border-2 border-dashed border-purple-100 rounded-2xl flex flex-col items-center justify-center gap-3">
                   <div className="grid grid-cols-2 gap-1.5 opacity-20 group-hover:opacity-40 transition-opacity">
                      {[...Array(4)].map((_, i) => <div key={i} className="w-6 h-6 bg-purple-900 rounded-sm"></div>)}
                   </div>
                  <span className="text-[9px] font-black text-purple-900 uppercase tracking-[0.3em]">Voz Digital</span>
                </div>
              </div>
            </div>

            {/* Ações e Créditos */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-10">
                <h4 className="text-3xl font-serif text-white mb-3 tracking-tight">Voz de Mulher • Volume 01</h4>
                <p className="text-purple-400 text-sm font-bold uppercase tracking-widest">Acesso Global Autorizado</p>
              </div>

              <div className="relative group max-w-md mx-auto md:mx-0">
                <div className={`absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-amber-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 ${copied ? 'animate-pulse' : ''}`}></div>
                <div className="relative flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 bg-black/60 border border-white/10 rounded-2xl px-6 py-5 text-purple-100 font-mono text-sm truncate flex items-center">
                    {shareUrl}
                  </div>
                  <button 
                    onClick={handleCopy}
                    className={`px-10 py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 active:scale-95 text-lg ${
                      copied ? 'bg-green-500 text-white' : 'bg-white text-purple-950 hover:bg-amber-500 hover:text-white'
                    }`}
                  >
                    {copied ? 'Copiado!' : 'Copiar Link'}
                  </button>
                </div>
              </div>

              <div className="mt-14 pt-10 border-t border-white/5 flex flex-wrap justify-center md:justify-start gap-12">
                <div>
                  <p className="text-[10px] text-purple-500 font-bold uppercase tracking-widest mb-2">Mentor do Projeto</p>
                  <p className="text-white font-serif text-xl">Viegas Vicente</p>
                </div>
                <div>
                  <p className="text-[10px] text-purple-500 font-bold uppercase tracking-widest mb-2">Editora Digital</p>
                  <p className="text-amber-500 font-serif text-xl">Grupo Conexões Digitais</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-purple-200/30 text-xs font-light tracking-wide italic">
            "Este conteúdo foi desenvolvido para ser compartilhado. Se ele te ajudou, passe a voz adiante."
          </p>
        </div>
      </div>
    </section>
  );
};

export default AccessPortal;
