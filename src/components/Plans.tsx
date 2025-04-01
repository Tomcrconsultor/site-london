import { Button } from "@/components/ui/button";
import { Check, Star, Users, Calendar, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { redirectToWhatsAppWithCallback } from '../utils/whatsapp';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const plans = [
  {
    name: "Turmas 2025",
    subtitle: "Presencial e Online",
    icon: Calendar,
    highlight: "Ideal para adultos",
    whatsappMessage: "Olá! Gostaria de saber mais informações sobre o plano Turmas 2025, horários disponíveis e valores. Podem me ajudar?",
    price: {
      presential: {
        label: "presencial",
        value: "R$ 240,00/mês"
      },
      online: {
        label: "online",
        value: "R$ 180,00/mês"
      }
    },
    features: [
      "Aulas: 2 horas/semana",
      "Duração: 3 anos (para iniciantes)",
      "Taxa de matrícula: R$ 49,00 (única)",
      "Multa de cancelamento: zero",
      "Material: físico e/ou digital",
      "Turmas: adultos, até 6 alunos",
      "Certificado após conclusão"
    ],
    theme: "bg-gradient-to-br from-blue-50 to-indigo-50"
  },
  {
    name: "Turmas com Bolsa",
    subtitle: "42% de desconto",
    icon: Star,
    highlight: "Mais popular",
    whatsappMessage: "Olá! Tenho interesse no plano Turmas com Bolsa. Gostaria de saber os horários disponíveis e mais informações sobre o desconto de 42%.",
    price: {
      presential: {
        label: "presencial",
        value: "R$ 140,00/mês"
      }
    },
    features: [
      "Exclusivo para kids de 7 a 10 anos",
      "Exclusivo para teens de 11 a 15 anos",
      "Aulas: 2 horas/semana",
      "Duração: 3 anos",
      "Taxa de matrícula: R$ 49,00 (única)",
      "Multa de cancelamento: zero",
      "Material: físico e/ou digital",
      "Turmas: com até 6 alunos",
      "Certificado após conclusão"
    ],
    theme: "bg-gradient-to-br from-orange-50 to-amber-50"
  },
  {
    name: "London VIP",
    subtitle: "A partir de 4 anos",
    icon: Trophy,
    highlight: "Premium",
    whatsappMessage: "Olá! Gostaria de informações sobre as aulas particulares do plano London VIP, como funciona a flexibilidade de horários e valores.",
    price: {
      "4 aulas": {
        label: "4 aulas/mês",
        value: "R$ 300,00"
      },
      "8 aulas": {
        label: "8 aulas/mês",
        value: "R$ 520,00"
      },
      "12 aulas": {
        label: "12 aulas/mês",
        value: "R$ 720,00"
      }
    },
    features: [
      "Aulas particulares",
      "Presencial ou online",
      "Horários flexíveis",
      "Conteúdo personalizado",
      "Suporte individual",
      "Taxa de matrícula: R$ 49,00 (única)",
      "Multa de cancelamento: zero",
      "Material: físico e/ou digital",
      "Certificado após conclusão"
    ],
    theme: "bg-gradient-to-br from-violet-50 to-purple-50"
  },
  {
    name: "Grupo VIP",
    subtitle: "2 a 6 alunos",
    icon: Users,
    highlight: "Forme seu grupo",
    whatsappMessage: "Olá! Tenho interesse no plano Grupo VIP. Gostaria de saber como funciona a formação dos grupos, horários disponíveis e valores.",
    price: {
      "4 aulas": {
        label: "4 aulas/mês",
        value: "R$ 160,00/aluno"
      },
      "8 aulas": {
        label: "8 aulas/mês",
        value: "R$ 260,00/aluno"
      },
      "12 aulas": {
        label: "12 aulas/mês",
        value: "R$ 360,00/aluno"
      }
    },
    features: [
      "Grupo particular",
      "Horários flexíveis",
      "Conteúdo personalizado",
      "Suporte individual",
      "Taxa de matrícula: R$ 49,00/aluno (única)",
      "Multa de cancelamento: zero",
      "Material: físico e/ou digital",
      "Certificado após conclusão"
    ],
    theme: "bg-gradient-to-br from-emerald-50 to-teal-50"
  }
];

const WHATSAPP_NUMBER = "5511984291000";

const redirectToWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
};

