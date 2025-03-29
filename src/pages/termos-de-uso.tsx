import { ArrowLeft } from "lucide-react";

export default function TermosDeUso() {
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
            Termos de Uso
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-600 mb-6">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                1. Aceitação dos Termos
              </h2>
              <p className="text-neutral-600">
                Ao acessar e utilizar os serviços da London School, você concorda com estes Termos de Uso 
                e todas as condições aqui estabelecidas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                2. Serviços Educacionais
              </h2>
              <p className="text-neutral-600 mb-4">
                Nossos serviços incluem:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>Aulas de idiomas presenciais e online</li>
                <li>Material didático</li>
                <li>Avaliações e testes de proficiência</li>
                <li>Certificados de conclusão</li>
                <li>Atividades extracurriculares</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                3. Responsabilidades do Aluno
              </h2>
              <p className="text-neutral-600 mb-4">
                O aluno se compromete a:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>Fornecer informações verdadeiras e atualizadas</li>
                <li>Respeitar os horários das aulas</li>
                <li>Seguir as normas da escola</li>
                <li>Manter conduta respeitosa</li>
                <li>Cumprir com os pagamentos acordados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                4. Pagamentos e Reembolsos
              </h2>
              <p className="text-neutral-600">
                Os pagamentos devem ser realizados conforme o plano escolhido. Cancelamentos e reembolsos 
                seguem nossa política específica, disponível na secretaria da escola.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                5. Propriedade Intelectual
              </h2>
              <p className="text-neutral-600">
                Todo o material didático, conteúdo e metodologia são de propriedade exclusiva da London School, 
                sendo proibida sua reprodução ou distribuição sem autorização.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                6. Alterações nos Termos
              </h2>
              <p className="text-neutral-600">
                A London School reserva-se o direito de modificar estes termos a qualquer momento, 
                notificando os alunos sobre mudanças significativas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                7. Contato
              </h2>
              <p className="text-neutral-600">
                Para dúvidas sobre estes termos, entre em contato através do e-mail: 
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