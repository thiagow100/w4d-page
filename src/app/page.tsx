import Hero from "@/components/Hero";
import Dores from "@/components/Dores";
import Credibilidade from "@/components/Credibilidade";
import ServicosDetalhado from "@/components/ServicosDetalhado";
import MetodoW4 from "@/components/MetodoW4";
import FormularioLead from "@/components/FormularioLead";
import Footer from "@/components/Footer";
import AnimatedW4 from "@/components/AnimatedW4";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-hidden bg-transparent selection:bg-cta selection:text-white relative">
      {/* Elemento flutuante de design. Controla seu próprio z-index */}
      <AnimatedW4 />
      
      {/* O conteúdo das seções roda acima do AnimatedW4, usando z-20 para passar por cima das fases iniciais do Wzinho */}
      <div className="w-full relative z-20 flex flex-col">
        <Hero />
        <Dores />
        <Credibilidade />
        <ServicosDetalhado />
        <MetodoW4 />
        <FormularioLead />
        <Footer />
      </div>
    </main>
  );
}
