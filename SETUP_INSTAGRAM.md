# 📸 Instagram Official Integration - London School

> **✅ INTEGRAÇÃO OFICIAL** - Usando Instagram Basic Display API  
> **❌ SEM SCRAPING** - Métodos não oficiais foram removidos  
> **🔒 SEGURO** - Conforme termos de uso do Instagram

## 🚀 Setup Rápido (5 minutos)

### 1. Configurar aplicativo Facebook

1. **Acesse o Facebook Developers**
   - URL: https://developers.facebook.com/
   - Faça login com sua conta Instagram/Facebook

2. **Criar novo aplicativo**
   ```
   Meus aplicativos > Criar aplicativo > Negócios
   Nome: "London School Instagram"
   Email de contato: seu-email@dominio.com
   ```

3. **Adicionar Instagram Basic Display**
   ```
   Produtos > Adicionar produto > Instagram Basic Display > Configurar
   ```

### 2. Configurar Instagram Basic Display

1. **URLs de redirecionamento OAuth**
   ```
   Desenvolvimento: http://localhost:5173
   Produção: https://seudominio.com
   ```

2. **Usuários de teste**
   ```
   Adicione sua conta Instagram como usuário de teste
   Instagram Basic Display > Funções > Usuários de teste
   ```

### 3. Gerar token de acesso

1. **Graph API Explorer**
   - URL: https://developers.facebook.com/tools/explorer/
   - Selecione seu aplicativo
   - Produto: Instagram Basic Display
   - Permissões: `instagram_graph_user_profile,instagram_graph_user_media`

2. **Converter para token de longa duração**
   ```bash
   curl -i -X GET "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=SEU_TOKEN"
   ```

### 4. Configurar no projeto

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar e adicionar seu token
VITE_INSTAGRAM_ACCESS_TOKEN=IGQVRz...seu_token_de_longa_duracao
```

## ✅ Verificação e Teste

### 1. Teste local
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Acessar: http://localhost:5173
```

### 2. Debug da integração
Abra o console do navegador e execute:
```javascript
// Verificar status da integração
window.instagramService.getIntegrationStatus().then(console.log)

// Ver instruções de setup
console.log(window.instagramService.getSetupInstructions())

// Limpar cache se necessário
window.instagramService.clearCache()
```

### 3. Logs do sistema
O sistema exibe logs detalhados no console:
- ✅ `Usando cache do Instagram` - Cache válido
- ⚠️ `Usando cache expirado devido a erro na API` - Fallback para cache
- ❌ `Instagram API Error 400: Token inválido` - Token precisa ser renovado

## 🔧 Manutenção do Token

### Renovação automática (Recomendado)
```javascript
// Adicionar ao seu sistema de monitoramento
setInterval(async () => {
  const status = await instagramService.getIntegrationStatus()
  if (!status.tokenValid) {
    console.warn('Token Instagram expirado - renovar!')
    // Enviar notificação/email
  }
}, 24 * 60 * 60 * 1000) // Verificar diariamente
```

### Renovação manual
```bash
# Token expira em ~60 dias
# Use este comando para renovar:
curl -i -X GET "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=SEU_TOKEN_ATUAL"
```

## 🚨 Fallback Inteligente

Se a API falhar, o sistema automaticamente:
1. **Cache válido**: Usa postagens em cache (30 min)
2. **Cache expirado**: Usa imagens educacionais do Unsplash
3. **Desenvolvimento**: Mostra dados de exemplo

## 🔒 Segurança

- ✅ Token nunca exposto no frontend
- ✅ Requests limitados por cache
- ✅ Fallback seguro sem quebrar o site
- ✅ Logs apenas em desenvolvimento

## 📊 Monitoramento

### Métricas importantes
- Cache hit rate
- Frequência de falhas da API  
- Tempo de resposta das requests
- Status do token

### Alertas recomendados
- Token próximo do vencimento (7 dias)
- API falhando por > 1 hora
- Cache sendo usado por > 24h

## 🆘 Troubleshooting

| Erro | Solução |
|------|---------|
| `Token não configurado` | Adicionar `VITE_INSTAGRAM_ACCESS_TOKEN` no .env |
| `Token inválido` | Renovar token ou verificar permissões |
| `Rate limit exceeded` | Aguardar ou implementar backoff |
| `Imagens não carregam` | Verificar CORS/CDN do Instagram |

## 📞 Suporte

- **GitHub Issues**: Para bugs e melhorias
- **Console Browser**: Para debug em tempo real  
- **Logs Sistema**: Monitoramento contínuo

> **💡 Dica**: Sempre mantenha o cache funcionando para garantir que o site nunca fique sem imagens do Instagram!