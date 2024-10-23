import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="fixed top-4 left-4 z-50 flex space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-semibold ${i18n.language === 'en' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} hover:bg-opacity-80 transition duration-300`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('fr')}
        className={`px-3 py-1 rounded-full text-sm font-semibold ${i18n.language === 'fr' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} hover:bg-opacity-80 transition duration-300`}
        aria-label="Switch to French"
      >
        FR
      </button>
      <button
        onClick={() => changeLanguage('ar')}
        className={`px-3 py-1 rounded-full text-sm font-semibold ${i18n.language === 'ar' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} hover:bg-opacity-80 transition duration-300`}
        aria-label="Switch to Arabic"
      >
        عربي
      </button>
    </div>
  );
};

export default LanguageSelector;