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
  HelpCircle,
  Menu,
  X,
  CreditCard
} from "lucide-react";
import { euCountries, euTimeline, euInstitutions } from "./data/euData";
import { askGemini } from "./services/geminiService";

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

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    const userMsg = { role: 'user' as const, text: query };
    setMessages([...messages, userMsg]);
    setQuery("");
    setLoading(true);
    
    const response = await askGemini(query, "Contexto: Guia de estudo interativo da UE.");
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setLoading(false);
  };

  return (
    <div className="bg-editorial-ink text-white p-6 rounded-sm shadow-xl flex flex-col h-[400px] border border-white/10">
      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
        <div className="bg-eu-gold p-2">
          <HelpCircle className="text-slate-900 w-5 h-5" />
        </div>
        <div>
          <h3 className="heading-serif text-lg text-white">Assistente Digital</h3>
          <p className="micro-label text-eu-gold opacity-100">Cidadania • Historia • Politica</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 scrollbar-thin">
        {messages.length === 0 && (
          <p className="text-center text-slate-400 mt-6 text-xs italic leading-relaxed">
            Consulte o compêndio interativo através da nossa inteligência artificial especializada.
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 text-xs leading-relaxed ${m.role === 'user' ? 'bg-eu-blue text-white rounded-l-lg rounded-t-lg' : 'bg-white/5 text-slate-200 border border-white/10 rounded-r-lg rounded-t-lg'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-eu-gold text-[10px] uppercase tracking-widest animate-pulse">Processando dados...</div>}
      </div>

      <div className="flex gap-2 border-t border-white/10 pt-4">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Consultar guia..."
          className="flex-1 bg-white/5 border border-white/10 px-4 py-2 text-xs focus:ring-1 focus:ring-eu-gold outline-none"
        />
        <button 
          onClick={handleSend}
          className="bg-eu-gold text-slate-900 font-bold px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-white transition-colors"
        >
          Perguntar
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const tabs = [
    { id: 'inicio', label: 'Início', icon: Landmark },
    { id: 'mapa', label: 'Mapa Interativo', icon: MapIcon },
    { id: 'historia', label: 'Cronologia', icon: History },
    { id: 'instituicoes', label: 'Instituições', icon: Landmark },
    { id: 'cidadania', label: 'Cidadania', icon: Users },
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

        <div>
           <Chatbot />
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
                  <p className="micro-label mb-4 opacity-100 text-eu-blue">Seção Geografia</p>
                  <h3 className="heading-serif text-4xl mb-6">Mapeando a Soberania</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Dos fiordes da Escandinávia às ilhas do Egeu, descubra a identidade visual e os monumentos que definem a estética de cada Estado-membro.
                  </p>
                  <button onClick={() => setActiveTab('mapa')} className="text-xs uppercase tracking-[0.2em] font-bold border-b border-eu-blue pb-1 hover:text-eu-blue transition-colors">
                    Abrir Atlas Interativo
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
                  <p className="micro-label text-eu-blue opacity-100">Mapa de Coesão • Visualização</p>
                  <h2 className="heading-serif text-5xl lg:text-7xl">Geometria e Fronteiras</h2>
                  <p className="text-slate-500 max-w-lg italic font-light">Uma exploração cartográfica dos 27 Estados-membros, suas capitais e símbolos nacionais.</p>
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-3 border border-editorial-border">
                  <div className="w-4 h-4 bg-eu-blue border border-white" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Países da União</span>
                </div>
              </header>

              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 bg-white p-8 shadow-editorial border border-editorial-border relative overflow-hidden">
                  <div className="absolute top-0 left-0 p-4 z-10">
                    <span className="bg-eu-blue text-white text-[9px] px-3 py-1 uppercase tracking-tighter">Visualizador de Atlas</span>
                  </div>
                  <div className="opacity-10 absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-eu-blue)_1px,_transparent_1px)] bg-[size:24px_24px]" />
                  <svg viewBox="0 0 800 600" className="w-full h-auto relative z-10 drop-shadow-xl">
                    {euCountries.map(country => (
                      <motion.path
                        key={country.id}
                        d={country.path}
                        fill={selectedCountry?.id === country.id ? "#FFCC00" : "#003399"}
                        stroke="#F9F8F6"
                        strokeWidth="1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ fill: "#001a4d", scale: 1.01 }}
                        className="cursor-pointer transition-all duration-300"
                        onClick={() => setSelectedCountry(country)}
                      />
                    ))}
                  </svg>
                </div>

                <AnimatePresence mode="wait">
                  {selectedCountry ? (
                    <motion.div 
                      key={selectedCountry.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      className="lg:col-span-4 sticky top-12 h-fit"
                    >
                      <div className="asymmetric-card space-y-8">
                        <div className="flex items-end justify-between border-b border-editorial-border pb-6">
                           <span className="text-7xl grayscale hover:grayscale-0 transition-all cursor-default">{selectedCountry.flag}</span>
                           <div className="text-right">
                              <p className="micro-label mb-1">Adesão</p>
                              <p className="heading-serif text-4xl text-eu-blue">{selectedCountry.joined}</p>
                           </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="heading-serif text-5xl">{selectedCountry.name}</h3>
                          <p className="micro-label opacity-40">Capital: <span className="text-editorial-ink opacity-100">{selectedCountry.capital}</span></p>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="micro-label border-l-2 border-eu-gold pl-3">Arquitetura e Património</h4>
                          <div className="space-y-2">
                            {selectedCountry.monuments.map((m: string, i: number) => (
                              <div key={i} className="flex items-start gap-4 text-xs italic text-slate-600 bg-editorial-bg p-4 border border-editorial-border/50">
                                <Landmark size={14} className="text-eu-blue mt-0.5 flex-shrink-0" />
                                <span>{m}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button 
                          onClick={() => setSelectedCountry(null)}
                          className="w-full py-4 text-[9px] uppercase tracking-[0.4em] font-bold text-slate-400 hover:text-editorial-ink hover:bg-slate-50 transition-all border border-transparent hover:border-editorial-border"
                        >
                          Fechar Registro
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="lg:col-span-4 bg-white/60 border border-editorial-border border-dashed p-10 flex flex-col items-center justify-center text-center space-y-6">
                      <div className="bg-editorial-bg p-6 rounded-full border border-editorial-border shadow-inner">
                        <MapIcon size={32} className="text-slate-300" />
                      </div>
                      <p className="text-sm italic text-slate-400 leading-relaxed font-light">Selecione uma região soberana para acessar o compêndio de informações nacionais.</p>
                    </div>
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
              <nav className="flex-1 space-y-1 mb-8">
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
              <div className="mt-8">
                <Chatbot />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
