import { ArrowLeft } from "lucide-react";

export default function PoliticaDePrivacidade() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botão Voltar */}
        <a 
          href="/"
          className="inline-flex items-center gap-2 text-[#1E3A8A] hover:text-[#1E3A8A]/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para a página inicial</span>
        </a>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-neutral-900 mb-8">
            Política de Privacidade
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-600 mb-6">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                1. Introdução
              </h2>
              <p className="text-neutral-600">
                A London School está comprometida em proteger a privacidade dos nossos alunos e visitantes. 
                Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                2. Informações que Coletamos
              </h2>
              <p className="text-neutral-600 mb-4">
                Podemos coletar os seguintes tipos de informações:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de telefone</li>
                <li>Endereço residencial</li>
                <li>Data de nascimento</li>
                <li>Informações de pagamento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                3. Como Usamos suas Informações
              </h2>
              <p className="text-neutral-600 mb-4">
                Utilizamos suas informações para:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>Fornecer nossos serviços educacionais</li>
                <li>Comunicar sobre aulas e eventos</li>
                <li>Processar pagamentos</li>
                <li>Melhorar nossos serviços</li>
                <li>Enviar materiais didáticos</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                4. Proteção de Dados
              </h2>
              <p className="text-neutral-600">
                Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger 
                suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                5. Seus Direitos
              </h2>
              <p className="text-neutral-600 mb-4">
                Você tem direito a:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir dados incorretos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Retirar seu consentimento</li>
                <li>Receber seus dados em formato estruturado</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                6. Contato
              </h2>
              <p className="text-neutral-600">
                Para questões relacionadas à privacidade de seus dados, entre em contato conosco através do e-mail: 
                <a href="mailto:londonschoolmogi@gmail.com" className="text-[#1E3A8A] hover:text-[#1E3A8A]/80 ml-1">
                  londonschoolmogi@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 