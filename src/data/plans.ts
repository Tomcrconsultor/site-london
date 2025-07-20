export interface Plan {
  categoria: string;
  modalidade?: string;
  aulasMes?: number;
  mensalidade: number;
  taxaMatricula: number;
  multaCancelamento?: number;
  apostila: number;
  livro: number;
  duracao: string;
  cargaSemanalMinutos?: number;
  minutosPorAula?: number;
  horarios: string[] | string;
  observacao?: string;
  extras?: string;
}

export const ADULT_PLANS_16_PLUS: Plan[] = [
  {
    categoria: 'Turma – Iniciante',
    modalidade: 'Presencial',
    mensalidade: 240,
    taxaMatricula: 49,
        apostila: 0,
    livro: 140,
    duracao: '3 anos',
    cargaSemanalMinutos: 100,
    horarios: ['Seg 18:20‑20:00', 'Sáb 09:00‑10:40']
  },
  {
    categoria: 'Turma – Iniciante',
    modalidade: 'Online',
    mensalidade: 180,
    taxaMatricula: 49    apostila: 0,
    livro: 140,
    duracao: '3 anos',
    cargaSemanalMinutos: 100,
    horarios: ['Ter 19:00‑19:50', 'Qui 19:00‑19:50']
  },
  {
    categoria: 'Turma – Andamento',
    modalidade: 'Presencial',
    mensalidade: 170,
    taxaMatricula: 49,
    multaCancelamento: 170,
    apostila: 0,
    livro: 140,
    duracao: '2 anos',
    cargaSemanalMinutos: 100,
    horarios: ['Seg 19:00‑20:40', 'Sáb 11:00‑12:40', 'Qua 18:20‑20:00'],
    observacao: 'Rodízio de professores – até 6 alunos'
  },
  {
    categoria: 'Turma – Andamento',
    modalidade: 'Online',
    mensalidade: 170,
    taxaMatricula: 49,
    multaCancelamento: 170,
    apostila: 0,
    livro: 140,
    duracao: '2 anos',
    cargaSemanalMinutos: 100,
    horarios: ['Seg 20:00‑20:50', 'Qua 20:00‑20:50']
  },
  {
    categoria: 'VIP – Individual',
    aulasMes: 4,
    mensalidade: 300,
    taxaMatricula: 49,
    apostila: 0,
    livro: 140,
    duracao: '4 anos',
    minutosPorAula: 50,
    horarios: 'Flexível (presencial ou online)',
    extras: 'Método direto, foco em conversação, professores nativos'
  },
  {
    categoria: 'VIP – Individual',
    aulasMes: 8,
    mensalidade: 520,
    taxaMatricula: 49,
    apostila: 0,
    livro: 140,
    duracao: '3 anos',
    minutosPorAula: 50,
    horarios: 'Flexível (presencial ou online)',
    extras: 'Método direto, foco em conversação, professores nativos'
  },
  {
    categoria: 'VIP – Individual',
    aulasMes: 12,
    mensalidade: 720,
    taxaMatricula: 49,
    apostila: 0,
    livro: 140,
    duracao: '2 anos',
    minutosPorAula: 50,
    horarios: 'Flexível (presencial ou online)',
    extras: 'Método direto, foco em conversação, professores nativos'
  },
  {
    categoria: 'VIP – Dupla',
    aulasMes: 4,
    mensalidade: 160,
    taxaMatricula: 49,
    apostila: 0,
    livro: 140,
    duracao: '4 anos',
    minutosPorAula: 50,
    horarios: 'Flexível',
    extras: 'Aulas particulares em dupla'
  },
  {
    categoria: 'VIP – Dupla',
    aulasMes: 8,
    mensalidade: 260,
    taxaMatricula: 49,
    apostila: 0,
    livro: 140,
    duracao: '3 anos',
    minutosPorAula: 50,
    horarios: 'Flexível',
    extras: 'Aulas particulares em dupla'
  },
  {
    categoria: 'VIP – Dupla',
    aulasMes: 12,
    mensalidade: 360,
    taxaMatricula: 49,
    apostila: 0,
    livro: 140,
    duracao: '2 anos',
    minutosPorAula: 50,
    horarios: 'Flexível',
    extras: 'Aulas particulares em dupla'
  }
];

