
import React from 'react';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (lang: Language) => void;
  onPrint: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, lang, setLang, onPrint }) => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-purple-100 selection:text-purple-900">
      <header className="no-print sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-purple-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#432070] to-[#8E44AD] rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-200">
            V
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-serif font-bold text-purple-950 leading-none">Voz de Mulher</span>
            <span className="text-[9px] uppercase tracking-widest text-amber-600 font-bold mt-1">Edição 2026</span>
          </div>
        </div>

        <nav className="flex items-center gap-8">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as Language)}
            className="hidden md:block bg-transparent border-none text-xs font-bold text-purple-700 cursor-pointer focus:ring-0 uppercase tracking-widest"
          >
            <option value="pt">Português</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
          
          <button 
            onClick={onPrint}
            className="bg-[#432070] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#5A2D92] transition-all shadow-xl shadow-purple-100 active:scale-95 uppercase tracking-widest"
          >
            Baixar Ebook
          </button>
        </nav>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="no-print bg-[#0F0819] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-serif mb-2">Voz de Mulher</h3>
            <p className="text-purple-200/60 text-sm leading-relaxed font-light">
              Uma plataforma dedicada à emancipação feminina através da comunicação consciente e estratégica. Nossa missão é dar voz ao seu propósito.
            </p>
            <div className="pt-4">
              <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold mb-1">Autor Principal</p>
              <p className="text-lg font-serif text-white">Viegas Vicente</p>
              <p className="text-xs text-amber-500 font-medium">Grupo Conexões Digitais</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-8">Navegação Digital</h4>
            <ul className="text-purple-200/50 text-sm space-y-4">
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Sumário Executivo</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Laboratório de Voz</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Mentoria Exclusiva</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Suporte ao Leitor</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-8">Presença Global</h4>
            <div className="flex gap-4">
              {['INSTAGRAM', 'LINKEDIN', 'YOUTUBE'].map(social => (
                <span key={social} className="px-3 py-2 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold cursor-pointer hover:bg-purple-600 transition-all">
                  {social}
                </span>
              ))}
            </div>
            <p className="mt-10 text-[10px] text-purple-300/40 leading-relaxed italic">
              "A comunicação é a única ponte capaz de unir o seu sonho à realidade do mundo."
            </p>
          </div>
        </div>
        <div className="mt-20 text-center text-[10px] text-purple-400/30 border-t border-white/5 pt-10 uppercase tracking-[0.2em]">
          &copy; 2026 Voz de Mulher &bull; Desenvolvido por Grupo Conexões Digitais &bull; Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
