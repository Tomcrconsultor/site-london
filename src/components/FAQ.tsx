import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Quanto tempo leva para aprender um idioma?",
    answer: "O tempo de aprendizado varia de acordo com a dedicação e frequência das aulas. Com nosso Método Direto, alunos costumam atingir um nível conversacional em 1 ano e fluência em aproximadamente 3 anos, com aulas 2x por semana."
  },
  {
    question: "Preciso ter conhecimento prévio do idioma?",
    answer: "Não! Nosso método é ideal tanto para iniciantes quanto para alunos avançados. Começamos do zero e progredimos de acordo com o seu ritmo de aprendizado."
  },
  {
    question: "Como funcionam as aulas online?",
    answer: "As aulas online são ao vivo, interativas e seguem a mesma metodologia das aulas presenciais. Utilizamos uma plataforma moderna que permite interação total entre professor e aluno, com recursos multimídia e exercícios práticos."
  },
  {
    question: "Qual a diferença do Método Direto para outros métodos?",
    answer: "O Método Direto prioriza a conversação desde a primeira aula, sem traduções constantes. Você aprende o idioma naturalmente, como uma criança aprende sua língua materna, através de associações diretas entre o idioma e situações reais."
  },
  {
    question: "Como funciona a aula experimental gratuita?",
    answer: "A aula experimental é uma oportunidade de conhecer nossa metodologia na prática. Durante 50 minutos, você terá uma aula real com um de nossos professores, experimentando como é aprender com o Método Direto."
  },
  {
    question: "Vocês fornecem material didático?",
    answer: "Sim! Trabalhamos com material didático próprio, atualizado e alinhado com nosso método. O material tem um custo de R$ 220,00 a cada 6 meses, porém alguns planos incluem o material gratuitamente quando o pagamento do semestre é feito à vista. O material é essencial para o acompanhamento das aulas e progresso no aprendizado."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="border-b border-neutral-200 last:border-none"
    >
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-4 text-left"
      >
        <span className="text-lg font-medium text-neutral-900">{question}</span>
        <span className="ml-4">
          {isOpen ? (
            <Minus className="w-5 h-5 text-[#1E3A8A]" />
          ) : (
            <Plus className="w-5 h-5 text-[#1E3A8A]" />
          )}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-neutral-600">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos cursos e metodologia
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 