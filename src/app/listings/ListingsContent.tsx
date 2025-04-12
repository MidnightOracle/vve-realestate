'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { properties } from '@/data/properties';
import { BedIcon, BathIcon, RulerIcon } from '@/components/Icons';

export default function ListingsContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: ''
  });
  const [sortBy, setSortBy] = useState('price-asc');

  const filteredProperties = useMemo(() => {
    return properties
      .filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPrice = (!filters.minPrice || parseFloat(property.price.replace(/[^0-9.]/g, '')) >= parseFloat(filters.minPrice)) &&
          (!filters.maxPrice || parseFloat(property.price.replace(/[^0-9.]/g, '')) <= parseFloat(filters.maxPrice));

        const matchesBeds = !filters.beds || property.beds >= parseInt(filters.beds);
        const matchesBaths = !filters.baths || property.baths >= parseInt(filters.baths);

        return matchesSearch && matchesPrice && matchesBeds && matchesBaths;
      })
      .sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        
        switch (sortBy) {
          case 'price-asc':
            return priceA - priceB;
          case 'price-desc':
            return priceB - priceA;
          case 'beds':
            return b.beds - a.beds;
          case 'sqft':
            return b.sqft - a.sqft;
          default:
            return 0;
        }
      });
  }, [searchTerm, filters, sortBy]);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px]">
        <Image
          src="/images/hero-beach.jpg"
          alt="Palm Coast Properties"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container h-full flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              Luxury Properties
            </h1>
            <p className="text-xl max-w-2xl">
              Discover exceptional homes in Palm Coast's most desirable locations
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="number"
                placeholder="Min Price"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              />
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                value={filters.beds}
                onChange={(e) => setFilters(prev => ({ ...prev, beds: e.target.value }))}
              >
                <option value="">Min Beds</option>
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}+ Beds</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                value={filters.baths}
                onChange={(e) => setFilters(prev => ({ ...prev, baths: e.target.value }))}
              >
                <option value="">Min Baths</option>
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}+ Baths</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex justify-between items-center">
              <div className="text-gray-600">
                {filteredProperties.length} properties found
              </div>
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="beds">Most Bedrooms</option>
                <option value="sqft">Largest Size</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <Link href={`/listings/${property.id}`} key={property.id}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif mb-2">{property.title}</h3>
                    <p className="text-accent text-xl font-semibold mb-4">{property.price}</p>
                    <p className="text-gray-600 mb-4">{property.address}</p>
                    <div className="flex justify-between text-gray-600 mb-4">
                      <div className="flex items-center">
                        <BedIcon className="h-5 w-5 mr-2" />
                        <span>{property.beds} Beds</span>
                      </div>
                      <div className="flex items-center">
                        <BathIcon className="h-5 w-5 mr-2" />
                        <span>{property.baths} Baths</span>
                      </div>
                      <div className="flex items-center">
                        <RulerIcon className="h-5 w-5 mr-2" />
                        <span>{property.sqft.toLocaleString()} Sq.Ft.</span>
                      </div>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{property.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 