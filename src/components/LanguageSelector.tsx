'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/texts';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-[var(--sage)] text-white'
            : 'bg-white/40 text-gray-700 hover:bg-white/60'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          language === 'es'
            ? 'bg-[var(--sage)] text-white'
            : 'bg-white/40 text-gray-700 hover:bg-white/60'
        }`}
      >
        ES
      </button>
    </div>
  );
}

