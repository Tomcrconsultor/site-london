import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { instagramService, InstagramPost } from '@/services/instagramService';

const InstagramFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadInstagramPosts();
  }, []);

  const loadInstagramPosts = async () => {
    try {
      setLoading(true);
      const instagramPosts = await instagramService.getRecentPosts(6);
      setPosts(instagramPosts);
    } catch (error) {
      console.error('Erro ao carregar posts do Instagram:', error);
      setError('Não foi possível carregar as postagens do Instagram');
    } finally {
      setLoading(false);
    }
  };

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
              <motion.div
                key={i}
                className="aspect-square bg-neutral-200 animate-pulse rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <Instagram className="w-12 h-12 text-pink-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Siga nosso Instagram
          </h2>
          <p className="text-neutral-600 mb-6">
            Acesse @londonschool_mogidascruzes para ver nossas postagens reais!
          </p>
          <motion.a
            href="https://www.instagram.com/londonschool_mogidascruzes/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-5 h-5" />
            Ver no Instagram
          </motion.a>
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
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
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
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 },
                },
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative aspect-square overflow-hidden rounded-xl shadow-lg bg-neutral-100"
            >
              <img
                src={post.media_url}
                alt={post.caption || 'Post do Instagram'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop&t=${index}`;
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 left-2 right-2 space-y-1">
                  {post.like_count && (
                    <div className="flex items-center gap-1 text-white text-xs">
                      <Heart className="w-3 h-3 fill-current" />
                      <span>{post.like_count}</span>
                    </div>
                  )}
                  {post.caption && (
                    <p className="text-white text-xs font-medium line-clamp-2">
                      {post.caption.substring(0, 50)}...
                    </p>
                  )}
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
            {posts.length} postagens recentes • Mais de 2.000 seguidores • Postagens diárias
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;