export const KIDS_TEENS_PLANS_UNDER_16: Plan[] = [
  {
    categoria: 'Turma – Iniciante – Kids (7‑11)',
    mensalidade: 140,
    taxaMatricula: 49,
    multaCancelamento: 140,
    apostila: 0,
    livro: 140,
    duracao: '3 anos',
    cargaSemanalMinutos: 100,
    horarios: ['Seg 14:00‑14:50', 'Seg 16:00‑17:50']
  },
  {
    categoria: 'Turma – Iniciante – Teens (12‑16)',
    mensalidade: 140,
    taxaMatricula: 49,
    multaCancelamento: 140,
    apostila: 0,
    livro: 140,
    duracao: '3 anos',
    cargaSemanalMinutos: 100,
    horarios: ['Qua 09:00‑10:40', 'Sex 16:00‑17:40']
  },
  {
    categoria: 'Turma – Andamento – Kids',
    mensalidade: 140,
    taxaMatricula: 49,
    multaCancelamento: 140,
    apostila: 0,
    livro: 140,
    duracao: '2 anos',
    cargaSemanalMinutos: 100,
    horarios: ['Seg 14:00‑14:50', 'Sáb 11:00‑12:50', 'Qui 16:00‑17:50'],
    observacao: 'Rodízio de professores – até 6 alunos'
  },
  {
    categoria: 'Turma – Andamento – Teens',
    mensalidade: 140,
    taxaMatricula: 49,
    multaCancelamento: 140,
    apostila: 0,
    livro: 140,
    duracao: '2 anos',
    cargaSemanalMinutos: 100,
    horarios: ['Ter 16:00‑17:40', 'Sáb 11:00‑12:50', 'Seg 19:00‑20:40']
  },
  {
    categoria: 'VIP – Individual',
    aulasMes: 4,
    mensalidade: 250,
    taxaMatricula: 49,
    apostila: 0,
    livro: 140,
    duracao: '4 anos',
    minutosPorAula: 50,
    horarios: 'Flexível (presencial ou online)',
    extras: 'Método direto, foco em conversação, professores nativos'
  },
  {
    categoria: 'VIP – Individual',
    aulasMes: 8,
    mensalidade: 480,
    taxaMatricula: 49,
    apostila: 0,
    livro: 140,
    duracao: '3 anos',
    minutosPorAula: 50,
    horarios: 'Flexível (presencial ou online)',
    extras: 'Método direto, foco em conversação, professores nativos'
  },
  {
    categoria: 'VIP – Individual',
    aulasMes: 12,
    mensalidade: 680,
    taxaMatricula: 49,
    apostila: 0,
    livro: 140,
    duracao: '2 anos',
    minutosPorAula: 50,
    horarios: 'Flexível (presencial ou online)',
    extras: 'Método direto, foco em conversação, professores nativos'
  },
  {
    categoria: 'VIP – Dupla',
    aulasMes: 4,
    mensalidade: 160,
    taxaMatricula: 49,
    apostila: 0,
    livro: 140,
    duracao: '4 anos',
    minutosPorAula: 50,
    horarios: 'Flexível',
    extras: 'Aulas particulares em dupla'
  },
  {
    categoria: 'VIP – Dupla',
    aulasMes: 8,
    mensalidade: 260,
    taxaMatricula: 49,
    apostila: 0,
    livro: 140,
    duracao: '3 anos',
    minutosPorAula: 50,
    horarios: 'Flexível',
    extras: 'Aulas particulares em dupla'
  },
  {
    categoria: 'VIP – Dupla',
    aulasMes: 12,
    mensalidade: 360,
    taxaMatricula: 49,
    apostila: 0,
    livro: 140,
    duracao: '2 anos',
    minutosPorAula: 50,
    horarios: 'Flexível',
    extras: 'Aulas particulares em dupla'
  }
];