'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { properties } from '@/data/properties';
import { BedIcon, BathIcon, RulerIcon } from '@/components/Icons';
import Link from 'next/link';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const property = properties.find(p => p.id === Number(id));

  if (!property) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-serif mb-4">Property Not Found</h1>
        <Link href="/listings" className="btn btn-primary">
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <main>
      {/* Property Images */}
      <section className="relative h-[60vh]">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-serif mb-4">{property.title}</h1>
              <p className="text-2xl text-accent font-semibold mb-4">{property.price}</p>
              <p className="text-gray-600 mb-8">{property.address}</p>

              <div className="flex justify-between text-gray-600 mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <BedIcon className="h-6 w-6 mr-2" />
                  <span>{property.beds} Beds</span>
                </div>
                <div className="flex items-center">
                  <BathIcon className="h-6 w-6 mr-2" />
                  <span>{property.baths} Baths</span>
                </div>
                <div className="flex items-center">
                  <RulerIcon className="h-6 w-6 mr-2" />
                  <span>{property.sqft.toLocaleString()} Sq.Ft.</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <h2 className="text-2xl font-serif mb-4">Property Description</h2>
                <p className="text-gray-600">{property.description}</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
                <h2 className="text-2xl font-serif mb-6">Schedule a Viewing</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your Email"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your Phone"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      rows={4}
                      placeholder="I'm interested in viewing this property..."
                    />
                  </div>
                  <button type="submit" className="w-full btn btn-primary">
                    Request Viewing
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 