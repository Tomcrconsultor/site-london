import { Button } from "@/components/ui/button";
import { Target, Users, MessageCircle, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "5511984291000";
const DEFAULT_MESSAGE = "Olá! Gostaria de saber mais informações dos planos e horários disponíveis, e como agendar uma aula experimental gratuita.";

const redirectToWhatsApp = (message: string = DEFAULT_MESSAGE) => {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
};

const About = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <GraduationCap className="w-12 h-12 mx-auto text-[#1E3A8A] mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-neutral-900">
              Nossa Escola
            </h2>
            <p className="text-lg font-medium text-[#1E3A8A] mb-6">
              Desde 2006 em Mogi das Cruzes, conectando pessoas ao mundo
            </p>
            <div className="max-w-3xl mx-auto text-neutral-600 space-y-4">
              <p>
                A <span className="font-semibold">London School</span> nasceu com a missão de aproximar culturas e transformar vidas por meio do aprendizado de idiomas. Há mais de uma década, ajudamos crianças, jovens e adultos a conquistarem a fluência em diversas línguas, sempre com foco na conversação e na prática real desde a primeira aula.
              </p>
              <p>
                Com professores nativos e brasileiros experientes, oferecemos um ensino dinâmico, divertido e eficiente, seja no formato presencial ou online. Nosso compromisso é levar você ao domínio do idioma de forma natural, abrindo portas para novas oportunidades profissionais, acadêmicas e culturais.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Target className="w-10 h-10 text-[#1E3A8A] mb-4" />
            <h3 className="text-xl font-bold mb-2">7 Idiomas</h3>
            <p className="text-neutral-600">
              Oferecemos cursos em diversos idiomas para atender suas necessidades: Inglês, Espanhol, Francês, Alemão, Italiano, Árabe e Português para Estrangeiros.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Users className="w-10 h-10 text-[#1E3A8A] mb-4" />
            <h3 className="text-xl font-bold mb-2">Professores Nativos</h3>
            <p className="text-neutral-600">
              Aprenda com professores nativos e experientes que trazem não só o idioma, mas também a cultura e as expressões autênticas de cada língua.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="w-10 h-10 text-[#1E3A8A] mb-4" />
            <h3 className="text-xl font-bold mb-2">Foco em Conversação</h3>
            <p className="text-neutral-600">
              Metodologia focada em conversação desde a primeira aula, garantindo que você comece a falar o idioma imediatamente.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-neutral-50 rounded-2xl p-8"
        >
          <p className="text-lg text-neutral-700 mb-6">
            Nossa equipe de professores utiliza o método direto,
            garantindo que você aprenda de forma natural e prática.
          </p>
          <Button 
            onClick={() => redirectToWhatsApp()}
            className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white"
          >
            Agende sua aula experimental gratuita
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
