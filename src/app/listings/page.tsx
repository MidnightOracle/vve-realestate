import { Metadata } from 'next';
import ListingsContent from './ListingsContent';

export const metadata: Metadata = {
  title: 'Luxury Properties | Victoria Villano Evans',
  description: 'Browse our exclusive collection of luxury properties in Palm Coast, FL',
};

export default function ListingsPage() {
  return <ListingsContent />;
} 