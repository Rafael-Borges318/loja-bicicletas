import { Product } from '../types/product.types';

export const mockProducts: Product[] = [
  {
    id: "prod_mb1",
    name: "Mountain Explorer Pro - Green Edition",
    slug: "mountain-explorer-pro-green",
    description: "A mountain bike premium com quadro super leve de fibra de carbono em acabamento verde escuro fosco e preto. Suspensão dianteira e traseira ajustáveis para encarar qualquer trilha com máxima performance.",
    price: 15499.00,
    stock: 12,
    category: "Mountain Bike",
    images: ["/images/mountain_bike.png"],
    is_featured: true,
    is_active: true
  },
  {
    id: "prod_sb1",
    name: "Aero Speed Carbon - Neon Volt",
    slug: "aero-speed-carbon-neon",
    description: "Desempenho aerodinâmico imbatível. Esta bicicleta de estrada possui um design elegante em verde neon que corta o vento, ideal para competições e longas distâncias em asfalto.",
    price: 22990.00,
    stock: 5,
    category: "Speed/Road",
    images: ["/images/speed_bike.png"],
    is_featured: true,
    is_active: true
  },
  {
    id: "prod_ub1",
    name: "City Commuter Classic - Pastel Green",
    slug: "city-commuter-classic-pastel",
    description: "Perfeita para a mobilidade urbana diária. A City Commuter combina estilo retrô com tecnologia moderna. Seu quadro verde pastel elegante e cesta frontal são perfeitos para o dia a dia na cidade.",
    price: 4500.00,
    stock: 25,
    category: "Urbana",
    images: ["/images/urban_bike.png"],
    is_featured: true,
    is_active: true
  },
  {
    id: "prod_mb2",
    name: "Trail Blazer Elite XT",
    slug: "trail-blazer-elite-xt",
    description: "Bicicleta ideal para iniciantes avançados em trilhas. Quadro de alumínio super resistente e suspensão de 100mm. Cor verde oliva que se camufla na natureza.",
    price: 7890.00,
    stock: 18,
    category: "Mountain Bike",
    images: ["/images/mountain_bike.png"], // Reusing the high-quality image as placeholder
    is_featured: false,
    is_active: true
  },
  {
    id: "prod_sb2",
    name: "Roadster Veloce 2026",
    slug: "roadster-veloce-2026",
    description: "Velocidade e conforto em um único pacote. O quadro de carbono absorve as vibrações da estrada e a transmissão de 24 marchas oferece controle total.",
    price: 18500.00,
    stock: 8,
    category: "Speed/Road",
    images: ["/images/speed_bike.png"],
    is_featured: false,
    is_active: true
  },
  {
    id: "prod_ub2",
    name: "Eco Rider City Foldable",
    slug: "eco-rider-city-foldable",
    description: "Bicicleta dobrável ultra compacta, ideal para quem precisa combinar pedal com transporte público. Leve, ágil e em um tom vibrante de verde maçã.",
    price: 3200.00,
    stock: 30,
    category: "Urbana",
    images: ["/images/urban_bike.png"],
    is_featured: false,
    is_active: true
  }
];
