/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  History, 
  Map as MapIcon, 
  Landmark, 
  Users, 
  BookOpen,
  Menu,
  X,
  CreditCard
} from "lucide-react";
import { euCountries, euTimeline, euInstitutions } from "./data/euData";

// --- Sub-components ---

interface InstitutionItemProps {
  inst: any;
}

const InstitutionItem: React.FC<InstitutionItemProps> = ({ inst }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="asymmetric-card"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="bg-eu-blue/5 p-3 rounded-sm border border-eu-blue/10">
        <Landmark className="text-eu-blue w-6 h-6" />
      </div>
      <span className="micro-label opacity-40">{inst.role}</span>
    </div>
    <h3 className="heading-serif text-2xl mb-2">{inst.name}</h3>
    <p className="micro-label text-eu-blue mb-3 flex items-center gap-2">
      <MapIcon size={12} /> {inst.location}
    </p>
    <p className="text-sm text-slate-600 leading-relaxed">{inst.description}</p>
  </motion.div>
);

interface TimelineNodeProps {
  event: any;
  index: number;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ event, index }) => (
  <div className="relative flex gap-8 pb-12 group">
    <div className="flex flex-col items-center">
      <div className="heading-serif text-xl text-eu-blue z-10 bg-editorial-bg px-2">
        {event.year}
      </div>
      <div className="w-px h-full bg-editorial-ink/10 absolute top-4 left-1/2 -translate-x-1/2 group-last:hidden" />
    </div>
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex-1 border-t border-editorial-ink/10 pt-4"
    >
      <h3 className="heading-serif text-2xl mb-2 text-editorial-ink">{event.title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{event.description}</p>
    </motion.div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Estado para o jogo de correspondência
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState<{country: any, options: any[]} | null>(null);
  const [feedback, setFeedback] = useState<{ msg: string, type: 'success' | 'error' | null }>({ msg: "", type: null });

  const generateQuestion = () => {
    const randomCountry = euCountries[Math.floor(Math.random() * euCountries.length)];
    const others = euCountries.filter(c => c.id !== randomCountry.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [randomCountry, ...others].sort(() => 0.5 - Math.random());
    setQuizQuestion({ country: randomCountry, options });
    setFeedback({ msg: "", type: null });
  };

  const handleAnswer = (selectedId: string) => {
    if (quizQuestion?.country.id === selectedId) {
      setQuizScore(prev => prev + 1);
      setFeedback({ msg: "Correto! A capital de " + quizQuestion.country.name + " é " + quizQuestion.country.capital + ".", type: 'success' });
      setTimeout(generateQuestion, 2000);
    } else {
      setFeedback({ msg: "Incorreto. Tenta outra vez!", type: 'error' });
    }
  };

  // Inicializar primeira pergunta
  if (!quizQuestion && activeTab === 'mapa') generateQuestion();

  const tabs = [
    { id: 'inicio', label: 'Início', icon: Landmark },
    { id: 'mapa', label: 'Desafio Capitais', icon: MapIcon },
    { id: 'historia', label: 'Cronologia', icon: History },
    { id: 'instituicoes', label: 'Instituições', icon: Landmark },
    { id: 'cidadania', label: 'Cidadania', icon: Users },
    { id: 'guia', label: 'Guia & GitHub', icon: BookOpen },
  ];

  return (
    <div className="flex min-h-screen bg-editorial-bg text-editorial-ink font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-80 border-r border-editorial-border flex-col p-8 sticky top-0 h-screen overflow-y-auto bg-editorial-bg">
        <div className="flex flex-col mb-12">
          <p className="micro-label mb-2">Edição 2026 • Guia de Estudo</p>
          <h1 className="heading-serif text-5xl">EuroGuia</h1>
          <p className="text-[9px] uppercase tracking-[0.3em] font-bold mt-2 opacity-40">Compêndio Interativo da União Europeia</p>
          <div className="h-px bg-editorial-ink mt-4 w-full" />
        </div>

        <nav className="flex-1 space-y-1 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-4 py-3 border-b border-editorial-border transition-all group ${
                activeTab === tab.id 
                ? 'bg-editorial-ink text-white' 
                : 'hover:bg-editorial-ink/5 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-4">
                <tab.icon size={16} className={activeTab === tab.id ? 'text-eu-gold' : ''} />
                <span className="text-xs uppercase tracking-widest font-bold">{tab.label}</span>
              </div>
              <span className={`text-[10px] italic font-display ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}>ver</span>
            </button>
          ))}
        </nav>

        <div className="mt-8">
          <div className="p-6 border border-editorial-border bg-white shadow-editorial">
            <h4 className="micro-label text-eu-blue mb-2">Suporte e Ajuda</h4>
            <p className="text-[10px] leading-relaxed opacity-60">Consulte o guia para aprender a navegar e atualizar no GitHub.</p>
            <button 
              onClick={() => setActiveTab('guia')}
              className="mt-4 text-[10px] uppercase font-bold text-eu-blue border-b border-eu-blue/20"
            >
              Abrir Guia
            </button>
          </div>
        </div>

        <footer className="mt-8 pt-6 border-t border-editorial-border flex flex-col gap-2">
          <p className="micro-label opacity-30">In Varietate Concordia</p>
          <p className="text-[8px] opacity-20 uppercase tracking-widest font-bold">© 2026 Portal de Conhecimento Europeu</p>
        </footer>
      </aside>

      {/* Mobile Menu Toggle */}
      <button 
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-editorial-ink text-white rounded-sm shadow-xl"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-16 max-w-5xl mx-auto w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'inicio' && (
            <motion.div 
              key="inicio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-20 pt-8"
            >
              <header className="space-y-6 border-b border-editorial-ink pb-12">
                <p className="micro-label text-eu-blue opacity-100">Manchete Europa • 2026</p>
                <h2 className="heading-serif text-7xl lg:text-9xl tracking-tighter">A Nossa União: <br/><span className="text-eu-blue italic lg:text-8xl">O Futuro Compartilhado</span></h2>
                <div className="grid md:grid-cols-2 gap-12 items-end">
                   <p className="text-lg text-slate-600 font-light leading-relaxed">
                    Explore as narrativas profundas, as fronteiras fluídas e as arquiteturas políticas que sustentam o projeto de paz mais ambicioso da história moderna.
                  </p>
                  <div className="flex justify-end gap-1 px-4">
                     {[...Array(3)].map((_, i) => (
                       <div key={i} className={`w-3 h-3 rounded-full bg-eu-blue ${i === 1 ? 'opacity-50' : i === 2 ? 'opacity-25' : ''}`} />
                     ))}
                  </div>
                </div>
              </header>

              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="col-span-8 asymmetric-card bg-white p-10 hover:translate-y-[-4px] transition-transform">
                  <p className="micro-label mb-4 opacity-100 text-eu-blue">Atividade Interativa</p>
                  <h3 className="heading-serif text-4xl mb-6">Desafio das Capitais</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Teste os seus conhecimentos sobre a geografia política da União Europeia. Consegue identificar todas as capitais dos 27 Estados-membros?
                  </p>
                  <button onClick={() => setActiveTab('mapa')} className="text-xs uppercase tracking-[0.2em] font-bold border-b border-eu-blue pb-1 hover:text-eu-blue transition-colors">
                    Iniciar Desafio
                  </button>
                </div>
                
                <div className="col-span-4 border border-editorial-border p-8 flex flex-col items-center text-center bg-white/40">
                  <History className="w-10 h-10 text-eu-gold mb-6" />
                  <h3 className="heading-serif text-2xl mb-4">Arquivo Histórico</h3>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold leading-relaxed mb-6">
                    A jornada desde o carvão e o aço até à cidadania digital.
                  </p>
                  <button onClick={() => setActiveTab('historia')} className="text-[10px] uppercase font-bold text-eu-blue border border-eu-blue/20 px-6 py-2 hover:bg-eu-blue hover:text-white transition-colors">
                    Ver Registros
                  </button>
                </div>
              </div>

              <div className="bg-editorial-ink text-white p-16 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
                <div className="relative z-10 flex-1 space-y-8 text-center md:text-left">
                  <h3 className="heading-serif text-5xl text-white">A Cartilha do Cidadão</h3>
                  <p className="text-slate-400 font-light max-w-lg leading-relaxed">
                    Sua identidade como cidadão europeu confere prerrogativas inalienáveis. Descubra como exercer seus direitos e deveres fundamentais num espaço sem fronteiras interiores.
                  </p>
                  <button onClick={() => setActiveTab('cidadania')} className="border border-white/30 px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-editorial-ink transition-all">
                    Aceder à Cartilha
                  </button>
                </div>
                <div className="hidden md:block w-32 h-32 border-4 border-eu-gold rounded-full flex-shrink-0 animate-pulse" />
              </div>
            </motion.div>
          )}

          {activeTab === 'mapa' && (
            <motion.div 
               key="mapa"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="space-y-12"
            >
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-editorial-ink pb-12">
                <div className="space-y-4">
                  <p className="micro-label text-eu-blue opacity-100">Jogo Educativo • Geografia Política</p>
                  <h2 className="heading-serif text-5xl lg:text-7xl">Correspondência de Capitais</h2>
                  <p className="text-slate-500 max-w-lg italic font-light">Ligue cada país à sua capital correspondente para acumular pontos.</p>
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-3 border border-editorial-border shadow-editorial">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pontuação Atual</span>
                  <span className="heading-serif text-3xl text-eu-blue">{quizScore}</span>
                </div>
              </header>

              <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  {quizQuestion && (
                    <motion.div 
                      key={quizQuestion.country.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white p-12 border border-editorial-border shadow-editorial text-center space-y-10"
                    >
                      <div className="space-y-4">
                        <span className="text-8xl mb-4 block">{quizQuestion.country.flag}</span>
                        <h3 className="heading-serif text-5xl">{quizQuestion.country.name}</h3>
                        <p className="micro-label opacity-40">Qual é a capital deste Estado-membro?</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {quizQuestion.options.map((opt: any) => (
                          <button
                            key={opt.id}
                            onClick={() => handleAnswer(opt.id)}
                            className="p-6 border border-editorial-border hover:bg-eu-blue hover:text-white transition-all heading-serif text-2xl group"
                          >
                            <span className="group-hover:italic">{opt.capital}</span>
                          </button>
                        ))}
                      </div>

                      <AnimatePresence>
                        {feedback.msg && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className={`p-4 text-sm font-bold uppercase tracking-widest border ${
                              feedback.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                            }`}
                          >
                            {feedback.msg}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {activeTab === 'historia' && (
            <motion.div 
               key="historia"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="space-y-16"
            >
              <header className="text-center max-w-2xl mx-auto space-y-4 border-b border-editorial-ink pb-12">
                <p className="micro-label text-eu-blue opacity-100">Arquivo • Memória Europeia</p>
                <h2 className="heading-serif text-6xl">Crónica da Integração</h2>
                <p className="text-slate-500 italic font-light italic leading-relaxed">
                  Uma narrativa cronológica dos pactos, tratados e alinhamentos que consolidaram a paz no continente europeu desde o pós-guerra.
                </p>
              </header>

              <div className="max-w-3xl mx-auto px-8">
                {euTimeline.map((event, i) => (
                  <TimelineNode key={i} event={event} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'instituicoes' && (
            <motion.div 
               key="instituicoes"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="space-y-16"
            >
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-editorial-ink pb-12">
                <div className="space-y-4">
                   <p className="micro-label text-eu-blue opacity-100">Governança • Pilares da União</p>
                   <h2 className="heading-serif text-5xl lg:text-7xl">Equilíbrio de Poderes</h2>
                   <p className="text-slate-500 max-w-lg italic font-light">O Triângulo Institucional e os órgãos de fiscalização que regem o Estado de Direito na Europa.</p>
                </div>
              </header>

              <div className="grid md:grid-cols-2 gap-8">
                {euInstitutions.map((inst, i) => (
                  <InstitutionItem key={i} inst={inst} />
                ))}
              </div>

              <div className="border border-editorial-ink p-12 bg-white flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-px bg-eu-gold" />
                <h3 className="heading-serif text-3xl">O Primado dos Tratados</h3>
                <p className="text-slate-600 leading-relaxed max-w-2xl font-light italic">
                  \"A União não é um super-Estado, mas uma associação de Estados soberanos regidos por tratados internacionais que definem as suas competências exclusivas e partilhadas.\"
                </p>
                <div className="grid grid-cols-3 gap-8 w-full max-w-md pt-8 border-t border-editorial-border">
                   <div><p className="micro-label mb-1">Roma</p><p className="heading-serif text-xl opacity-40">1957</p></div>
                   <div><p className="micro-label mb-1">Maastricht</p><p className="heading-serif text-xl opacity-40">1992</p></div>
                   <div><p className="micro-label mb-1">Lisboa</p><p className="heading-serif text-xl opacity-40">2007</p></div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'cidadania' && (
            <motion.div 
               key="cidadania"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="space-y-16"
            >
              <header className="text-center max-w-3xl mx-auto space-y-4 border-b border-editorial-ink pb-12">
                <p className="micro-label text-eu-blue opacity-100">Prerrogativas • Identidade Coletiva</p>
                <h2 className="heading-serif text-6xl">A Carta de Direitos</h2>
                <p className="text-slate-500 text-lg font-light leading-relaxed">
                  Ser cidadão europeu é integrar uma comunidade de valores baseada no respeito pela dignidade humana e pela liberdade individual.
                </p>
              </header>

              <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-7 space-y-10">
                  <h3 className="heading-serif text-3xl flex items-center gap-4">
                    <span className="text-eu-blue/20 italic">01</span> Direitos Fundamentais
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { title: "Livre Circulação", desc: "Trabalho e residência sem obstáculos administrativos." },
                      { title: "Proteção Consular", desc: "Assistência diplomática universal em território estrangeiro." },
                      { title: "Sufregio Universal", desc: "O direito de influenciar a governança por via do voto direto." },
                      { title: "Petição Democrática", desc: "Acesso direto à Comissão via Iniciativa de Cidadania." },
                    ].map((item, i) => (
                      <div key={i} className="border border-editorial-border p-6 bg-white hover:bg-editorial-bg transition-colors">
                        <h4 className="micro-label text-eu-blue opacity-100 mb-2">{item.title}</h4>
                        <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5 space-y-10">
                  <h3 className="heading-serif text-3xl flex items-center gap-4">
                    <span className="text-eu-blue/20 italic">02</span> Deveres e Acesso
                  </h3>
                  <div className="bg-editorial-ink text-white p-10 space-y-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-eu-gold/10 -translate-y-1/2 translate-x-1/2 rounded-full" />
                    <div>
                      <h4 className="heading-serif text-xl text-eu-gold mb-3 italic">Saúde e Solidariedade</h4>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">O Cartão Europeu de Seguro de Doença assegura a continuidade de tratamentos em qualquer ponto geográfico da união.</p>
                    </div>
                    <div>
                      <h4 className="heading-serif text-xl text-eu-gold mb-3 italic">Valores Civilizacionais</h4>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">O respeito pela diversidade cultural e linguística é o alicerce da nossa coexistência pacífica.</p>
                    </div>
                    <div className="pt-8 border-t border-white/10">
                      <p className="text-[10px] text-slate-400 italic font-display tracking-widest uppercase">"Unida na Diversidade"</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'guia' && (
            <motion.div 
               key="guia"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="space-y-16"
            >
              <header className="text-center max-w-3xl mx-auto space-y-4 border-b border-editorial-ink pb-12">
                <p className="micro-label text-eu-blue opacity-100">Manual • Ajuda ao Utilizador</p>
                <h2 className="heading-serif text-6xl">Instruções e Atualização</h2>
                <p className="text-slate-500 text-lg font-light leading-relaxed">
                  Saiba como navegar nesta aplicação e como sincronizar as suas alterações com o GitHub.
                </p>
              </header>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="asymmetric-card border-l-eu-gold">
                    <div className="flex items-center gap-4 mb-4">
                      <MapIcon className="text-eu-blue" />
                      <h3 className="heading-serif text-2xl">Jogo de Capitais</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Ligue os países às suas capitais. Ao clicar na opção correta, o jogo gera automaticamente o próximo desafio. Receberá feedback imediato sobre cada resposta.
                    </p>
                  </div>

                  <div className="asymmetric-card border-l-eu-gold">
                    <div className="flex items-center gap-4 mb-4">
                      <History className="text-eu-blue" />
                      <h3 className="heading-serif text-2xl">Manual Digital</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Utilize o menu lateral para navegar entre as secções de história, instituições e direitos de cidadania.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="asymmetric-card bg-slate-900 text-white">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 bg-eu-gold text-slate-900 rounded-sm">
                         <BookOpen size={20} />
                      </div>
                      <h3 className="heading-serif text-2xl text-white">Como Atualizar no GitHub?</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        Como já configurámos as <strong>GitHub Actions</strong> no seu repositório, o processo é automático sempre que faz o "Push" das alterações:
                      </p>
                      <ol className="text-xs space-y-4 list-decimal pl-4 text-slate-300">
                        <li>No painel lateral do AI Studio, selecione o ícone de <strong>GitHub</strong>.</li>
                        <li>Escreva uma mensagem breve do que alterou (ex: "Atualização do jogo de capitais").</li>
                        <li>Clique no botão <strong>Commit & Push</strong>.</li>
                        <li>O GitHub detetará as alterações e iniciará automaticamente a publicação em 1-2 minutos.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-editorial-border p-8 bg-white/50 text-center">
                 <p className="micro-label opacity-40">Estado da Publicação</p>
                 <p className="text-xs italic mt-2">A sua aplicação está ativa em: <a href="https://proftfaria.github.io/Euro-guia/" target="_blank" className="text-eu-blue border-b border-eu-blue">proftfaria.github.io/Euro-guia/</a></p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Drawer (Overlay) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[40] lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-editorial-bg z-[41] p-8 flex flex-col lg:hidden overflow-y-auto border-r border-editorial-border"
            >
              {/* Mobile Sidebar Content */}
              <div className="flex flex-col mb-10">
                <p className="micro-label mb-2">Edição 2026</p>
                <h1 className="heading-serif text-4xl">EuroGuia</h1>
                <div className="h-px bg-editorial-ink mt-4 w-full" />
              </div>
              <nav className="flex-1 space-y-1 mb-8 overflow-y-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-3 border-b border-editorial-border transition-all ${
                      activeTab === tab.id 
                      ? 'bg-editorial-ink text-white' 
                      : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <tab.icon size={16} />
                      <span className="text-xs uppercase tracking-widest font-bold">{tab.label}</span>
                    </div>
                  </button>
                ))}
              </nav>
              <div className="mt-8 border border-editorial-border bg-white p-4 shadow-editorial">
                <p className="micro-label text-eu-blue mb-2">Suporte</p>
                <p className="text-[10px] opacity-60">Consulte o guia para aprender a navegar e atualizar.</p>
                <button 
                  onClick={() => { setActiveTab('guia'); setIsSidebarOpen(false); }}
                  className="mt-4 text-[10px] font-bold uppercase border-b border-eu-blue"
                >
                  Abrir Guia
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
