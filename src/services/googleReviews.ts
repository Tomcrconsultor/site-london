interface GoogleReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url: string;
}

// Dados das avaliações reais da London School
const REVIEWS_DATA = {
  rating: 5.0,
  total: 372,
  reviews: [
    {
      author_name: "Juliane Gomes",
      rating: 5,
      text: "Ótima escola!! Sempre procurei uma escola que me proporcionasse experiência didática e prática, e com a apostila e a professora de outro país me ajudam muito. Viso melhorar meu inglês para poder viajar para fora a trabalho e a lazer, e com o ensino da London creio que vou conseguir!",
      profile_photo_url: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      author_name: "Jossana Gleice",
      rating: 5,
      text: "Melhor escola de inglês da região, o ensino é extremamente bom e com os melhores professores. Super recomendo!",
      profile_photo_url: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      author_name: "marina silva",
      rating: 5,
      text: "Minha experiência com a London School está sendo ótima. Os professores são excelentes, atenciosos e compreencivos.",
      profile_photo_url: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      author_name: "Jennifer Tavares",
      rating: 5,
      text: "Uma escola maravilhosa, ótimo atendimento. Meu filho está evoluindo muito com as aulas.",
      profile_photo_url: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      author_name: "Richards Christian",
      rating: 5,
      text: "Tive uma excelente experiência na London. O meu professor é qualificado e dedicado, proporcionando um ambiente de aprendizado excepcional.",
      profile_photo_url: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      author_name: "Vitor Ferreira",
      rating: 5,
      text: "Ótima instituição de ensino. Horários flexíveis para quem não tem tempo. Métodos didáticos com fácil aprendizado.",
      profile_photo_url: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      author_name: "Rafael Almeida",
      rating: 5,
      text: "Excelente escola com professores muito bem preparados e atenciosos.",
      profile_photo_url: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      author_name: "grazi mantilla",
      rating: 5,
      text: "Bom método de ensino, ótimos professores. Profissionais que procuram compreender a necessidade do aluno e ajudar.",
      profile_photo_url: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      author_name: "Julia Farias",
      rating: 5,
      text: "Está sendo uma ótima experiência, ótimos professores, excelente aprendizado!",
      profile_photo_url: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      author_name: "Andressa Dos Santos Braz",
      rating: 5,
      text: "Minha filha gosta bastante da professora e das aulas também!",
      profile_photo_url: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      author_name: "Claudio Hernandes Martinez",
      rating: 5,
      text: "Como escola, estão muito bem. Sua direção, coordenação e atendimento são excelentes.",
      profile_photo_url: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      author_name: "Gabriella Bezerra do Nascimento",
      rating: 5,
      text: "Ótimos professores! Todos os colaboradores da escola são corteses e sempre dispostos a ajudar os alunos a aprender mais e melhor.",
      profile_photo_url: "https://www.gravatar.com/avatar/?d=mp"
    }
  ]
};

export async function getGoogleReviews() {
  return REVIEWS_DATA;
} 