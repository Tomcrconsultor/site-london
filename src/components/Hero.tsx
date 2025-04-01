import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { redirectToWhatsAppWithCallback, DEFAULT_MESSAGE } from '../utils/whatsapp';

const WHATSAPP_NUMBER = "5511984291000";

const redirectToWhatsApp = (message: string = DEFAULT_MESSAGE) => {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-background.webp"
          alt="Estudantes felizes aprendendo juntos"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm"></div>
      </div>
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 animate-fade-up">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            Domine um novo idioma mais rápido do que você imagina!
          </h1>
          <p className="text-lg md:text-xl mb-8 text-neutral-100">
            Aprenda <span className="font-bold">7 idiomas</span> com professores nativos e brasileiros experientes
             e um método direto que coloca você conversando desde a primeira aula.
          </p>
          <Button
            onClick={() => redirectToWhatsAppWithCallback(DEFAULT_MESSAGE, navigate)}
            className="w-full max-w-xs md:max-w-sm mx-auto bg-orange-500 hover:bg-orange-600 text-white h-12 md:h-14 text-sm md:text-base flex items-center justify-center rounded-lg transition-all transform hover:scale-105 px-6 whitespace-normal"
          >
            Agende agora sua aula experimental gratuita
          </Button>
          <p className="text-sm mt-4 text-neutral-200">
            Descubra como é simples começar a falar desde o primeiro dia!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
