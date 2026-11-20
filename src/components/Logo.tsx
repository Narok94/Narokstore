import { useState } from 'react';

interface LogoProps {
  tone?: 'dark' | 'light';
  src?: string;
  className?: string;
}

export function Logo({
  tone = 'dark',
  src = '/logo.png',
  className = '',
}: LogoProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const isLight = tone === 'light';

  return (
    <span className={`inline-flex items-center ${className}`.trim()}>
      {!imageFailed && (
        <img
          src={src}
          alt="NAROK STORE"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
          className={
            imageLoaded
              ? 'h-9 w-auto object-contain'
              : 'sr-only h-9 w-auto object-contain'
          }
        />
      )}

      {!imageLoaded && (
        <span
          className={`inline-flex items-center gap-2 rounded-sm border-2 px-2.5 py-1 transition-colors ${
            isLight
              ? 'border-white/90 bg-night text-white'
              : 'border-night bg-white text-night'
          }`}
        >
          <span className="font-display text-lg sm:text-xl font-black italic uppercase tracking-tight leading-none">
            NAROK
          </span>
          <span
            className={`text-[9px] font-bold uppercase tracking-[0.26em] leading-none border-l pl-2 ${
              isLight ? 'border-white/30 text-brand-soft' : 'border-night/25 text-brand'
            }`}
          >
            STORE
          </span>
        </span>
      )}
    </span>
  );
}
