export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  image: string;
  featured: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Victoria's expertise in Palm Coast real estate is unmatched. She helped us find our dream home with ocean views and made the entire process seamless.",
    author: "Sarah Johnson",
    role: "Homeowner",
    image: '/images/testimonial1.jpg',
    featured: true
  },
  {
    id: 2,
    text: "Professional, knowledgeable, and always available. Victoria's understanding of the luxury market in Palm Coast helped us secure the perfect property.",
    author: "Michael Smith",
    role: "Property Investor",
    image: '/images/testimonial2.jpg',
    featured: true
  },
  {
    id: 3,
    text: "We couldn't be happier with our experience working with Victoria. Her attention to detail and negotiation skills are exceptional.",
    author: "Emily Davis",
    role: "First-time Buyer",
    image: '/images/testimonial1.jpg',
    featured: false
  },
  {
    id: 4,
    text: "Victoria's deep knowledge of Palm Coast's waterfront properties made our search for the perfect vacation home a breeze.",
    author: "Robert Wilson",
    role: "Vacation Home Owner",
    image: '/images/testimonial2.jpg',
    featured: false
  }
]; 