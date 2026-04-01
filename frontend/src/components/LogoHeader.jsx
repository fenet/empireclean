import { useTranslation } from "react-i18next";

export default function LogoHeader() {
  const { i18n } = useTranslation();
  return (
    <header className="py-3 flex flex-col items-center text-center">
      {/* Logo as a clickable link */}
      <a href="/">
  <img
    src="/logo.png"
    alt="Logo"
    className="w-44 sm:w-52 md:w-60 h-auto mb-1 cursor-pointer"
  />
</a>


      {/* Bigger text */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black px-4 break-words">
        Empire<span style={{ color: "#8d5a1b" }}>Clean</span>
      </h1>
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => i18n.changeLanguage('en')}
          title="English"
          aria-label="Switch to English"
          className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm hover:bg-gray-50 ${i18n.language && i18n.language.startsWith('en') ? 'ring-2 ring-[#ac7031]' : ''}`}
        >
          <span role="img" aria-label="English flag">🇬🇧</span>
        </button>
        <button
          onClick={() => i18n.changeLanguage('de')}
          title="Deutsch"
          aria-label="Auf Deutsch umschalten"
          className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm hover:bg-gray-50 ${i18n.language && i18n.language.startsWith('de') ? 'ring-2 ring-[#ac7031]' : ''}`}
        >
          <span role="img" aria-label="German flag">🇩🇪</span>
        </button>
      </div>
    </header>
  );
}

