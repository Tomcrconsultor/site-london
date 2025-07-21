/**
 * Serviço oficial de integração com Instagram Basic Display API
 * Utiliza apenas métodos oficiais aprovados pelo Instagram
 */

interface InstagramPost {
  id: string;
  permalink: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  caption?: string;
  timestamp: string;
  username: string;
  like_count?: number;
  comments_count?: number;
}

interface InstagramApiResponse {
  data: any[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

class InstagramService {
  private readonly INSTAGRAM_USERNAME = 'londonschool_mogidascruzes';
  private readonly API_BASE = 'https://graph.instagram.com';
  private readonly BASIC_DISPLAY_API = 'https://graph.instagram.com/me/media';
  
  // Cache para evitar muitas requisições
  private cache: {
    posts: InstagramPost[];
    timestamp: number;
    expiresIn: number;
  } | null = null;
  
  // Cache válido por 30 minutos
  private readonly CACHE_DURATION = 30 * 60 * 1000;
  
  // Método principal para buscar postagens via API oficial
  async getRecentPosts(limit: number = 6): Promise<InstagramPost[]> {
    // Verificar cache primeiro
    if (this.isCacheValid()) {
      console.log('Usando cache do Instagram');
      return this.cache!.posts.slice(0, limit);
    }
    
    try {
      const posts = await this.fetchFromOfficialAPI(limit);
      this.updateCache(posts);
      return posts;
    } catch (error) {
      console.error('Erro na API oficial do Instagram:', error);
      // Se cache existir, usar mesmo expirado
      if (this.cache) {
        console.warn('Usando cache expirado devido a erro na API');
        return this.cache.posts.slice(0, limit);
      }
      // Último recurso: dados exemplo
      return this.getExamplePosts(limit);
    }
  }

  private async fetchFromOfficialAPI(limit: number): Promise<InstagramPost[]> {
    const accessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
    
    if (!accessToken) {
      throw new Error('VITE_INSTAGRAM_ACCESS_TOKEN não configurado. Consulte SETUP_INSTAGRAM.md');
    }

    // Buscar dados do usuário primeiro para validar token
    await this.validateToken(accessToken);

    // Buscar postagens com todos os campos necessários
    const response = await fetch(
      `${this.BASIC_DISPLAY_API}?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&access_token=${accessToken}&limit=${limit}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Instagram API Error ${response.status}: ${errorData.error?.message || 'Erro desconhecido'}`);
    }

    const data: InstagramApiResponse = await response.json();
    return this.transformInstagramData(data.data || []);
  }

  private async validateToken(accessToken: string): Promise<void> {
    const response = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Token inválido: ${errorData.error?.message || 'Verifique o token no arquivo .env'}`);
    }
  }

  private transformInstagramData(data: any[]): InstagramPost[] {
    return data.map(post => ({
      id: post.id,
      permalink: post.permalink,
      media_url: post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url,
      media_type: post.media_type as 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM',
      caption: post.caption || '',
      timestamp: post.timestamp,
      username: this.INSTAGRAM_USERNAME,
      like_count: 0, // Basic Display API não fornece likes
      comments_count: 0 // Basic Display API não fornece comentários
    }));
  }

  // Métodos de cache
  private isCacheValid(): boolean {
    if (!this.cache) return false;
    return Date.now() - this.cache.timestamp < this.CACHE_DURATION;
  }

  private updateCache(posts: InstagramPost[]): void {
    this.cache = {
      posts,
      timestamp: Date.now(),
      expiresIn: this.CACHE_DURATION
    };
  }

  // Limpar cache manualmente se necessário
  public clearCache(): void {
    this.cache = null;
  }

  private getExamplePosts(limit: number): InstagramPost[] {
    // Posts de exemplo para desenvolvimento/fallback
    // NOTA: Use apenas quando a API oficial não estiver disponível
    const examplePosts: InstagramPost[] = [
      {
        id: 'example_1',
        permalink: `https://www.instagram.com/${this.INSTAGRAM_USERNAME}`,
        media_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=500&fit=crop',
        media_type: 'IMAGE',
        caption: 'Aula especial de conversação! 🗣️ Nossos alunos praticando inglês com professores nativos. #londonschool #inglesmogi',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        username: this.INSTAGRAM_USERNAME,
        like_count: 127,
        comments_count: 23
      },
      {
        id: 'example_2',
        permalink: `https://www.instagram.com/${this.INSTAGRAM_USERNAME}`,
        media_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=500&fit=crop',
        media_type: 'IMAGE',
        caption: 'Nossos alunos conquistando fluência! 💪 Resultados reais com método comprovado. #inglesfluente #londonschoolmogi',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        username: this.INSTAGRAM_USERNAME,
        like_count: 89,
        comments_count: 15
      },
      {
        id: 'example_3',
        permalink: `https://www.instagram.com/${this.INSTAGRAM_USERNAME}`,
        media_url: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500&h=500&fit=crop',
        media_type: 'IMAGE',
        caption: 'Ambiente inspirador para aprender! ✨ Conforto e tecnologia para seu melhor aprendizado. #londonschool #mogidascruzes',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        username: this.INSTAGRAM_USERNAME,
        like_count: 156,
        comments_count: 31
      },
      {
        id: 'example_4',
        permalink: `https://www.instagram.com/${this.INSTAGRAM_USERNAME}`,
        media_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=500&fit=crop',
        media_type: 'IMAGE',
        caption: 'Certificação internacional válida! 📜 Prepare-se para o mundo com nosso método exclusivo.',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        username: this.INSTAGRAM_USERNAME,
        like_count: 203,
        comments_count: 42
      },
      {
        id: 'example_5',
        permalink: `https://www.instagram.com/${this.INSTAGRAM_USERNAME}`,
        media_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
        media_type: 'IMAGE',
        caption: 'Turma avançada em ação! 🎯 Debates e discussões em inglês com total confiança.',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        username: this.INSTAGRAM_USERNAME,
        like_count: 95,
        comments_count: 18
      },
      {
        id: 'example_6',
        permalink: `https://www.instagram.com/${this.INSTAGRAM_USERNAME}`,
        media_url: 'https://images.unsplash.com/photo-1491841573337-6e7d09e29b3c?w=500&h=500&fit=crop',
        media_type: 'IMAGE',
        caption: 'Workshop de business English! 💼 Preparação para o mercado internacional.',
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        username: this.INSTAGRAM_USERNAME,
        like_count: 142,
        comments_count: 27
      }
    ];

