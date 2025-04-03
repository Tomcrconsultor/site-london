import React, { useEffect } from 'react';

interface PixelEventOptions {
  eventName: string;
  params?: Record<string, any>;
}

/**
 * Função para rastrear eventos no Facebook Pixel pelo lado do cliente
 */
export const trackPixelEvent = ({ eventName, params = {} }: PixelEventOptions) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, params);
  } else {
    console.log(`[DEV] Facebook Pixel Event: ${eventName}`, params);
  }
};

/**
 * Componente para rastrear cliques em elementos e disparar eventos do Pixel
 */
interface TrackClickProps {
  eventName: string;
  params?: Record<string, any>;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const TrackClick: React.FC<TrackClickProps> = ({
  eventName,
  params = {},
  children,
  className,
  style,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Rastrear o evento no Facebook Pixel
    trackPixelEvent({ eventName, params });
    
    // Chamar o manipulador de eventos personalizado, se fornecido
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div className={className} style={style} onClick={handleClick}>
      {children}
    </div>
  );
};

/**
 * Hook para inicializar o Facebook Pixel
 */
export const useInitPixel = (pixelId: string) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && pixelId) {
      // Verifica se o Facebook Pixel já foi inicializado
      if (!(window as any).fbq) {
        console.error('Facebook Pixel não está disponível no objeto window');
        return;
      }

      // Reinicializa o pixel
      (window as any).fbq('init', pixelId);
      
      // Rastreia a visualização da página inicial
      (window as any).fbq('track', 'PageView');
    }
  }, [pixelId]);
};

/**
 * Hook para rastrear visualizações de página em aplicações SPA (Single Page Application)
 */
export const usePageViewTracker = () => {
  useEffect(() => {
    // Função para rastrear visualizações de página
    const trackPageView = () => {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'PageView');
      }
    };

    // Rastrear visualização de página no carregamento inicial
    trackPageView();

    // Se estiver usando React Router ou outra biblioteca de roteamento,
    // você pode adicionar um listener para mudanças de rota aqui
    
    // Exemplo (descomentado se estiver usando react-router):
    // return history.listen(trackPageView);
    
  }, []);
};

/**
 * Tipos de eventos comuns do Facebook Pixel
 */
export const PixelEvents = {
  LEAD: 'Lead',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  CONTACT: 'Contact',
  SUBSCRIBE: 'Subscribe',
  VIEW_CONTENT: 'ViewContent',
  ADD_TO_CART: 'AddToCart',
  START_TRIAL: 'StartTrial',
  PAGE_VIEW: 'PageView',
}; 