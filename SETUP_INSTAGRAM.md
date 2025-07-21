# 🎯 Configuração Instagram Real - London School

## Como ativar as postagens reais do Instagram

### Opção 1: Instagram Basic Display API (Recomendado)

1. **Criar App no Facebook**
   ```bash
   # Acesse: https://developers.facebook.com/
   # Crie um novo aplicativo para negócios
   # Adicione o produto "Instagram Basic Display"
   ```

2. **Configuração do Instagram**
   ```bash
   # No Facebook Developers:
   # 1. Vá para Instagram Basic Display > Configuração básica
   # 2. Adicione sua URL do site nas configurações válidas
   # 3. Configure o redirecionamento OAuth
   ```

3. **Obter o Token**
   ```bash
   # Use o Facebook Graph Explorer:
   # 1. Acesse: https://developers.facebook.com/tools/explorer/
   # 2. Selecione seu aplicativo
   # 3. Obtenha o token de acesso de usuário
   # 4. Converta para token de longa duração (60 dias)
   ```

4. **Configurar no projeto**
   ```bash
   # Copie .env.example para .env
   cp .env.example .env
   
   # Adicione seu token no .env:
   VITE_INSTAGRAM_ACCESS_TOKEN=IGQWR...seu_token_aqui
   ```

### Opção 2: RapidAPI (Mais rápida)

1. **Assinar RapidAPI**
   ```bash
   # Acesse: https://rapidapi.com/
   # Procure por "Instagram API"
   # Assine o plano básico (grátis com limites)
   ```

2. **Obter chave API**
   ```bash
   # Copie sua chave da API da RapidAPI
   VITE_RAPIDAPI_KEY=sua_chave_aqui
   ```

### Opção 3: Solução Instantânea (Funciona agora)

Para testes imediatos, o sistema já está configurado para:
- Buscar postagens reais via scraping público
- Atualizar automaticamente a cada 30 minutos
- Exibir fotos, curtidas e comentários reais
- Fallback para imagens do Unsplash se necessário

## 🚀 Ativação Rápida

1. **Deploy na Vercel/Netlify** (recomendado)
   - Adicione as variáveis de ambiente
   - O sistema buscará automaticamente as postagens

2. **Verificação**
   ```bash
   npm run build
   npm run dev
   # Acesse http://localhost:5173 e veja as postagens reais
   ```

## 📱 Como funciona automaticamente

O sistema:
- ✅ Busca as 6 postagens mais recentes
- ✅ Atualiza a cada 30 minutos (cache)
- ✅ Exibe fotos, curtidas e comentários reais
- ✅ Tratamento de erros inteligente
- ✅ Fallback garantido

## 🔧 Configuração de produção

Para produção real, basta adicionar uma das seguintes variáveis:

```bash
# Instagram Basic Display API (recomendado)
VITE_INSTAGRAM_ACCESS_TOKEN=seu_token_real

# Ou RapidAPI
VITE_RAPIDAPI_KEY=sua_chave_rapidapi
```

## 📞 Suporte

Se precisar de ajuda para configurar:
1. Abra uma issue no GitHub
2. Entre em contato via WhatsApp
3. Verifique os logs no console do navegador

O sistema está pronto para usar com postagens reais do Instagram @londonschool_mogidascruzes!