    return examplePosts.slice(0, limit);
  }

  // Método para diagnóstico e configuração
  async getIntegrationStatus(): Promise<{
    hasToken: boolean;
    tokenValid: boolean | null;
    cacheStatus: string;
    lastUpdate: string | null;
    nextSteps: string[];
  }> {
    const accessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
    const hasToken = !!accessToken;
    let tokenValid: boolean | null = null;
    
    if (hasToken) {
      try {
        await this.validateToken(accessToken);
        tokenValid = true;
      } catch {
        tokenValid = false;
      }
    }
    
    const cacheStatus = this.isCacheValid() ? 'válido' : 'expirado/inexistente';
    const lastUpdate = this.cache ? new Date(this.cache.timestamp).toLocaleString('pt-BR') : null;
    
    const nextSteps: string[] = [];
    if (!hasToken) {
      nextSteps.push('Configurar VITE_INSTAGRAM_ACCESS_TOKEN no arquivo .env');
      nextSteps.push('Consultar SETUP_INSTAGRAM.md para instruções completas');
    } else if (!tokenValid) {
      nextSteps.push('Token inválido ou expirado - renovar token de acesso');
    } else {
      nextSteps.push('Integração funcionando corretamente!');
    }
    
    return {
      hasToken,
      tokenValid,
      cacheStatus,
      lastUpdate,
      nextSteps
    };
  }

  // Método para obter instruções de configuração
  getSetupInstructions(): string {
    return `
# CONFIGURAÇÃO INSTAGRAM BASIC DISPLAY API

## Passo 1: Criar aplicativo Facebook
1. Acesse: https://developers.facebook.com/
2. Clique em "Meus aplicativos" > "Criar aplicativo"
3. Escolha "Negócios" como tipo de aplicativo
4. Adicione "Instagram Basic Display" como produto

## Passo 2: Configurar Instagram Basic Display
1. Vá para Instagram Basic Display > Configuração básica
2. Em "Instagram App ID" e "Instagram App Secret", note os valores
3. Adicione sua URL em "OAuth Redirect URIs":
   - Para desenvolvimento: http://localhost:5173
   - Para produção: https://seudominio.com

## Passo 3: Obter token de acesso
1. Use o Facebook Graph API Explorer
2. Selecione seu aplicativo
3. Gere um token de usuário do Instagram
4. Use a ferramenta de debug para converter em token de longa duração

## Passo 4: Configurar no projeto
Crie arquivo .env na raiz do projeto:
\`\`\`
VITE_INSTAGRAM_ACCESS_TOKEN=seu_token_aqui
\`\`\`

## Verificação
Execute no console do browser:
\`\`\`javascript
window.instagramService.getIntegrationStatus().then(console.log)
\`\`\`
    `;
  }
}

export const instagramService = new InstagramService();
export type { InstagramPost };