import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Index from './pages/Index';
import PoliticaDePrivacidade from './components/PoliticaDePrivacidade';
import TermosDeUso from './components/TermosDeUso';
import { useInitPixel, trackPixelEvent, PixelEvents } from './lib/pixelTracker';

// Componente para rastrear mudanças de rota
function RouteChangeTracker() {
  const location = useLocation();
  
  useEffect(() => {
    try {
      // Rastreia visualização de página a cada mudança de rota
      if (typeof window !== 'undefined' && window.fbq) {
        trackPixelEvent({ 
          eventName: PixelEvents.PAGE_VIEW,
          params: { 
            path: location.pathname,
            search: location.search,
            title: document.title 
          }
        });
      }
    } catch (error) {
      console.warn('[FB Pixel] Erro ao rastrear mudança de rota:', error);
    }
  }, [location]);
  
  return null;
}

function App() {
  // Inicializa o Facebook Pixel com o ID
  useInitPixel('522729260880939');

  // Adiciona evento de histórico de navegação para página única (SPA)
  useEffect(() => {
    try {
      const handleRouteChange = () => {
        // Rastreia visualização de página a cada mudança de rota manual (botões voltar/avançar)
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', PixelEvents.PAGE_VIEW);
        }
      };

      // Adiciona listener para mudanças de história
      window.addEventListener('popstate', handleRouteChange);
      
      return () => {
        // Remove listener na limpeza
        window.removeEventListener('popstate', handleRouteChange);
      };
    } catch (error) {
      console.warn('[FB Pixel] Erro ao configurar rastreamento de rotas:', error);
      // Não propagar o erro para não quebrar a aplicação
    }
  }, []);

  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
        <Route path="/termos-de-uso" element={<TermosDeUso />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// Adiciona definição de tipos para o objeto global window
declare global {
  interface Window {
    fbq: any;
  }
}

export default App;
