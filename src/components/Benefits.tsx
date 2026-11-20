import { Footprints, Layers, ShieldCheck } from 'lucide-react';
import { Container } from './Container';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Qualidade selecionada',
    description: 'Cada par passa por curadoria criteriosa de acabamento e materiais.',
  },
  {
    icon: Layers,
    title: 'Estilo para o seu dia',
    description: 'Silhuetas urbanas e clássicos indispensáveis para qualquer rolê.',
  },
  {
    icon: Footprints,
    title: 'Conforto e durabilidade',
    description: 'Construção pensada para acompanhar sua rotina com firmeza.',
  },
] as const;

export function Benefits() {
  return (
    <section
      aria-label="Diferenciais NAROK STORE"
      className="bg-white border-b border-line"
    >
      <Container className="py-8 sm:py-10">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {benefits.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand">
                <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-sm sm:text-base font-extrabold uppercase tracking-tight text-ink">
                  {title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-muted leading-relaxed">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
