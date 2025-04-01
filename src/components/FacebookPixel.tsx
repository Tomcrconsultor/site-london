import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: any;
  }
}

const FB_PIXEL_ID = '522729260880939';

const FacebookPixel = () => {
  useEffect(() => {
    // Verifica se o script do Facebook Pixel já foi carregado
    if (!window.fbq) {
      // Adiciona o código base do Facebook Pixel
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${FB_PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      // Adiciona o noscript para fallback
      const noscript = document.createElement('noscript');
      const img = document.createElement('img');
      img.height = 1;
      img.width = 1;
      img.style.display = 'none';
      img.src = `https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`;
      noscript.appendChild(img);
      document.head.appendChild(noscript);
    }

    // Rastreia visualização de página em cada mudança de rota
    window.fbq('track', 'PageView');
  }, []);

  return null;
};

export default FacebookPixel; 