
import React, { useState, useEffect } from 'react';
import { Flashcard } from '../types';

interface FlashcardsProps {
  cards: Flashcard[];
}

const Flashcards: React.FC<FlashcardsProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
    setCurrentIndex(0);
  }, [cards]);

  if (!cards || cards.length === 0) return null;

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  return (
    <div className="mt-16 bg-[#FDFBF7] p-8 md:p-12 rounded-[2.5rem] border border-purple-100 no-print">
      <div className="text-center mb-10">
        <span className="text-amber-600 font-bold text-[10px] uppercase tracking-[0.3em]">Revisão Ativa</span>
        <h3 className="text-3xl font-serif text-purple-900 mt-2">Flashcards do Capítulo</h3>
        <p className="text-gray-500 text-sm mt-2">Clique no cartão para ver a resposta e fixar o conhecimento.</p>
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* Container do Card com efeito de virada */}
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full max-w-lg aspect-[1.6/1] perspective-1000 cursor-pointer group"
        >
          <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* Lado Frontal (Pergunta) */}
            <div className="absolute inset-0 backface-hidden bg-white border-2 border-purple-100 rounded-[2rem] shadow-xl flex flex-col items-center justify-center p-8 text-center">
              <span className="text-purple-300 text-[10px] font-bold uppercase tracking-widest mb-4">Pergunta</span>
              <p className="text-xl md:text-2xl font-serif text-purple-950">{currentCard.question}</p>
              <div className="mt-8 text-amber-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">Clique para virar</div>
            </div>

            {/* Lado Traseiro (Resposta) */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-purple-900 to-[#1A0B2E] border-2 border-purple-400 rounded-[2rem] shadow-xl flex flex-col items-center justify-center p-8 text-center text-white">
              <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-4">Resposta</span>
              <p className="text-lg md:text-xl font-light leading-relaxed">{currentCard.answer}</p>
            </div>
          </div>
        </div>

        {/* Controles de Navegação */}
        <div className="flex items-center gap-6">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-purple-200 flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-all active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-xs font-bold text-purple-400 tracking-widest">
            {currentIndex + 1} / {cards.length}
          </div>

          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-purple-200 flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-all active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default Flashcards;
