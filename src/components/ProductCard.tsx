import { useState } from 'react';
import { Heart, ImageOff } from 'lucide-react';
import { formatInstallment, formatPrice } from '../lib/format';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onSelect?: (product: Product) => void;
}

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group relative flex flex-col">
      {/* Área da imagem quadrada */}
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-surface">
        <a
          href={`#produto-${product.id}`}
          onClick={(e) => {
            e.preventDefault();
            onSelect?.(product);
          }}
          aria-label={`Ver ${product.brand} ${product.name}`}
          className="block h-full w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {!imageError && product.images[0] ? (
            <img
              src={product.images[0]}
              alt={`${product.brand} ${product.name}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-muted">
              <ImageOff className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-xs font-medium">{product.name}</span>
            </div>
          )}
        </a>

        {/* Badge azul superior esquerdo */}
        {product.badge && (
          <span className="pointer-events-none absolute top-2.5 left-2.5 rounded-sm bg-brand px-2 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider leading-none text-white">
            {product.badge}
          </span>
        )}

        {/* Botão de favorito no canto superior direito */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remover ${product.name} dos favoritos`
              : `Adicionar ${product.name} aos favoritos`
          }
          className="absolute top-2 right-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/90 backdrop-blur-xs text-ink hover:text-brand transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand cursor-pointer"
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-200 ${
              isFavorite ? 'fill-brand text-brand' : ''
            }`}
            strokeWidth={1.85}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Informações do produto */}
      <a
        href={`#produto-${product.id}`}
        onClick={(e) => {
          e.preventDefault();
          onSelect?.(product);
        }}
        className="mt-3.5 flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          {product.brand}
        </p>

        <h3 className="mt-1 text-sm sm:text-base font-semibold text-ink leading-snug line-clamp-2 group-hover:text-brand transition-colors duration-200">
          {product.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-baseline gap-2 tabular-nums">
          <span className="text-sm sm:text-base font-bold text-ink">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-muted tabular-nums">
          {formatInstallment(product.price)}
        </p>
      </a>
    </article>
  );
}
