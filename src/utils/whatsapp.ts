import { NavigateFunction } from 'react-router-dom';

export const WHATSAPP_NUMBER = "5511984291000";
export const DEFAULT_MESSAGE = "Olá! Gostaria de saber mais informações sobre os cursos da London School.";

export const redirectToWhatsAppWithCallback = (
  message: string = DEFAULT_MESSAGE,
  navigate: NavigateFunction
) => {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  
  // Temporariamente desabilitado enquanto a página de obrigado não está finalizada
  // navigate('/obrigado');
  
  // Log para desenvolvimento
  console.log('Redirecionamento para página de obrigado está temporariamente desabilitado');
}; 