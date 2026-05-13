/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  History, 
  Map as MapIcon, 
  Landmark, 
  Users, 
  BookOpen,
  Menu,
  X,
  Calendar,
  CheckCircle2,
  Globe,
  Award,
  BookMarked,
  Trophy,
  ChevronRight,
  ShieldCheck,
  Search,
  MessageCircle,
  BarChart3,
  Printer,
  Stamp
} from "lucide-react";
import { euCountries, euTimeline, euInstitutions } from "./data/euData";
import { translations, glossary, mainQuiz } from "./data/extraData";

// --- Sub-components ---

const Certificate = ({ 
  userScore, 
  totalQuestions, 
  geoScore, 
  adhScore, 
  badgesCount, 
  lang 
}: { 
  userScore: number, 
  totalQuestions: number, 
  geoScore: number, 
  adhScore: number, 
  badgesCount: number,
  lang: 'pt' | 'en' | 'fr'
}) => {
  const t = translations[lang];
  const date = new Date().toLocaleDateString(lang === 'pt' ? 'pt-PT' : lang === 'en' ? 'en-GB' : 'fr-FR');
  
  return (
    <div className="certificate-container bg-white p-12 border-8 border-eu-blue shadow-2xl relative overflow-hidden max-w-4xl mx-auto my-8 print:border-4 print:shadow-none print:m-0">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-eu-gold/10 -mr-16 -mt-16 rotate-45 border border-eu-gold/20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-eu-gold/10 -ml-16 -mb-16 rotate-45 border border-eu-gold/20" />
      
      <div className="relative z-10 text-center space-y-8">
        <header className="flex flex-col items-center gap-4">
          <div className="flex gap-1 mb-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-eu-blue rounded-full" />
            ))}
          </div>
          <h1 className="heading-serif text-4xl text-eu-blue uppercase tracking-[0.2em]">{t.common.certificate}</h1>
          <div className="w-24 h-1 bg-eu-gold mx-auto" />
        </header>

        <section className="space-y-6 py-8">
          <p className="text-xl italic font-light text-slate-600">
            {t.common.certSubtitle}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-slate-100">
            <div className="space-y-1">
              <p className="micro-label opacity-40">Super Quiz</p>
              <p className="heading-serif text-3xl text-eu-blue">{userScore}/{totalQuestions}</p>
            </div>
            <div className="space-y-1">
              <p className="micro-label opacity-40">Geografia</p>
              <p className="heading-serif text-3xl text-eu-blue">{geoScore}</p>
            </div>
            <div className="space-y-1">
              <p className="micro-label opacity-40">História</p>
              <p className="heading-serif text-3xl text-eu-blue">{adhScore}</p>
            </div>
            <div className="space-y-1">
              <p className="micro-label opacity-40">Troféus</p>
              <p className="heading-serif text-3xl text-eu-blue">{badgesCount}</p>
            </div>
          </div>
        </section>

        <footer className="pt-12 flex justify-between items-end">
          <div className="text-left space-y-2">
            <p className="micro-label opacity-40">Data de Emissão</p>
            <p className="heading-serif text-xl">{date}</p>
          </div>
          
          <div className="flex flex-col items-center">
             <div className="w-20 h-20 bg-eu-blue rounded-full border-4 border-white shadow-lg flex items-center justify-center text-eu-gold mb-2">
                <Stamp size={40} />
             </div>
             <p className="micro-label font-bold text-eu-blue">Selo EuroGuia</p>
          </div>

          <div className="text-right space-y-2">
            <p className="micro-label opacity-40">Identificador</p>
            <p className="font-mono text-xs text-slate-400">EU-CERT-{Math.random().toString(36).substring(7).toUpperCase()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

const LanguageSwitcher = ({ current, setLang }: { current: string, setLang: (l: 'pt' | 'en' | 'fr') => void }) => (
  <div className="flex gap-2 mb-8 items-center bg-editorial-bg p-2 border border-editorial-border">
    <Globe size={14} className="text-eu-blue ml-2" />
    {(['pt', 'en', 'fr'] as const).map(l => (
      <button 
        key={l}
        onClick={() => setLang(l)}
        className={`text-[10px] uppercase font-bold px-3 py-1 transition-all ${current === l ? 'bg-eu-blue text-white' : 'text-slate-400 hover:text-eu-blue'}`}
      >
        {l}
      </button>
    ))}
  </div>
);

interface InstitutionItemProps {
  inst: any;
  lang: 'pt' | 'en' | 'fr';
}

const InstitutionItem: React.FC<InstitutionItemProps> = ({ inst, lang }) => (
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
      <span className="micro-label opacity-40">{inst.role[lang]}</span>
    </div>
    <h3 className="heading-serif text-2xl mb-2">{inst.name[lang]}</h3>
    <p className="micro-label text-eu-blue mb-3 flex items-center gap-2">
      <MapIcon size={12} /> {inst.location[lang]}
    </p>
    <p className="text-sm text-slate-600 leading-relaxed">{inst.description[lang]}</p>
  </motion.div>
);

interface TimelineNodeProps {
  event: any;
  index: number;
  lang: 'pt' | 'en' | 'fr';
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ event, index, lang }) => (
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
      <h3 className="heading-serif text-2xl mb-2 text-editorial-ink">{event.title[lang]}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{event.description[lang]}</p>
    </motion.div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [lang, setLang] = useState<'pt' | 'en' | 'fr'>('pt');
  const [activeTab, setActiveTab] = useState('inicio');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const t = translations[lang];

  // --- Gamificação Logic ---
  const [badges, setBadges] = useState<string[]>([]);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const savedBadges = localStorage.getItem('eu-badges');
    const savedScore = localStorage.getItem('eu-highscore');
    if (savedBadges) setBadges(JSON.parse(savedBadges));
    if (savedScore) setHighScore(parseInt(savedScore));
  }, []);

  const addBadge = (id: string) => {
    if (!badges.includes(id)) {
      const newBadges = [...badges, id];
      setBadges(newBadges);
      localStorage.setItem('eu-badges', JSON.stringify(newBadges));
    }
  };

  // --- Capitais Quiz State ---
  const [quizScore, setQuizScore] = useState(0);
  const [quizTurn, setQuizTurn] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState<{country: any, options: any[]} | null>(null);
  const [feedback, setFeedback] = useState<{ msg: string, type: 'success' | 'error' | null, explanation?: string }>({ msg: "", type: null });

  const generateQuestion = () => {
    if (quizTurn >= 20) {
      setQuizQuestion(null);
      return;
    }
    const randomCountry = euCountries[Math.floor(Math.random() * euCountries.length)];
    const others = euCountries.filter(c => c.id !== randomCountry.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [randomCountry, ...others].sort(() => 0.5 - Math.random());
    setQuizQuestion({ country: randomCountry, options });
    setFeedback({ msg: "", type: null });
    setQuizTurn(prev => prev + 1);
  };
  
  const restartQuizGame = () => {
    setQuizScore(0);
    setQuizTurn(0);
    setQuizQuestion(null);
    setFeedback({ msg: "", type: null });
  };

  // --- Super Quiz State ---
  const [superQuizIndex, setSuperQuizIndex] = useState(0);
  const [superQuizScore, setSuperQuizScore] = useState(0);
  const [superQuizFeedback, setSuperQuizFeedback] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleSuperQuizAnswer = (optionId: string) => {
    const currentQ = mainQuiz[superQuizIndex];
    if (optionId === currentQ.correct) {
      setSuperQuizScore(prev => prev + 1);
      setSuperQuizFeedback(currentQ.explanation[lang]);
      if (superQuizScore + 1 >= 10) addBadge('euro_expert');
    } else {
      setSuperQuizFeedback(`Incorreto. ${currentQ.explanation[lang]}`);
    }
  };

  const restartQuiz = () => {
    setSuperQuizIndex(0);
    setSuperQuizScore(0);
    setSuperQuizFeedback(null);
    setShowCertificate(false);
  };


  // --- Adesão Quiz State ---
  const [adhScore, setAdhScore] = useState(0);
  const [adhTurn, setAdhTurn] = useState(0);
  const [adhQuestion, setAdhQuestion] = useState<{year: number, options: any[], targets: string[]} | null>(null);
  const [adhSelectedIds, setAdhSelectedIds] = useState<string[]>([]);
  const [adhFeedback, setAdhFeedback] = useState<{ msg: string, type: 'success' | 'error' | null, explanation?: string }>({ msg: "", type: null });

  const generateAdhQuestion = () => {
    if (adhTurn >= 20) {
      setAdhQuestion(null);
      return;
    }
    const uniqueYears = Array.from(new Set(euCountries.map(c => c.joined))).sort((a, b) => a - b);
    const randomYear = uniqueYears[Math.floor(Math.random() * uniqueYears.length)];
    const correctCountries = euCountries.filter(c => c.joined === randomYear);
    const options = euCountries.filter(c => c.joined !== randomYear).sort(() => 0.5 - Math.random()).slice(0, 3);
    const finalOptions = [...correctCountries.slice(0, 3), ...options].sort(() => 0.5 - Math.random());
    
    setAdhQuestion({ 
      year: randomYear, 
      options: finalOptions, 
      targets: finalOptions.filter(o => o.joined === randomYear).map(o => o.id) 
    });
    setAdhSelectedIds([]);
    setAdhFeedback({ msg: "", type: null });
    setAdhTurn(prev => prev + 1);
  };
  
  const restartAdhGame = () => {
    setAdhScore(0);
    setAdhTurn(0);
    setAdhQuestion(null);
    setAdhSelectedIds([]);
    setAdhFeedback({ msg: "", type: null });
  };

  const handleAdhToggle = (id: string) => {
    setAdhSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const checkAdhAnswer = () => {
    if (!adhQuestion) return;
    const isCorrect = adhQuestion.targets.length === adhSelectedIds.length && 
                     adhQuestion.targets.every(id => adhSelectedIds.includes(id));
    
    const year = adhQuestion.year;
    const joinedCountries = euCountries.filter(c => c.joined === year).map(c => `${c.flag} ${c.name}`).join(', ');
    const explanation = `Em ${year}, os países que aderiram à UE foram: ${joinedCountries}.`;

    if (isCorrect) {
      setAdhScore(prev => prev + 1);
      if (adhScore + 1 >= 10) addBadge('master_hist');
      setAdhFeedback({ 
        msg: t.common.correct, 
        type: 'success',
        explanation 
      });
    } else {
      setAdhFeedback({ 
        msg: t.common.incorrect, 
        type: 'error',
        explanation 
      });
    }
  };

  const handleAnswer = (selectedId: string) => {
    if (!quizQuestion) return;
    const isCorrect = quizQuestion.country.id === selectedId;
    const country = quizQuestion.country;
    const monument = country.monuments[Math.floor(Math.random() * country.monuments.length)];
    const explanation = `A capital de ${country.name} (${country.flag}) é ${country.capital}. Sabias que um dos seus monumentos mais famosos é o ${monument}?`;

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      if (quizScore + 1 >= 10) addBadge('geo_elite');
      setFeedback({ 
        msg: t.common.correct, 
        type: 'success',
        explanation 
      });
    } else {
      setFeedback({ 
        msg: t.common.incorrect, 
        type: 'error',
        explanation 
      });
    }
  };

  // --- Monument Challenge State ---
  const [monScore, setMonScore] = useState(0);
  const [monTurn, setMonTurn] = useState(0);
  const [monQuestion, setMonQuestion] = useState<{monument: string, correctCountry: any, options: any[]} | null>(null);
  const [monFeedback, setMonFeedback] = useState<{ msg: string, type: 'success' | 'error' | null, explanation?: string }>({ msg: "", type: null });

  const generateMonQuestion = () => {
    if (monTurn >= 20) {
      setMonQuestion(null);
      return;
    }
    const randomCountry = euCountries[Math.floor(Math.random() * euCountries.length)];
    const monument = randomCountry.monuments[Math.floor(Math.random() * randomCountry.monuments.length)];
    const others = euCountries.filter(c => c.id !== randomCountry.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [randomCountry, ...others].sort(() => 0.5 - Math.random());
    setMonQuestion({ monument, correctCountry: randomCountry, options });
    setMonFeedback({ msg: "", type: null });
    setMonTurn(prev => prev + 1);
  };
  
  const restartMonGame = () => {
    setMonScore(0);
    setMonTurn(0);
    setMonQuestion(null);
    setMonFeedback({ msg: "", type: null });
  };

  const handleMonAnswer = (selectedId: string) => {
    if (!monQuestion) return;
    const isCorrect = monQuestion.correctCountry.id === selectedId;
    const country = monQuestion.correctCountry;
    const explanation = `O monumento ${monQuestion.monument} localiza-se em ${country.name} (${country.flag}). A sua capital é ${country.capital}.`;

    if (isCorrect) {
      setMonScore(prev => prev + 1);
      if (monScore + 1 >= 10) addBadge('geo_elite');
      setMonFeedback({ 
        msg: t.common.correct, 
        type: 'success',
        explanation 
      });
    } else {
      setMonFeedback({ 
        msg: t.common.incorrect, 
        type: 'error',
        explanation 
      });
    }
  };

  // Inicializar perguntas
  useEffect(() => {
    if (!quizQuestion && activeTab === 'mapa' && quizTurn === 0) generateQuestion();
    if (!adhQuestion && activeTab === 'adesao' && adhTurn === 0) generateAdhQuestion();
    if (!monQuestion && activeTab === 'monumentos' && monTurn === 0) generateMonQuestion();
  }, [activeTab]);

  const tabs = [
    { id: 'inicio', label: t.nav.inicio, icon: Landmark },
    { id: 'mapa', label: t.nav.capitais, icon: MapIcon },
    { id: 'monumentos', label: t.nav.monumentos, icon: ShieldCheck },
    { id: 'adesao', label: t.nav.adesao, icon: Calendar }, 
    { id: 'historia', label: t.nav.historia, icon: History },
    { id: 'instituicoes', label: t.nav.instituicoes, icon: Award },
    { id: 'cidadania', label: t.nav.cidadania, icon: Users },
    { id: 'glossario', label: t.nav.glossario, icon: BookMarked },
    { id: 'quiz', label: t.nav.quiz, icon: Trophy },
    { id: 'guia', label: t.nav.guia, icon: BookOpen },
  ];

  return (
    <div className="flex min-h-screen bg-editorial-bg text-editorial-ink font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-80 border-r border-editorial-border flex-col p-8 sticky top-0 h-screen overflow-y-auto bg-editorial-bg">
        <div className="flex flex-col mb-8">
          <p className="micro-label mb-2">Edição 2026 • Guia de Estudo</p>
          <h1 className="heading-serif text-5xl">EuroGuia</h1>
          <p className="text-[9px] uppercase tracking-[0.3em] font-bold mt-2 opacity-40">Compêndio Interativo da União Europeia</p>
          <div className="h-px bg-editorial-ink mt-4 w-full" />
        </div>

        <LanguageSwitcher current={lang} setLang={setLang} />

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
              <ChevronRight size={12} className={`transition-all ${activeTab === tab.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
            </button>
          ))}
        </nav>

        {badges.length > 0 && (
          <div className="mb-8 p-6 bg-white border border-editorial-border shadow-editorial">
            <h4 className="micro-label text-eu-blue mb-4 flex items-center gap-2">
              <Trophy size={14} /> {t.common.achievements}
            </h4>
            <div className="flex flex-wrap gap-2">
              {badges.map(b => (
                <div key={b} className="p-2 bg-eu-gold/10 text-eu-blue rounded-sm border border-eu-gold/20" title={(t.badges as any)[b]}>
                  <ShieldCheck size={16} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="p-6 border border-editorial-border bg-white shadow-editorial">
            <h4 className="micro-label text-eu-blue mb-2">Suporte e Ajuda</h4>
            <p className="text-[10px] leading-relaxed opacity-60">Consulte o guia para aprender a navegar nesta edição digital.</p>
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
          <p className="text-[8px] opacity-20 uppercase tracking-widest font-bold">Teodósio Faria ©2026 Portal de Conhecimento Europeu</p>
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
                <p className="micro-label text-eu-blue opacity-100 flex items-center gap-2">
                  <Globe size={14} /> {t.nav.inicio} • 2026
                </p>
                <h2 className="heading-serif text-6xl lg:text-8xl tracking-tighter">
                  Bem-vindo ao <br/>
                  <span className="text-eu-blue italic">{t.nav.inicio} EuroGuia</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-12 items-end">
                  <p className="text-lg text-slate-600 font-light leading-relaxed italic">
                    Explore as narrativas, a geografia e as instituições que unem este continente num futuro partilhado.
                  </p>
                  <div className="flex justify-end gap-1 px-4">
                     {[...Array(3)].map((_, i) => (
                       <div key={i} className={`w-3 h-3 rounded-full bg-eu-blue ${i === 1 ? 'opacity-50' : i === 2 ? 'opacity-25' : ''}`} />
                     ))}
                  </div>
                </div>
              </header>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white border border-editorial-border p-10 shadow-editorial group hover:translate-y-[-4px] transition-transform">
                  <h4 className="micro-label text-eu-blue mb-6 flex items-center gap-2 uppercase tracking-widest font-bold">
                    <Trophy size={16} className="text-eu-gold" /> {t.common.score}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Capitais</span>
                      <span className="heading-serif text-3xl text-eu-blue">{quizScore}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Monumentos</span>
                      <span className="heading-serif text-3xl text-eu-blue">{monScore}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Adesão</span>
                      <span className="heading-serif text-3xl text-eu-blue">{adhScore}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Super Quiz</span>
                      <span className="heading-serif text-3xl text-eu-blue">{superQuizScore} / {mainQuiz.length}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('quiz')}
                    className="mt-10 w-full text-[10px] font-bold uppercase tracking-[0.2em] bg-editorial-ink text-white py-4 hover:bg-eu-blue transition-colors shadow-lg"
                  >
                    Iniciar Super Quiz
                  </button>
                </div>

                <div className="bg-editorial-ink text-white p-10 shadow-editorial relative overflow-hidden group hover:translate-y-[-4px] transition-transform">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Trophy size={120} />
                  </div>
                  <h4 className="micro-label text-eu-gold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                    <Award size={16} /> {t.common.achievements}
                  </h4>
                  {badges.length > 0 ? (
                    <div className="grid grid-cols-4 gap-4 relative z-10">
                      {badges.map(b => (
                        <div key={b} className="aspect-square bg-white/10 rounded-sm flex items-center justify-center text-eu-gold border border-white/20 hover:bg-eu-gold hover:text-editorial-ink transition-all cursor-help" title={(t.badges as any)[b]}>
                           <ShieldCheck size={28} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6 relative z-10">
                      <p className="text-slate-400 italic text-sm font-light">Ainda não conquistou medalhas de mérito.</p>
                      <button 
                        onClick={() => setActiveTab('mapa')}
                        className="text-[10px] font-bold uppercase tracking-widest text-eu-gold border-b border-eu-gold/30 pb-1 hover:border-eu-gold transition-all"
                      >
                        Praticar agora
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { id: 'historia', icon: History, label: t.nav.historia },
                  { id: 'instituicoes', icon: Award, label: t.nav.instituicoes },
                  { id: 'cidadania', icon: Users, label: t.nav.cidadania }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="bg-white border border-editorial-border p-8 text-center space-y-4 hover:border-eu-blue transition-all group shadow-editorial"
                  >
                    <div className="mx-auto w-12 h-12 bg-slate-50 flex items-center justify-center rounded-full group-hover:bg-eu-blue group-hover:text-white transition-colors">
                      <item.icon size={20} />
                    </div>
                    <h5 className="heading-serif text-xl">{item.label}</h5>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-4">Consultar Guia</p>
                  </button>
                ))}
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
                  <p className="micro-label text-eu-blue opacity-100">{t.nav.capitais}</p>
                  <h2 className="heading-serif text-5xl lg:text-7xl">Correspondência de Capitais</h2>
                  <p className="text-slate-500 max-w-lg italic font-light">Ligue cada país à sua capital correspondente para acumular pontos.</p>
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-3 border border-editorial-border shadow-editorial">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progresso</span>
                  <span className="heading-serif text-3xl text-eu-blue">{quizTurn > 0 ? quizTurn : 0} / 20</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">{t.common.score}</span>
                  <span className="heading-serif text-3xl text-eu-blue">{quizScore}</span>
                </div>
              </header>

              <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  {quizTurn > 20 || !quizQuestion ? (
                    <motion.div 
                      key="quiz-end"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-12 border border-editorial-border shadow-editorial text-center space-y-8"
                    >
                      <Trophy size={48} className="mx-auto text-eu-gold" />
                      <h3 className="heading-serif text-4xl">Fim do Desafio!</h3>
                      <p className="text-xl text-slate-600">Conseguiu <span className="font-bold text-eu-blue">{quizScore}</span> pontos em 20 tentativas.</p>
                      <button 
                        onClick={() => { restartQuizGame(); setTimeout(generateQuestion, 100); }}
                        className="px-8 py-4 bg-editorial-ink text-white heading-serif text-xl uppercase inline-block shadow-xl hover:bg-eu-blue transition-colors"
                      >
                        Jogar Novamente
                      </button>
                    </motion.div>
                  ) : (
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
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`p-8 border-l-4 text-left space-y-4 ${
                              feedback.type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                            }`}
                          >
                            <p className={`micro-label flex items-center gap-2 ${feedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                              <MessageCircle size={14} /> {t.common.feedback}
                            </p>
                            <p className="text-slate-600 italic font-light leading-relaxed">
                              {feedback.explanation}
                            </p>
                            <button 
                              onClick={generateQuestion}
                              className="text-[10px] font-bold uppercase tracking-widest border-b border-editorial-ink pb-1"
                            >
                              {t.common.next}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {activeTab === 'monumentos' && (
            <motion.div 
               key="monumentos"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="space-y-12"
            >
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-editorial-ink pb-12">
                <div className="space-y-4">
                  <p className="micro-label text-eu-blue opacity-100">{t.nav.monumentos}</p>
                  <h2 className="heading-serif text-5xl lg:text-7xl">Desafio dos Monumentos</h2>
                  <p className="text-slate-500 max-w-lg italic font-light">Identifique o país onde se localiza cada monumento icónico da Europa.</p>
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-3 border border-editorial-border shadow-editorial">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progresso</span>
                  <span className="heading-serif text-3xl text-eu-blue">{monTurn > 0 ? monTurn : 0} / 20</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Pontos</span>
                  <span className="heading-serif text-3xl text-eu-blue">{monScore}</span>
                </div>
              </header>

              <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  {monTurn > 20 || !monQuestion ? (
                    <motion.div 
                      key="mon-end"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-12 border border-editorial-border shadow-editorial text-center space-y-8"
                    >
                      <Trophy size={48} className="mx-auto text-eu-gold" />
                      <h3 className="heading-serif text-4xl">Fim do Desafio!</h3>
                      <p className="text-xl text-slate-600">Conseguiu <span className="font-bold text-eu-blue">{monScore}</span> pontos em 20 tentativas.</p>
                      <button 
                        onClick={() => { restartMonGame(); setTimeout(generateMonQuestion, 100); }}
                        className="px-8 py-4 bg-editorial-ink text-white heading-serif text-xl uppercase inline-block shadow-xl hover:bg-eu-blue transition-colors"
                      >
                        Jogar Novamente
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key={monQuestion.monument}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white p-12 border border-editorial-border shadow-editorial text-center space-y-10"
                    >
                      <div className="space-y-4">
                        <div className="mx-auto w-24 h-24 bg-eu-blue/5 rounded-full flex items-center justify-center text-eu-blue mb-4">
                           <Landmark size={48} />
                        </div>
                        <h3 className="heading-serif text-5xl italic">{monQuestion.monument}</h3>
                        <p className="micro-label opacity-40 uppercase tracking-widest">Em que país se encontra este monumento?</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {monQuestion.options.map((opt: any) => (
                          <button
                            key={opt.id}
                            onClick={() => handleMonAnswer(opt.id)}
                            className="p-6 border border-editorial-border hover:bg-eu-blue hover:text-white transition-all heading-serif text-2xl group flex items-center justify-center gap-4"
                          >
                            <span className="text-3xl">{opt.flag}</span>
                            <span className="group-hover:italic">{opt.name}</span>
                          </button>
                        ))}
                      </div>

                      <AnimatePresence>
                        {monFeedback.msg && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`p-8 border-l-4 text-left space-y-4 ${
                              monFeedback.type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                            }`}
                          >
                            <p className={`micro-label flex items-center gap-2 ${monFeedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                              <MessageCircle size={14} /> {t.common.feedback}
                            </p>
                            <p className="text-slate-600 italic font-light leading-relaxed">
                              {monFeedback.explanation}
                            </p>
                            <button 
                              onClick={generateMonQuestion}
                              className="text-[10px] font-bold uppercase tracking-widest border-b border-editorial-ink pb-1"
                            >
                              {t.common.next}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {activeTab === 'glossario' && (
            <motion.div 
              key="glossario"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <header className="border-b border-editorial-ink pb-12">
                <p className="micro-label text-eu-blue opacity-100">{t.nav.glossario}</p>
                <h2 className="heading-serif text-6xl">Léxico Europeu</h2>
              </header>

              <div className="grid md:grid-cols-2 gap-8">
                {glossary.map((item) => (
                  <div key={item.id} className="asymmetric-card bg-white p-8 group hover:border-eu-blue transition-colors">
                    <h3 className="heading-serif text-3xl mb-4 text-eu-blue">{(item.term as any)[lang]}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-light italic">
                      {(item.def as any)[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* --- Super Quiz --- */}
          {activeTab === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-editorial-ink pb-12">
                <div className="space-y-4">
                  <p className="micro-label text-eu-blue opacity-100">{t.nav.quiz}</p>
                  <h2 className="heading-serif text-6xl">O Grande Teste</h2>
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-3 border border-editorial-border shadow-editorial">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.common.score}</span>
                  <span className="heading-serif text-3xl text-eu-blue">{superQuizScore} / {mainQuiz.length}</span>
                </div>
              </header>

              <div className="max-w-3xl mx-auto">
                 {showCertificate ? (
                   <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="space-y-8"
                   >
                     <Certificate 
                       userScore={superQuizScore}
                       totalQuestions={mainQuiz.length}
                       geoScore={quizScore}
                       adhScore={adhScore}
                       badgesCount={badges.length}
                       lang={lang}
                     />
                     <div className="flex gap-4 justify-center print:hidden">
                       <button 
                         onClick={() => window.print()}
                         className="flex items-center gap-2 px-8 py-4 bg-eu-blue text-white heading-serif text-lg hover:bg-slate-900 transition-all shadow-xl"
                       >
                         <Printer size={20} /> {t.common.print}
                       </button>
                       <button 
                         onClick={restartQuiz}
                         className="px-8 py-4 border border-editorial-border bg-white heading-serif text-lg hover:bg-slate-50 transition-all shadow-xl"
                       >
                         {t.common.finish}
                       </button>
                     </div>
                   </motion.div>
                 ) : (
                   <div className="bg-white p-12 border border-editorial-border shadow-editorial space-y-10">
                     <div className="space-y-4">
                       <p className="micro-label opacity-40">Questão {superQuizIndex + 1} / {mainQuiz.length}</p>
                       <h3 className="heading-serif text-4xl">{mainQuiz[superQuizIndex].question[lang]}</h3>
                     </div>

                     <div className="space-y-4">
                       {mainQuiz[superQuizIndex].options.map((opt) => (
                         <button
                           key={opt.id}
                           onClick={() => handleSuperQuizAnswer(opt.id)}
                           disabled={!!superQuizFeedback}
                           className={`w-full p-6 border text-left flex justify-between items-center transition-all group ${
                             superQuizFeedback ? (opt.id === mainQuiz[superQuizIndex].correct ? 'border-green-500 bg-green-50' : 'opacity-20') : 'hover:border-eu-blue hover:bg-slate-50'
                           }`}
                         >
                           <span className="heading-serif text-xl">{opt.text[lang]}</span>
                           <ChevronRight size={16} className="text-eu-blue opacity-0 group-hover:opacity-100" />
                         </button>
                       ))}
                     </div>

                     {superQuizFeedback && (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="p-8 bg-eu-blue/5 border-l-4 border-eu-blue"
                       >
                         <p className="micro-label text-eu-blue mb-2 flex items-center gap-2 italic">
                           <MessageCircle size={14} /> {t.common.feedback}
                         </p>
                         <p className="text-slate-600 italic font-light">{superQuizFeedback}</p>
                         <button 
                           onClick={() => {
                             setSuperQuizFeedback(null);
                             if (superQuizIndex < mainQuiz.length - 1) {
                               setSuperQuizIndex(prev => prev + 1);
                             } else {
                               setShowCertificate(true);
                             }
                           }}
                           className="mt-8 text-[10px] font-bold uppercase tracking-widest border-b border-editorial-ink"
                         >
                           {superQuizIndex < mainQuiz.length - 1 ? t.common.next : t.common.finish}
                         </button>
                       </motion.div>
                     )}
                   </div>
                 )}
              </div>
            </motion.div>
          )}

          {/* --- Adesão Tab --- */}
            {activeTab === 'adesao' && (
            <motion.div 
              key="adesao"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-editorial-ink pb-12">
                <div className="space-y-4">
                  <p className="micro-label text-eu-blue opacity-100">Jogo Educativo • Alargamento</p>
                  <h2 className="heading-serif text-5xl lg:text-7xl">Ciclos de Adesão</h2>
                  <p className="text-slate-500 max-w-lg italic font-light">Identifique todos os países que aderiram à União Europeia no ano indicado.</p>
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-3 border border-editorial-border shadow-editorial">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progresso</span>
                  <span className="heading-serif text-3xl text-eu-blue">{adhTurn > 0 ? adhTurn : 0} / 20</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Pontos</span>
                  <span className="heading-serif text-3xl text-eu-blue">{adhScore}</span>
                </div>
              </header>

              <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  {adhTurn > 20 || !adhQuestion ? (
                    <motion.div 
                      key="adh-end"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-12 border border-editorial-border shadow-editorial text-center space-y-8"
                    >
                      <Trophy size={48} className="mx-auto text-eu-gold" />
                      <h3 className="heading-serif text-4xl">Fim do Desafio!</h3>
                      <p className="text-xl text-slate-600">Conseguiu <span className="font-bold text-eu-blue">{adhScore}</span> pontos em 20 tentativas.</p>
                      <button 
                        onClick={() => { restartAdhGame(); setTimeout(generateAdhQuestion, 100); }}
                        className="px-8 py-4 bg-editorial-ink text-white heading-serif text-xl uppercase inline-block shadow-xl hover:bg-eu-blue transition-colors"
                      >
                        Jogar Novamente
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key={adhQuestion.year}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      className="bg-white p-12 border border-editorial-border shadow-editorial text-center space-y-10"
                    >
                      <div className="space-y-4">
                        <p className="micro-label opacity-40">Selecione os países que aderiram em:</p>
                        <h3 className="heading-serif text-8xl text-eu-blue">{adhQuestion.year}</h3>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {adhQuestion.options.map((country: any) => (
                          <button
                            key={country.id}
                            onClick={() => handleAdhToggle(country.id)}
                            className={`p-6 border transition-all flex flex-col items-center gap-4 group ${
                              adhSelectedIds.includes(country.id) 
                              ? 'bg-eu-blue border-eu-blue text-white shadow-lg translate-y-[-4px]' 
                              : 'bg-slate-50 border-editorial-border hover:border-eu-blue/40'
                            }`}
                          >
                            <span className="text-4xl">{country.flag}</span>
                            <span className="heading-serif text-xl">{country.name}</span>
                            {adhSelectedIds.includes(country.id) && (
                              <CheckCircle2 size={16} className="text-eu-gold animate-in zoom-in" />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="pt-6 space-y-6">
                        <button
                          onClick={checkAdhAnswer}
                          disabled={adhSelectedIds.length === 0}
                          className="w-full md:w-auto px-12 py-4 bg-editorial-ink text-white heading-serif text-xl uppercase tracking-widest hover:bg-eu-blue disabled:opacity-20 transition-all shadow-xl"
                        >
                          Verificar Resposta
                        </button>

                        <AnimatePresence>
                          {adhFeedback.msg && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`p-8 border-l-4 text-left space-y-4 ${
                                adhFeedback.type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                              }`}
                            >
                              <p className={`micro-label flex items-center gap-2 ${adhFeedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                                <MessageCircle size={14} /> {t.common.feedback}
                              </p>
                              <p className="text-slate-600 italic font-light leading-relaxed">
                                {adhFeedback.explanation}
                              </p>
                              <button 
                                onClick={generateAdhQuestion}
                                className="text-[10px] font-bold uppercase tracking-widest border-b border-editorial-ink pb-1"
                              >
                                {t.common.next}
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
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
                <p className="micro-label text-eu-blue opacity-100">{(t as any).historia.archive}</p>
                <h2 className="heading-serif text-6xl">{(t as any).historia.title}</h2>
                <p className="text-slate-500 italic font-light leading-relaxed">
                  {(t as any).historia.subtitle}
                </p>
              </header>

              <div className="max-w-3xl mx-auto px-8">
                {euTimeline.map((event, i) => (
                  <TimelineNode key={i} event={event} index={i} lang={lang} />
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
                   <p className="micro-label text-eu-blue opacity-100">{(t as any).instituicoes.governance}</p>
                   <h2 className="heading-serif text-5xl lg:text-7xl">{(t as any).instituicoes.title}</h2>
                   <p className="text-slate-500 max-w-lg italic font-light">{(t as any).instituicoes.subtitle}</p>
                </div>
              </header>

              <div className="grid md:grid-cols-2 gap-8">
                {euInstitutions.map((inst, i) => (
                  <InstitutionItem key={i} inst={inst} lang={lang} />
                ))}
              </div>

              <div className="my-16 border border-editorial-border bg-white p-6 shadow-editorial">
                 <header className="mb-6 text-center">
                   <p className="micro-label text-eu-blue mb-2">Banda Desenhada</p>
                   <h3 className="heading-serif text-3xl md:text-4xl">O Miguel Descobre a União Europeia</h3>
                   <p className="text-slate-500 italic font-light mt-2">Como funcionam e onde se localizam as principais instituições europeias.</p>
                 </header>
                 <img 
                   src="/banda-desenhada.jpg" 
                   alt="Banda desenhada: O Miguel Descobre a União Europeia" 
                   className="w-full h-auto border border-editorial-ink/10 rounded-sm"
                 />
              </div>

              <div className="border border-editorial-ink p-12 bg-white flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-px bg-eu-gold" />
                <h3 className="heading-serif text-3xl">{(t as any).instituicoes.primacy}</h3>
                <p className="text-slate-600 leading-relaxed max-w-2xl font-light italic">
                  {(t as any).instituicoes.quote}
                </p>
                <div className="grid grid-cols-3 gap-8 w-full max-w-md pt-8 border-t border-editorial-border">
                   <div><p className="micro-label mb-1">{(t as any).instituicoes.roma}</p><p className="heading-serif text-xl opacity-40">1957</p></div>
                   <div><p className="micro-label mb-1">{(t as any).instituicoes.maastricht}</p><p className="heading-serif text-xl opacity-40">1992</p></div>
                   <div><p className="micro-label mb-1">{(t as any).instituicoes.lisboa}</p><p className="heading-serif text-xl opacity-40">2007</p></div>
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
                <h2 className="heading-serif text-6xl">Instruções de Navegação</h2>
                <p className="text-slate-500 text-lg font-light leading-relaxed">
                  Aprenda a interagir com este manual informativo e a explorar todo o conteúdo disponível.
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
                  <div className="asymmetric-card border-l-eu-gold">
                    <div className="flex items-center gap-4 mb-4">
                      <Calendar className="text-eu-blue" />
                      <h3 className="heading-serif text-2xl">Desafio Adesão</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Neste jogo, deve selecionar todos os países que entraram na UE no ano apresentado. Atenção: alguns anos tiveram múltiplos países a aderir em simultâneo!
                    </p>
                  </div>

                  <div className="asymmetric-card border-l-eu-gold">
                    <div className="flex items-center gap-4 mb-4">
                      <Landmark className="text-eu-blue" />
                      <h3 className="heading-serif text-2xl">Desafio dos Monumentos</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Adivinhe o país de origem de vários monumentos europeus famosos. Uma excelente forma de aprender sobre o património cultural da União.
                    </p>
                  </div>

                  <div className="asymmetric-card border-l-eu-gold">
                    <div className="flex items-center gap-4 mb-4">
                      <Trophy className="text-eu-blue" />
                      <h3 className="heading-serif text-2xl">Medalhas de Mérito</h3>
                    </div>
                    <ul className="space-y-4 text-sm text-slate-600 leading-relaxed list-disc list-inside">
                      <li><strong className="text-eu-blue">Elite Geográfica:</strong> Obtenha pelo menos 10 pontos no Jogo de Capitais ou Monumentos.</li>
                      <li><strong className="text-eu-blue">Mestre da História:</strong> Obtenha pelo menos 10 pontos no Desafio de Adesão.</li>
                      <li><strong className="text-eu-blue">Euro Especialista:</strong> Conclua o Super Quiz com um mínimo de 10 respostas corretas.</li>
                    </ul>
                  </div>

                  <div className="asymmetric-card">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Para uma experiência editorial completa e legível, recomendamos a visualização em ecrãs com largura superior a 1024px (desktop ou tablet em modo paisagem).
                    </p>
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
                <p className="text-[10px] opacity-60">Consulte o guia para aprender a navegar.</p>
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
