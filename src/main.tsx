import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Função para limpar cache do service worker caso exista
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) {
      registration.unregister().then(() => {
        console.log('Service Worker desregistrado com sucesso');
        window.location.reload(true);
      });
    }
  }).catch(error => {
    console.warn('Erro ao tentar limpar Service Worker:', error);
  });

  // Limpar caches
  if (window.caches) {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        caches.delete(cacheName);
        console.log(`Cache ${cacheName} removido`);
      });
    });
  }
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = createRoot(rootElement)

// Verifica se é um acesso novo ou refresh
const lastUpdated = localStorage.getItem('lastUpdated');
const currentVersion = '1.0.1'; // Altere isso a cada deploy para forçar atualização
const currentTime = new Date().getTime();

if (!lastUpdated || lastUpdated !== currentVersion) {
  localStorage.setItem('lastUpdated', currentVersion);
  localStorage.setItem('updateTime', currentTime.toString());
  console.log('Nova versão detectada, limpando caches...');
  
  // Forçar recarregamento após 1 segundo se for necessário
  if (lastUpdated) {
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  }
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
