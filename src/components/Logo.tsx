import { useState } from 'react';
import defaultLogo from '../assets/images/narok-logo.jpg';

interface LogoProps {
  tone?: 'dark' | 'light';
  src?: string;
  className?: string;
}

export function Logo({
  tone = 'dark',
  src = defaultLogo,
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
          width={1280}
          height={511}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
          className={
            imageLoaded
              ? 'h-auto w-32 sm:w-36 rounded-sm object-contain'
              : 'sr-only h-auto w-32 sm:w-36 object-contain'
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
