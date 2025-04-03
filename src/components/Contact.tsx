import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { trackPixelEvent, PixelEvents, TrackClick } from "../lib/pixelTracker";

const WHATSAPP_NUMBER = "5511984291000";
const DEFAULT_MESSAGE = "Olá! Gostaria de saber mais informações dos planos e horários disponíveis, e como agendar uma aula experimental gratuita.";

const redirectToWhatsApp = (message: string = DEFAULT_MESSAGE) => {
  const encodedMessage = encodeURIComponent(message);
  
  // Rastreia evento de lead quando o usuário clica para abrir o WhatsApp
  trackPixelEvent({
    eventName: PixelEvents.LEAD,
    params: {
      content_name: 'Contato via WhatsApp',
      content_category: 'Contato',
      value: 1,
      currency: 'BRL',
    }
  });
  
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
};

const redirectToGoogleMaps = () => {
  // Rastreia evento quando o usuário clica para ver o mapa
  trackPixelEvent({
    eventName: 'MapView',
    params: {
      content_name: 'Visualização de Mapa',
      content_category: 'Localização',
    }
  });
  
  window.open('https://www.google.com/maps/dir//Rua+Doutor+Carlos+da+Silva+Tupiniquim+79+Centro+Mogi+das+Cruzes', '_blank');
};

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-neutral-600">
            Estamos aqui para ajudar você a começar sua jornada no aprendizado de idiomas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#1E3A8A]/10 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Endereço</h3>
                <p className="text-neutral-600">
                  Rua Doutor Carlos da Silva Tupiniquim, 79 – Centro
                  <br />
                  Mogi das Cruzes - SP
                </p>
              </div>
            </div>

            {/* Telefone com rastreamento de clique */}
            <div className="flex items-start gap-4">
              <div className="bg-[#1E3A8A]/10 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Telefone</h3>
                <p className="text-neutral-600">
                  <TrackClick 
                    eventName={PixelEvents.LEAD} 
                    params={{
                      content_name: 'Clique no Telefone',
                      content_category: 'Contato',
                    }}
                    style={{ display: 'inline' }}
                  >
                    <a href="tel:+5511984291000" className="hover:text-[#1E3A8A]">
                      (11) 98429-1000
                    </a>
                  </TrackClick>
                </p>
              </div>
            </div>

            {/* Email com rastreamento de clique */}
            <div className="flex items-start gap-4">
              <div className="bg-[#1E3A8A]/10 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">E-mail</h3>
                <p className="text-neutral-600">
                  <TrackClick 
                    eventName={PixelEvents.LEAD} 
                    params={{
                      content_name: 'Clique no Email',
                      content_category: 'Contato',
                    }}
                    style={{ display: 'inline' }}
                  >
                    <a href="mailto:londonschoolmogi@gmail.com" className="hover:text-[#1E3A8A]">
                      londonschoolmogi@gmail.com
                    </a>
                  </TrackClick>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mapa do Google */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=place_id:ChIJ4Z0GBxfYzZQR-R0eLYjTe8w"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </motion.div>
        </div>

        {/* Botões desktop e mobile "Como Chegar" */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="hidden lg:block">
            <TrackClick 
              eventName={PixelEvents.LEAD}
              params={{
                content_name: 'Agendar Aula Experimental',
                content_category: 'Conversão Principal',
                value: 50,
                currency: 'BRL',
              }}
              className="w-full"
            >
              <Button
                size="lg"
                onClick={() => redirectToWhatsApp()}
                className="w-full bg-primary hover:bg-primary-hover text-white h-14 flex items-center justify-center rounded-lg transition-all transform hover:scale-105"
              >
                Agende sua Aula Experimental
              </Button>
            </TrackClick>
          </div>
          
          <TrackClick 
            eventName="MapView"
            params={{
              content_name: 'Como Chegar',
              content_category: 'Localização',
            }}
            className="w-full"
          >
            <Button
              onClick={redirectToGoogleMaps}
              className="w-full bg-primary hover:bg-primary-hover text-white h-12 md:h-14 text-sm md:text-base flex items-center justify-center rounded-lg transition-all transform hover:scale-105"
            >
              <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Como Chegar
            </Button>
          </TrackClick>
        </div>
      </div>
    </section>
  );
};

export default Contact;
