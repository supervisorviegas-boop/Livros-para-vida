
import React, { useState } from 'react';

const Incentive: React.FC = () => {
  const [signed, setSigned] = useState(false);

  return (
    <section className="bg-white py-24 px-6 overflow-hidden relative border-y border-purple-50">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-50/30 -skew-x-12 transform origin-top-right"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1">
            <div className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] mb-8 shadow-sm border border-amber-100">
              O Portal da Coragem
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif text-[#1F1635] mb-10 leading-[1.1]">
              A teoria ensina, mas a <span className="italic text-purple-600 underline decoration-amber-300 underline-offset-8">prática</span> liberta.
            </h2>
            
            <div className="space-y-8 text-xl text-gray-500 leading-relaxed font-light">
              <p>
                Muitas mulheres acumulam conhecimento como forma de adiar a exposição. Esperam o dia em que o medo desaparecerá completamente para finalmente falarem. 
              </p>
              <p className="bg-purple-50 p-6 rounded-3xl border-l-4 border-purple-400 text-purple-900 font-medium">
                A verdade libertadora é: <strong>a coragem não é a ausência de medo, mas a decisão de que algo é mais importante do que ele.</strong>
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Impulso', desc: 'Ação rápida vence a paralisia.', color: 'purple' },
                { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Cuidado', desc: 'Gentileza com seu processo.', color: 'amber' },
                { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Voz', desc: 'Seu legado começa agora.', color: 'green' }
              ].map((item, i) => (
                <div key={i} className="group cursor-default">
                  <div className={`w-14 h-14 bg-${item.color}-100 rounded-2xl flex items-center justify-center text-${item.color}-600 mb-5 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h4 className="font-bold text-purple-950 text-lg mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg">
            <div className={`transition-all duration-700 bg-[#0F0819] p-10 md:p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden group ${signed ? 'border-2 border-amber-500' : 'border border-white/5'}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-amber-500"></div>
              
              <div className="relative z-10">
                <h3 className="text-white text-3xl font-serif mb-10 text-center tracking-tight">Manifesto da Voz Autêntica</h3>
                
                <div className="space-y-8">
                  {[
                    "Minha voz é um instrumento de serviço, não de ego.",
                    "O que eu tenho a dizer é vital para o meu propósito.",
                    "Eu aceito a imperfeição como parte da minha evolução.",
                    "Minha timidez não é uma jaula, mas meu ponto de partida."
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-5 group/item">
                      <div className="w-6 h-6 rounded-full border border-amber-500/20 flex items-center justify-center shrink-0 mt-1 group-hover/item:border-amber-500 transition-colors bg-white/5">
                        <div className="w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover/item:opacity-100 transition-all scale-0 group-hover/item:scale-100"></div>
                      </div>
                      <p className="text-purple-100/80 font-light italic leading-relaxed text-lg">{text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-16 pt-12 border-t border-white/5 text-center">
                  <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Compromisso de Transformação</p>
                  <button 
                    onClick={() => setSigned(true)}
                    className={`w-full py-6 rounded-2xl font-bold text-lg transition-all transform active:scale-95 shadow-2xl ${
                      signed 
                      ? 'bg-amber-500 text-purple-950 scale-105' 
                      : 'bg-white text-purple-950 hover:bg-purple-100'
                    }`}
                  >
                    {signed ? '✓ Compromisso Assinado' : 'Assinar Pacto de Coragem'}
                  </button>
                  {signed && <p className="mt-6 text-amber-500 text-[10px] animate-fade-in">Agora, siga para os capítulos com o coração aberto.</p>}
                </div>
              </div>
              
              <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Incentive;
