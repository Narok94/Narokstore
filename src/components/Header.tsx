import { useEffect, useRef, useState } from 'react';
import { Menu, MessageCircle, Search, ShoppingBag, X } from 'lucide-react';
import { buildWhatsAppLink } from '../data/products';
import { Container } from './Container';
import { Logo } from './Logo';

export type NavFilter = 'all' | 'masculino' | 'feminino' | 'marcas';

interface HeaderProps {
  activeFilter: NavFilter;
  searchQuery: string;
  onSelectFilter: (filter: NavFilter) => void;
  onSearchChange: (query: string) => void;
}

const navItems: (
  | { label: string; type: 'filter'; filter: NavFilter }
  | { label: string; type: 'anchor'; href: string }
)[] = [
  { label: 'Lançamentos', type: 'filter', filter: 'all' },
  { label: 'Masculino', type: 'filter', filter: 'masculino' },
  { label: 'Feminino', type: 'filter', filter: 'feminino' },
  { label: 'Marcas', type: 'filter', filter: 'marcas' },
  { label: 'Como comprar', type: 'anchor', href: '#como-comprar' },
];

export function Header({
  activeFilter,
  searchQuery,
  onSelectFilter,
  onSearchChange,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchOpen(false);
        setBagOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFilterClick = (filter: NavFilter) => {
    onSelectFilter(filter);
    setMobileMenuOpen(false);
    document.getElementById('lancamentos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnchorClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-line">
        <Container>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 gap-4">
            {/* Esquerda: Hambúrguer mobile / links desktop */}
            <div className="flex items-center justify-start min-w-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Abrir menu de navegação"
                aria-expanded={mobileMenuOpen}
                className="lg:hidden -ml-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-night hover:bg-surface transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand cursor-pointer"
              >
                <Menu className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
              </button>

              <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-5">
                {navItems.map((item) => {
                  if (item.type === 'anchor') {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleAnchorClick(item.href);
                        }}
                        className="text-sm font-medium text-muted hover:text-brand whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-brand/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                      >
                        {item.label}
                      </a>
                    );
                  }

                  const isActive = activeFilter === item.filter;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleFilterClick(item.filter)}
                      className={`text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${
                        isActive
                          ? 'border-brand text-brand font-semibold'
                          : 'border-transparent text-muted hover:text-ink hover:border-brand/40'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Centro: Logo */}
            <div className="flex items-center justify-center">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectFilter('all');
                  onSearchChange('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label="NAROK STORE — Ir para o início"
                className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                <Logo tone="dark" />
              </a>
            </div>

            {/* Direita: Busca e Sacola */}
            <div className="flex items-center justify-end gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                aria-label="Buscar tênis"
                aria-expanded={searchOpen}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-night hover:bg-surface hover:text-brand transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand cursor-pointer"
              >
                {searchOpen ? (
                  <X className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
                ) : (
                  <Search className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setBagOpen(true)}
                aria-label="Abrir sacola, 0 itens"
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-md text-night hover:bg-surface hover:text-brand transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand cursor-pointer"
              >
                <ShoppingBag className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-sm bg-brand px-1 text-[10px] font-bold leading-none text-white tabular-nums"
                >
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Barra de busca expansível */}
          {searchOpen && (
            <div className="border-t border-line py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  document.getElementById('lancamentos')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-3"
              >
                <div className="relative flex-1">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted"
                    aria-hidden="true"
                  />
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Buscar por modelo ou marca (ex.: Nike, Gazelle, 550)..."
                    aria-label="Buscar por modelo ou marca"
                    className="w-full h-11 rounded-md border border-line bg-surface pl-10 pr-4 text-sm text-ink placeholder:text-muted focus:border-brand focus:bg-white focus:outline-none"
                  />
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="h-11 px-4 rounded-md border border-line text-xs font-semibold uppercase tracking-wide text-ink hover:bg-surface transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Limpar
                  </button>
                )}
              </form>
            </div>
          )}
        </Container>
      </header>

      {/* Drawer lateral mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div
            className="fixed inset-0 bg-night/60 backdrop-blur-[2px]"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-full max-w-xs bg-white border-r border-line shadow-xl flex flex-col">
            <div className="flex items-center justify-between h-16 px-5 border-b border-line">
              <Logo tone="dark" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Fechar menu"
                className="inline-flex h-11 w-11 -mr-2 items-center justify-center rounded-md text-night hover:bg-surface transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Menu mobile" className="flex-1 overflow-y-auto p-5">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  if (item.type === 'anchor') {
                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAnchorClick(item.href);
                          }}
                          className="w-full flex items-center rounded-md px-3 py-3.5 text-base font-semibold text-ink hover:bg-surface hover:text-brand transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  }

                  const isActive = activeFilter === item.filter;
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => handleFilterClick(item.filter)}
                        className={`w-full flex items-center justify-between rounded-md px-3 py-3.5 text-left text-base font-semibold transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-brand-soft text-brand'
                            : 'text-ink hover:bg-surface'
                        }`}
                      >
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-5 border-t border-line bg-surface">
              <a
                href={buildWhatsAppLink(
                  'Olá! Vim pela vitrine da NAROK STORE e gostaria de atendimento.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-xs font-display font-extrabold italic uppercase tracking-wide text-white hover:bg-brand-dark transition-colors"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chamar no WhatsApp
              </a>
            </div>
          </aside>
        </div>
      )}

      {/* Drawer lateral da sacola (fixa em 0 nesta etapa) */}
      {bagOpen && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Sacola de compras"
        >
          <div
            className="fixed inset-0 bg-night/60 backdrop-blur-[2px]"
            onClick={() => setBagOpen(false)}
          />
          <aside className="fixed inset-y-0 right-0 w-full max-w-sm bg-white border-l border-line shadow-xl flex flex-col">
            <div className="flex items-center justify-between h-16 px-6 border-b border-line">
              <h2 className="font-display font-extrabold italic uppercase text-base tracking-tight text-ink">
                Sua Sacola (0)
              </h2>
              <button
                type="button"
                onClick={() => setBagOpen(false)}
                aria-label="Fechar sacola"
                className="inline-flex h-11 w-11 -mr-2 items-center justify-center rounded-md text-night hover:bg-surface transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-brand-soft text-brand">
                <ShoppingBag className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <p className="mt-4 text-base font-semibold text-ink">
                Sua sacola está vazia
              </p>
              <p className="mt-1.5 text-sm text-muted max-w-xs">
                Escolha o seu tênis na vitrine ou chame nossa equipe no WhatsApp para fechar o seu pedido.
              </p>
              <button
                type="button"
                onClick={() => {
                  setBagOpen(false);
                  handleFilterClick('all');
                }}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-md bg-brand px-6 py-3 text-xs font-display font-extrabold italic uppercase tracking-wide text-white hover:bg-brand-dark transition-colors cursor-pointer"
              >
                Ver lançamentos
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
