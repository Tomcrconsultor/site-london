#!/usr/bin/env node

/**
 * Script de teste para Instagram Real
 * Testa se as postagens reais estão funcionando
 */

const fetch = require('node-fetch');

async function testInstagramIntegration() {
  console.log('🧪 Testando integração Instagram...');
  
  try {
    // Testar scraping real
    console.log('📱 Testando scraping via proxy...');
    
    const username = 'londonschool_mogidascruzes';
    const proxy = 'https://api.allorigins.win/raw?url=';
    
    const response = await fetch(
      `${proxy}https://www.instagram.com/${username}/`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }
    );
    
    if (response.ok) {
      const html = await response.text();
      console.log('✅ Conexão bem-sucedida!');
      
      // Extrair dados básicos
      const match = html.match(/window\._sharedData = ({.*?});/);
      if (match) {
        console.log('📊 Dados encontrados no HTML!');
        
        // Salvar para análise
        const fs = require('fs');
        fs.writeFileSync('instagram-test.json', match[1]);
        console.log('💾 Dados salvos em instagram-test.json');
      }
    } else {
      console.log('❌ Falha na conexão:', response.status);
    }
    
  } catch (error) {
    console.log('❌ Erro:', error.message);
  }
}

// Executar teste
testInstagramIntegration();