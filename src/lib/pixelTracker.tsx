import { useEffect } from 'react';
import { FB_EVENTS, sendServerEvent, EventData } from './facebookPixel';

// Eventos disponíveis do Facebook Pixel
export enum PixelEvents {
  PAGE_VIEW = 'PageView',
  LEAD = 'Lead',
  COMPLETE_REGISTRATION = 'CompleteRegistration',
  CONTACT = 'Contact',
  BUTTON_CLICK = 'ButtonClick',
  FORM_SUBMIT = 'FormSubmit'
}

// Interface para tipagem correta dos parâmetros de eventos
interface PixelEventOptions {
  eventName: string;
  params?: Record<string, any>;
  serverSide?: boolean;
  dataToHash?: string[];
}

/**
 * Inicializa o Facebook Pixel
 * @param pixelId ID do Facebook Pixel
 */
export function useInitPixel(pixelId: string) {
  useEffect(() => {
    if (!pixelId) {
      console.warn('[FB Pixel] ID do Pixel não fornecido.');
      return;
    }

    try {
      // Carrega o script do Facebook Pixel
      if (!window.fbq) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/pt_BR/fbevents.js';
        document.head.appendChild(script);

        // Inicializa o objeto fbq
        window.fbq = function() {
          // @ts-ignore
          window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
        };
        
        window.fbq.push = window.fbq;
        window.fbq.loaded = true;
        window.fbq.version = '2.0';
        window.fbq.queue = [];
      }

      // Inicializa o pixel
      window.fbq('init', pixelId);
      
      // Rastreia visualização de página inicial
      window.fbq('track', PixelEvents.PAGE_VIEW);
      
      console.log('[FB Pixel] Inicializado com sucesso:', pixelId);
    } catch (error) {
      console.error('[FB Pixel] Erro ao inicializar pixel:', error);
    }

    // Cleanup
    return () => {
      // Limpar script se necessário em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        const scripts = document.querySelectorAll('script[src*="fbevents.js"]');
        scripts.forEach(s => s.remove());
      }
    };
  }, [pixelId]);
}

/**
 * Função para rastrear eventos do Facebook Pixel
 * Suporta rastreamento do lado do cliente e servidor
 */
export function trackPixelEvent({ eventName, params = {}, serverSide = false, dataToHash = [] }: PixelEventOptions) {
  try {
    // Verifica se o evento é válido
    if (!eventName) {
      console.warn('[FB Pixel] Nome do evento não fornecido.');
      return;
    }

    // Rastreamento do lado do cliente
    if (typeof window !== 'undefined' && window.fbq) {
      // Verifica se é um evento padrão do Facebook
      const isStandardEvent = Object.values(PixelEvents).includes(eventName as PixelEvents);
      
      if (isStandardEvent) {
        window.fbq('track', eventName, params);
      } else {
        // Para eventos personalizados
        window.fbq('trackCustom', eventName, params);
      }
      
      console.log(`[FB Pixel] Evento cliente rastreado: ${eventName}`, params);
    }

    // Rastreamento do lado do servidor
    if (serverSide) {
      const eventData: EventData = {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: typeof window !== 'undefined' ? window.location.href : '',
        event_id: `${eventName}_${Date.now()}`,
        user_data: {},
        custom_data: { ...params },
        action_source: 'website'
      };

      // Enviar para o endpoint de Conversão API
      sendServerEvent(eventData, dataToHash)
        .then(() => console.log(`[FB Pixel] Evento servidor enviado: ${eventName}`))
        .catch(err => console.error(`[FB Pixel] Erro ao enviar evento servidor: ${err.message}`));
    }
  } catch (error) {
    console.error('[FB Pixel] Erro ao rastrear evento:', error);
  }
}

/**
 * Hook para adicionar evento de clique em botão com rastreamento
 * @param selector Seletor CSS para o botão
 * @param eventName Nome do evento para rastreamento
 * @param params Parâmetros adicionais do evento
 * @param serverSide Indica se o evento deve ser rastreado no servidor
 */
export function useButtonClickTracking(
  selector: string, 
  eventName: string = PixelEvents.BUTTON_CLICK, 
  params: Record<string, any> = {}, 
  serverSide: boolean = false
) {
  useEffect(() => {
    try {
      const elements = document.querySelectorAll(selector);
      
      if (elements.length === 0) {
        console.warn(`[FB Pixel] Nenhum elemento encontrado com o seletor: ${selector}`);
        return;
      }
      
      const handleClick = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const buttonText = target.innerText || target.textContent;
        const buttonId = target.id;
        const buttonClass = target.className;
        
        // Rastreia o clique no botão
        trackPixelEvent({
          eventName,
          params: {
            ...params,
            button_text: buttonText,
            button_id: buttonId || undefined,
            button_class: buttonClass || undefined,
            timestamp: new Date().toISOString()
          },
          serverSide
        });
      };
      
      // Adiciona listener para cada elemento
      elements.forEach(el => {
        el.addEventListener('click', handleClick);
      });
      
      // Limpa os listeners na desmontagem
      return () => {
        elements.forEach(el => {
          el.removeEventListener('click', handleClick);
        });
      };
    } catch (error) {
      console.error('[FB Pixel] Erro ao configurar rastreamento de clique:', error);
    }
  }, [selector, eventName, params, serverSide]);
}

export default { useInitPixel, trackPixelEvent, useButtonClickTracking, PixelEvents }; 