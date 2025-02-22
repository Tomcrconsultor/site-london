import { motion } from "framer-motion";
import { MessageCircle, Users, Zap, Clock, BookOpen } from "lucide-react";

const differentials = [
  {
    icon: MessageCircle,
    title: "Conversação desde o primeiro dia",
    description: "Fale o idioma já na primeira aula, sem depender de traduções extensas e gramática pesada."
  },
  {
    icon: Users,
    title: "Professores nativos e brasileiros",
    description: "Conte com a expertise de quem domina o idioma e entende a cultura, além de profissionais que facilitam o processo de aprendizagem para falantes de português."
  },
  {
    icon: Zap,
    title: "Aulas dinâmicas e interativas",
    description: "Nada de monotonia! Você pratica em situações reais, simulando diálogos do dia a dia e ganhando confiança rapidamente."
  },
  {
    icon: Clock,
    title: "Flexibilidade de horários e formatos",
    description: "Escolha entre aulas presenciais em nossa escola em Mogi das Cruzes ou no conforto da sua casa, com aulas online ao vivo."
  },
  {
    icon: BookOpen,
    title: "Suporte contínuo e material atualizado",
    description: "Tenha acesso a recursos digitais, exercícios extras e acompanhamento personalizado para acelerar ainda mais o seu progresso."
  }
];

const Differentials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-neutral-900">
            Por que escolher a London School?
          </h2>
          <p className="text-xl font-medium text-[#1E3A8A] mb-6">
            Nosso Método Direto: a chave para o aprendizado rápido
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((differential, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-[#1E3A8A]/10 p-3 rounded-xl">
                  <differential.icon className="w-6 h-6 text-[#1E3A8A]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-neutral-900">
                    {differential.title}
                  </h3>
                  <p className="text-neutral-600">
                    {differential.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-[#1E3A8A] text-white rounded-2xl p-8 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Método comprovado por milhares de alunos
            </h3>
            <p className="text-lg opacity-90">
              Nossa metodologia única combina práticas modernas de ensino com um ambiente acolhedor,
              permitindo que você desenvolva fluência naturalmente e com confiança.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Differentials; 