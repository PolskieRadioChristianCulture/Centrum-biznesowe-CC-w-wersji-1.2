import React from 'react';
import { UserPersona, JOZUE_AVATAR_URL, MIRIAM_AVATAR_URL, JESZUA_AVATAR_URL, fixOrphans, AppLanguage } from '../types';

interface CentrumDashboardProps {
  user: UserPersona;
  onOpenManagement: () => void;
  onOpenServices: () => void;
  appLanguage: AppLanguage;
}

export const CentrumDashboard: React.FC<CentrumDashboardProps> = ({ user, onOpenManagement, onOpenServices, appLanguage }) => {
  const isMale = user.gender === 'male';
  const mentorName = isMale ? 'Miriam CC' : 'Jeszua';
  const mentorAvatar = isMale ? MIRIAM_AVATAR_URL : JESZUA_AVATAR_URL;

  const translations = {
    pl: {
      welcome: "Witaj w Business Hub CC!",
      doormanMsg: "Jestem Jozue, Twój Koordynator Gospodarczy. Pomagam łączyć chrześcijańskich przedsiębiorców z ludźmi szukającymi usług opartych na wartościach biblijnych. Znajdź rzetelną firmę lub dodaj własną.",
      activeEcosystems: "Sieć Usług i Biznesu",
      yourMentor: "Twój Doradca Etyczny",
      guide: "Przewodnik Biznesu",
      studentPanel: "Mój Panel Biznesowy",
      futureVersions: "Rozwój Ekosystemu Biznesu",
      statusActive: "Dostępne",
      statusPrep: "W przygotowaniu",
      mentorQuoteMale: "\"Uczciwa waga i szala należą do Pana; Jego dziełem są wszystkie ciężarki w worku.\" — Przypowieści 16:11",
      mentorQuoteFemale: "\"Cokolwiek czynicie, z serca czyńcie, jak dla Pana, a nie dla ludzi.\" — Kolosan 3:23",
      cards: {
        uslugi: { title: "Chrześcijańskie Usługi", desc: "Katalog zweryfikowanych firm i rzetelnych wykonawców" },
        ogloszenia: { title: "Portal Ogłoszeniowy", desc: "Giełda zleceń, praca, ogłoszenia drobne" },
        portal: { title: "Portal Główny", desc: "Aktualności gospodarcze Christian Culture" },
        randka: { title: "Networking CC", desc: "Buduj relacje biznesowe i osobiste" },
        biblia: { title: "Etyka w Biznesie", desc: "Zasady Słowa Bożego w codziennej pracy" },
        ccnews: { title: "Business NEWS", desc: "Informacje ze świata chrześcijańskiej gospodarki" },
        multimedia: { title: "Centrum Edukacji", desc: "Kursy, webinary i podcasty o biznesie" },
        pomoc: { title: "Wsparcie Prawne", desc: "Porady dla przedsiębiorców i konsumentów" },
        kontakt: { title: "Inkubator CC", desc: "Zgłoś swoją firmę do naszego systemu" },
        wsparcie: { title: "Fundusz Misji", desc: "Inwestuj w rozwój Królestwa Bożego" },
      }
    },
    en: {
      welcome: "Welcome to CC Business Hub!",
      doormanMsg: "I am Joshua, your Economic Coordinator. I help connect Christian entrepreneurs with people looking for services based on biblical values. Find a reliable company or add your own.",
      activeEcosystems: "Service & Business Network",
      yourMentor: "Ethical Advisor",
      guide: "Business Guide",
      studentPanel: "My Business Panel",
      futureVersions: "Business Ecosystem Growth",
      statusActive: "Available",
      statusPrep: "In preparation",
      mentorQuoteMale: "\"A just weight and balance are the Lord's: all the weights of the bag are his work.\" — Proverbs 16:11",
      mentorQuoteFemale: "\"And whatsoever ye do, do it heartily, as to the Lord, and not unto men.\" — Colossians 3:23",
      cards: {
        uslugi: { title: "Christian Services", desc: "Directory of verified companies and reliable contractors" },
        ogloszenia: { title: "Classifieds Portal", desc: "Job board, tenders, and small ads" },
        portal: { title: "Main Portal", desc: "Christian Culture economic news" },
        randka: { title: "CC Networking", desc: "Build business and personal relationships" },
        biblia: { title: "Business Ethics", desc: "Principles of God's Word in daily work" },
        ccnews: { title: "Business NEWS", desc: "News from the world of Christian economy" },
        multimedia: { title: "Education Center", desc: "Courses, webinars, and business podcasts" },
        pomoc: { title: "Legal Support", desc: "Advice for entrepreneurs and consumers" },
        kontakt: { title: "CC Incubator", desc: "Submit your company to our system" },
        wsparcie: { title: "Mission Fund", desc: "Invest in the growth of God's Kingdom" },
      }
    }
  };

  const t = (translations as any)[appLanguage] || translations.en;

  const cards = [
    { 
      id: 'uslugi', 
      icon: '💼', 
      status: 'Aktywny', 
      url: '#',
      isInternal: true,
      bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=90&w=1200'
    },
    { 
      id: 'portal', 
      icon: '🏛️', 
      status: 'Aktywny', 
      url: 'https://cclite.pl',
      bg: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=90&w=1200'
    },
    { 
      id: 'ogloszenia', 
      icon: '📢', 
      status: 'W przygotowaniu', 
      url: '#',
      bg: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=90&w=1200'
    },
    { 
      id: 'randka', 
      icon: '🤝', 
      status: 'W przygotowaniu', 
      url: 'https://randka.cclite.pl',
      bg: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=90&w=800'
    },
    { 
      id: 'biblia', 
      icon: '⚖️', 
      status: 'W przygotowaniu', 
      url: 'https://biblia.cclite.pl',
      bg: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=90&w=800'
    },
    { 
      id: 'ccnews', 
      icon: '📰', 
      status: 'W przygotowaniu', 
      url: '#',
      bg: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=90&w=800'
    },
    { 
      id: 'multimedia', 
      icon: '🎓', 
      status: 'W przygotowaniu', 
      url: '#',
      bg: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=90&w=800'
    },
    { 
      id: 'pomoc', 
      icon: '🛡️', 
      status: 'W przygotowaniu', 
      url: '#',
      bg: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=90&w=800'
    },
    { 
      id: 'kontakt', 
      icon: '🏗️', 
      status: 'W przygotowaniu', 
      url: '#',
      bg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=90&w=800'
    },
    { 
      id: 'wsparcie', 
      icon: '📈', 
      status: 'W przygotowaniu', 
      url: '#',
      bg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=90&w=800'
    }
  ];

  const roadmap = [
    { title: 'Marketplace Christian Global', icon: '🛒' },
    { title: 'Targi Biznesu CC 2026', icon: '🏢' },
    { title: 'Certyfikacja Rzetelności', icon: '📜' },
    { title: 'Klub Dobrych Zarządców', icon: '👑' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 space-y-12 animate-fade-in">
      
      {/* Jozue Business Coordinator Welcome Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 p-10 bg-zinc-900/40 border-2 border-[#C5A059]/20 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-12 -right-12 sm:-top-20 sm:-right-20 pointer-events-none select-none transition-all duration-1000 group-hover:scale-110">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[#C5A059] rounded-full blur-[80px] sm:blur-[120px] opacity-20 animate-pulse"></div>
            <span className="text-[12rem] sm:text-[20rem] opacity-20 transform rotate-12 drop-shadow-[0_0_40px_rgba(197,160,89,0.4)] block animate-floating-button-pulse">💼</span>
          </div>
        </div>

        <div className="relative flex-shrink-0 z-10">
          <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-[#C5A059] shadow-2xl animate-floating-button-pulse transition-transform group-hover:rotate-2">
            <img src={JOZUE_AVATAR_URL} alt="Jozue" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#C5A059] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg border border-black/20">Business</div>
        </div>

        <div className="text-center md:text-left space-y-3 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter italic drop-shadow-md">
            {t.welcome}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
            {fixOrphans(t.doormanMsg)}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Ecosystems - Business Section */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] pl-4">{t.activeEcosystems}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map(card => {
              const cardData = t.cards[card.id] || { title: card.id, desc: "" };
              const isActuallyActive = card.status === 'Aktywny';
              return (
                <div 
                  key={card.id} 
                  onClick={() => {
                    if (isActuallyActive) {
                      if (card.isInternal) onOpenServices();
                      else if (card.url !== '#') window.open(card.url, '_blank');
                    }
                  }}
                  className={`group relative p-8 bg-zinc-950 border border-white/10 rounded-[2.5rem] transition-all shadow-2xl flex flex-col justify-between min-h-[240px] overflow-hidden cursor-pointer ${isActuallyActive ? 'hover:border-[#C5A059]/60 hover:shadow-[#C5A059]/20 hover:scale-[1.03]' : 'opacity-90 grayscale-[0.5] hover:grayscale-[0.2]'}`}
                >
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                      src={card.bg} 
                      alt={cardData.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-110 transition-all duration-1000 ease-out" 
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-black/80 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-2xl group-hover:scale-110 transition-transform border border-white/20">{card.icon}</div>
                    <h4 className="text-2xl font-black text-white uppercase tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{cardData.title}</h4>
                    <p className="text-zinc-100 text-xs mt-2 font-bold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">{cardData.desc}</p>
                  </div>

                  <div className="relative z-10 flex justify-between items-center mt-6">
                     <span className={`text-[9px] font-black uppercase px-4 py-2 rounded-full border shadow-lg backdrop-blur-md transition-all ${isActuallyActive ? 'bg-emerald-500/30 text-white border-emerald-500/50' : 'bg-zinc-800/80 text-zinc-500 border-white/5'}`}>
                       {isActuallyActive ? t.statusActive : t.statusPrep}
                     </span>
                     <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all shadow-xl ${isActuallyActive ? 'bg-[#C5A059] text-black border-black group-hover:scale-110 group-hover:rotate-12' : 'bg-zinc-900/60 text-zinc-700 border-white/5'}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Professional Mentor Sidebar */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] pl-4">{t.yourMentor}</h3>
          <div className="p-8 bg-zinc-950 border-2 border-[#C5A059]/30 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
            <img src={mentorAvatar} alt={mentorName} className="w-24 h-24 rounded-full border-2 border-[#C5A059] mb-6 object-cover shadow-xl" />
            <h4 className="text-lg font-black text-white uppercase italic">{mentorName}</h4>
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1 mb-6">{t.guide}</p>
            <p className="text-xs text-zinc-400 leading-relaxed italic mb-8">
              {isMale 
                ? t.mentorQuoteMale
                : t.mentorQuoteFemale}
            </p>
            <button onClick={onOpenManagement} className="w-full py-4 bg-[#C5A059] text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-[0_10px_30px_rgba(197,160,89,0.3)]">
              {t.studentPanel}
            </button>
          </div>
        </div>
      </div>

      {/* Business Roadmap Section */}
      <section className="space-y-6">
        <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] pl-4">{t.futureVersions}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {roadmap.map(item => (
            <div key={item.title} className="p-6 bg-zinc-900/20 border border-white/5 rounded-3xl flex flex-col items-center text-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-help hover:border-[#C5A059]/30">
              <span className="text-3xl">{item.icon}</span>
              <span className="text-[9px] font-black text-white uppercase tracking-tight leading-tight">{item.title}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
