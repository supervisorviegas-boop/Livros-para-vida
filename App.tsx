
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Cover from './components/Cover';
import Incentive from './components/Incentive';
import Reader from './components/Reader';
import AccessPortal from './components/AccessPortal';
import Checkout from './components/Checkout';
import MarketingStudio from './components/MarketingStudio';
import Newsletter from './components/Newsletter';
import { EBOOK_PT } from './constants/ebookData';
import { Language } from './types';
import { translateContent } from './services/geminiService';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('pt');
  const [translatedEbook, setTranslatedEbook] = useState(EBOOK_PT);
  const [isTranslating, setIsTranslating] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  // Tradução em tempo real usando Gemini
  useEffect(() => {
    if (lang === 'pt') {
      setTranslatedEbook(EBOOK_PT);
      return;
    }

    const translateFullEbook = async () => {
      setIsTranslating(true);
      const newTitle = await translateContent(EBOOK_PT.title, lang);
      const newTagline = await translateContent(EBOOK_PT.tagline, lang);
      
      setTranslatedEbook({
        ...EBOOK_PT,
        title: newTitle,
        tagline: newTagline
      });
      setIsTranslating(false);
    };

    translateFullEbook();
  }, [lang]);

  const handlePrint = () => {
    window.print();
  };

  const toggleTask = (idx: number) => {
    setCompletedTasks(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <Layout lang={lang} setLang={setLang} onPrint={handlePrint}>
      <Cover />
      
      {/* Seção de Venda Estratégica */}
      <Checkout />

      {/* Motivational Incentive Section */}
      <Incentive />
      
      <div className={isTranslating ? "opacity-30 pointer-events-none transition-opacity duration-500" : "transition-opacity duration-500"}>
        <Reader ebook={translatedEbook} />
      </div>

      {/* Access Portal */}
      <AccessPortal />

      {/* Seção de Captura de Leads / Newsletter */}
      <Newsletter />

      {/* Estúdio de Marketing (Ferramenta para a Autora) */}
      <MarketingStudio />
      
      {/* 30-Day Plan Section Gamificado */}
      <section className="bg-white py-24 px-6 border-t border-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold tracking-widest text-sm uppercase">Sua Jornada de 30 Dias</span>
            <h2 className="text-4xl md:text-6xl font-serif text-purple-900 mt-4 mb-6">Plano de Evolução Interativo</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Marque suas conquistas conforme avança nas semanas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { week: 1, focus: "Fundamentos", items: ["Respiração consciente", "Autoconhecimento", "Voz interna"] },
              { week: 2, focus: "Técnica", items: ["Projeção vocal", "Postura física", "O poder da pausa"] },
              { week: 3, focus: "Prática Real", items: ["Contatos rápidos", "Reuniões pequenas", "Vídeos curtos"] },
              { week: 4, focus: "Maestria", items: ["Storytelling", "Palco e Eventos", "Influência digital"] }
            ].map((w, idx) => (
              <div key={idx} className="bg-[#FDFBF7] p-8 rounded-3xl border border-purple-100 hover:shadow-xl transition-all group">
                <span className="text-purple-300 font-bold text-5xl mb-4 block group-hover:text-purple-600 transition-colors">0{w.week}</span>
                <h3 className="text-xl font-bold text-purple-900 mb-4">{w.focus}</h3>
                <ul className="space-y-3">
                  {w.items.map((item, i) => {
                    const taskId = idx * 10 + i;
                    const isDone = completedTasks.includes(taskId);
                    return (
                      <li key={i} 
                        onClick={() => toggleTask(taskId)}
                        className={`text-sm flex items-center gap-3 cursor-pointer transition-colors ${isDone ? 'text-green-600 line-through' : 'text-gray-600'}`}>
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isDone ? 'bg-green-500 border-green-500' : 'border-purple-200 bg-white'}`}>
                          {isDone && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
                        </div>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Call to Action Final */}
      <section className="bg-purple-900 py-32 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-800/30 rounded-full -mt-[500px] blur-3xl"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">O mundo precisa <br/>ouvir sua voz.</h2>
          <p className="text-purple-200 text-xl mb-12 font-light max-w-2xl mx-auto">
            Não guarde sua mensagem. Alguém precisa ouvir exatamente o que você tem a dizer hoje.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button onClick={handlePrint} className="bg-amber-500 text-purple-900 px-12 py-5 rounded-full font-bold text-xl hover:bg-amber-400 transition-all shadow-2xl hover:-translate-y-1">
              Gerar PDF para Impressão
            </button>
            <a href="#checkout" className="bg-white text-purple-900 px-12 py-5 rounded-full font-bold text-xl hover:bg-purple-100 transition-all shadow-2xl hover:-translate-y-1">
              Mentoria VIP 2026
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
