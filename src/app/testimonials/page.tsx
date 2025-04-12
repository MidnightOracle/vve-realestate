import { Metadata } from 'next';
import TestimonialsContent from './TestimonialsContent';

export const metadata: Metadata = {
  title: 'Client Testimonials | Victoria Villano Evans',
  description: 'See what our clients say about their experience working with Victoria Villano Evans',
};

export default function TestimonialsPage() {
  return <TestimonialsContent />;
} 