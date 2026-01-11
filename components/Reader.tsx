
import React, { useState, useEffect, useRef } from 'react';
import { EbookContent, Chapter } from '../types';
import { getExpertAdvice } from '../services/geminiService';
import Flashcards from './Flashcards';

interface ReaderProps {
  ebook: EbookContent;
}

const Reader: React.FC<ReaderProps> = ({ ebook }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [displayedAdvice, setDisplayedAdvice] = useState('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [userFear, setUserFear] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Estados para anotações e persistência
  const [userNotes, setUserNotes] = useState<Record<number, string>>({});
  const [currentNote, setCurrentNote] = useState('');
  const [showNotes, setShowNotes] = useState(true);

  const notesRef = useRef<HTMLTextAreaElement>(null);
  const currentChapter = ebook.chapters[activeChapterIndex];
  const nextChapter = ebook.chapters[activeChapterIndex + 1];
  const prevChapter = ebook.chapters[activeChapterIndex - 1];

  // Efeito de Digitação (Typewriter) para a Mentora IA
  useEffect(() => {
    if (aiAdvice) {
      setDisplayedAdvice('');
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedAdvice((prev) => prev + aiAdvice.charAt(i));
        i++;
        if (i >= aiAdvice.length) clearInterval(interval);
      }, 25);
      return () => clearInterval(interval);
    }
  }, [aiAdvice]);

  // Atalhos de Teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isTyping = 
        document.activeElement?.tagName === 'INPUT' || 
        document.activeElement?.tagName === 'TEXTAREA' ||
        (document.activeElement as HTMLElement)?.isContentEditable;

      if (!isTyping) {
        if (e.key === 'ArrowRight' && activeChapterIndex < ebook.chapters.length - 1) {
          e.preventDefault();
          setActiveChapterIndex(prev => prev + 1);
        } else if (e.key === 'ArrowLeft' && activeChapterIndex > 0) {
          e.preventDefault();
          setActiveChapterIndex(prev => prev - 1);
        }
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setShowNotes(prev => {
          const nextState = !prev;
          if (nextState) {
            setTimeout(() => notesRef.current?.focus(), 100);
          }
          return nextState;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeChapterIndex, ebook.chapters.length]);

  // Carregar dados salvos
  useEffect(() => {
    const savedData = localStorage.getItem('voz_de_mulher_v2026');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.notes) setUserNotes(parsed.notes);
      if (parsed.lastChapterId) {
        const lastIdx = ebook.chapters.findIndex(c => c.id === parsed.lastChapterId);
        if (lastIdx !== -1) setActiveChapterIndex(lastIdx);
      }
    }
  }, [ebook.chapters]);

  // Salvar automaticamente progresso e notas
  useEffect(() => {
    const dataToSave = {
      lastChapterId: currentChapter.id,
      notes: userNotes,
    };
    localStorage.setItem('voz_de_mulher_v2026', JSON.stringify(dataToSave));
  }, [activeChapterIndex, userNotes, currentChapter.id]);

  // Atualizar nota local ao mudar de capítulo
  useEffect(() => {
    setCurrentNote(userNotes[currentChapter.id] || '');
  }, [activeChapterIndex, userNotes, currentChapter.id]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCurrentNote(val);
    setUserNotes(prev => ({ ...prev, [currentChapter.id]: val }));
  };

  const handleAskExpert = async () => {
    if (!userFear) return;
    setLoadingAdvice(true);
    setAiAdvice(null);
    setDisplayedAdvice('');
    const advice = await getExpertAdvice(currentChapter.title, userFear);
    setAiAdvice(advice);
    setLoadingAdvice(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Resetar estados ao mudar capítulo e scroll para o topo
  useEffect(() => {
    setAiAdvice(null);
    setDisplayedAdvice('');
    setUserFear('');
    window.scrollTo({ top: document.getElementById('reader-top')?.offsetTop || 0, behavior: 'smooth' });
  }, [activeChapterIndex]);

  return (
    <div id="ebook-content" className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12 relative">
      {/* Navegação Lateral (Desktop) */}
      <aside className="no-print lg:col-span-1 space-y-4">
        <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-6">Sumário</h3>
        <nav className="flex flex-col gap-2">
          {ebook.chapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setActiveChapterIndex(idx)}
              className={`text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-3 group/nav ${
                activeChapterIndex === idx 
                ? 'bg-purple-100 text-purple-900 font-bold shadow-sm' 
                : 'text-gray-500 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                activeChapterIndex === idx ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {ch.id}
              </span>
              <div className="flex-1 truncate">{ch.title}</div>
              {userNotes[ch.id] && (
                <div className="w-2 h-2 bg-amber-400 rounded-full shrink-0 animate-pulse" title="Reflexão salva"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Info Box Atalhos */}
        <div className="mt-8 bg-gradient-to-br from-purple-50 to-white p-5 rounded-2xl border border-purple-100 hidden lg:block shadow-sm">
          <p className="text-[10px] font-bold text-purple-500 uppercase tracking-widest mb-4">Dicas de Leitura</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[11px] text-purple-800">
              <span className="font-medium">Navegar</span>
              <div className="flex gap-1">
                <kbd className="bg-white px-1.5 py-0.5 rounded border border-purple-200 shadow-sm font-mono text-[9px]">←</kbd>
                <kbd className="bg-white px-1.5 py-0.5 rounded border border-purple-200 shadow-sm font-mono text-[9px]">→</kbd>
              </div>
            </div>
            <div className="flex justify-between items-center text-[11px] text-purple-800">
              <span className="font-medium">Abrir Notas</span>
              <kbd className="bg-white px-1.5 py-0.5 rounded border border-purple-200 shadow-sm font-mono text-[9px]">Ctrl+N</kbd>
            </div>
          </div>
        </div>
      </aside>

      {/* Área Principal de Conteúdo */}
      <article className="lg:col-span-3 relative">
        <div id="reader-top"></div>
        <div className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-sm border border-purple-50 min-h-[600px] flex flex-col">
          {/* Header do Capítulo */}
          <div className="mb-12">
            <span className="text-purple-600 font-bold text-sm uppercase tracking-widest">Capítulo {currentChapter.id}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-purple-900 mt-4 mb-2">{currentChapter.title}</h2>
            {currentChapter.subtitle && <p className="text-xl text-amber-600 font-medium italic">{currentChapter.subtitle}</p>}
          </div>

          {/* Texto do Capítulo */}
          <div className="prose prose-purple prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            {currentChapter.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Flashcards do Capítulo */}
          {currentChapter.flashcards && currentChapter.flashcards.length > 0 && (
            <Flashcards cards={currentChapter.flashcards} />
          )}

          {/* Seção de Vídeo (Opcional) */}
          {currentChapter.videoUrl && (
            <div className="mt-16 bg-gradient-to-br from-[#1E1435] to-[#3B1F5E] text-white p-10 rounded-[2.5rem] overflow-hidden relative shadow-2xl no-print group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
               <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-amber-500/20 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 text-amber-400">Vídeo-Treino</div>
                    <h4 className="text-2xl font-serif mb-4">Laboratório de Voz</h4>
                    <p className="text-purple-100 text-sm mb-8 leading-relaxed">Prepare sua voz para as técnicas deste capítulo com uma prática guiada em vídeo.</p>
                    <a 
                      href={currentChapter.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-amber-500 text-purple-950 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-amber-400 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-900/20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Assistir Treinamento
                    </a>
                  </div>
                  <div className="w-full md:w-64 aspect-video bg-black/40 rounded-3xl flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all">
                     <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* Afirmação do Capítulo */}
          {currentChapter.affirmation && (
            <div className="mt-16 bg-gradient-to-r from-purple-50/50 to-amber-50/50 p-12 rounded-[2.5rem] border border-purple-100 text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-5 py-1.5 rounded-full border border-purple-100 text-[10px] font-bold text-purple-600 uppercase tracking-widest shadow-sm">Mantra de Confiança</div>
              <p className="text-3xl font-serif italic text-purple-900 leading-snug">"{currentChapter.affirmation}"</p>
            </div>
          )}

          {/* Diário de Reflexão (Anotações) */}
          <div className="mt-20 pt-12 border-t border-gray-100 no-print">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-100 rounded-[1.5rem] flex items-center justify-center text-amber-600 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif text-purple-900">Diário de Bordo</h4>
                    <p className="text-xs text-gray-400 italic">Notas exclusivas do capítulo • <kbd className="bg-gray-100 px-1 rounded border">Ctrl+N</kbd></p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowNotes(!showNotes)}
                    className="px-5 py-2.5 bg-purple-50 text-purple-600 rounded-full text-xs font-bold hover:bg-purple-100 transition-all border border-purple-100"
                  >
                    {showNotes ? 'Recolher Diário' : 'Expandir Diário'}
                  </button>
                </div>
             </div>
             
             {showNotes && (
               <div className="relative animate-fade-in group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-300 to-purple-300 rounded-[2.5rem] blur opacity-5 group-focus-within:opacity-20 transition duration-500"></div>
                  <textarea 
                    ref={notesRef}
                    value={currentNote}
                    onChange={handleNoteChange}
                    placeholder="Sua jornada é única. Registre aqui seus insights, medos superados e planos de ação..."
                    className="relative w-full h-56 bg-[#FFFDFB] border border-amber-100 rounded-[2.5rem] p-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-amber-200 resize-none font-medium shadow-inner text-xl leading-relaxed"
                  />
                  <div className="absolute bottom-6 right-8 text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-2 pointer-events-none">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                    Sincronizado na Nuvem Local
                  </div>
               </div>
             )}
          </div>

          {/* --- NAVEGAÇÃO PRINCIPAL (ANTERIOR / PRÓXIMO) --- */}
          <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 no-print">
            <button 
              disabled={activeChapterIndex === 0}
              onClick={() => setActiveChapterIndex(p => p - 1)}
              className="w-full sm:w-auto flex items-center justify-center gap-6 px-10 py-6 rounded-3xl font-bold transition-all disabled:opacity-20 disabled:cursor-not-allowed group border-2 border-purple-100 text-purple-700 hover:bg-purple-50 hover:border-purple-200 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold mb-1">Capítulo Anterior</span>
                <span className="text-lg truncate max-w-[200px] block font-serif">
                  {prevChapter ? prevChapter.title : 'Início do Ebook'}
                </span>
              </div>
            </button>

            <button 
              disabled={activeChapterIndex === ebook.chapters.length - 1}
              onClick={() => setActiveChapterIndex(p => p + 1)}
              className="w-full sm:w-auto flex items-center justify-center gap-8 px-12 py-6 rounded-3xl font-bold transition-all disabled:opacity-20 disabled:cursor-not-allowed group bg-[#432070] text-white hover:bg-[#5A2D92] shadow-2xl shadow-purple-200 active:scale-95"
            >
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-purple-200 font-bold mb-1">Próximo Capítulo</span>
                <span className="text-lg truncate max-w-[200px] block font-serif">
                  {nextChapter ? nextChapter.title : 'Conclusão'}
                </span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Mentoria IA de Confiança */}
          <div className="no-print mt-24 bg-[#140B21] text-white p-12 md:p-20 rounded-[3.5rem] overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full -mr-48 -mt-48 blur-[120px] opacity-30"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-purple-950 font-bold text-xl shadow-lg shadow-amber-500/20">M</div>
                 <h4 className="text-4xl font-serif">Mentoria IA</h4>
              </div>
              <p className="text-purple-100 text-xl mb-12 max-w-2xl font-light leading-relaxed">
                Qual dificuldade você enfrentou hoje em <strong>{currentChapter.title}</strong>? Peça uma orientação agora.
              </p>
              
              <div className="flex flex-col md:flex-row gap-6">
                <input 
                  type="text" 
                  value={userFear}
                  onChange={(e) => setUserFear(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskExpert()}
                  placeholder="Minha voz treme muito quando..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-10 py-6 text-white placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-xl"
                />
                <button 
                  onClick={handleAskExpert}
                  disabled={loadingAdvice || !userFear}
                  className="bg-amber-500 text-purple-950 px-12 py-6 rounded-2xl font-bold text-lg hover:bg-amber-400 transition-all disabled:opacity-50 shadow-xl shadow-amber-500/10 active:scale-95 whitespace-nowrap flex items-center justify-center gap-3"
                >
                  {loadingAdvice ? (
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-purple-950 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-950 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-purple-950 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    </div>
                  ) : 'Pedir Mentoria'}
                </button>
              </div>
              
              {(loadingAdvice || displayedAdvice) && (
                <div className="mt-12 bg-white/5 p-12 rounded-[3rem] border border-white/10 animate-fade-in relative backdrop-blur-md">
                  <div className="absolute -top-4 left-10 bg-purple-700 text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-full border border-purple-500 shadow-lg">Mentora Digital</div>
                  {loadingAdvice && !displayedAdvice ? (
                    <div className="space-y-4 py-4">
                       <div className="h-5 bg-white/10 rounded-full w-4/5 animate-pulse"></div>
                       <div className="h-5 bg-white/10 rounded-full w-3/5 animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="text-2xl italic leading-relaxed text-purple-50 font-serif">
                      {displayedAdvice}
                      <span className="w-1.5 h-8 bg-amber-500 inline-block ml-2 animate-pulse align-middle"></span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Reader;
