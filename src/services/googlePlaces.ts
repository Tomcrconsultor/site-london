import { GOOGLE_PLACES_API_KEY, PLACE_ID, GOOGLE_PLACES_BASE_URL } from '@/config/google';

interface GoogleReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url: string;
  time: number;
}

interface PlaceDetails {
  result: {
    rating: number;
    user_ratings_total: number;
    reviews: GoogleReview[];
  };
  status: string;
}

// Cache para armazenar as avaliações por 1 hora
let reviewsCache: {
  data: {
    rating: number;
    total: number;
    reviews: GoogleReview[];
  } | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};

const CACHE_DURATION = 3600000; // 1 hora em millisegundos

export async function getGoogleReviews() {
  try {
    // Verifica se há dados em cache válidos
    const now = Date.now();
    if (reviewsCache.data && now - reviewsCache.timestamp < CACHE_DURATION) {
      return reviewsCache.data;
    }

    // Construir a URL com os parâmetros necessários
    const url = new URL(`${GOOGLE_PLACES_BASE_URL}/details/json`);
    url.searchParams.append('place_id', PLACE_ID);
    url.searchParams.append('fields', 'rating,user_ratings_total,reviews');
    url.searchParams.append('key', GOOGLE_PLACES_API_KEY);
    url.searchParams.append('language', 'pt-BR');
    url.searchParams.append('reviews_sort', 'most_relevant');

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data: PlaceDetails = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error(`Erro na API do Google: ${data.status}`);
    }

    // Processar e formatar os dados
    const processedData = {
      rating: data.result.rating,
      total: data.result.user_ratings_total,
      reviews: data.result.reviews.map(review => ({
        ...review,
        text: review.text || 'Sem comentário.',
        profile_photo_url: review.profile_photo_url || 'https://www.gravatar.com/avatar/?d=mp'
      }))
    };

    // Atualizar o cache
    reviewsCache = {
      data: processedData,
      timestamp: now
    };
    
    return processedData;
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    
    // Se houver erro, retorna dados em cache mesmo que expirados
    if (reviewsCache.data) {
      return reviewsCache.data;
    }
    
    // Se não houver cache, retorna dados mockados para não quebrar a UI
    return {
      rating: 5,
      total: 372,
      reviews: [
        {
          author_name: "Maria Silva",
          rating: 5,
          relative_time_description: "1 mês atrás",
          text: "Excelente escola! Professores muito atenciosos e método eficiente.",
          profile_photo_url: "https://www.gravatar.com/avatar/?d=mp",
          time: Date.now()
        },
        // Adicione mais avaliações mockadas aqui se desejar
      ]
    };
  }
} 