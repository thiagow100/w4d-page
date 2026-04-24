import Hero from "@/components/Hero";
import Dores from "@/components/Dores";
import ServicosDetalhado from "@/components/ServicosDetalhado";
import BandaMarcas from "@/components/BandaMarcas";
import Credibilidade from "@/components/Credibilidade";
import FAQ from "@/components/FAQ";
import FormularioLead from "@/components/FormularioLead";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full bg-transparent relative">
      {/* O conteúdo das seções usa z-20 nativamente */}
      <div className="w-full relative z-20 flex flex-col">
        <Hero />
        <Dores />
        <ServicosDetalhado />
        <BandaMarcas />
        <Credibilidade />
        <FAQ />
        <FormularioLead />
        <Footer />
      </div>
    </main>
  );
}
