import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { getGoogleReviews } from "@/services/googleReviews";

const ReviewCard = ({ review }: { review: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <img
          src={review.profile_photo_url}
          alt={`Foto de ${review.author_name}`}
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="ml-4">
          <h3 className="font-medium text-neutral-900">{review.author_name}</h3>
          <div className="flex">
            {[...Array(review.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-[#FFD700] text-[#FFD700]"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <Quote className="w-8 h-8 text-[#1E3A8A]/10 absolute -top-2 -left-2" />
        <p className="text-neutral-600 pl-4">{review.text}</p>
      </div>
    </motion.div>
  );
};

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 4;

  useEffect(() => {
    async function loadReviews() {
      const data = await getGoogleReviews();
      setReviews(data.reviews);
    }

    loadReviews();
  }, []);

  // Rotação automática a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => 
        prev >= Math.ceil(reviews.length / reviewsPerPage) - 1 ? 0 : prev + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const currentReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  return (
    <section id="reviews" className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-8">
            O que dizem nossos alunos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {[...Array(Math.ceil(reviews.length / reviewsPerPage))].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentPage ? 'bg-[#1E3A8A]' : 'bg-[#1E3A8A]/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 