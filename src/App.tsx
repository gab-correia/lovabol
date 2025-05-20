
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import PatrimonioPage from "./pages/PatrimonioPage";
import HoldingsPage from "./pages/HoldingsPage";
import HoldingDetalhesPage from "./pages/HoldingDetalhesPage";
import CriarHoldingPage from "./pages/CriarHoldingPage";
import SucessorioPage from "./pages/SucessorioPage";
import DocumentosPage from "./pages/DocumentosPage";
import MetasPage from "./pages/MetasPage";
import ComunicacaoPage from "./pages/ComunicacaoPage";
import ConfiguracoesPage from "./pages/ConfiguracoesPage";
import DocumentScannerPage from "./pages/DocumentScannerPage";
import ClientesPage from "./pages/ClientesPage";
import ClientePerfilPage from "./pages/ClientePerfilPage";
import DashboardConsultorPage from "./pages/DashboardConsultorPage";
import DocumentosConsultorPage from "./pages/DocumentosConsultorPage";
import AdicionarDocumentoPage from "./pages/AdicionarDocumentoPage";
// import any other pages...

// Layout Components
import Navigation from "./components/layout/Navigation";
import MobileLayout from "./components/layout/MobileLayout";
import { useIsMobile } from "./hooks/use-mobile";

// Initialize react-query client
const queryClient = new QueryClient();

// Auth check component
const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/login" && !location.pathname.startsWith("/recuperar-senha")) {
      navigate("/login");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  if (!isLoggedIn && location.pathname !== "/login" && !location.pathname.startsWith("/recuperar-senha")) {
    return null;
  }

  return <>{children}</>;
};

// Wrap with mobile check and layout
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return <MobileLayout>{children}</MobileLayout>;
  }
  
  return (
    <div className="flex">
      <Navigation isSidebarOpen={true} />
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthCheck>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LayoutWrapper><Index /></LayoutWrapper>} />
            <Route path="/patrimonio" element={<LayoutWrapper><PatrimonioPage /></LayoutWrapper>} />
            <Route path="/holdings" element={<LayoutWrapper><HoldingsPage /></LayoutWrapper>} />
            <Route path="/holdings/:id" element={<LayoutWrapper><HoldingDetalhesPage /></LayoutWrapper>} />
            <Route path="/holdings/criar" element={<LayoutWrapper><CriarHoldingPage /></LayoutWrapper>} />
            <Route path="/sucessorio" element={<LayoutWrapper><SucessorioPage /></LayoutWrapper>} />
            <Route path="/documentos" element={<LayoutWrapper><DocumentosPage /></LayoutWrapper>} />
            <Route path="/metas" element={<LayoutWrapper><MetasPage /></LayoutWrapper>} />
            <Route path="/comunicacao" element={<LayoutWrapper><ComunicacaoPage /></LayoutWrapper>} />
            <Route path="/configuracoes" element={<LayoutWrapper><ConfiguracoesPage /></LayoutWrapper>} />
            <Route path="/document-scanner" element={<LayoutWrapper><DocumentScannerPage /></LayoutWrapper>} />
            
            {/* Consultant Routes */}
            <Route path="/dashboard-consultor" element={<LayoutWrapper><DashboardConsultorPage /></LayoutWrapper>} />
            <Route path="/clientes" element={<LayoutWrapper><ClientesPage /></LayoutWrapper>} />
            <Route path="/cliente/:id/perfil" element={<LayoutWrapper><ClientePerfilPage /></LayoutWrapper>} />
            <Route path="/documentos-consultor" element={<LayoutWrapper><DocumentosConsultorPage /></LayoutWrapper>} />
            <Route path="/adicionar-documento" element={<LayoutWrapper><AdicionarDocumentoPage /></LayoutWrapper>} />
            
            {/* Redirect index to dashboard for logged-in users */}
            <Route path="/" element={<Navigate to="/dashboard-consultor" replace />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthCheck>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
