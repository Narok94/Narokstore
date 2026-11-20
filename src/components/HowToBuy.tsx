import { MessageCircle, Ruler, Search } from 'lucide-react';
import { buildWhatsAppLink } from '../data/products';
import { Button } from './Button';
import { Container } from './Container';

const steps = [
  {
    number: '1',
    icon: Search,
    title: 'ESCOLHA O SEU TÊNIS',
    description:
      'Veja os modelos na nossa vitrine ou chame a gente com o tênis que você já tem em mente.',
  },
  {
    number: '2',
    icon: Ruler,
    title: 'CONFIRA O TAMANHO',
    description: 'Consulte a numeração ideal para você.',
  },
  {
    number: '3',
    icon: MessageCircle,
    title: 'FALE NO WHATSAPP',
    description:
      'Tire suas dúvidas, confirme a disponibilidade e finalize o seu pedido.',
  },
] as const;

export function HowToBuy() {
  return (
    <section
      id="como-comprar"
      aria-labelledby="como-comprar-heading"
      className="relative overflow-hidden bg-night text-white py-16 sm:py-24"
    >
      {/* Faixas diagonais azuis sutis */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-12 h-[140%] w-28 sm:w-44 -skew-x-18 bg-brand/10 border-l border-brand/20" />
        <div className="hidden sm:block absolute -top-20 right-36 h-[140%] w-5 -skew-x-18 bg-brand/20" />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-soft">
            Atendimento personalizado
          </p>
          <h2
            id="como-comprar-heading"
            className="mt-2 font-display font-black italic uppercase tracking-tight text-3xl sm:text-4xl lg:text-5xl text-white"
          >
            COMO COMPRAR
          </h2>
          <div aria-hidden="true" className="mx-auto mt-3 h-1 w-20 -skew-x-12 bg-brand rounded-xs" />
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            É rápido, fácil e seguro!
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <li
              key={number}
              className="relative rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-7 flex flex-col justify-between transition-colors duration-200 hover:border-brand/60"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  {/* Número grande em bloco azul inclinado à esquerda */}
                  <div className="inline-flex h-12 w-12 items-center justify-center -skew-x-12 rounded-sm bg-brand shadow-[0_6px_20px_rgba(10,92,255,0.4)]">
                    <span className="skew-x-12 font-display text-2xl font-black italic text-white tabular-nums">
                      {number}
                    </span>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-brand-soft">
                    <Icon className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
                  </div>
                </div>

                <h3 className="mt-6 font-display text-lg sm:text-xl font-extrabold italic uppercase tracking-tight text-white">
                  {title}
                </h3>

                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <Button
            variant="whatsappGlow"
            size="lg"
            href={buildWhatsAppLink(
              'Olá, NAROK STORE! Quero escolher meu tênis e tirar dúvidas pelo WhatsApp.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-sm sm:text-base"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            CHAME NO WHATSAPP
          </Button>
        </div>
      </Container>
    </section>
  );
}
