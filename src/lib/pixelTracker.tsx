import React, { useEffect } from 'react';

interface PixelEventOptions {
  eventName: string;
  params?: Record<string, any>;
}

/**
 * Função para rastrear eventos no Facebook Pixel pelo lado do cliente
 */
export const trackPixelEvent = ({ eventName, params = {} }: PixelEventOptions) => {
  try {
    if (typeof window !== 'undefined' && window?.fbq) {
      window.fbq('track', eventName, params);
    } else {
      console.log(`[DEV] Facebook Pixel Event: ${eventName}`, params);
    }
  } catch (error) {
    console.warn('[FB Pixel] Erro ao rastrear evento:', error);
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
    try {
      // Rastrear o evento no Facebook Pixel
      trackPixelEvent({ eventName, params });
      
      // Chamar o manipulador de eventos personalizado, se fornecido
      if (onClick) {
        onClick(e);
      }
    } catch (error) {
      console.warn('[FB Pixel] Erro ao processar clique:', error);
      // Garantir que o onClick original seja chamado mesmo em caso de erro
      if (onClick) onClick(e);
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
    try {
      if (typeof window !== 'undefined' && pixelId) {
        // Se o Facebook Pixel não foi carregado no objeto window, apenas loga um aviso
        if (!window.fbq) {
          console.warn('Facebook Pixel não disponível no objeto window. Verifique se o script foi carregado corretamente.');
          return;
        }

        // Reinicializa o pixel
        window.fbq('init', pixelId);
        
        // Rastreia a visualização da página inicial
        window.fbq('track', 'PageView');
      }
    } catch (error) {
      console.warn('[FB Pixel] Erro ao inicializar o pixel:', error);
    }
  }, [pixelId]);
};

/**
 * Hook para rastrear visualizações de página em aplicações SPA (Single Page Application)
 */
export const usePageViewTracker = () => {
  useEffect(() => {
    try {
      // Função para rastrear visualizações de página
      const trackPageView = () => {
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'PageView');
        }
      };

      // Rastrear visualização de página no carregamento inicial
      trackPageView();

      // Se estiver usando React Router ou outra biblioteca de roteamento,
      // você pode adicionar um listener para mudanças de rota aqui
      
      // Exemplo (descomentado se estiver usando react-router):
      // return history.listen(trackPageView);
    } catch (error) {
      console.warn('[FB Pixel] Erro ao rastrear visualização de página:', error);
    }
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