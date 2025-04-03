import axios from 'axios';

// ID do Pixel do Facebook
const PIXEL_ID = '522729260880939';

interface EventData {
  event_name: string;
  event_time: number;
  event_source_url?: string;
  user_data: {
    client_ip_address?: string;
    client_user_agent?: string;
    fbp?: string;
    fbc?: string;
    em?: string;
    ph?: string;
    external_id?: string;
  };
  custom_data?: Record<string, any>;
  event_id?: string;
  action_source: 'website' | 'app' | 'phone_call' | 'email' | 'chat' | 'other';
}

/**
 * Função para enviar eventos do Facebook Pixel pelo servidor
 * https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api
 */
export async function sendServerEvent({
  eventName,
  userData,
  customData,
  eventId,
  requestData,
}: {
  eventName: string;
  userData: {
    email?: string;
    phone?: string;
    externalId?: string;
  };
  customData?: Record<string, any>;
  eventId?: string;
  requestData?: {
    ipAddress?: string;
    userAgent?: string;
    fbp?: string;
    fbc?: string;
    sourceUrl?: string;
  };
}) {
  try {
    // Obter o token de acesso do seu sistema (armazenado de forma segura)
    // Este token deve ser criado no Facebook Business Manager
    const accessToken = process.env.FACEBOOK_API_ACCESS_TOKEN;
    
    if (!accessToken) {
      console.warn('Facebook API Access Token não encontrado. Eventos de servidor não serão enviados.');
      return;
    }

    const eventData: EventData = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: requestData?.sourceUrl,
      user_data: {
        client_ip_address: requestData?.ipAddress,
        client_user_agent: requestData?.userAgent,
        fbp: requestData?.fbp,
        fbc: requestData?.fbc,
        em: userData.email ? hashData(userData.email) : undefined,
        ph: userData.phone ? hashData(userData.phone) : undefined,
        external_id: userData.externalId,
      },
      custom_data: customData,
      event_id: eventId,
      action_source: 'website',
    };

    // Enviar para a API de Conversões do Facebook
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${PIXEL_ID}/events`,
      {
        data: [eventData],
        access_token: accessToken,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao enviar evento para o Facebook:', error);
    // Não propagar o erro para não interromper o fluxo da aplicação
    return { success: false, error };
  }
}

/**
 * Função para hashear dados sensíveis antes de enviar ao Facebook
 * Normalmente, você usaria uma biblioteca como SHA-256 aqui
 * Esta é uma implementação básica para exemplo
 */
function hashData(data: string): string {
  if (!data) return '';
  
  try {
    // Na implementação real, você usaria:
    // return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
    
    // Aqui, apenas retornamos um placeholder
    return data.trim().toLowerCase();
  } catch (e) {
    console.warn('Erro ao hashear dados:', e);
    return '';
  }
}

/**
 * Função para capturar os parâmetros FBP e FBC dos cookies
 */
export function getFacebookCookieParams(cookies: Record<string, string> = {}) {
  try {
    return {
      fbp: cookies._fbp,
      fbc: cookies._fbc,
    };
  } catch (e) {
    console.warn('Erro ao obter parâmetros de cookies do Facebook:', e);
    return { fbp: undefined, fbc: undefined };
  }
}

/**
 * Eventos mais comuns do Facebook Pixel
 */
export const FB_EVENTS = {
  LEAD: 'Lead',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  CONTACT: 'Contact',
  SUBSCRIBE: 'Subscribe',
  VIEW_CONTENT: 'ViewContent',
  ADD_TO_CART: 'AddToCart',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  PURCHASE: 'Purchase',
}; 