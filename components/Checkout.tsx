
import React, { useState } from 'react';

const Checkout: React.FC = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'offer' | 'form'>('offer');

  return (
    <section id="checkout" className="bg-[#FDFBF7] py-24 px-6 relative">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(67,32,112,0.1)] border border-purple-50 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Lado Esquerdo - Oferta */}
          <div className="bg-[#432070] text-white p-12 md:w-1/2 flex flex-col justify-center">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-4">Oferta Exclusiva 2026</span>
            <h3 className="text-4xl font-serif mb-6 leading-tight">Sua voz vale ouro. Invista em você.</h3>
            <ul className="space-y-4 mb-10">
              {['Ebook Completo (Volume 01)', 'Acesso à Mentora IA 24h', 'Planilha de Treino 30 Dias', 'Certificado de Conclusão'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-purple-100">
                  <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-baseline gap-2">
              <span className="text-purple-300 line-through text-sm">R$ 197,00</span>
              <span className="text-4xl font-bold text-white">R$ 47,90</span>
            </div>
          </div>

          {/* Lado Direito - Ação */}
          <div className="p-12 md:w-1/2 flex flex-col justify-center">
            {step === 'offer' ? (
              <>
                <h4 className="text-2xl font-serif text-purple-950 mb-4">Garanta seu acesso agora</h4>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">Libere o conteúdo completo e as ferramentas interativas para transformar sua oratória hoje.</p>
                <button 
                  onClick={() => setStep('form')}
                  className="w-full bg-amber-500 text-purple-950 py-5 rounded-2xl font-bold text-lg hover:bg-amber-400 transition-all shadow-xl shadow-amber-200 active:scale-95"
                >
                  Quero Vencer a Timidez
                </button>
              </>
            ) : (
              <div className="animate-fade-in">
                <h4 className="text-2xl font-serif text-purple-950 mb-6">Estamos quase lá!</h4>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="w-full bg-purple-50 border border-purple-100 rounded-xl px-6 py-4 mb-4 focus:ring-2 focus:ring-purple-400 outline-none"
                />
                <button 
                  className="w-full bg-[#432070] text-white py-5 rounded-2xl font-bold hover:bg-[#5A2D92] transition-all"
                >
                  Ir para Pagamento Seguro
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest">🔒 Pagamento processado pelo Grupo Conexões Digitais</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
