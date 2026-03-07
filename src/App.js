import React, { Suspense, useEffect, useState, lazy } from "react";

// Libraries
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Context
import GlobalContext from "./Context/Context";

// ─── Enfono Pages ──────────────────────────────────────
import EnfonoHome from "./Pages/Home/EnfonoHome";
import NotFoundPage from "./Pages/404";
import { initialCmsData } from "./Data/cms_data";

const EnfonoAbout = lazy(() => import("./Pages/About/EnfonoAbout"));
const EnfonoServices = lazy(() => import("./Pages/Services/EnfonoServices"));
const EnfonoServiceDetail = lazy(() => import("./Pages/Services/EnfonoServiceDetail"));
const EnfonoCaseStudies = lazy(() => import("./Pages/CaseStudies/EnfonoCaseStudies"));
const EnfonoContact = lazy(() => import("./Pages/Contact/EnfonoContact"));
const EnfonoAI = lazy(() => import("./Pages/AI/EnfonoAI"));
const EnfonoBrands = lazy(() => import("./Pages/Brands/EnfonoBrands"));
const EnfonoCareers = lazy(() => import("./Pages/Careers/EnfonoCareers"));
const EnfonoEvents = lazy(() => import("./Pages/Events/EnfonoEvents"));
const EnfonoBlogs = lazy(() => import("./Pages/Blogs/EnfonoBlogs"));
const BlogDetail = lazy(() => import("./Pages/Blogs/BlogDetail"));

// ─── Enfono Components ─────────────────────────────────
const EnfonoChatbot = lazy(() => import("./Components/EnfonoUI/EnfonoChatbot"));

// ─── Admin Pages ───────────────────────────────────────
const AdminLayout = lazy(() => import("./Components/Admin/AdminLayout"));
const AdminLogin = lazy(() => import("./Pages/Admin/AdminLogin"));
const AdminMFA = lazy(() => import("./Pages/Admin/AdminMFA"));
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const AdminSettings = lazy(() => import("./Pages/Admin/AdminSettings"));
const AdminCMS = lazy(() => import("./Pages/Admin/AdminCMS"));

// ─── Protected Route Component ─────────────────────────
const ProtectedRoute = ({ children }) => {
  const session = localStorage.getItem('enfono_admin_session');
  if (session !== 'valid') {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// ─── Auth Route Component ──────────────────────────────
// Redirects already authenticated users away from login pages
const AuthRoute = ({ children }) => {
  const session = localStorage.getItem('enfono_admin_session');
  const mfaVerified = localStorage.getItem('enfono_mfa_verified');
  if (session === 'valid' && mfaVerified === 'true') {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customModal, setCustomModal] = useState({ el: null, isOpen: false });
  const [cmsData, setCmsData] = useState(initialCmsData);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:8007' : `http://${window.location.hostname}:8007`;

  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/cms/enfono_cms_data`);
        if (res.ok) {
          const data = await res.json();
          const merged = { ...initialCmsData, ...data };
          setCmsData(merged);
          // Sync to localStorage for components still using it
          localStorage.setItem('enfono_cms_data', JSON.stringify(merged));
        }
      } catch (err) {
        console.error("CMS Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCmsData();
  }, []);

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
        cmsData,
        setCmsData
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
              <Route path="/services/:slug" element={<EnfonoServiceDetail />} />
              <Route path="/case-studies" element={<EnfonoCaseStudies />} />
              <Route path="/case-studies/:slug" element={<EnfonoCaseStudies />} />
              <Route path="/our-work" element={<EnfonoCaseStudies />} />
              <Route path="/our-work/:slug" element={<EnfonoCaseStudies />} />
              <Route path="/events" element={<EnfonoEvents />} />
              <Route path="/blogs" element={<EnfonoBlogs />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />
              <Route path="/contact" element={<EnfonoContact />} />
              <Route path="/ai-erp" element={<EnfonoAI />} />
              <Route path="/brands" element={<EnfonoBrands />} />
              <Route path="/careers" element={<EnfonoCareers />} />

              {/* ── Catch All ── */}
              <Route path="*" element={<NotFoundPage />} />

              {/* ── Admin Portal ── */}
              <Route
                path="/admin/login"
                element={
                  <AuthRoute>
                    <AdminLogin />
                  </AuthRoute>
                }
              />
              <Route
                path="/admin/mfa"
                element={
                  <AuthRoute>
                    <AdminMFA />
                  </AuthRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="content" element={<AdminCMS />} />
              </Route>

              {/* ── Catch All ── */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* Global AI Chatbot - Hidden in Admin Portal */}
            {!location.pathname.startsWith('/admin') && <EnfonoChatbot />}
          </Suspense>
        </AnimatePresence>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
