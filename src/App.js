import React, { Suspense, useEffect, useState, lazy } from "react";

// Libraries
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Context
import GlobalContext from "./Context/Context";

// ─── Enfono Pages ──────────────────────────────────────
import EnfonoHome from "./Pages/Home/EnfonoHome";
import NotFoundPage from "./Pages/404";

const EnfonoAbout = lazy(() => import("./Pages/About/EnfonoAbout"));
const EnfonoServices = lazy(() => import("./Pages/Services/EnfonoServices"));
const EnfonoCaseStudies = lazy(() => import("./Pages/CaseStudies/EnfonoCaseStudies"));
// Tools page removed
const EnfonoContact = lazy(() => import("./Pages/Contact/EnfonoContact"));
const EnfonoAI = lazy(() => import("./Pages/AI/EnfonoAI"));
const EnfonoBrands = lazy(() => import("./Pages/Brands/EnfonoBrands"));
const EnfonoCareers = lazy(() => import("./Pages/Careers/EnfonoCareers"));

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customModal, setCustomModal] = useState({ el: null, isOpen: false });
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setIsModalOpen(false);
    if (
      typeof window.closeMobileMenu === "function" &&
      document.body.classList.contains("navbar-collapse-show")
    ) {
      window.closeMobileMenu();
    }
  }, [location]);

  return (
    <GlobalContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        footerHeight,
        setFooterHeight,
        isModalOpen,
        setIsModalOpen,
        customModal,
        setCustomModal,
      }}
    >
      <div className="App" style={{ "--header-height": `${headerHeight}px` }}>
        <AnimatePresence mode="wait">
          <Suspense fallback={
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: '100vh', background: '#0F1923', flexDirection: 'column', gap: '16px'
            }}>
              <div style={{
                width: '48px', height: '48px', border: '3px solid rgba(196,147,63,0.3)',
                borderTop: '3px solid #C4933F', borderRadius: '50', animation: 'spin 1s linear infinite'
              }}></div>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Loading...</span>
            </div>
          }>
            <Routes>
              {/* ── Enfono Main Routes ── */}
              <Route path="/" element={<EnfonoHome />} />
              <Route path="/about" element={<EnfonoAbout />} />
              <Route path="/services" element={<EnfonoServices />} />
              <Route path="/services/:slug" element={<EnfonoServices />} />
              <Route path="/case-studies" element={<EnfonoCaseStudies />} />
              <Route path="/case-studies/:slug" element={<EnfonoCaseStudies />} />
              {/* Tools page removed */}
              <Route path="/contact" element={<EnfonoContact />} />
              <Route path="/ai-erp" element={<EnfonoAI />} />
              <Route path="/brands" element={<EnfonoBrands />} />
              <Route path="/careers" element={<EnfonoCareers />} />

              {/* ── Catch All ── */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
