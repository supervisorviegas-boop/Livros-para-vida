
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

type Platform = 'instagram' | 'ads' | 'linkedin' | 'email' | 'whatsapp';

const MarketingStudio: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);

  const generateMarketingCopy = async () => {
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompts: Record<Platform, string> = {
      instagram: "Crie 3 legendas de alta conversão para o Instagram sobre o ebook 'Voz de Mulher'. O tom deve ser empoderador, focado em mulheres tímidas. Inclua hashtags e CTAs.",
      ads: "Crie um roteiro de 30 segundos para um anúncio de vídeo (Reels/TikTok) vendendo o ebook 'Voz de Mulher'. Foque no problema da timidez e na solução rápida do método.",
      linkedin: "Escreva um artigo curto ou post estruturado para o LinkedIn sobre como a oratória feminina impacta a liderança corporativa, mencionando o método Voz de Mulher.",
      email: "Crie uma sequência de 2 e-mails de vendas (Pitch de Venda) para quem acabou de conhecer o projeto Voz de Mulher, focando em transformação e urgência.",
      whatsapp: "Crie uma mensagem acolhedora para enviar em grupos de networking feminino convidando-as para conhecer o projeto 'Voz de Mulher' de Viegas Vicente."
    };

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompts[platform],
        config: { temperature: 0.7 }
      });
      setGeneratedContent(response.text);
    } catch (error) {
      setGeneratedContent("Erro ao gerar conteúdo. Verifique sua conexão ou chave de API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#0A0510] py-24 px-6 border-t border-white/5 no-print">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 text-center md:text-left">
          <div>
            <span className="text-amber-500 font-bold text-[10px] uppercase tracking-widest">Painel Administrativo da Autora</span>
            <h2 className="text-4xl font-serif text-white mt-2">Estúdio de Marketing Pro</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
            {(['instagram', 'ads', 'linkedin', 'email', 'whatsapp'] as Platform[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${
                  platform === p ? 'bg-purple-600 text-white shadow-lg' : 'text-purple-300 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          
          {!generatedContent && !loading ? (
            <div className="text-center py-12">
              <p className="text-purple-200/60 mb-8 italic">Selecione o canal acima para gerar uma estratégia personalizada de impacto.</p>
              <button 
                onClick={generateMarketingCopy}
                className="bg-white text-purple-950 px-12 py-5 rounded-2xl font-bold hover:bg-amber-500 hover:text-white transition-all shadow-2xl active:scale-95"
              >
                Criar Copy de Impacto
              </button>
            </div>
          ) : (
            <div className="relative z-10">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-purple-300 animate-pulse text-sm">Acelerando seu marketing com IA...</p>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <pre className="whitespace-pre-wrap text-purple-50 font-sans text-lg leading-relaxed mb-10 bg-black/40 p-10 rounded-[2rem] border border-white/5 max-h-[500px] overflow-y-auto custom-scrollbar">
                    {generatedContent}
                  </pre>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(generatedContent);
                        alert("Conteúdo copiado!");
                      }}
                      className="bg-purple-600 text-white px-10 py-4 rounded-xl font-bold text-sm hover:bg-purple-500 transition-all shadow-xl"
                    >
                      Copiar Conteúdo
                    </button>
                    <button 
                      onClick={generateMarketingCopy}
                      className="bg-white/5 text-purple-300 px-10 py-4 rounded-xl font-bold text-sm hover:bg-white/10 transition-all border border-white/10"
                    >
                      Gerar Nova Versão
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketingStudio;
