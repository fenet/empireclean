import { useState, useEffect } from "react";
import { trackEvent } from "../lib/analytics";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Phone, Mail, Instagram, Facebook, Linkedin, UserCheck, DollarSign, CalendarDays } from "lucide-react";
import cover from "../assets/cover.svg";
import homeImg from "../assets/home.jpg";
import officeImg from "../assets/office.jpg";

export default function Landing() {
  const { t, i18n } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem("cookieConsent");
    const storedTime = localStorage.getItem("cookieConsentTime");

    if (!storedConsent || !storedTime) {
      setShowBanner(true);
      return;
    }

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    if (now - parseInt(storedTime, 10) > oneDay) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    localStorage.setItem("cookieConsentTime", Date.now().toString());
    setShowBanner(false);
    window.dispatchEvent(new CustomEvent("consentChanged", { detail: { consent: true } }));
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    localStorage.setItem("cookieConsentTime", Date.now().toString());
    setShowBanner(false);
    window.dispatchEvent(new CustomEvent("consentChanged", { detail: { consent: false } }));
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 brand-gradient-soft">
      <nav className="bg-white shadow-md w-full z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3 md:space-x-6 min-w-0">
            <Link to="/" aria-label="Go to home page" className="shrink-0">
              <img src="/logo.png" alt={t("alt.logo")} className="h-14 sm:h-16 md:h-40 w-auto" />
            </Link>
            <a
              href="tel:+436641358598"
              className="flex flex-col items-center text-[#8d5a1b] font-semibold hover:underline"
              aria-label="Call us"
              onClick={() => trackEvent("Contact_Phone_Click", { contact_method: "phone", source: "navbar" })}
            >
              <Phone size={24} className="mb-0.5 md:mb-1 md:size-[32px]" />
              <span className="hidden md:inline text-base text-gray-700">+43 664 1358598</span>
            </a>
            <a
              href="mailto:office@empireclean.at"
              className="flex flex-col items-center text-[#ac7031] font-semibold hover:underline"
              aria-label="Email us"
              onClick={() => trackEvent("Contact_Email_Click", { contact_method: "email", source: "navbar" })}
            >
              <Mail size={24} className="mb-0.5 md:mb-1 md:size-[32px]" />
              <span className="hidden md:inline text-base text-gray-700">office@empireclean.at</span>
            </a>
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <Link
              to="/profile"
              className="hidden md:block brand-btn px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-lg font-semibold shadow-md animate-pulse-button whitespace-nowrap"
              onClick={() => trackEvent("Navbar_Book_Click", { source: "navbar_desktop" })}
            >
              {t("nav.bookNow")}
            </Link>
            <button
              onClick={() => i18n.changeLanguage("en")}
              title="English"
              aria-label="Switch to English"
              className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border text-sm md:text-base hover:bg-gray-50 ${
                i18n.language && i18n.language.startsWith("en") ? "ring-2 ring-[#ac7031]" : ""
              }`}
            >
              <span role="img" aria-label="English flag">🇬🇧</span>
            </button>
            <button
              onClick={() => i18n.changeLanguage("de")}
              title="Deutsch"
              aria-label="Auf Deutsch umschalten"
              className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border text-sm md:text-base hover:bg-gray-50 ${
                i18n.language && i18n.language.startsWith("de") ? "ring-2 ring-[#ac7031]" : ""
              }`}
            >
              <span role="img" aria-label="German flag">🇩🇪</span>
            </button>
          </div>

          <div className="w-full flex justify-center mt-2 md:hidden">
            <Link
              to="/profile"
              className="brand-btn px-4 py-2 rounded-lg text-sm font-semibold shadow-md animate-pulse-button whitespace-nowrap"
              onClick={() => trackEvent("Navbar_Book_Click", { source: "navbar_mobile" })}
            >
              {t("nav.bookNow")}
            </Link>
          </div>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center px-4 md:px-6 pt-14 md:pt-24 pb-16 md:pb-24">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#000000] mb-6">{t("hero.title")}</h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">{t("hero.subtitle")}</p>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/profile"
            className="brand-btn px-6 sm:px-10 py-3 sm:py-4 rounded-xl text-base sm:text-xl font-semibold hover:shadow-lg hover:scale-105 transition"
            onClick={() => trackEvent("Landing_CTA_Click", { cta: "hero_book_here" })}
          >
            JETZT BUCHEN
          </Link>
          <Link
            to="/order/request"
            className="px-6 sm:px-10 py-3 sm:py-4 rounded-xl text-base sm:text-xl font-semibold bg-gradient-to-r from-[#facc15] via-[#f97316] to-[#fb923c] text-black shadow-md hover:shadow-lg hover:scale-105 transition"
            onClick={() => {
              trackEvent("Landing_Job_CTA_Click", { cta: "hero_offer_request" });
            }}
          >
            Angebot anfragen
          </Link>
          </div>

        </div>
      </section>

      <section
        className="relative h-[52vh] sm:h-[62vh] md:h-[70vh] bg-center bg-cover md:bg-fixed"
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        <div className="grid sm:grid-cols-3 gap-8">
          <Link
            to="/profile"
            className="bg-gradient-to-r from-[#ffe499] via-[#e7aa51] to-[#ac7031] text-black font-semibold rounded-2xl p-6 md:p-8 text-center hover:scale-105 hover:shadow-xl transition"
            onClick={() => trackEvent("Service_Standard_Click", { service_type: "Standard", source: "landing_grid" })}
          >
            <h4 className="text-2xl font-bold mb-2">{t("services.standard.title")}</h4>
            <p>{t("services.standard.desc")}</p>
          </Link>
          <Link
            to="/profile"
            className="bg-gradient-to-r from-[#8d5a1b] to-[#ac7031] text-white font-semibold rounded-2xl p-6 md:p-8 text-center hover:scale-105 hover:shadow-xl transition"
            onClick={() => trackEvent("Service_Deep_Click", { service_type: "Deep", source: "landing_grid" })}
          >
            <h4 className="text-2xl font-bold mb-2">{t("services.deep.title")}</h4>
            <p>{t("services.deep.desc")}</p>
          </Link>
          <Link
            to="/profile"
            className="bg-gradient-to-r from-[#3acfd5] to-[#3a7bd5] text-black font-semibold rounded-2xl p-6 md:p-8 text-center hover:scale-105 hover:shadow-xl transition"
            onClick={() => trackEvent("Service_Office_Click", { service_type: "Office", source: "landing_grid" })}
          >
            <h4 className="text-2xl font-bold mb-2">{t("services.office.title")}</h4>
            <p>{t("services.office.desc")}</p>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center">
            <UserCheck size={48} className="text-[#ac7031] mb-4" />
            <h3 className="text-xl font-bold text-[#000000] mb-2">{t("services.reliable")}</h3>
            <p className="text-gray-600">{t("services.reliableLine")}</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center">
            <DollarSign size={48} className="text-[#8d5a1b] mb-4" />
            <h3 className="text-xl font-bold text-[#000000] mb-2">{t("services.pricing")}</h3>
            <p className="text-gray-600">{t("services.priceLine")}</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center">
            <CalendarDays size={48} className="text-[#ac7031] mb-4" />
            <h3 className="text-xl font-bold text-[#000000] mb-2">{t("services.easy")}</h3>
            <p className="text-gray-600">{t("services.easyLine")}</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={homeImg}
              alt={t("alt.homeCleaning")}
              className="w-full h-64 sm:h-80 md:h-[400px] object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-[#000000]">{t("services.homeTitle")}</h3>
            <p className="text-gray-600 text-lg">{t("services.homeDesc")}</p>
            <Link
              to="/profile"
              className="inline-block brand-btn px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
              onClick={() => trackEvent("Service_Home_Click", { service_type: "Home", source: "premium_section" })}
            >
              {t("services.homeCta")}
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 order-2 md:order-1">
            <h3 className="text-3xl font-bold text-[#000000]">{t("services.officeTitle")}</h3>
            <p className="text-gray-600 text-lg">{t("services.officeDesc")}</p>
            <Link
              to="/profile"
              className="inline-block bg-[#ffe499] text-[#8d5a1b] px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
              onClick={() => trackEvent("Service_Office_Premium_Click", { service_type: "Office", source: "premium_section" })}
            >
              {t("services.officeCta")}
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lg order-1 md:order-2">
            <img
              src={officeImg}
              alt={t("alt.officeCleaning")}
              className="w-full h-64 sm:h-80 md:h-[400px] object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

           <footer className="bg-white text-gray-700 mt-auto border-t border-gray-200">
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
              {t("footer.staff.title")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/files/Datenschutzblat.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.staff.links.privacySheet")}
                </a>
              </li>
              <li>
                <a href="/files/Dienstliste.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.staff.links.dutyRoster")}
                </a>
              </li>
              <li>
                <a href="/files/Stammdatenblatt.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.staff.links.masterData")}
                </a>
              </li>
              <li>
                <a href="/files/Urlaubsschein_Zeitausgleich.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.staff.links.leaveForm")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
              {t("footer.customers.title")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/files/ServiceStandards.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.customers.links.cleaningStandards")}
                </a>
              </li>
              <li>
                <a href="/files/Pricelist.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.customers.links.priceList")}
                </a>
              </li>
              <li>
                <a href="/files/Contract.pdf" download className="hover:text-gray-900 transition-colors">
                  {t("footer.customers.links.serviceContract")}
                </a>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-gray-900 transition-colors">
                  {t("footer.customers.links.calculator")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
              {t("footer.connect.title")}
            </h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://www.instagram.com/empire.clean.vienna/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61580613673114"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/empire-clean-vienna/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-col space-y-2 text-sm">
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/files/Allgemeine_Geschäftsbedingungen_ Neu.pdf" download className="hover:text-gray-900 transition-colors">
                    {t("footer.connect.links.terms")}
                  </a>
                </li>
                <li>
                  <a href="/files/Datenschutzbestimmungen.pdf" download className="hover:text-gray-900 transition-colors">
                    {t("footer.connect.links.privacy")}
                  </a>
                </li>
              </ul>

              <Link to="/imprint" className="hover:text-gray-900 transition-colors">
                {t("footer.connect.links.imprint")}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 py-4 text-center text-sm text-gray-500">
          <span>© {new Date().getFullYear()} EmpireClean — All rights reserved.</span>
          <a
            href="https://empireclean.at"
            className="inline-flex items-center justify-center rounded-lg brand-btn px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
          >
            Login
          </a>
        </div>
      </footer>

      {showBanner && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4 text-center space-y-4">
            <p className="text-gray-700">
              {t("cookies.msg")}
              <Link to="/privacy" className="underline text-[#ac7031]">
                {t("cookies.privacyPolicy")}
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  declineCookies();
                  trackEvent("Cookie_Decline_Click", { consent: false, source: "banner" });
                }}
                className="bg-gray-300 text-black px-6 py-2 rounded-md font-semibold hover:opacity-90 transition w-full sm:w-auto"
              >
                {t("cookies.decline")}
              </button>
              <button
                onClick={() => {
                  acceptCookies();
                  trackEvent("Cookie_Accept_Click", { consent: true, source: "banner" });
                }}
                className="brand-btn text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition w-full sm:w-auto"
              >
                {t("cookies.accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}