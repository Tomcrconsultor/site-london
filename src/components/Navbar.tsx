import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const menuItems = [
  { label: "Idiomas", href: "#languages" },
  { label: "Planos", href: "#plans" },
  { label: "Metodo", href: "#method" },
  { label: "Depoimentos", href: "#reviews" },
  { label: "Contato", href: "#contact" },
  { label: "Sobre", href: "#about" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-md" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 sm:gap-4 flex-shrink-0 mr-4 md:mr-8 lg:mr-16">
            <img
              src="/logo.png"
              alt="London School"
              className={`h-12 sm:h-14 md:h-16 w-auto object-contain transition-all duration-300 rounded-lg ${
                isScrolled ? '' : 'opacity-90'
              }`}
              style={{ 
                minWidth: '50px', 
                maxWidth: '120px',
                filter: isScrolled ? 'none' : 'drop-shadow(0 0 4px rgba(255,255,255,0.5))'
              }}
            />
            <div className={`block transition-all duration-300 ${
              isScrolled ? 'text-neutral-900' : 'text-white'
            }`}>
              <h1 className="text-sm sm:text-base md:text-xl font-playfair font-bold leading-tight">London School</h1>
              <p className="text-xs sm:text-sm opacity-80 whitespace-nowrap">Escola de Idiomas</p>
            </div>
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-8 flex-shrink-0">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  isScrolled ? "text-neutral-700 hover:text-[#1E3A8A]" : "text-white hover:text-white/80"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("#cta-final")}
              className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 whitespace-nowrap min-w-[90px] text-sm"
              size="sm"
            >
              Aula Grátis
            </Button>
          </div>

          {/* Menu Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className={isScrolled ? "text-neutral-900" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-neutral-900" : "text-white"} />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-2xl">
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 text-neutral-700 hover:text-[#1E3A8A] hover:bg-neutral-50 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4">
                <Button
                  onClick={() => scrollToSection("#cta-final")}
                  className="w-full bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90"
                >
                  Aula Grátis
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
