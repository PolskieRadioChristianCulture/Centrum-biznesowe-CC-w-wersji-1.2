
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Toast } from './components/Toast';
import { UserPanel } from './components/UserPanel';
import { AppManagementCenter } from './components/AppManagementCenter';
import { CentrumDashboard } from './components/CentrumDashboard';
import { ChristianServicesView } from './components/ChristianServicesView';
import { LoginScreen } from './components/LoginScreen';
import { TranslationModal } from './components/TranslationModal';
import { PersistenceService } from './services/persistenceService';
import { usePersistence } from './usePersistence';
import { 
  ToastMessage, 
  UserPersona,
  APP_VERSION,
  inferGenderFromName,
  AppLanguage,
  BIBLE_TRANSLATIONS
} from './types';

const RotatingBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-black">
    <div className="absolute inset-0 bg-[url('https://drive.google.com/thumbnail?id=1hXOIdhtsZYXn-Pyj0I5mogk4oRuHfzs2&sz=w1920')] bg-cover opacity-20 filter blur-xl scale-110"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10"></div>
    <div className="divine-rays opacity-[0.05] z-20"></div>
  </div>
);

export const App: React.FC = () => {
  const [appLanguage, setAppLanguage] = useState<AppLanguage>('pl');
  const persistence = usePersistence();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isManagementCenterOpen, setIsManagementCenterOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isServicesViewOpen, setIsServicesViewOpen] = useState(false);
  
  const [appStarted, setAppStarted] = useState(() => {
    return !!localStorage.getItem('cc_app_start_choice') || !!PersistenceService.getSSOCookie();
  });

  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'info'): string => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    return id;
  }, []);
  
  const removeToast = useCallback((id: string) => setToasts(prev => prev.filter(t => t.id !== id)), []);

  const handleLogout = () => {
    PersistenceService.clearAllData();
    setAppStarted(false);
    window.location.reload();
  };

  const getFlag = (lang: AppLanguage) => {
    const flags: Record<AppLanguage, string> = {
      pl: '🇵🇱', en: '🇺🇸', es: '🇪🇸', pt: '🇵🇹', de: '🇩🇪', fr: '🇫🇷', it: '🇮🇹', uk: '🇺🇦'
    };
    return flags[lang] || '🌐';
  };

  return (
    <div className="dark min-h-screen w-full flex flex-col overflow-x-hidden bg-black text-white font-sans selection:bg-[#C5A059] selection:text-black">
      <RotatingBackground />
      <Toast toasts={toasts} onRemove={removeToast} />

      {!appStarted ? (
        <LoginScreen 
          onLogin={(persona) => {
            setAppStarted(true);
            persistence.setUserPersona(persona);
          }}
          userPersona={persistence.userPersona}
          onUpdateUserPersona={persistence.setUserPersona}
          addToast={addToast}
        />
      ) : (
        <>
          {/* Header Navigation for Business Hub */}
          <header className="relative z-50 w-full px-6 sm:px-8 py-6 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black border border-[#C5A059]/40 rounded-xl flex items-center justify-center overflow-hidden">
                <img src="https://drive.google.com/thumbnail?id=1dHi9QX86UWj21YAIk3I8xyAXalzQkZpj&sz=w512" className="w-full h-full object-cover" alt="CC" />
              </div>
              <div>
                <h1 className="text-sm font-black uppercase tracking-[0.2em] text-white">Usługi CC</h1>
                <p className="text-[8px] font-bold text-[#C5A059] uppercase tracking-widest">Business & Services Hub</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
              {/* Język Selector Button */}
              <button 
                onClick={() => setIsLanguageModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-white/10 rounded-full hover:border-[#C5A059]/50 transition-all group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">{getFlag(appLanguage)}</span>
                <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">
                  {appLanguage === 'pl' ? 'Wybierz język' : 'Select language'}
                </span>
              </button>

              <button 
                onClick={() => setIsUserPanelOpen(true)}
                className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#C5A059]/40 shadow-lg hover:scale-105 transition-transform"
              >
                {persistence.userPersona.profilePicture ? (
                  <img src={persistence.userPersona.profilePicture} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <div className="bg-zinc-900 w-full h-full flex items-center justify-center">👤</div>
                )}
              </button>
            </div>
          </header>

          <main className="relative z-20 flex-1 w-full">
            <CentrumDashboard 
              user={persistence.userPersona} 
              onOpenManagement={() => setIsManagementCenterOpen(true)}
              onOpenServices={() => setIsServicesViewOpen(true)}
              appLanguage={appLanguage}
            />
          </main>

          <footer className="relative z-20 w-full py-8 text-center text-[9px] font-black text-zinc-700 uppercase tracking-[0.5em] border-t border-white/5">
             Soli Deo Gloria • Christian Culture Services v{APP_VERSION}
          </footer>

          <UserPanel 
            isOpen={isUserPanelOpen} 
            onClose={() => setIsUserPanelOpen(false)} 
            userPersona={persistence.userPersona} 
            appLanguage={appLanguage} 
            addToast={addToast} 
            onLogout={handleLogout}
            onEditProfile={() => setIsManagementCenterOpen(true)}
            onOpenRadioMode={() => window.open('https://cclite.pl', '_blank')}
            onOpenDashboard={() => setIsUserPanelOpen(false)}
            onOpenManagement={(tab) => { setIsManagementCenterOpen(true); setIsUserPanelOpen(false); }}
            onUpdateUserPersona={persistence.setUserPersona}
            onBecomePatron={() => {}} 
            onBecomeMecenas={() => {}}
          />

          {isManagementCenterOpen && (
            <AppManagementCenter 
              isOpen={isManagementCenterOpen} 
              initialTab="profile" 
              onClose={() => setIsManagementCenterOpen(false)} 
              userPersona={persistence.userPersona} 
              onUpdateUserPersona={persistence.setUserPersona} 
              radioAlarm={null} 
              onUpdateRadioAlarm={()=>{}} 
              appLanguage={appLanguage} 
              addToast={addToast} 
              onLanguageChange={setAppLanguage} 
              onOpenRadioMode={() => setIsManagementCenterOpen(false)} 
              isProKeyActive={true} 
              onSetProKeyActive={()=>{}}
              isGoogleCalendarConnected={false}
              onGoogleLoginFromManagement={(data) => {
                const gender = inferGenderFromName(data.name);
                persistence.setUserPersona({ 
                  ...persistence.userPersona, 
                  googleEmail: data.email, 
                  name: data.name, 
                  profilePicture: data.picture,
                  gender
                });
                PersistenceService.setSSOCookie({ ...persistence.userPersona, ...data, gender });
              }}
            />
          )}

          <TranslationModal 
            isOpen={isLanguageModalOpen}
            onClose={() => setIsLanguageModalOpen(false)}
            appLanguage={appLanguage}
            onLanguageChange={(lang) => {
              setAppLanguage(lang);
              setIsLanguageModalOpen(false);
              addToast(lang === 'pl' ? "Język zmieniony!" : "Language changed!", "success");
            }}
            selectedId="ubg"
            onSelect={() => {}}
            onSelectRandom={() => {}}
          />

          {isServicesViewOpen && (
            <ChristianServicesView 
              isOpen={isServicesViewOpen} 
              onClose={() => setIsServicesViewOpen(false)} 
              appLanguage={appLanguage}
              addToast={addToast}
            />
          )}
        </>
      )}
    </div>
  );
};
