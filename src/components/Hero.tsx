import { useEffect, useState } from 'react';
import { ArrowDownRight, MessageCircle, Pause, Play } from 'lucide-react';
import { HERO_IMAGE, buildWhatsAppLink } from '../data/products';
import { Button } from './Button';
import { Container } from './Container';
import './Hero.css';

const scenes = [
  {
    image: '/src/assets/images/hero_sneaker_streetwear_1795175529726.jpg',
    title: 'Streetwear',
    alt: 'Tênis branco e caramelo sobre concreto, iluminado pelo sol.',
  },
  {
    image: HERO_IMAGE,
    title: 'Em estúdio',
    alt: 'Tênis branco e preto suspenso sob uma luz azul.',
  },
];

export function Hero({ onViewLaunches }: { onViewLaunches: () => void }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => { if (media.matches) setPlaying(false); };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(current => (current + 1) % scenes.length);
    }, 7500);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <section className="collection-hero" aria-label="Destaques da nova coleção">
      <div className="collection-photos" data-playing={playing}>
        {scenes.map((scene, index) => (
          <img key={scene.title} src={scene.image} alt={scene.alt}
            aria-hidden={active !== index} data-active={active === index}
            fetchPriority={index === 0 ? 'high' : 'low'} />
        ))}
      </div>
      <Container className="collection-layout">
        <div className="collection-copy">
          <p className="collection-kicker">Nova coleção</p>
          <h1>Seu estilo.<br /><em>Suas regras.</em></h1>
          <p className="collection-description">Tênis das marcas que você ama, com atendimento direto no WhatsApp.</p>
          <div className="collection-actions">
            <Button size="lg" href="#lancamentos" onClick={onViewLaunches}>
              Ver lançamentos <ArrowDownRight size={16} aria-hidden="true" />
            </Button>
            <a className="collection-contact" target="_blank" rel="noopener noreferrer"
              href={buildWhatsAppLink('Olá! Vim pela vitrine da NAROK STORE e quero ver os modelos disponíveis.')}>
              <MessageCircle size={17} aria-hidden="true" /> Chamar no WhatsApp
            </a>
          </div>
        </div>
        <div className="collection-controls" role="group" aria-label="Controles das fotos em destaque">
          <div className="collection-scenes">
            {scenes.map((scene, index) => (
              <button key={scene.title} type="button" aria-pressed={active === index}
                onClick={() => { setActive(index); setPlaying(false); }}>
                {scene.title}
              </button>
            ))}
          </div>
          <button className="collection-play" type="button"
            aria-label={playing ? 'Pausar troca de fotos' : 'Reproduzir fotos'}
            onClick={() => setPlaying(current => !current)}>
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
      </Container>
    </section>
  );
}
