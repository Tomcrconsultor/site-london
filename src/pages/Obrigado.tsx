import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { saveLead, FormData } from '../services/leads';

interface PerguntaQuiz {
  id: number;
  pergunta: string;
  opcoes: string[];
  tipoAluno?: string[]; // Para quais tipos de aluno essa pergunta se aplica
}

interface ResultadoPlano {
  nome: string;
  descricao: string;
  preco: string;
  recomendado: boolean;
  destaque: boolean;
  mensagemWhatsApp: string;
  caracteristicas: string[];
  detalhesAulas?: string;
  beneficiosExclusivos?: string[];
}

interface Testemunho {
  nome: string;
  cargo: string;
  texto: string;
  imagem: string;
}

export default function Obrigado() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Estados para o quiz
  const [mostrarQuiz, setMostrarQuiz] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [respostas, setRespostas] = useState<Record<number, string>>({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [planosRecomendados, setPlanosRecomendados] = useState<ResultadoPlano[]>([]);
  const [tipoAlunoSelecionado, setTipoAlunoSelecionado] = useState<string | null>(null);
  const [perguntasFiltradas, setPerguntasFiltradas] = useState<PerguntaQuiz[]>([]);

  // Contador para criar senso de urgência
  const [vagasDisponiveis, setVagasDisponiveis] = useState(7);
  
  const testemunhos: Testemunho[] = [
    {
      nome: "Maria Silva",
      cargo: "Profissional de Marketing",
      texto: "O método de ensino transformou meu inglês em apenas 3 meses. Consegui uma promoção no trabalho graças à minha nova fluência!",
      imagem: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      nome: "João Mendes",
      cargo: "Desenvolvedor de Software",
      texto: "Depois de tentar vários cursos, finalmente encontrei um que realmente funciona. O plano personalizado fez toda a diferença.",
      imagem: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      nome: "Ana Costa",
      cargo: "Mãe de Pedro (9 anos)",
      texto: "Meu filho adorou as aulas! A abordagem lúdica mantém ele engajado e ele já consegue formar frases completas em inglês.",
      imagem: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];
  
  const perguntas: PerguntaQuiz[] = [
    {
      id: 1,
      pergunta: "Quem vai estudar inglês?",
      opcoes: ["Eu mesmo (adulto)", "Meu filho/filha (criança)", "Ambos"]
    },
    {
      id: 2,
      pergunta: "Qual é o seu principal objetivo com o inglês?",
      opcoes: ["Viagens", "Trabalho/Carreira", "Estudos acadêmicos", "Comunicação geral"],
      tipoAluno: ["Eu mesmo (adulto)", "Ambos"]
    },
    {
      id: 3,
      pergunta: "Qual é o seu objetivo para o inglês do seu filho?",
      opcoes: ["Preparação para o futuro acadêmico", "Desenvolvimento de habilidades sociais", "Vantagem competitiva futura", "Exposição a novas culturas"],
      tipoAluno: ["Meu filho/filha (criança)", "Ambos"]
    },
    {
      id: 4,
      pergunta: "Você tem pessoas interessadas em estudar com você?",
      opcoes: ["Sim, tenho amigos/familiares interessados", "Não, estudarei sozinho"],
      tipoAluno: ["Eu mesmo (adulto)"]
    },
    {
      id: 5,
      pergunta: "Quantos filhos você deseja matricular nas aulas de inglês?",
      opcoes: ["Apenas 1", "2 filhos", "3 ou mais filhos"],
      tipoAluno: ["Meu filho/filha (criança)", "Ambos"]
    },
    {
      id: 6,
      pergunta: "Seu(s) filho(s) tem amigos que gostariam de estudar inglês juntos?",
      opcoes: ["Sim, eles têm amigos interessados", "Não, estudariam apenas com outras crianças da turma"],
      tipoAluno: ["Meu filho/filha (criança)", "Ambos"]
    },
    {
      id: 7,
      pergunta: "Qual a faixa etária do(s) seu(s) filho(s)?",
      opcoes: ["Entre 6 e 9 anos", "Entre 10 e 12 anos", "Entre 13 e 15 anos", "Idades variadas"],
      tipoAluno: ["Meu filho/filha (criança)", "Ambos"]
    },
    {
      id: 8,
      pergunta: "Você e seus familiares gostariam de estudar juntos?",
      opcoes: ["Sim, queremos aulas em família", "Não, preferimos aulas separadas"],
      tipoAluno: ["Ambos"]
    },
    {
      id: 9,
      pergunta: "Quanto tempo por semana você pode dedicar aos estudos?",
      opcoes: ["Menos de 3 horas", "Entre 3 e 5 horas", "Mais de 5 horas"],
      tipoAluno: ["Eu mesmo (adulto)", "Ambos"]
    },
    {
      id: 10,
      pergunta: "Quanto tempo por semana seu(s) filho(s) pode(m) dedicar aos estudos?",
      opcoes: ["1-2 horas por semana", "3-4 horas por semana", "Mais de 4 horas por semana"],
      tipoAluno: ["Meu filho/filha (criança)", "Ambos"]
    },
    {
      id: 11,
      pergunta: "Qual é o seu nível atual de inglês?",
      opcoes: ["Iniciante", "Intermediário", "Avançado"],
      tipoAluno: ["Eu mesmo (adulto)", "Ambos"]
    },
    {
      id: 12,
      pergunta: "Qual é o nível de inglês do(s) seu(s) filho(s)?",
      opcoes: ["Nenhum contato anterior", "Básico (aprendeu na escola/mídia)", "Intermediário (já estudou antes)"],
      tipoAluno: ["Meu filho/filha (criança)", "Ambos"]
    }
  ];

  const planos: ResultadoPlano[] = [
    {
      nome: "Curso Individual - VIP",
      descricao: "Para você que busca atenção exclusiva e resultados rápidos",
      preco: "R$ 997/mês",
      recomendado: false,
      destaque: true,
      mensagemWhatsApp: "Olá! Tenho interesse no Curso Individual - VIP. Gostaria de mais informações.",
      detalhesAulas: "4 aulas por semana (60 minutos cada)",
      caracteristicas: [
        "Aulas particulares 1-para-1",
        "Material exclusivo e personalizado",
        "Horários 100% flexíveis",
        "Professores nativos certificados",
        "Foco em suas necessidades específicas"
      ],
      beneficiosExclusivos: [
        "Acompanhamento semanal de progresso",
        "Acesso a plataforma premium de exercícios",
        "Material didático digital e físico",
        "Suporte via WhatsApp 7 dias por semana"
      ]
    },
    {
      nome: "Curso em Grupo",
      descricao: "Aprenda com outras pessoas e pratique conversação em grupo",
      preco: "R$ 397/mês",
      recomendado: false,
      destaque: false,
      mensagemWhatsApp: "Olá! Tenho interesse no Curso em Grupo. Gostaria de mais informações.",
      detalhesAulas: "2 aulas por semana (90 minutos cada)",
      caracteristicas: [
        "Turmas de até 6 alunos",
        "Material didático completo",
        "Ambiente colaborativo e dinâmico",
        "Foco em conversação e prática",
        "Professores experientes"
      ],
      beneficiosExclusivos: [
        "Atividades em grupo interativas",
        "Prática de conversação real",
        "Troca de experiências com colegas",
        "Ambiente motivador de aprendizado"
      ]
    }
  ];

  useEffect(() => {
    // Dispara evento de conversão do Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Contato via WhatsApp',
        content_category: 'Conversão'
      });
    }
  }, []);

  // Filtra as perguntas relevantes com base no tipo de aluno selecionado
  useEffect(() => {
    if (tipoAlunoSelecionado) {
      // Filtra as perguntas, excluindo a primeira pergunta (id: 1)
      const perguntasRelevantes = perguntas.filter(pergunta => 
        pergunta.id !== 1 && // Exclui a primeira pergunta
        (pergunta.tipoAluno?.includes(tipoAlunoSelecionado) || false)
      );
      console.log('Tipo de aluno selecionado:', tipoAlunoSelecionado);
      console.log('Perguntas filtradas:', perguntasRelevantes.length);
      
      // Define as perguntas filtradas
      setPerguntasFiltradas(perguntasRelevantes);
      // Resetar para a primeira pergunta filtrada quando o tipo de aluno muda
      setEtapaAtual(0);
    } else {
      // Inicialmente, mostra apenas a primeira pergunta
      setPerguntasFiltradas([perguntas[0]]);
    }
  }, [tipoAlunoSelecionado]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    try {
      await saveLead(formData);
      setEnviado(true);
      setMostrarQuiz(true);
      setVagasDisponiveis(prev => Math.max(prev - 1, 0));
      
      // Dispara evento adicional do Facebook Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'CompleteRegistration', {
          content_name: 'Formulário de Contato',
          status: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setErro(error instanceof Error ? error.message : 'Erro ao enviar o formulário');
      
      // Dispara evento de erro do Facebook Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'FormError', {
          content_name: 'Formulário de Contato',
          error_message: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRespostaQuiz = (resposta: string) => {
    console.log('Respondendo pergunta:', etapaAtual, 'com resposta:', resposta);
    
    // Atualiza as respostas
    const perguntaAtual = perguntasFiltradas[etapaAtual];
    setRespostas(prev => ({
      ...prev,
      [perguntaAtual.id]: resposta
    }));

    // Se for a primeira pergunta (quem vai estudar inglês)
    if (perguntaAtual.id === 1) {
      console.log('Definindo tipo de aluno para:', resposta);
      setTipoAlunoSelecionado(resposta);
      return; // Permite que o useEffect lide com a mudança de etapa
    }

    // Avança para a próxima pergunta
    if (etapaAtual < perguntasFiltradas.length - 1) {
      console.log('Avançando para próxima pergunta:', etapaAtual + 1);
      setEtapaAtual(prev => prev + 1);
    } else {
      console.log('Finalizando quiz e mostrando resultados');
      determinarPlanosRecomendados();
      setMostrarResultado(true);
      
      // Rastrear término do quiz no Facebook Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'QuizCompleted', {
          content_name: 'Quiz de Plano Personalizado',
          num_questions: perguntasFiltradas.length
        });
      }
    }
  };

  const determinarPlanosRecomendados = () => {
    // Reset de recomendações anteriores
    planos.forEach(plano => plano.recomendado = false);
    
    // Clone dos planos para não alterar o array original
    let resultado = [...planos];
    
    // Quem vai estudar?
    const tipoAluno = respostas[1];
    
    if (tipoAluno === "Eu mesmo (adulto)") {
      // Para adultos
      const temGrupo = respostas[4] === "Sim, tenho amigos/familiares interessados";
      const objetivo = respostas[2];
      const nivel = respostas[11];
      
      if (temGrupo) {
        // Recomenda curso em grupo para quem quer estudar com outras pessoas
        resultado[1].recomendado = true; // Curso em Grupo
      } else if (nivel === "Avançado" || objetivo === "Trabalho/Carreira") {
        // Recomenda VIP para avançados ou foco na carreira
        resultado[0].recomendado = true; // Curso Individual - VIP
      } else {
        // Para outros casos de adultos
        resultado[1].recomendado = true; // Curso em Grupo como padrão
      }
    } else if (tipoAluno === "Meu filho/filha (criança)") {
      // Para crianças
      const quantosFilhos = respostas[5];
      const temAmigos = respostas[6] === "Sim, eles têm amigos interessados";
      
      if (quantosFilhos !== "Apenas 1" || temAmigos) {
        // Se tem mais de um filho ou tem amigos interessados, recomenda grupo
        resultado[1].recomendado = true; // Curso em Grupo
      } else {
        // Para crianças individuais
        resultado[0].recomendado = true; // Curso Individual - VIP
      }
    } else {
      // Para "Ambos"
      const estudarJuntos = respostas[8] === "Sim, queremos aulas em família";
      
      if (estudarJuntos) {
        resultado[1].recomendado = true; // Curso em Grupo
      } else {
        resultado[0].recomendado = true; // Curso Individual - VIP
      }
    }

    setPlanosRecomendados(resultado);
  };

  const abrirWhatsApp = (mensagem: string) => {
    const numeroPadrao = "5511966251372"; 
    const mensagemCodificada = encodeURIComponent(mensagem);
    window.open(`https://wa.me/${numeroPadrao}?text=${mensagemCodificada}`, '_blank');
    
    // Rastreia evento do Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: 'Interesse em Plano',
        content_category: 'WhatsApp'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {!enviado ? (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-indigo-800 mb-3 tracking-tight">
                Parabéns pelo seu primeiro passo!
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Você está a um passo de <span className="font-bold text-indigo-600">descobrir o plano ideal</span> para alcançar a fluência no inglês. Complete seu cadastro para acessar o teste exclusivo.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 bg-indigo-700 p-8 text-white">
                  <h2 className="text-2xl font-bold mb-4">Conheça seu plano personalizado</h2>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <svg className="h-6 w-6 text-indigo-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Método exclusivo com 97% de aprovação</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <svg className="h-6 w-6 text-indigo-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Aulas com professores nativos e certificados</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <svg className="h-6 w-6 text-indigo-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Resultados garantidos ou seu dinheiro de volta</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-indigo-800 rounded-lg mb-6">
                    <p className="font-bold text-lg mb-1">Vagas limitadas!</p>
                    <p className="text-indigo-200">Restam apenas <span className="text-yellow-300 font-bold">{vagasDisponiveis} vagas</span> para as próximas turmas.</p>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-bold mb-3 text-xl">O que dizem nossos alunos:</h3>
                    <div className="bg-indigo-600 p-4 rounded-lg">
                      <p className="italic text-indigo-100 mb-2">"{testemunhos[0].texto}"</p>
                      <div className="flex items-center">
                        <img src={testemunhos[0].imagem} alt={testemunhos[0].nome} className="h-8 w-8 rounded-full mr-2" />
                        <div>
                          <p className="font-bold text-sm">{testemunhos[0].nome}</p>
                          <p className="text-xs text-indigo-200">{testemunhos[0].cargo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 p-8">
                  <div className="mb-6">
                    <div className="inline-block bg-yellow-100 text-yellow-800 font-bold px-4 py-2 rounded-full text-sm mb-4">
                      Teste exclusivo e gratuito
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Complete seu cadastro</h2>
                    <p className="text-gray-600 mb-4">Preencha para descobrir seu plano personalizado</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Digite seu nome completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="seu.email@exemplo.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone (WhatsApp)
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        required
                        pattern="[0-9]{10,11}"
                        title="Digite apenas números, DDD + número"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="11987654321 (apenas números)"
                      />
                    </div>

                    {erro && (
                      <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                              Erro ao enviar formulário
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                              <p>{erro}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ${
                        loading ? 'opacity-80 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processando...
                        </>
                      ) : (
                        'DESCOBRIR MEU PLANO IDEAL'
                      )}
                    </button>
                    
                    <p className="text-xs text-gray-500 text-center mt-3">
                      Seus dados estão seguros e nunca serão compartilhados. Ao se cadastrar, você concorda com nossa <Link to="/politica-de-privacidade" className="text-indigo-600 hover:text-indigo-800">Política de Privacidade</Link>.
                    </p>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-bold text-center text-gray-800 mb-8">Histórias de Sucesso</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {testemunhos.map((testemunho, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-600 mb-4">"{testemunho.texto}"</p>
                    <div className="flex items-center">
                      <img src={testemunho.imagem} alt={testemunho.nome} className="h-10 w-10 rounded-full mr-3" />
                      <div>
                        <p className="font-semibold">{testemunho.nome}</p>
                        <p className="text-gray-500 text-sm">{testemunho.cargo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {mostrarQuiz && !mostrarResultado ? (
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="bg-indigo-600 py-6 px-8">
                  <h2 className="text-2xl font-bold text-white text-center">
                    Descubra seu plano perfeito de inglês
                  </h2>
                  <p className="text-indigo-100 text-center mt-2">
                    Responda algumas perguntas e revelaremos o plano ideal para você
                  </p>
                </div>
                
                <div className="p-8">
                  <div className="mb-8">
                    <div className="flex justify-between mb-2 text-xs text-gray-500">
                      <span>Início</span>
                      <span className="font-medium text-indigo-600">Pergunta {etapaAtual + 1} de {perguntasFiltradas.length}</span>
                      <span>Resultado</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${((etapaAtual + 1) / (perguntasFiltradas.length + 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      {perguntasFiltradas[etapaAtual]?.pergunta}
                    </h3>
                    <div className="space-y-4">
                      {perguntasFiltradas[etapaAtual]?.opcoes.map((opcao, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 flex justify-between items-center group"
                          onClick={() => handleRespostaQuiz(opcao)}
                        >
                          <span className="text-lg">{opcao}</span>
                          <span className="h-6 w-6 rounded-full bg-white border-2 border-gray-300 group-hover:border-indigo-500 flex items-center justify-center">
                            <svg className="h-4 w-4 text-indigo-500 opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    {etapaAtual > 0 ? (
                      <button
                        onClick={() => setEtapaAtual(prev => prev - 1)}
                        className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                      >
                        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Voltar
                      </button>
                    ) : (
                      <div></div>
                    )}
                    
                    <button
                      onClick={() => {
                        determinarPlanosRecomendados();
                        setMostrarResultado(true);
                      }}
                      className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Pular para resultados
                    </button>
                  </div>
                </div>
              </div>
            ) : mostrarResultado ? (
              <div>
                <div className="text-center mb-12">
                  <div className="inline-block bg-green-100 text-green-800 font-bold px-4 py-2 rounded-full text-sm mb-4">
                    Análise concluída com sucesso!
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                    Seu plano personalizado
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Com base nas suas respostas, selecionamos o plano <span className="text-indigo-600 font-bold">mais adequado</span> para o seu perfil e objetivos de aprendizado.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {planosRecomendados.map((plano, index) => (
                    <div 
                      key={index}
                      className={`rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                        plano.recomendado ? 'ring-4 ring-indigo-500 ring-opacity-50' : ''
                      } ${plano.destaque ? 'bg-gradient-to-br from-indigo-50 to-blue-50' : 'bg-white'}`}
                    >
                      {plano.recomendado && (
                        <div className="bg-indigo-600 text-white text-center py-3 px-4 font-bold uppercase text-sm tracking-wider">
                          Recomendado para o seu perfil
                        </div>
                      )}
                      <div className="p-8">
                        <h3 className={`text-2xl font-bold ${plano.destaque ? 'text-indigo-700' : 'text-gray-800'} mb-2`}>
                          {plano.nome}
                        </h3>
                        <p className="text-gray-600 mb-4">{plano.descricao}</p>
                        
                        {plano.detalhesAulas && (
                          <div className="bg-indigo-50 rounded-lg p-3 mb-4 inline-block">
                            <div className="flex items-center">
                              <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="font-medium text-indigo-700">{plano.detalhesAulas}</span>
                            </div>
                          </div>
                        )}
                        
                        <p className={`text-3xl font-bold mb-6 ${plano.destaque ? 'text-indigo-600' : 'text-gray-800'}`}>
                          {plano.preco}
                        </p>
                        
                        <div className="border-t border-gray-200 pt-6 mb-6"></div>
                        
                        <h4 className="font-bold text-gray-800 mb-3">Inclui:</h4>
                        <ul className="mb-6 space-y-3">
                          {plano.caracteristicas.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {plano.beneficiosExclusivos && (
                          <>
                            <h4 className="font-bold text-gray-800 mb-3">Benefícios exclusivos:</h4>
                            <ul className="mb-8 space-y-3">
                              {plano.beneficiosExclusivos.map((item, i) => (
                                <li key={i} className="flex items-start">
                                  <svg className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                  </svg>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                        
                        <button
                          onClick={() => abrirWhatsApp(plano.mensagemWhatsApp)}
                          className={`w-full py-4 px-4 rounded-lg text-white font-bold text-base flex items-center justify-center ${
                            plano.destaque ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'
                          } transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" />
                          </svg>
                          QUERO ESTE PLANO
                        </button>
                        
                        {plano.destaque && (
                          <div className="mt-4 text-center">
                            <span className="text-sm text-indigo-600 font-medium">Vagas limitadas! Apenas {vagasDisponiveis} disponíveis</span>
                          </div>
                        )}
                      </div>
                      
                      {plano.recomendado && (
                        <div className="bg-indigo-50 p-4 border-t border-indigo-100">
                          <p className="text-indigo-700 text-sm font-medium">
                            ✨ Este plano está perfeitamente alinhado com suas necessidades e objetivos!
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Ainda tem dúvidas?</h3>
                    <p className="text-gray-600 mt-2">
                      Nossos consultores estão prontos para ajudar você a escolher o plano perfeito
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={() => abrirWhatsApp("Olá! Acabei de fazer o teste e gostaria de conversar com um consultor para escolher o melhor plano para mim.")}
                      className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.52 3.449C12.831-3.984.521 1.57.521 11.976c0 2.12.548 4.148 1.595 5.98L.522 23.986l6.19-1.949c1.747.968 3.704 1.472 5.683 1.472 9.142 0 15.306-8.257 12.995-14.024-1.331-3.986-4.585-6.949-8.87-6.036z" />
                      </svg>
                      Falar com um consultor
                    </button>
                    
                    <button
                      onClick={() => {
                        setMostrarResultado(false);
                        setEtapaAtual(0);
                        setRespostas({});
                      }}
                      className="inline-flex items-center justify-center px-6 py-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Refazer o teste
                    </button>
                  </div>
                </div>
                
                <div className="bg-indigo-50 rounded-xl p-8 border border-indigo-100">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                      <h3 className="text-xl font-bold text-indigo-800 mb-3">Nossa Garantia</h3>
                      <p className="text-indigo-700 mb-4">
                        Oferecemos 7 dias de garantia em todos os nossos planos. Se você não ficar satisfeito por qualquer motivo, devolvemos 100% do seu investimento.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-indigo-700">Sem burocracia</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-indigo-700">Reembolso rápido</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-indigo-700">Sem perguntas</span>
                        </li>
                      </ul>
                    </div>
                    <div className="md:w-1/3 text-center">
                      <div className="inline-block bg-white p-4 rounded-full mb-2">
                        <svg className="h-16 w-16 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-indigo-800 font-bold">100% Satisfação Garantida</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="inline-block mx-auto mb-6">
                  <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Dados enviados com sucesso!
                </h2>
                <p className="text-gray-600 mb-8">
                  Obrigado por compartilhar suas informações. Estamos empolgados para ajudar você!
                </p>
                
                <button
                  onClick={() => setMostrarQuiz(true)}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Descobrir meu plano ideal agora
                </button>
                
                <div className="mt-8 text-sm text-gray-500">
                  <p>Ou se preferir, <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">volte para a página inicial</Link></p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 