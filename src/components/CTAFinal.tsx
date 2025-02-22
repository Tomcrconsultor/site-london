import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5511984291000";
const DEFAULT_MESSAGE = "Olá! Gostaria de saber mais informações dos planos e horários disponíveis, e como agendar uma aula experimental gratuita.";
const CONTACT_MESSAGE = "Olá! Gostaria de saber mais informações sobre os cursos da London School e como começar.";

const redirectToWhatsApp = (message: string = DEFAULT_MESSAGE) => {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
};

export default function CTAFinal() {
  return (
    <section id="cta-final" className="py-24 bg-gradient-to-br from-[#1E3A8A] to-[#1E3A8A]/90 text-white relative overflow-hidden">
      {/* Círculos decorativos */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6">
            Pronto para Dar o Próximo Passo?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Não deixe seu sonho de falar um novo idioma para depois. Junte-se aos nossos mais de 2.000 alunos satisfeitos e conquiste a fluência que vai abrir portas no mundo inteiro.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => redirectToWhatsApp()}
              className="bg-white text-[#1E3A8A] hover:bg-white/90 text-lg px-8 py-6 rounded-xl flex items-center gap-2 w-full sm:w-auto"
            >
              Agende sua aula experimental gratuita
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => redirectToWhatsApp(CONTACT_MESSAGE)}
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl flex items-center gap-2 w-full sm:w-auto"
            >
              Fale com nossa equipe
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
          
          <p className="mt-6 text-white/80 text-lg">
            Você merece essa conquista!
          </p>
        </motion.div>
      </div>
    </section>
  );
} 