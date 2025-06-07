import { motion } from "framer-motion";
import { Check } from "lucide-react";

const WHATSAPP_NUMBER = "5511984291000";
const DEFAULT_MESSAGE = "Olá! Gostaria de saber mais informações dos planos e horários disponíveis, e como agendar uma aula experimental gratuita.";

const redirectToWhatsApp = (message: string = DEFAULT_MESSAGE) => {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
};

const languages = [
  {
    name: "Inglês",
    nativeName: "English",
    flag: "https://flagcdn.com/w320/gb.png",
    description: "O idioma universal para negócios, turismo e entretenimento."
  },
  {
    name: "Espanhol",
    nativeName: "Español",
    flag: "https://flagcdn.com/w320/es.png",
    description: "Conecte-se facilmente com mais de 400 milhões de falantes em todo o mundo."
  },
  {
    name: "Francês",
    nativeName: "Français",
    flag: "https://flagcdn.com/w320/fr.png",
    description: "A língua da diplomacia, cultura e gastronomia europeia."
  },
  {
    name: "Alemão",
    nativeName: "Deutsch",
    flag: "https://flagcdn.com/w320/de.png",
    description: "Destaque-se no mercado internacional com um dos idiomas mais valorizados na Europa."
  },
  {
    name: "Italiano",
    nativeName: "Italiano",
    flag: "https://flagcdn.com/w320/it.png",
    description: "Aprecie a arte, a culinária e a moda italiana com fluência e confiança."
  },
  {
    name: "Árabe",
    nativeName: "العربية",
    flag: "https://flagcdn.com/w320/ps.png",
    description: "Explore uma das línguas mais antigas e ricas culturalmente, essencial para negócios no Oriente Médio."
  },
  {
    name: "Português para Estrangeiros",
    nativeName: "Portuguese",
    flag: "https://flagcdn.com/w320/br.png",
    description: "Para quem chega ao Brasil e deseja aprender de forma rápida e eficaz."
  }
];

const benefits = [
  "Aprendizado natural e intuitivo",
  "Desenvolvimento rápido da fluência",
  "Prática constante de conversação",
  "Material didático exclusivo",
  "Acompanhamento personalizado",
  "Ambiente imersivo",
];

interface LanguagesProps {
  openLeadForm?: () => void
}

const Languages = ({ openLeadForm }: LanguagesProps) => {
  return (
    <section id="languages" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-neutral-900">
            Idiomas Oferecidos
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Seja para viajar, estudar, trabalhar ou expandir horizontes culturais, oferecemos opções que atendem às suas necessidades. Confira abaixo:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {languages.map((language, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-12 relative overflow-hidden rounded-lg shadow-sm">
                  <img
                    src={language.flag}
                    alt={`Bandeira ${language.name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {language.name}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {language.nativeName}
                  </p>
                </div>
              </div>
              <p className="text-neutral-600">
                {language.description}
              </p>
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
              Comece sua jornada multilíngue hoje!
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Escolha o idioma que mais combina com seus objetivos e descubra como é fácil aprender com nosso método exclusivo.
            </p>
            <button
              onClick={() => (openLeadForm ? openLeadForm() : redirectToWhatsApp())}
              className="bg-white text-[#1E3A8A] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Agende sua aula experimental gratuita
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Languages;
