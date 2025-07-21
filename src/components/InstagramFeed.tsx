import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

interface InstagramPost {
  id: string;
  permalink: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  caption?: string;
  timestamp: string;
}

const InstagramFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data enquanto não temos acesso à API do Instagram
  const mockPosts = [
    {
      id: '1',
      permalink: 'https://instagram.com/p/sample1',
      media_url: '/images/instagram-placeholder-1.jpg',
      media_type: 'IMAGE' as const,
      caption: 'Aulas dinâmicas e interativas na London School! 🎓 #ingles #mogidascruzes',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      permalink: 'https://instagram.com/p/sample2',
      media_url: '/images/instagram-placeholder-2.jpg',
      media_type: 'IMAGE' as const,
      caption: 'Professores nativos e metodologia exclusiva! 🌍 #londonschool',
      timestamp: new Date().toISOString(),
    },
    {
      id: '3',
      permalink: 'https://instagram.com/p/sample3',
      media_url: '/images/instagram-placeholder-3.jpg',
      media_type: 'IMAGE' as const,
      caption: 'Turmas pequenas para melhor aprendizado! 📚 #auladeingles',
      timestamp: new Date().toISOString(),
    },
    {
      id: '4',
      permalink: 'https://instagram.com/p/sample4',
      media_url: '/images/instagram-placeholder-4.jpg',
      media_type: 'IMAGE' as const,
      caption: 'Sucesso dos nossos alunos! 🏆 #resultados #inglesfluente',
      timestamp: new Date().toISOString(),
    },
    {
      id: '5',
      permalink: 'https://instagram.com/p/sample5',
      media_url: '/images/instagram-placeholder-5.jpg',
      media_type: 'IMAGE' as const,
      caption: 'Ambiente moderno e acolhedor! ✨ #londonschoolmogi',
      timestamp: new Date().toISOString(),
    },
    {
      id: '6',
      permalink: 'https://instagram.com/p/sample6',
      media_url: '/images/instagram-placeholder-6.jpg',
      media_type: 'IMAGE' as const,
      caption: 'Flexibilidade de horários para seu estilo de vida! ⏰',
      timestamp: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Instagram className="w-8 h-8 text-pink-600" />
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-neutral-900">
                @londonschool_mogidascruzes
              </h2>
            </div>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Acompanhe nosso dia a dia e veja nossos alunos em ação!
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-neutral-200 animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Instagram className="w-8 h-8 text-pink-600" />
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-neutral-900">
              @londonschool_mogidascruzes
            </h2>
          </motion.div>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Acompanhe nosso dia a dia e veja nossos alunos em ação!
          </p>
          
          <motion.a
            href="https://www.instagram.com/londonschool_mogidascruzes/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-5 h-5" />
            Seguir no Instagram
          </motion.a>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative aspect-square overflow-hidden rounded-xl shadow-lg bg-neutral-100"
            >
              <img
                src={post.media_url}
                alt={post.caption || 'Post do Instagram'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium line-clamp-2">
                    {post.caption || 'Ver no Instagram'}
                  </p>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <Instagram className="w-4 h-4 text-white opacity-80" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-neutral-500">
            Mais de 2.000 seguidores • Postagens diárias • Stories ao vivo das aulas
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;