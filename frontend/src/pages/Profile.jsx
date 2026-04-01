import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { trackEvent } from "../lib/analytics";
import { Phone, Mail, Star } from "lucide-react";

export default function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    window.dispatchEvent(
      new CustomEvent("consentChanged", { detail: { consent: true } })
    );
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    localStorage.setItem("cookieConsentTime", Date.now().toString());
    setShowBanner(false);
    window.dispatchEvent(
      new CustomEvent("consentChanged", { detail: { consent: false } })
    );
  };

  const handleSelectWorker = (workerId) => {
    trackEvent("Profile_Select_Worker", { workerId });
    navigate(`/book?worker=${workerId}`);
  };

  const workers = useMemo(() => {
    const baseWorkers = [
      { id: "sarahM", name: "SARAH M.", rating: 4.96, reviews: 182 },
      { id: "danielK", name: "DANIEL K.", rating: 4.94, reviews: 169 },
      { id: "linaR", name: "LINA R.", rating: 4.91, reviews: 153 },
      { id: "omarH", name: "OMAR H.", rating: 4.93, reviews: 161 },
      { id: "noraA", name: "NORA A.", rating: 4.90, reviews: 148 },
      { id: "milaT", name: "MILA T.", rating: 4.95, reviews: 177 },
      { id: "leoB", name: "LEO B.", rating: 4.92, reviews: 157 },
      { id: "emmaS", name: "EMMA S.", rating: 4.89, reviews: 141 },
    ];

    return [...baseWorkers].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 brand-gradient-soft">
      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-8 md:pt-10 pb-16 flex-1 w-full">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#000000]">
            {t("profile.title")}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t("profile.subtitle")}
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {workers.map((worker) => (
            <article
              key={worker.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-200 hover:-translate-y-1 p-6 flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#000000]">
                  {worker.name.toUpperCase()}
                </h2>
                
                <span className="flex items-center text-[#facc15] font-semibold">
                  <Star size={20} className="fill-[#facc15] text-[#facc15] mr-1" />
                  {worker.rating.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {t("profile.rating", {
                  rating: worker.rating.toFixed(2),
                  reviews: worker.reviews,
                })}
              </p>
              <button
                type="button"
                onClick={() => handleSelectWorker(worker.id)}
                className="mt-auto inline-flex items-center justify-center brand-btn font-semibold px-4 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition"
              >
                {t("profile.choose")}
              </button>
            </article>
          ))}
        </section>
      </main>

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
                  trackEvent("Cookie_Decline_Click", {
                    consent: false,
                    source: "banner",
                  });
                }}
                className="bg-gray-300 text-black px-6 py-2 rounded-md font-semibold hover:opacity-90 transition w-full sm:w-auto"
              >
                {t("cookies.decline")}
              </button>
              <button
                onClick={() => {
                  acceptCookies();
                  trackEvent("Cookie_Accept_Click", {
                    consent: true,
                    source: "banner",
                  });
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