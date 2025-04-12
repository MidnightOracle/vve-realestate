export interface Property {
  id: number;
  title: string;
  price: string;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  description: string;
  featured: boolean;
}

export const properties: Property[] = [
  {
    id: 1,
    title: 'Oceanfront Villa',
    price: '$2.5M',
    image: '/images/property1.jpg',
    beds: 4,
    baths: 4.5,
    sqft: 4200,
    address: '123 Ocean Drive, Palm Coast, FL',
    description: 'Stunning oceanfront villa with panoramic views of the Atlantic. Features include a gourmet kitchen, private beach access, and infinity pool.',
    featured: true
  },
  {
    id: 2,
    title: 'Beachside Manor',
    price: '$3.2M',
    image: '/images/property2.jpg',
    beds: 5,
    baths: 5.5,
    sqft: 5500,
    address: '456 Coastal Highway, Palm Coast, FL',
    description: 'Elegant beachside manor with Mediterranean architecture. Includes wine cellar, home theater, and expansive outdoor living space.',
    featured: true
  },
  {
    id: 3,
    title: 'Coastal Estate',
    price: '$4.1M',
    image: '/images/property3.jpg',
    beds: 6,
    baths: 6.5,
    sqft: 6800,
    address: '789 Palm Harbor Way, Palm Coast, FL',
    description: 'Luxurious coastal estate on 2 acres. Features include a guest house, private dock, and resort-style pool with summer kitchen.',
    featured: true
  }
]; 