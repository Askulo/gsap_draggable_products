export interface Product {
  id: string
  image: string
  title: string
  description: string
  price: number
}

export interface GridProduct extends Product {
  gridId: string
}

export const products: Product[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=300&h=300&fit=crop',
    title: 'The Red Vase',
    description: 'A timeless piece of art, The Red Vase is crafted with elegance and simplicity.',
    price: 125.0,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1606933248051-5ce41e3b1e37?w=300&h=300&fit=crop',
    title: 'Azure Dream Vase',
    description: 'Inspired by the tranquility of the ocean, the Azure Dream Vase brings serene beauty.',
    price: 145.0,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1578987867-80fa62ca6f77?w=300&h=300&fit=crop',
    title: 'Classic White Elegance',
    description: 'Pure and pristine, the Classic White Elegance vase represents timeless beauty.',
    price: 99.99,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1589939705066-3d9e1b1fe31c?w=300&h=300&fit=crop',
    title: 'Golden Harmony',
    description: 'Luxurious and warm, the Golden Harmony vase brings opulence to your space.',
    price: 189.99,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1578887309792-401b690caf4b?w=300&h=300&fit=crop',
    title: 'Emerald Gardens',
    description: 'Fresh and vibrant, Emerald Gardens captures the essence of nature.',
    price: 135.0,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1578983888437-a4b66a1c9763?w=300&h=300&fit=crop',
    title: 'Twilight Essence',
    description: 'Mysterious and elegant, Twilight Essence features deep purple tones.',
    price: 155.0,
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1589330694657-c4ef91539304?w=300&h=300&fit=crop',
    title: 'Sunset Romance',
    description: 'Warm and inviting, Sunset Romance combines oranges and reds.',
    price: 129.99,
  },
]

export function generateGridProducts(): GridProduct[] {
  const gridProducts: GridProduct[] = []
  let gridIndex = 0

  for (let col = 0; col < 12; col++) {
    for (let row = 0; row < 5; row++) {
      const productId = (Math.floor(Math.random() * products.length) + 1).toString()
      const product = products.find(p => p.id === productId) || products[0]
      
      gridProducts.push({
        ...product,
        gridId: `grid-${gridIndex++}`,
      })
    }
  }

  return gridProducts
}
