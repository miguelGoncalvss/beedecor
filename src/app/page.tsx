import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { FeaturedProducts } from "@/components/featured-products";
import { StorySection } from "@/components/story-section";
import { Footer } from "@/components/footer";
import { Gift, Box, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Entry Points with Isolated Groups */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gift Finder Entry */}
            <Link href="/presente" className="group/entry-gift">
              <div className="relative h-80 rounded-[48px] overflow-hidden bg-purple-deep flex items-center p-12 transition-transform duration-700 hover:scale-[1.02]">
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-honey/20 rounded-2xl flex items-center justify-center text-honey border border-honey/30">
                    <Gift className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading text-xl md:text-3xl font-bold text-white mb-2">Descoberta de Presente</h3>
                    <p className="text-cream/60 max-w-xs">Deixe a magia te guiar até o amigurumi perfeito para quem você ama.</p>
                  </div>
                  <div className="flex items-center gap-2 text-honey font-bold uppercase tracking-widest text-xs">
                    Começar Jornada <ArrowRight className="w-4 h-4 transition-transform group-hover/entry-gift:translate-x-2" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-honey/5 clip-hexagon rotate-12 translate-x-1/4" />
              </div>
            </Link>

            {/* Collections Entry */}
            <Link href="/colecoes" className="group/entry-col">
              <div className="relative h-80 rounded-[48px] overflow-hidden bg-white border border-border/50 flex items-center p-12 transition-transform duration-700 hover:scale-[1.02] shadow-sm hover:shadow-xl">
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-pastel-blue/20 rounded-2xl flex items-center justify-center text-primary border border-pastel-blue/30">
                    <Box className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading text-xl md:text-3xl font-bold text-primary mb-2">Nossas Coleções</h3>
                    <p className="text-muted-foreground max-w-xs">Mergulhe em universos temáticos curados com carinho.</p>
                  </div>
                  <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs">
                    Explorar Mundos <ArrowRight className="w-4 h-4 transition-transform group-hover/entry-col:translate-x-2" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-pastel-blue/10 clip-hexagon -rotate-12 translate-y-1/4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <FeaturedProducts />
      <StorySection />
      
      {/* Testimonials */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl font-bold text-primary mb-12">O que dizem nossos clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-border/50 hover:shadow-xl transition-shadow duration-500">
                <div className="flex text-honey mb-6 justify-center">
                  {[...Array(5)].map((_, star) => <Sparkles key={star} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-muted-foreground italic mb-8 leading-relaxed">
                  "O amigurumi que comprei é simplesmente maravilhoso. O acabamento é perfeito e dá para sentir o carinho em cada ponto. Uma verdadeira obra de arte."
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-pastel-blue/20 rounded-full flex items-center justify-center font-bold text-primary">M</div>
                  <div className="text-left">
                    <p className="font-bold text-primary text-sm">Maria Silva</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Cliente Verificada</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
