import { ArrowRight } from 'lucide-react';
import type { Product } from '../types';
import { Container } from './Container';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  title: string;
  products: Product[];
  favorites: string[];
  hasActiveFilter: boolean;
  onToggleFavorite: (productId: string) => void;
  onResetFilters: () => void;
  onSelectProduct?: (product: Product) => void;
}

export function ProductGrid({
  title,
  products,
  favorites,
  onToggleFavorite,
  onResetFilters,
  onSelectProduct,
}: ProductGridProps) {
  return (
    <section
      id="lancamentos"
      aria-labelledby="lancamentos-heading"
      className="py-14 sm:py-20 bg-white"
    >
      <Container>
        <div className="flex items-end justify-between gap-4 border-b border-line pb-5 mb-8 sm:mb-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              Curadoria Narok
            </p>
            <h2
              id="lancamentos-heading"
              className="mt-1 font-display font-black italic uppercase tracking-tight text-2xl sm:text-3xl lg:text-4xl text-ink"
            >
              {title}
            </h2>
            <div aria-hidden="true" className="mt-2 h-1 w-14 -skew-x-12 bg-brand rounded-xs" />
          </div>

          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wide text-brand hover:text-brand-dark transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            <span>Ver tudo</span>
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-line bg-surface px-6 py-14 text-center">
            <p className="text-base font-semibold text-ink">
              Nenhum tênis encontrado para essa busca.
            </p>
            <p className="mt-1 text-sm text-muted">
              Tente outro nome ou veja todos os lançamentos da vitrine.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md bg-brand px-6 py-2.5 text-xs font-display font-extrabold italic uppercase tracking-wide text-white hover:bg-brand-dark transition-colors cursor-pointer"
            >
              Ver todos os modelos
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
