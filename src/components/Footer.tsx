import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E3A8A] text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo e Descrição */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="London School Logo"
                className="w-16 h-16 object-contain rounded-lg bg-white/5 p-2"
              />
              <div>
                <h3 className="text-2xl font-playfair font-bold">London School</h3>
                <p className="text-sm text-white/80">Escola de Idiomas</p>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              Desde 2006 transformando vidas através do ensino de idiomas com qualidade e dedicação.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#languages" className="text-white/70 hover:text-white transition-colors">Idiomas</a>
              </li>
              <li>
                <a href="#method" className="text-white/70 hover:text-white transition-colors">Método</a>
              </li>
              <li>
                <a href="#plans" className="text-white/70 hover:text-white transition-colors">Planos</a>
              </li>
              <li>
                <a href="#reviews" className="text-white/70 hover:text-white transition-colors">Depoimentos</a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-white/60" />
                <span className="text-white/70 text-sm">
                  Rua Doutor Carlos da Silva Tupiniquim, 79 – Centro, Mogi das Cruzes - SP
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/60" />
                <a href="tel:+5511984291000" className="text-white/70 hover:text-white text-sm transition-colors">
                  (11) 98429-1000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/60" />
                <a href="mailto:contato@londonschool.com.br" className="text-white/70 hover:text-white text-sm transition-colors">
                  contato@londonschool.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-lg font-bold mb-6">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/londonschoolmogidascruzes"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com/londonschool_mogidascruzes"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} London School. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="/politica-de-privacidade" className="hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="/termos-de-uso" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 