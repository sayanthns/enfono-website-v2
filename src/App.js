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
const EnfonoContact = lazy(() => import("./Pages/Contact/EnfonoContact"));
const EnfonoAI = lazy(() => import("./Pages/AI/EnfonoAI"));
const EnfonoBrands = lazy(() => import("./Pages/Brands/EnfonoBrands"));
const EnfonoCareers = lazy(() => import("./Pages/Careers/EnfonoCareers"));

// ─── Admin Pages ───────────────────────────────────────
const AdminLayout = lazy(() => import("./Components/Admin/AdminLayout"));
const AdminLogin = lazy(() => import("./Pages/Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const AdminSettings = lazy(() => import("./Pages/Admin/AdminSettings"));
const AdminCMS = lazy(() => import("./Pages/Admin/AdminCMS"));

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
              height: '100vh', background: 'var(--t-bg-primary)', flexDirection: 'column', gap: '16px'
            }}>
              <div style={{
                width: '48px', height: '48px', border: '3px solid var(--t-border)',
                borderTop: '3px solid var(--t-accent)', borderRadius: '50%', animation: 'spin 1s linear infinite'
              }}></div>
              <span style={{ color: 'var(--t-text-muted)', fontSize: '14px' }}>Loading...</span>
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
              <Route path="/contact" element={<EnfonoContact />} />
              <Route path="/ai-erp" element={<EnfonoAI />} />
              <Route path="/brands" element={<EnfonoBrands />} />
              <Route path="/careers" element={<EnfonoCareers />} />

              {/* ── Admin Portal ── */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="content" element={<AdminCMS />} />
              </Route>

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
