import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { HERO_IMAGE, buildWhatsAppLink } from '../data/products';
import { Button } from './Button';
import { Container } from './Container';

interface HeroProps {
  onViewLaunches: () => void;
}

export function Hero({ onViewLaunches }: HeroProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      aria-label="Destaque da nova coleção NAROK STORE"
      className="relative overflow-hidden bg-night text-white min-h-[70vh] lg:min-h-[80vh] flex items-center py-14 sm:py-16 lg:py-20"
    >
      {/* Faixas diagonais azuis sutis nas pontas */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-20 h-[140%] w-28 sm:w-44 -skew-x-18 bg-brand/15 border-r border-brand/25" />
        <div className="hidden sm:block absolute -top-24 left-36 h-[140%] w-6 -skew-x-18 bg-brand/25" />
        <div className="absolute -bottom-24 -right-16 h-[140%] w-36 sm:w-64 -skew-x-18 bg-brand/12 border-l border-brand/25" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8">
          {/* Texto à esquerda */}
          <div className="lg:col-span-6 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-soft">
              NOVA COLEÇÃO
            </p>

            <h1 className="mt-3 font-display font-black italic uppercase tracking-tight leading-[0.94] text-[clamp(2.65rem,6vw,4.75rem)]">
              <span className="block text-white">SEU ESTILO.</span>
              <span className="relative inline-block text-brand mt-1">
                SUAS REGRAS.
                {/* Pincelada azul embaixo */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 280 14"
                  fill="none"
                  className="mt-1.5 w-48 sm:w-64 h-3 text-brand"
                >
                  <path
                    d="M3 9.5C72 3.5 186 2 277 6.5"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base lg:text-lg text-white/80 max-w-md leading-relaxed">
              Tênis das marcas que você ama, com atendimento direto no WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                href="#lancamentos"
                onClick={onViewLaunches}
              >
                Ver lançamentos
              </Button>
              <Button
                variant="heroSecondary"
                size="lg"
                href={buildWhatsAppLink(
                  'Olá! Vim pela vitrine da NAROK STORE e quero ver os modelos disponíveis.',
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Chamar no WhatsApp
              </Button>
            </div>
          </div>

          {/* Sneaker em destaque à direita com brilho azul */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96 rounded-full bg-brand/35 blur-3xl"
            />
            <div className="relative w-full max-w-lg aspect-4/3 overflow-hidden rounded-lg border border-white/10 bg-night/60">
              {!imageError ? (
                <img
                  src={HERO_IMAGE}
                  alt="Tênis streetwear branco e preto em destaque com iluminação azul"
                  loading="eager"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/20 to-night p-8 text-center">
                  <span className="font-display font-black italic uppercase text-2xl text-white/70">
                    NAROK STORE
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
