import type { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/narok_hero_sneaker_1795176064446.jpg';

export const WHATSAPP_BASE_URL = 'https://wa.me/5535987074375';

export function buildWhatsAppLink(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export const products: Product[] = [
  {
    id: 'nike-air-force-low-panda',
    name: 'Air Force 1 Low Panda',
    brand: 'Nike',
    price: 799.9,
    images: ['/src/assets/images/narok_nike_panda_1795176064738.jpg'],
    sizes: [37, 38, 39, 40, 41, 42, 43, 44],
    colors: ['Branco', 'Preto'],
    category: 'masculino',
    badge: 'NOVO',
    description:
      'Clássico absoluto das ruas em couro granulado branco com contrastes em preto e entressola Air para uso diário.',
    inStock: true,
  },
  {
    id: 'adidas-gazelle-cobalt',
    name: 'Gazelle Suede Cobalt',
    brand: 'Adidas',
    price: 599.9,
    oldPrice: 749.9,
    images: ['/src/assets/images/narok_adidas_campus_1795176065347.jpg'],
    sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42],
    colors: ['Azul Cobalto', 'Branco'],
    category: 'unissex',
    badge: '-20%',
    description:
      'Camurça premium em azul cobalto com as três listras serrilhadas brancas e solado cupsole off-white de perfil baixo.',
    inStock: true,
  },
  {
    id: 'new-balance-550-navy',
    name: '550 Court White Navy',
    brand: 'New Balance',
    price: 899.9,
    images: ['/src/assets/images/narok_nb_550_1795176065209.jpg'],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: ['Branco', 'Azul Marinho', 'Cinza'],
    category: 'masculino',
    badge: 'ÚLTIMAS UNIDADES',
    description:
      'Silhueta retrô de basquete dos anos 80 com couro perfurado respirável, suporte firme no calcanhar e detalhes marinho.',
    inStock: true,
  },
  {
    id: 'puma-palermo-ice',
    name: 'Palermo Terrace Ice Blue',
    brand: 'Puma',
    price: 499.9,
    oldPrice: 629.9,
    images: ['/src/assets/images/narok_puma_palermo_1795176065669.jpg'],
    sizes: [35, 36, 37, 38, 39, 40, 41],
    colors: ['Azul Gelo', 'Branco', 'Goma'],
    category: 'feminino',
    badge: '-21%',
    description:
      'Estilo europeu de arquibancada em camurça azul gelo suave, formstrip em couro branco e sola gum natural.',
    inStock: true,
  },
  {
    id: 'asics-gel-kayano-royal',
    name: 'Gel-Kayano 14 Silver Royal',
    brand: 'Asics',
    price: 999.9,
    images: ['/src/assets/images/narok_asics_kayano_1795176064321.jpg'],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: ['Branco', 'Prata', 'Azul Royal'],
    category: 'unissex',
    badge: 'NOVO',
    description:
      'Runner técnico dos anos 2000 com malha aberta ultra respirável, painéis metalizados e amortecimento GEL no calcanhar.',
    inStock: true,
  },
  {
    id: 'vans-knu-skool-navy',
    name: 'Knu Skool Suede Navy',
    brand: 'Vans',
    price: 479.9,
    images: ['/src/assets/images/narok_vans_knu_navy_1795176064631.jpg'],
    sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
    colors: ['Azul Marinho', 'Branco'],
    category: 'feminino',
    description:
      'Shape robusto anos 90 com língua acolchoada, Sidestripe em relevo e solado waffle vulcanizado de alta aderência.',
    inStock: true,
  },
  {
    id: 'converse-chuck-70-noir',
    name: 'Chuck 70 High Canvas Noir',
    brand: 'Converse',
    price: 399.9,
    oldPrice: 499.9,
    images: ['/src/assets/images/narok_converse_black_1795176065642.jpg'],
    sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: ['Preto', 'Branco'],
    category: 'unissex',
    badge: '-20%',
    description:
      'Cano alto em lona encorpada preta, biqueira clássica envernizada e palmilha acolchoada para conforto prolongado.',
    inStock: true,
  },
  {
    id: 'mizuno-prophecy-cobalt',
    name: 'Wave Prophecy Sport Cobalt',
    brand: 'Mizuno',
    price: 1199.0,
    images: ['/src/assets/images/narok_mizuno_prophecy_1795176065290.jpg'],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ['Cinza Pérola', 'Preto', 'Azul Cobalto'],
    category: 'masculino',
    badge: 'NOVO',
    description:
      'Engenharia esportiva de alta performance com placa Infinity Wave em azul cobalto, mesh respirável e estrutura reforçada.',
    inStock: true,
  },
];
