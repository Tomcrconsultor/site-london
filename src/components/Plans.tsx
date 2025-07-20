import { Button } from "@/components/ui/button";
import { Check, Star, Users, Calendar, Trophy, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ADULT_PLANS_16_PLUS, KIDS_TEENS_PLANS_UNDER_16, Plan } from "@/data/plans";

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
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

type PlanCategory = 'turma' | 'vip-individual' | 'vip-dupla';
type AgeGroup = 'adultos' | 'kids-teens';

const WHATSAPP_NUMBER = "5511984291000";

const redirectToWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const getIconForCategory = (categoria: string) => {
  if (categoria.includes('VIP – Individual')) return Trophy;
  if (categoria.includes('VIP – Dupla')) return Users;
  return Calendar;
};

const getThemeForCategory = (categoria: string) => {
  if (categoria.includes('VIP – Individual')) return 'bg-gradient-to-br from-violet-50 to-purple-50';
  if (categoria.includes('VIP – Dupla')) return 'bg-gradient-to-br from-emerald-50 to-teal-50';
  return 'bg-gradient-to-br from-blue-50 to-indigo-50';
};

const PlanCard = ({ plan, index }: { plan: Plan; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = getIconForCategory(plan.categoria);
  const theme = getThemeForCategory(plan.categoria);

  const whatsappMessage = `Olá! Gostaria de saber mais informações sobre o plano ${plan.categoria}${plan.aulasMes ? ` (${plan.aulasMes} aulas/mês)` : ''}${plan.modalidade ? ` - ${plan.modalidade}` : ''}. Podem me ajudar com horários e valores?`;

  const materialCost = plan.apostila + plan.livro;

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
      className={`relative overflow-hidden rounded-3xl shadow-lg transition-all duration-500 flex flex-col ${theme} ${
        isHovered ? 'shadow-2xl translate-y-[-8px]' : ''
      }`}
    >
      {/* Cabeçalho */}
      <motion.div 
        className="p-6 border-b border-neutral-100/20 min-h-[120px] flex items-start relative overflow-hidden"
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
              className="text-lg font-bold text-neutral-900 leading-tight mb-2"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            >
              {plan.categoria}
            </motion.h3>
            {plan.modalidade && (
              <p className="text-neutral-600 text-sm mb-1">{plan.modalidade}</p>
            )}
            {plan.aulasMes && (
              <motion.span 
                className="text-xs font-medium text-neutral-700 bg-white/80 px-2 py-1 rounded-full whitespace-nowrap inline-block"
                animate={isHovered ? { 
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  scale: 1.05
                } : {}}
              >
                {plan.aulasMes} aulas/mês
              </motion.span>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Preços */}
      <div className="p-6 border-b border-neutral-100/20">
        <div className="space-y-3">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="text-sm text-neutral-600 mb-1"
              animate={isHovered ? { color: "#1E3A8A" } : {}}
            >
              Mensalidade
            </motion.div>
            <motion.div 
              className="text-3xl font-bold text-[#1E3A8A]"
              animate={isHovered ? { 
                scale: 1.05,
                textShadow: "0 0 8px rgba(30, 58, 138, 0.3)"
              } : {}}
            >
              {formatCurrency(plan.mensalidade)}
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-neutral-600">Taxa matrícula:</span>
              <p className="font-semibold text-[#1E3A8A]">{formatCurrency(plan.taxaMatricula)}</p>
            </div>
            <div>
              <span className="text-neutral-600">Material:</span>
              <p className="font-semibold text-[#1E3A8A]">{formatCurrency(materialCost)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detalhes */}
      <div className="p-6 border-b border-neutral-100/20 flex-1">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Duração:</span>
            <span className="font-medium">{plan.duracao}</span>
          </div>
          
          {plan.cargaSemanalMinutos && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Carga semanal:</span>
              <span className="font-medium">{plan.cargaSemanalMinutos} min</span>
            </div>
          )}
          
          {plan.minutosPorAula && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Duração/aula:</span>
              <span className="font-medium">{plan.minutosPorAula} min</span>
            </div>
          )}

          <div>
            <span className="text-neutral-600 block mb-1">Horários:</span>
            {Array.isArray(plan.horarios) ? (
              <div className="space-y-1">
                {plan.horarios.map((horario, idx) => (
                  <div key={idx} className="text-xs bg-white/60 rounded px-2 py-1">
                    {horario}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs bg-white/60 rounded px-2 py-1">
                {plan.horarios}
              </div>
            )}
          </div>

          {(plan.observacao || plan.extras) && (
            <motion.div 
              className="flex items-start gap-2 mt-3 p-3 bg-white/60 rounded-lg"
              animate={isHovered ? { backgroundColor: "rgba(255, 255, 255, 0.8)" } : {}}
            >
              <Info className="w-4 h-4 text-[#1E3A8A] mt-0.5 flex-shrink-0" />
              <span className="text-xs text-neutral-700">
                {plan.observacao || plan.extras}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Botão */}
      <div className="p-6 mt-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline"
            onClick={() => redirectToWhatsApp(whatsappMessage)}
            className={`w-full h-11 transition-all duration-500 bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 ${
              isHovered ? 'shadow-lg scale-105' : ''
            }`}
          >
            Saiba Mais
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
  const [activeAgeGroup, setActiveAgeGroup] = useState<AgeGroup>('adultos');
  const [activeCategory, setActiveCategory] = useState<PlanCategory>('turma');

  const currentPlans = activeAgeGroup === 'adultos' ? ADULT_PLANS_16_PLUS : KIDS_TEENS_PLANS_UNDER_16;
  
  const filteredPlans = currentPlans.filter(plan => {
    if (activeCategory === 'turma') {
      return plan.categoria.includes('Turma') || (!plan.categoria.includes('VIP'));
    }
    if (activeCategory === 'vip-individual') {
      return plan.categoria.includes('VIP – Individual');
    }
    if (activeCategory === 'vip-dupla') {
      return plan.categoria.includes('VIP – Dupla');
    }
    return true;
  });

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
            Cursos de Inglês – Planos 2025
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Planos de inglês presenciais e on‑line em Mogi das Cruzes para adultos, teens e kids. 
            Aulas com professores nativos, foco em conversação e horários flexíveis.
          </p>
        </motion.div>

        {/* Tabs Faixa Etária */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl p-2 shadow-lg border border-neutral-200">
            <div className="flex space-x-2">
              {[
                { key: 'adultos' as AgeGroup, label: 'Adultos 16+', icon: '👨‍🎓' },
                { key: 'kids-teens' as AgeGroup, label: 'Kids/Teens 7‑16', icon: '🧒' }
              ].map((tab) => (
                <motion.button
                  key={tab.key}
                  onClick={() => {
                    setActiveAgeGroup(tab.key);
                    setActiveCategory('turma');
                  }}
                  className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                    activeAgeGroup === tab.key
                      ? 'bg-[#1E3A8A] text-white shadow-md'
                      : 'text-neutral-600 hover:text-[#1E3A8A] hover:bg-neutral-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Subtabs Categorias */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-neutral-100 rounded-lg p-1 shadow-inner">
            <div className="flex space-x-1">
              {[
                { key: 'turma' as PlanCategory, label: 'Turmas', icon: Calendar },
                { key: 'vip-individual' as PlanCategory, label: 'VIP Individual', icon: Trophy },
                { key: 'vip-dupla' as PlanCategory, label: 'VIP Dupla', icon: Users }
              ].map((subtab) => {
                const Icon = subtab.icon;
                return (
                  <motion.button
                    key={subtab.key}
                    onClick={() => setActiveCategory(subtab.key)}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                      activeCategory === subtab.key
                        ? 'bg-white text-[#1E3A8A] shadow-sm'
                        : 'text-neutral-600 hover:text-[#1E3A8A]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    {subtab.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Grid de Planos */}
        <motion.div
          key={`${activeAgeGroup}-${activeCategory}`}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredPlans.map((plan, index) => (
            <PlanCard key={`${plan.categoria}-${plan.modalidade || ''}-${plan.aulasMes || ''}-${index}`} plan={plan} index={index} />
          ))}
        </motion.div>

        {filteredPlans.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-neutral-500 text-lg">
              Nenhum plano encontrado para esta categoria.
            </p>
          </motion.div>
        )}

        {/* Schema.org para SEO */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "Cursos de Inglês London School",
              "description": "Cursos de inglês para todas as idades em Mogi das Cruzes",
              "provider": {
                "@type": "Organization",
                "name": "London School",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Mogi das Cruzes",
                  "addressRegion": "SP",
                  "addressCountry": "BR"
                }
              },
              "offers": filteredPlans.map(plan => ({
                "@type": "Offer",
                "name": plan.categoria,
                "price": plan.mensalidade,
                "priceCurrency": "BRL",
                "description": `${plan.categoria} - ${plan.duracao}`,
                "availability": "https://schema.org/InStock"
              }))
            })
          }}
        />
      </div>
    </section>
  );
};

export default Plans;
