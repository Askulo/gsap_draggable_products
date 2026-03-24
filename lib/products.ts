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
    image: '/public/img-1.png',
    title: 'The Red Vase',
    description: 'A timeless piece of art, The Red Vase is crafted with elegance and simplicity. Its bold crimson finish adds a touch of warmth and sophistication to any space, making it a perfect centerpiece for your living room, dining table, or office.',
    price: 125.0,
  },
  {
    id: '2',
    image: '/public/img-2.png',
    title: 'Azure Dream Vase',
    description: 'Inspired by the tranquility of the ocean, the Azure Dream Vase brings a serene blue aesthetic to your home. Perfect for modern interiors seeking a contemporary touch.',
    price: 145.0,
  },
  {
    id: '3',
    image: '/public/img-3.png',
    title: 'Classic White Elegance',
    description: 'Pure and pristine, the Classic White Elegance vase represents timeless beauty. Its minimalist design complements any decor style while making a subtle statement.',
    price: 99.99,
  },
  {
    id: '4',
    image: '/public/img-4.png',
    title: 'Golden Harmony',
    description: 'Luxurious and warm, the Golden Harmony vase brings opulence to your space. Its intricate golden tones create an atmosphere of sophistication and wealth.',
    price: 189.99,
  },
  {
    id: '5',
    image: '/public/img-5.png',
    title: 'Emerald Gardens',
    description: 'Fresh and vibrant, Emerald Gardens captures the essence of nature. Its deep green hue brings life and vitality to any room, perfect for plant lovers.',
    price: 135.0,
  },
  {
    id: '6',
    image: '/public/img-6.png',
    title: 'Twilight Essence',
    description: 'Mysterious and elegant, Twilight Essence features deep purple tones that evoke a sense of magic and wonder. Ideal for creating an intimate atmosphere.',
    price: 155.0,
  },
  {
    id: '7',
    image: '/public/img-7.png',
    title: 'Sunset Romance',
    description: 'Warm and inviting, Sunset Romance combines oranges and reds to create a cozy ambiance. Perfect for those who appreciate warm earth tones.',
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
