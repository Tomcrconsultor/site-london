import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PoliticaDePrivacidade() {
  return (
    <>
      <Navbar />
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
              Política de Privacidade da London School
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-neutral-600 mb-6">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>

              <section className="mb-8">
                <p className="text-neutral-600">
                  Bem-vindo à London School, inscrita no CNPJ 07.881.668/0001-34, com sede na Rua Doutor Carlos da Silva Tupiniquim, 79 – Centro, Mogi das Cruzes - SP. Nosso compromisso é com a integridade e a segurança dos dados pessoais dos nossos usuários e clientes. Esta Política de Privacidade aplica-se a todas as interações digitais realizadas em nosso site londonschool.com.br, serviços associados, aplicativos móveis e outras plataformas digitais sob nosso controle.
                </p>
                <p className="text-neutral-600 mt-4">
                  Ao acessar e utilizar nossas plataformas, você reconhece e concorda com as práticas descritas nesta política. Nós tratamos a proteção de seus dados pessoais com a máxima seriedade e nos comprometemos a processá-los de forma responsável, transparente e segura.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Definições
                </h2>
                <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                  <li>"Dados Pessoais" são informações que identificam ou podem identificar uma pessoa natural.</li>
                  <li>"Dados Pessoais Sensíveis" são informações que revelam características pessoais íntimas, como origem racial, convicções religiosas, opiniões políticas, dados genéticos ou biométricos.</li>
                  <li>"Tratamento de Dados Pessoais" abrange qualquer operação com Dados Pessoais, como coleta, registro, armazenamento, uso, compartilhamento ou destruição.</li>
                  <li>"Leis de Proteção de Dados" são todas as leis que regulamentam o Tratamento de Dados Pessoais, incluindo a LGPD (Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/18).</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Dados Coletados e Motivos da Coleta
                </h2>
                <p className="text-neutral-600 mb-4">
                  Nós coletamos e processamos os seguintes tipos de dados pessoais:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-neutral-800">Informações Fornecidas por Você:</h3>
                    <p className="text-neutral-600">
                      Isso inclui, mas não se limita a, nome, sobrenome, endereço de e-mail, endereço físico, informações de pagamento e quaisquer outras informações que você optar por fornecer ao criar uma conta, fazer uma compra ou interagir com nossos serviços de atendimento ao cliente.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800">Informações Coletadas Automaticamente:</h3>
                    <p className="text-neutral-600">
                      Quando você visita nosso site, coletamos automaticamente informações sobre seu dispositivo e sua interação com nosso site. Isso pode incluir dados como seu endereço IP, tipo de navegador, detalhes do dispositivo, fuso horário, páginas visitadas, produtos visualizados, sites ou termos de busca que o direcionaram ao nosso site, e informações sobre como você interage com nosso site.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Uso de Cookies e Tecnologias de Rastreamento
                </h2>
                <p className="text-neutral-600 mb-4">
                  A London School utiliza cookies, que são pequenos arquivos de texto armazenados no seu dispositivo, e outras tecnologias de rastreamento para melhorar a experiência do usuário em nosso site londonschool.com.br, entender como nossos serviços são utilizados e otimizar nossas estratégias de marketing.
                </p>
                <h3 className="font-semibold text-neutral-800 mb-2">Tipos de Cookies Utilizados:</h3>
                <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                  <li><span className="font-medium">Cookies Essenciais:</span> Essenciais para o funcionamento do site, permitindo que você navegue e use suas funcionalidades.</li>
                  <li><span className="font-medium">Cookies de Desempenho e Analíticos:</span> Coletam informações sobre como os visitantes usam o nosso site.</li>
                  <li><span className="font-medium">Cookies de Funcionalidade:</span> Permitem que o site lembre de escolhas que você faz.</li>
                  <li><span className="font-medium">Cookies de Publicidade e Redes Sociais:</span> Usados para oferecer anúncios mais relevantes.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Finalidades do Processamento de Dados
                </h2>
                <p className="text-neutral-600 mb-4">Os dados coletados são utilizados para:</p>
                <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                  <li>Proporcionar, operar e melhorar nossos serviços e ofertas;</li>
                  <li>Processar suas transações e enviar notificações relacionadas a suas compras;</li>
                  <li>Personalizar sua experiência de usuário;</li>
                  <li>Comunicar informações importantes, ofertas e promoções;</li>
                  <li>Realizar análises internas;</li>
                  <li>Cumprir obrigações legais e regulatórias aplicáveis.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Compartilhamento e Transferência de Dados Pessoais
                </h2>
                <p className="text-neutral-600 mb-4">
                  Nós podemos compartilhar seus dados pessoais com terceiros nas seguintes circunstâncias:
                </p>
                <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                  <li>Com fornecedores de serviços e parceiros que nos auxiliam nas operações;</li>
                  <li>Para cumprir com obrigações legais;</li>
                  <li>Em caso de reestruturação corporativa, venda, fusão ou outra transferência de ativos.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Links para outros sites e redes sociais
                </h2>
                <p className="text-neutral-600">
                  Nossa plataforma pode incluir links para sites externos. Não somos responsáveis pelas práticas de privacidade desses sites. Recomendamos a leitura das políticas de privacidade de terceiros antes de fornecer qualquer dado pessoal.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Direitos dos Titulares dos Dados
                </h2>
                <p className="text-neutral-600 mb-4">Você possui diversos direitos em relação aos seus dados pessoais, incluindo:</p>
                <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                  <li>O direito de acesso, retificação ou exclusão de seus dados pessoais;</li>
                  <li>O direito de limitar ou se opor ao nosso processamento de seus dados;</li>
                  <li>O direito à portabilidade de dados;</li>
                  <li>O direito de retirar seu consentimento a qualquer momento.</li>
                </ul>
                <p className="text-neutral-600 mt-4">
                  Para exercer esses direitos, entre em contato conosco através de londonschoolmogi@gmail.com.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Segurança dos Dados
                </h2>
                <p className="text-neutral-600">
                  Implementamos medidas de segurança técnica e organizacional para proteger seus dados pessoais. Nos comprometemos a notificar você e qualquer autoridade aplicável de quaisquer brechas de segurança de acordo com a legislação vigente.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Alterações na Política de Privacidade
                </h2>
                <p className="text-neutral-600">
                  Nossa Política de Privacidade pode ser atualizada periodicamente. A versão mais atual será sempre publicada em nosso site, indicando a data da última revisão.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Contato
                </h2>
                <p className="text-neutral-600">
                  Se tiver dúvidas ou preocupações sobre nossa Política de Privacidade ou práticas de dados, por favor, entre em contato em{' '}
                  <a href="mailto:londonschoolmogi@gmail.com" className="text-[#1E3A8A] hover:text-[#1E3A8A]/80">
                    londonschoolmogi@gmail.com
                  </a>
                  . Estamos comprometidos em resolver quaisquer questões relacionadas à privacidade de nossos usuários e clientes.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 