const PlanCard = ({ plan, index }: { plan: typeof plans[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = plan.icon;

  const maxFeatures = Math.max(...plans.map(p => p.features.length));
  const maxPrices = Math.max(...plans.map(p => Object.keys(p.price).length));

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl shadow-lg transition-all duration-500 flex flex-col ${plan.theme} ${
        isHovered ? 'shadow-2xl translate-y-[-8px]' : ''
      }`}
    >
      {/* Cabeçalho */}
      <motion.div 
        className="p-6 border-b border-neutral-100/20 h-[140px] flex items-start relative overflow-hidden"
        animate={isHovered ? { backgroundColor: "rgba(255, 255, 255, 0.1)" } : {}}
      >
        <motion.div 
          className="flex items-start gap-3 w-full relative z-10"
          animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
        >
          <motion.div
            className={`p-2 rounded-xl transition-all duration-500 flex-shrink-0 ${
              isHovered ? 'bg-[#1E3A8A] text-white' : 'bg-[#1E3A8A]/10 text-[#1E3A8A]'
            }`}
            whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          <div className="flex-1">
            <motion.h3 
              className="text-xl font-bold text-neutral-900 leading-tight mb-2"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            >
              {plan.name}
            </motion.h3>
            <div className="flex items-center gap-2">
              <p className="text-neutral-600 text-sm">{plan.subtitle}</p>
              <motion.span 
                className="text-xs font-medium text-neutral-700 bg-white/80 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0"
                animate={isHovered ? { 
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  scale: 1.05
                } : {}}
              >
                {plan.highlight}
              </motion.span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Preços */}
      <div className="p-6 border-b border-neutral-100/20" style={{ minHeight: `${maxPrices * 5}rem` }}>
        <div className="flex flex-col justify-start h-full">
          {Object.entries(plan.price).map(([key, { label, value }], idx) => (
            <motion.div 
              key={idx} 
              className="mb-4 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="text-sm text-neutral-600 mb-1"
                animate={isHovered ? { color: "#1E3A8A" } : {}}
              >
                {label}
              </motion.div>
              <motion.div 
                className="text-2xl font-bold text-[#1E3A8A]"
                animate={isHovered ? { 
                  scale: 1.05,
                  textShadow: "0 0 8px rgba(30, 58, 138, 0.3)"
                } : {}}
              >
                {value}
              </motion.div>
              {plan.name === "Turmas com Bolsa" && (
                <motion.div 
                  className="text-sm text-neutral-600 mt-2 bg-white/60 rounded-lg p-2"
                  animate={isHovered ? { backgroundColor: "rgba(255, 255, 255, 0.8)" } : {}}
                >
                  Exclusivo para kids (7-10 anos) e teens (11-15 anos)
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="p-6 border-b border-neutral-100/20" style={{ minHeight: `${maxFeatures * 2.5}rem` }}>
        <ul className="space-y-3 h-full">
          {plan.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: 0.1 * idx }}
              whileHover={{ x: 5 }}
              className="flex items-start gap-3"
            >
              <motion.div 
                className={`rounded-full transition-all duration-500 ${
                  isHovered ? 'bg-[#1E3A8A] text-white' : 'bg-[#1E3A8A]/10 text-[#1E3A8A]'
                } p-1 h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5`}
                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                whileHover={{ rotate: 360 }}
              >
                <Check className="w-3 h-3" />
              </motion.div>
              <motion.span 
                className="text-sm text-neutral-700 leading-normal"
                animate={isHovered ? { color: "#1E3A8A" } : {}}
              >
                {feature}
              </motion.span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Botão */}
      <div className="p-6 mt-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline"
            onClick={() => redirectToWhatsAppWithCallback(plan.whatsappMessage, navigate)}
            className={`w-full h-11 transition-all duration-500 bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 ${
              isHovered ? 'shadow-lg scale-105' : ''
            }`}
          >
            Quero este plano
          </Button>
        </motion.div>
      </div>

      {/* Efeito de gradiente no hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-transparent to-transparent pointer-events-none"
        />
      )}
    </motion.div>
  );
};

const Plans = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section id="plans" className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Nossos Planos
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Escolha o plano que melhor se adapta às suas necessidades e comece sua jornada no aprendizado de idiomas.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Plans;
