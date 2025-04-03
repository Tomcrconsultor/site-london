import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const Statistics = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const stats = [
    { number: 2450, label: "Alunos Fluentes" },
    { number: 216000, label: "Aulas Concluídas" },
    { number: 7, label: "Idiomas Oferecidos" },
    { number: 18, label: "Anos de Experiência" },
  ];

  return (
    <section className="section-padding bg-primary text-white">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({
  stat,
  inView,
}: {
  stat: { number: number; label: string };
  inView: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const increment = stat.number / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.number) {
          setCount(stat.number);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [inView, stat.number]);

  return (
    <div className="text-center p-6 glass-card bg-white/10">
      <div className="text-4xl md:text-5xl font-bold mb-2">{count.toLocaleString()}</div>
      <div className="text-lg text-white/80">{stat.label}</div>
    </div>
  );
};

export default Statistics;
