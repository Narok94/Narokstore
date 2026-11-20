import { Instagram, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../data/products';
import { Container } from './Container';
import type { NavFilter } from './Header';
import { Logo } from './Logo';

interface FooterProps {
  onSelectFilter: (filter: NavFilter) => void;
}

const paymentMethods = ['Pix', 'Cartão até 10x', 'Boleto'];

export function Footer({ onSelectFilter }: FooterProps) {
  const handleCategoryClick = (filter: NavFilter) => {
    onSelectFilter(filter);
    document.getElementById('lancamentos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-night border-t border-white/10 text-white">
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Sobre */}
          <div>
            <h3 className="font-display text-xs font-extrabold italic uppercase tracking-[0.16em] text-brand-soft">
              Sobre
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#top" className="hover:text-white transition-colors">
                  A Narok Store
                </a>
              </li>
              <li>
                <a href="#lancamentos" className="hover:text-white transition-colors">
                  Qualidade selecionada
                </a>
              </li>
              <li>
                <a href="#como-comprar" className="hover:text-white transition-colors">
                  Como funciona o pedido
                </a>
              </li>
            </ul>
          </div>

          {/* Ajuda */}
          <div>
            <h3 className="font-display text-xs font-extrabold italic uppercase tracking-[0.16em] text-brand-soft">
              Ajuda
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#como-comprar" className="hover:text-white transition-colors">
                  Como comprar
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink(
                    'Olá! Gostaria de ajuda para escolher minha numeração na NAROK STORE.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Guia de numeração
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink(
                    'Olá! Gostaria de informações sobre envio e prazos.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Envio e prazos
                </a>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-display text-xs font-extrabold italic uppercase tracking-[0.16em] text-brand-soft">
              Categorias
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lançamentos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('masculino')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Masculino
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('feminino')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Feminino
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('marcas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Marcas
                </button>
              </li>
            </ul>
          </div>

          {/* Redes sociais */}
          <div>
            <h3 className="font-display text-xs font-extrabold italic uppercase tracking-[0.16em] text-brand-soft">
              Redes sociais
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <a
                  href="https://instagram.com/narok.storebr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Instagram className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span>@narok.storebr</span>
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink(
                    'Olá, NAROK STORE! Vim pelo site e gostaria de falar com um atendente.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span>WhatsApp Oficial</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha final: logo, copyright e pagamento */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Logo tone="light" />
            <p className="text-xs text-slate-400">
              © 2026 Narok Store. Todos os direitos reservados.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2" aria-label="Formas de pagamento">
            <span className="text-xs text-slate-400 mr-1">Pagamento:</span>
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-sm border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-200"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
