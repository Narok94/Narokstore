import { useEffect, useMemo, useState } from 'react';
import { Check, MessageCircle, X } from 'lucide-react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Benefits } from './components/Benefits';
import { Footer } from './components/Footer';
import { Header, type NavFilter } from './components/Header';
import { Hero } from './components/Hero';
import { HowToBuy } from './components/HowToBuy';
import { ProductGrid } from './components/ProductGrid';
import { buildWhatsAppLink, products } from './data/products';
import { formatInstallment, formatPrice } from './lib/format';
import type { Product } from './types';

const filterLabels: Record<NavFilter, string> = {
  all: 'Lançamentos',
  masculino: 'Masculino',
  feminino: 'Feminino',
  marcas: 'Todas as Marcas',
};

export default function App() {
  const [activeFilter, setActiveFilter] = useState<NavFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesFilter =
        activeFilter === 'all' ||
        activeFilter === 'marcas' ||
        (activeFilter === 'masculino' &&
          (product.category === 'masculino' || product.category === 'unissex')) ||
        (activeFilter === 'feminino' &&
          (product.category === 'feminino' || product.category === 'unissex'));

      if (!matchesFilter) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.brand.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [activeFilter, searchQuery]);

  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleResetFilters = () => {
    setActiveFilter('all');
    setSearchQuery('');
  };

  const sectionTitle = searchQuery.trim()
    ? `Resultados para "${searchQuery.trim()}"`
    : filterLabels[activeFilter];

  return (
    <div id="top" className="min-h-screen flex flex-col bg-white text-ink">
      <AnnouncementBar />

      <Header
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        onSelectFilter={setActiveFilter}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        <Hero onViewLaunches={() => setActiveFilter('all')} />

        <Benefits />

        <ProductGrid
          title={sectionTitle}
          products={filteredProducts}
          favorites={favorites}
          hasActiveFilter={activeFilter !== 'all' || searchQuery.trim().length > 0}
          onToggleFavorite={handleToggleFavorite}
          onResetFilters={handleResetFilters}
          onSelectProduct={setSelectedProduct}
        />

        <HowToBuy />
      </main>

      <Footer onSelectFilter={setActiveFilter} />

      {/* Prévia rápida do modelo com chamada direta no WhatsApp */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quickview-title"
        >
          <div
            className="fixed inset-0 bg-night/65 backdrop-blur-[2px]"
            onClick={() => setSelectedProduct(null)}
          />
          <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-lg bg-white border border-line shadow-2xl grid grid-cols-1 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              aria-label="Fechar prévia do produto"
              className="absolute top-3 right-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/90 text-ink hover:bg-surface transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
            </button>

            <div className="aspect-square bg-surface">
              <img
                src={selectedProduct.images[0]}
                alt={`${selectedProduct.brand} ${selectedProduct.name}`}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {selectedProduct.brand}
                </p>
                <h3
                  id="quickview-title"
                  className="mt-1 font-display font-black italic uppercase tracking-tight text-xl text-ink"
                >
                  {selectedProduct.name}
                </h3>

                <div className="mt-3 flex items-baseline gap-2.5 tabular-nums">
                  <span className="text-xl font-bold text-ink">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.oldPrice && (
                    <span className="text-sm text-muted line-through">
                      {formatPrice(selectedProduct.oldPrice)}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted tabular-nums">
                  {formatInstallment(selectedProduct.price)}
                </p>

                <p className="mt-4 text-sm text-muted leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink">
                    Numeração disponível
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedProduct.sizes.map((size) => (
                      <span
                        key={size}
                        className="inline-flex h-8 min-w-9 items-center justify-center rounded-sm border border-line bg-surface px-2 text-xs font-semibold text-ink tabular-nums"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line flex flex-col gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stock">
                  <Check className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                  {selectedProduct.inStock ? 'Disponível em estoque' : 'Sob consulta'}
                </span>

                <a
                  href={buildWhatsAppLink(
                    `Olá, NAROK STORE! Tenho interesse no ${selectedProduct.brand} ${selectedProduct.name}. Pode confirmar os tamanhos disponíveis?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-xs font-display font-extrabold italic uppercase tracking-wide text-white hover:bg-brand-dark transition-colors"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  Consultar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
