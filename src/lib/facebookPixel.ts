/**
 * Implementação do Facebook Pixel com suporte para Conversions API (servidor)
 * e tipagem TS completa para rastreamento de eventos
 */

// ID do seu Pixel e token de acesso da API de Conversões do Facebook
const PIXEL_ID = '522729260880939';
const FB_API_VERSION = 'v18.0';
const FB_ACCESS_TOKEN = process.env.REACT_APP_FB_ACCESS_TOKEN || '';
const FB_API_URL = `https://graph.facebook.com/${FB_API_VERSION}/${PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`;

// Interface para dados de eventos
export interface EventData {
  event_name: string;
  event_time: number;
  event_source_url: string;
  event_id: string;
  user_data: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
    external_id?: string;
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
    [key: string]: any;
  };
  custom_data: Record<string, any>;
  action_source: 'website' | 'app' | 'email' | 'other';
}

// Eventos comuns do Facebook Pixel
export const FB_EVENTS = {
  PAGE_VIEW: 'PageView',
  LEAD: 'Lead',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  CONTACT: 'Contact',
  BUTTON_CLICK: 'ButtonClick',
  FORM_SUBMIT: 'FormSubmit',
  SEARCH: 'Search',
  VIEW_CONTENT: 'ViewContent',
  ADD_TO_CART: 'AddToCart',
  PURCHASE: 'Purchase',
};

/**
 * Envio de eventos para a API do Facebook (Conversions API)
 * @param eventData Dados do evento a ser enviado
 * @param dataToHash Campos que devem ser criptografados antes do envio
 * @returns Promise com o resultado do envio
 */
export async function sendServerEvent(eventData: EventData, dataToHash: string[] = []): Promise<any> {
  try {
    // Se não tiver token de acesso, registra aviso e não envia
    if (!FB_ACCESS_TOKEN) {
      console.warn('[FB Pixel] Token de acesso não configurado para Conversions API.');
      return;
    }

    // Completa os dados do usuário com informações do navegador
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const clientIp = await getClientIp();
    
    // Captura cookies do Facebook 
    const { fbc, fbp } = getFacebookCookieParams();

    // Adiciona dados do usuário ao evento
    eventData.user_data = {
      ...eventData.user_data,
      client_ip_address: clientIp,
      client_user_agent: userAgent,
      fbc,
      fbp
    };

    // Hash dados sensíveis antes do envio
    await hashSensitiveData(eventData, dataToHash);

    // Formata os dados para o formato esperado pela API
    const formattedData = {
      data: [eventData]
    };

    // Envia o evento para o Facebook
    const response = await fetch(FB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`Erro ao enviar evento: ${result.error?.message || response.statusText}`);
    }
    
    return result;
  } catch (error) {
    console.error('[FB Pixel] Erro ao enviar evento para o servidor:', error);
    throw error;
  }
}

/**
 * Gera um ID único para o evento
 * @returns String com ID do evento
 */
export function generateEventId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Obtém os parâmetros de cookie do Facebook (fbc e fbp)
 * @returns Objeto com parâmetros fbc e fbp
 */
export function getFacebookCookieParams() {
  if (typeof document === 'undefined') {
    return { fbc: '', fbp: '' };
  }

  // Procura por cookies do Facebook
  const cookies = document.cookie.split('; ');
  let fbc = '';
  let fbp = '';

  // Extrai fbp cookie
  const fbpCookie = cookies.find(c => c.startsWith('_fbp='));
  if (fbpCookie) {
    fbp = fbpCookie.split('=')[1];
  }

  // Extrai fbc cookie
  const fbcCookie = cookies.find(c => c.startsWith('_fbc='));
  if (fbcCookie) {
    fbc = fbcCookie.split('=')[1];
  } else {
    // Se não encontrar _fbc cookie, tenta extrair do parâmetro URL fbclid
    try {
      const url = new URL(window.location.href);
      const fbclid = url.searchParams.get('fbclid');
      if (fbclid) {
        // Formato: fb.1.{timestamp}.{fbclid}
        fbc = `fb.1.${Date.now()}.${fbclid}`;
      }
    } catch (e) {
      console.warn('[FB Pixel] Erro ao processar fbclid:', e);
    }
  }

  return { fbc, fbp };
}

/**
 * Aplica hash SHA-256 aos dados sensíveis
 * @param eventData Dados do evento
 * @param fieldsToHash Lista de campos para aplicar hash
 */
async function hashSensitiveData(eventData: EventData, fieldsToHash: string[]): Promise<void> {
  if (!fieldsToHash || fieldsToHash.length === 0) {
    return;
  }

  try {
    // Para cada campo que precisa de hash nos dados de usuário
    for (const field of fieldsToHash) {
      if (eventData.user_data[field]) {
        const value = String(eventData.user_data[field]).trim().toLowerCase();
        if (value) {
          eventData.user_data[field] = await hashData(value);
        }
      }
    }
  } catch (error) {
    console.error('[FB Pixel] Erro ao aplicar hash nos dados:', error);
  }
}

/**
 * Aplica hash SHA-256 a uma string usando Web Crypto API
 * @param data String a ser hasheada
 * @returns String hasheada em formato hexadecimal
 */
export async function hashData(data: string): Promise<string> {
  if (!data) return '';
  
  try {
    // Normaliza e converte para minúsculas
    const normalized = data.trim().toLowerCase();
    
    // Converte para array de bytes
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(normalized);
    
    // Aplica SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    
    // Converte para hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  } catch (error) {
    console.error('[FB Pixel] Erro ao gerar hash:', error);
    return '';
  }
}

/**
 * Obtém o endereço IP do cliente
 * @returns IP do cliente como string
 */
export async function getClientIp(): Promise<string> {
  try {
    // Em ambiente de cliente, tenta obter o IP através de um serviço público
    // Isto é uma simulação - em produção, o IP deve ser capturado pelo servidor
    if (typeof window !== 'undefined') {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    }
    return '';
  } catch (error) {
    console.warn('[FB Pixel] Não foi possível obter o IP do cliente:', error);
    return '';
  }
} 