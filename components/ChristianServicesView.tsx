import React, { useState } from 'react';
import { AppLanguage, ToastMessage, fixOrphans } from '../types';

interface ChristianServicesViewProps {
  isOpen: boolean;
  onClose: () => void;
  appLanguage: AppLanguage;
  addToast: (message: string, type?: ToastMessage['type']) => void;
}

export const ChristianServicesView: React.FC<ChristianServicesViewProps> = ({ isOpen, onClose, appLanguage, addToast }) => {
  const [activeTab, setActiveTab] = useState<'offers' | 'add'>('offers');
  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Gaz, Ogrzewanie & Hydraulika',
    customCategory: '',
    description: ''
  });

  const offers = [
    { 
      id: 1, 
      name: "Premier HeatFix", 
      cat: "Gaz, Ogrzewanie & Hydraulika", 
      desc: "Profesjonalne usługi konserwacyjne i awaryjne. Mariusz służy ekspercką wiedzą, zapewniając bezpieczeństwo i ciepło w Twoim domu.",
      img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800",
      url: "https://www.premierheatfix.com"
    },
    { 
      id: 2, 
      name: "Koncept Studio", 
      cat: "Meble Kuchenne na Wymiar", 
      desc: "Serce domu w Lublinie. Meble na wymiar z montażem. Prezent: Bezpłatny pomiar oraz profesjonalny projekt kuchni!",
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800",
      url: "https://koncept-studio.pl"
    },
    { 
      id: 3, 
      name: "Studio Dobrego Słowa", 
      cat: "Rozwój & Inspiracja", 
      desc: "Studio Dobrego Słowa – Inspirujące miejsce dla współczesnych poszukiwaczy pasji. Chcemy dzielić się praktyczną wiedzą, aby podnieść jakość życia drugiego człowieka na wyższy poziom, budząc go tym samym z egzystencjonalnej pasywności i postawy rezygnacji.",
      img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
      url: "https://studiods.pl",
      position: "object-center"
    },
    { 
      id: 4, 
      name: "Paweł Murawski", 
      cat: "Coaching Holistyczny", 
      desc: "Paweł Murawski – Holistyczny Coaching w Duchu Biblijnym. Odzyskaj harmonię i wewnętrzną wolność dzięki wsparciu, które łączy rozwój duchowy, fizyczny i emocjonalny. W swojej pracy kieruję się mądrością Pisma Świętego, pomagając odnaleźć spokój i nową drogę życia. Specjalizuję się w profesjonalnym wsparciu dla osób: pragnących całościowego rozwoju osobistego, zmagających się z uzależnieniami (alkoholizm, narkomania, hazard, seksoholizm), szukających wyjścia z życiowych kryzysów. Razem odkrywamy Boży plan dla Twojego życia.",
      img: "https://drive.google.com/thumbnail?id=13me89aei8gwYZuiGcjyv6qESdoCLVSR7&sz=w1000",
      url: "https://coachholistyczny.pl",
      position: "object-top"
    }
  ];

  const translations = {
    pl: {
      title: "Chrześcijańskie Usługi",
      subtitle: "Buduj biznes na fundamencie Słowa Bożego",
      introTitle: "🤝 Chrześcijański Katalog Usług – Budujemy z Pasją i Wartościami",
      introDesc: "W naszym ekosystemie wierzymy, że praca jest powołaniem. Przedstawiamy polecane inicjatywy prowadzone przez profesjonalistów, dla których uczciwość i jakość idą w parze z fundamentem wiary.",
      tabOffers: "Aktualne oferty",
      tabAdd: "Dodaj usługę lub firmę",
      formName: "Nazwa Firmy / Imię i Nazwisko",
      formCat: "Kategoria usług",
      formCustomCat: "Wpisz własną kategorię",
      formDesc: "Opis działalności",
      formBtn: "Wyślij do weryfikacji",
      otherOption: "Inna (wpisz własną)...",
      successMsg: "Otwieram klienta poczty z Twoim zgłoszeniem! ✨",
      contactBtn: "Odwiedź stronę",
      quote: "\"Wszystko, cokolwiek czynicie, z serca wykonujcie jak dla Pana, a nie dla ludzi\" – Kol 3,23",
      supportFooter: "Twoje ogłoszenie jest bezpłatne - wspieraj cyklicznie misję Christian Culture.",
      supportBtn: "WSPIERAM"
    },
    en: {
      title: "Christian Services",
      subtitle: "Build your business on the foundation of the Word",
      introTitle: "🤝 Christian Services Directory – Building with Passion and Values",
      introDesc: "In our ecosystem, we believe that work is a calling. We present recommended initiatives led by professionals for whom integrity and quality go hand in hand with the foundation of faith.",
      tabOffers: "Current Offers",
      tabAdd: "Add Service or Company",
      formName: "Company Name / Name",
      formCat: "Service Category",
      formCustomCat: "Enter custom category",
      formDesc: "Description",
      formBtn: "Send for Verification",
      otherOption: "Other (enter custom)...",
      successMsg: "Opening email client with your application! ✨",
      contactBtn: "Visit website",
      quote: "\"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters\" – Col 3:23",
      supportFooter: "Your announcement is free - support the Christian Culture mission regularly.",
      supportBtn: "SUPPORT"
    }
  };

  const t = (translations as any)[appLanguage] || translations.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalCategory = isOtherCategory ? formData.customCategory : formData.category;
    const subject = encodeURIComponent(`${appLanguage === 'pl' ? 'Zgłoszenie firmy:' : 'Service submission:'} ${formData.name}`);
    const body = encodeURIComponent(
      `${appLanguage === 'pl' ? 'Nowe zgłoszenie do Katalogu Usług CC:' : 'New submission to CC Services Directory:'}\n\n` +
      `${appLanguage === 'pl' ? 'Nazwa:' : 'Name:'} ${formData.name}\n` +
      `${appLanguage === 'pl' ? 'Kategoria:' : 'Category:'} ${finalCategory}\n` +
      `${appLanguage === 'pl' ? 'Opis:' : 'Description:'}\n${formData.description}\n\n` +
      `--- ${appLanguage === 'pl' ? 'Wysłano z aplikacji Christian Culture Hub' : 'Sent from Christian Culture Hub App'} ---`
    );
    
    window.location.href = `mailto:radiochristianculture@gmail.com?subject=${subject}&body=${body}`;
    
    addToast(t.successMsg, "success");
    setActiveTab('offers');
    setFormData({ name: '', category: 'Gaz, Ogrzewanie & Hydraulika', customCategory: '', description: '' });
    setIsOtherCategory(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'OTHER') {
      setIsOtherCategory(true);
    } else {
      setIsOtherCategory(false);
      setFormData({ ...formData, category: value });
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-black animate-fade-in flex flex-col">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-[#C5A059]/10 rounded-full blur-[150px]"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-full h-full bg-blue-500/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-8 py-8 sm:px-12 flex justify-between items-center border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
            {t.title}
          </h2>
          <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.4em] mt-2">
            {t.subtitle}
          </p>
        </div>
        <button 
          onClick={onClose}
          className="p-4 bg-zinc-900 text-zinc-400 hover:text-white rounded-full transition-all border border-zinc-800 shadow-xl active:scale-90 group"
        >
          <svg className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </header>

      {/* Navigation Tabs */}
      <nav className="relative z-10 flex justify-center gap-4 py-8 bg-zinc-950/20 border-b border-white/5">
        <button 
          onClick={() => setActiveTab('offers')}
          className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'offers' ? 'bg-[#C5A059] text-black shadow-[0_0_25px_rgba(197,160,89,0.3)] scale-105' : 'bg-zinc-900 border border-zinc-800 text-zinc-500'}`}
        >
          {t.tabOffers}
        </button>
        <button 
          onClick={() => setActiveTab('add')}
          className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'add' ? 'bg-[#C5A059] text-black shadow-[0_0_25px_rgba(197,160,89,0.3)] scale-105' : 'bg-zinc-900 border border-zinc-800 text-zinc-500'}`}
        >
          {t.tabAdd}
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-y-auto p-8 sm:p-12 scrollbar-thin">
        <div className="max-w-6xl mx-auto w-full">
          
          {activeTab === 'offers' ? (
            <div className="space-y-12">
              {/* Directory Intro Section */}
              <section className="bg-zinc-900/40 border border-[#C5A059]/20 rounded-[3rem] p-8 sm:p-12 text-center backdrop-blur-md animate-fade-in shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 blur-3xl rounded-full"></div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter italic mb-4">
                  {t.introTitle}
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium">
                  {fixOrphans(t.introDesc)}
                </p>
                <div className="mt-8 pt-6 border-t border-white/5">
                  <p className="text-[#C5A059] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] italic">
                    {t.quote}
                  </p>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-scale-up">
                {offers.map(offer => (
                  <div key={offer.id} className="group relative bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl hover:border-[#C5A059]/40 transition-all hover:scale-[1.02] flex flex-col h-full">
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={offer.img} 
                        alt={offer.name} 
                        className={`w-full h-full object-cover ${(offer as any).position || 'object-center'} grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110`} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                      <span className="absolute top-6 left-6 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[8px] font-black text-[#C5A059] uppercase tracking-widest border border-[#C5A059]/30">
                        {offer.cat}
                      </span>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3 italic">{offer.name}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                        {fixOrphans(offer.desc)}
                      </p>
                      
                      <div className="mb-6 pt-6 border-t border-white/5 space-y-4">
                        <p className="text-[9px] text-zinc-500 font-bold uppercase leading-relaxed italic text-center">
                          {t.supportFooter}
                        </p>
                        <a 
                          href="https://revolut.me/christianculture" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-full py-3 bg-zinc-800 border border-emerald-500/30 text-emerald-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-md flex items-center justify-center gap-2 group/btn"
                        >
                          <span className="text-sm group-hover/btn:scale-125 transition-transform">❤️</span> {t.supportBtn}
                        </a>
                      </div>

                      <button 
                        onClick={() => window.open(offer.url, "_blank")}
                        className="w-full py-4 bg-zinc-950 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#C5A059] hover:text-black transition-all shadow-lg active:scale-95"
                      >
                        {t.contactBtn}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-zinc-900/40 border border-white/5 rounded-[3.5rem] p-10 sm:p-16 shadow-4xl animate-fade-in-down backdrop-blur-xl">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-10 text-center italic">{t.tabAdd}</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest pl-4">{t.formName}</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/60 border border-zinc-800 rounded-2xl py-5 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest pl-4">{t.formCat}</label>
                  <select 
                    onChange={handleCategoryChange}
                    className="w-full bg-black/60 border border-zinc-800 rounded-2xl py-5 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 appearance-none"
                  >
                    <option value="Gaz, Ogrzewanie & Hydraulika">Gaz, Ogrzewanie & Hydraulika</option>
                    <option value="Meble na Wymiar & Wnętrza">Meble na Wymiar & Wnętrza</option>
                    <option value="Edukacja & Rozwój">Edukacja & Rozwój</option>
                    <option value="Coaching & Psychologia">Coaching & Psychologia</option>
                    <option value="Technologie & IT">Technologie & IT</option>
                    <option value="Usługi Prawne">Usługi Prawne</option>
                    <option value="OTHER">{t.otherOption}</option>
                  </select>
                </div>
                {isOtherCategory && (
                  <div className="space-y-3 animate-fade-in">
                    <label className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest pl-4">{t.formCustomCat}</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.customCategory}
                      onChange={(e) => setFormData({...formData, customCategory: e.target.value})}
                      className="w-full bg-black/60 border border-zinc-800 rounded-2xl py-5 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40" 
                    />
                  </div>
                )}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest pl-4">{t.formDesc}</label>
                  <textarea 
                    required 
                    rows={4} 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-black/60 border border-zinc-800 rounded-2xl py-5 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40"
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-6 bg-[#C5A059] text-black font-black uppercase tracking-widest rounded-2xl shadow-[0_20px_50px_rgba(197,160,89,0.3)] hover:scale-[1.02] active:scale-95 transition-all">
                  {t.formBtn}
                </button>
              </form>
            </div>
          )}

        </div>
      </main>

      <footer className="relative z-10 py-10 text-center border-t border-white/5 bg-zinc-950/40">
        <p className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.6em]">
          Christian Culture Global Network • Soli Deo Gloria
        </p>
      </footer>
    </div>
  );
};
