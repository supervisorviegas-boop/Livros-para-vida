
import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      // Aqui integraria com Mailchimp/ConvertKit no futuro
    }
  };

  return (
    <section className="bg-white py-24 px-6 border-y border-purple-50 no-print">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-purple-900 to-[#1A0B2E] rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <span className="text-amber-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Networking de Elite</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">Entre na <br/><span className="italic text-amber-500">Comunidade VIP</span></h2>
            <p className="text-purple-200/60 text-lg font-light leading-relaxed">
              Receba convites para mentorias ao vivo, novos capítulos e ferramentas exclusivas do Grupo Conexões Digitais.
            </p>
          </div>

          <div className="w-full max-w-md">
            {!subscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail profissional"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-8 py-5 text-white placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-lg"
                />
                <button 
                  type="submit"
                  className="w-full bg-amber-500 text-purple-950 py-5 rounded-2xl font-bold text-lg hover:bg-amber-400 transition-all shadow-xl shadow-amber-900/40 active:scale-95"
                >
                  Garantir meu Lugar
                </button>
                <p className="text-[10px] text-center text-purple-400 uppercase tracking-widest">Sem spam. Apenas evolução feminina.</p>
              </form>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white text-2xl font-serif mb-2">Bem-vinda à Comunidade!</h3>
                <p className="text-purple-300 text-sm">Verifique sua caixa de entrada para o primeiro presente.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
