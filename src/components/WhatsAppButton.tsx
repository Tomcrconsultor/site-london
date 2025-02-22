import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "5511984291000";
const DEFAULT_MESSAGE = "Olá! Gostaria de saber mais informações dos planos e horários disponíveis, e como agendar uma aula experimental gratuita.";

const WhatsAppButton = () => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const finalMessage = message.trim();
    const encodedMessage = encodeURIComponent(finalMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    setMessage("");
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[380px] mb-4 overflow-hidden">
          {/* Cabeçalho do Chat */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10">
                <img
                  src="/logo.png"
                  alt="London School"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">London School</h3>
                <p className="text-xs text-white/80">Escola de Idiomas</p>
              </div>
            </div>
            <div className="flex items-center">
              <X 
                className="w-5 h-5 cursor-pointer hover:text-white/80"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>

          {/* Área de Chat */}
          <div className="bg-[#E5DDD5] p-4 h-[300px] overflow-y-auto">
            {/* Mensagem de Boas-vindas */}
            <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm mb-4">
              <p className="text-sm text-gray-700">
                Olá! 👋 Seja bem-vindo(a) à London School. Como podemos ajudar você hoje?
              </p>
              <span className="text-xs text-gray-500 mt-1 block">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Sugestões de Mensagens */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "Quero agendar uma aula experimental",
                "Gostaria de saber os valores",
                "Quais idiomas vocês oferecem?",
                "Como funciona o método de ensino?"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  className="bg-white text-sm px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Área de Input */}
          <div className="bg-[#F0F2F5] p-3 flex items-end gap-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-white rounded-lg px-4 py-2 text-sm max-h-32 min-h-[44px] resize-none focus:outline-none focus:ring-1 focus:ring-[#075E54]"
              style={{ height: '44px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`p-2 rounded-full ${
                message.trim() 
                  ? 'bg-[#075E54] text-white hover:bg-[#075E54]/90' 
                  : 'bg-gray-200 text-gray-400'
              } transition-colors`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Botão Flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#25D366]/90 transition-all transform hover:scale-110 hover:rotate-3 animate-pulse"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
