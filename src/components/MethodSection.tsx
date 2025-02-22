import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Zap, Clock, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "5511984291000";
const DEFAULT_MESSAGE = "Olá! Gostaria de saber mais informações dos planos e horários disponíveis, e como agendar uma aula experimental gratuita.";

const redirectToWhatsApp = (message: string = DEFAULT_MESSAGE) => {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
};

const benefits = [
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
    title: "Suporte contínuo e acompanhamento",
    description: "suporte eacompanhamento personalizado para acelerar ainda mais o seu progresso."
  }
];

export default function MethodSection() {
  return (
    <section id="method" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Nosso Método Direto
          </h2>
          <p className="text-lg text-[#1E3A8A] font-medium">
            A chave para o aprendizado rápido
          </p>
        </div>

        {/* Grid de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#1E3A8A]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                    <p className="text-neutral-600">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Seção Final com CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#1E3A8A] text-white rounded-2xl p-8 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Método comprovado por milhares de alunos
            </h3>
            <p className="text-lg mb-6">
              Nossa metodologia única combina práticas modernas de ensino com um ambiente acolhedor,
              permitindo que você desenvolva fluência naturalmente e com confiança.
            </p>
            <Button 
              onClick={() => redirectToWhatsApp()}
              className="bg-white text-[#1E3A8A] hover:bg-white/90"
            >
              Agende sua aula experimental gratuita
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 