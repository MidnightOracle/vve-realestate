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
          src={property.images[0] || '/images/placeholder.jpg'}
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
              <p className="text-2xl text-accent font-semibold mb-4">${property.price.toLocaleString()}</p>
              <p className="text-gray-600 mb-8">{property.address}</p>

              {/* Key Details */}
              <div className="flex justify-between text-gray-600 mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <BedIcon className="h-6 w-6 mr-2" />
                  <span>{property.beds} Beds</span>
                </div>
                <div className="flex items-center">
                  <BathIcon className="h-6 w-6 mr-2" />
                  <span>{property.fullBaths + (property.halfBaths ? 0.5 : 0)} Baths</span>
                </div>
                <div className="flex items-center">
                  <RulerIcon className="h-6 w-6 mr-2" />
                  <span>{property.sqFt.toLocaleString()} Sq.Ft.</span>
                </div>
              </div>

              {/* Description */}
              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-serif mb-4">Property Description</h2>
                <p className="text-gray-600">{property.description}</p>
              </div>

              {/* Property Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-serif mb-4">Basic Information</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">MLS ID</dt>
                      <dd className="font-medium">{property.mlsId}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Year Built</dt>
                      <dd className="font-medium">{property.yearBuilt}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Lot Area</dt>
                      <dd className="font-medium">{property.lotArea} acres</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Property Type</dt>
                      <dd className="font-medium">{property.areaAndLot.propertyType}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Status</dt>
                      <dd className="font-medium">{property.areaAndLot.status}</dd>
                    </div>
                  </dl>
                </div>

                {/* Interior Features */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-serif mb-4">Interior Features</h3>
                  <dl className="space-y-4">
                    {property.interior.laundryRoom && (
                      <div>
                        <dt className="text-gray-600">Laundry Room</dt>
                        <dd className="font-medium">Yes</dd>
                      </div>
                    )}
                    {property.interior.appliances.length > 0 && (
                      <div>
                        <dt className="text-gray-600 mb-1">Appliances</dt>
                        <dd className="font-medium">
                          <ul className="list-disc list-inside">
                            {property.interior.appliances.map((appliance, index) => (
                              <li key={index}>{appliance}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    )}
                    {property.interior.flooring.length > 0 && (
                      <div>
                        <dt className="text-gray-600 mb-1">Flooring</dt>
                        <dd className="font-medium">
                          <ul className="list-disc list-inside">
                            {property.interior.flooring.map((floor, index) => (
                              <li key={index}>{floor}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Exterior Features */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-serif mb-4">Exterior Features</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Stories</dt>
                      <dd className="font-medium">{property.exterior.stories}</dd>
                    </div>
                    {property.exterior.pool && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Pool</dt>
                        <dd className="font-medium">{property.exterior.pool}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Air Conditioning</dt>
                      <dd className="font-medium">{property.exterior.airConditioning}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Heat Type</dt>
                      <dd className="font-medium">{property.exterior.heatType}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Water Source</dt>
                      <dd className="font-medium">{property.exterior.waterSource}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Sewer</dt>
                      <dd className="font-medium">{property.exterior.sewer}</dd>
                    </div>
                  </dl>
                </div>

                {/* Additional Features */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-serif mb-4">Additional Features</h3>
                  <dl className="space-y-4">
                    {property.exterior.securityFeatures.length > 0 && (
                      <div>
                        <dt className="text-gray-600 mb-1">Security Features</dt>
                        <dd className="font-medium">
                          <ul className="list-disc list-inside">
                            {property.exterior.securityFeatures.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    )}
                    {property.exterior.parking.length > 0 && (
                      <div>
                        <dt className="text-gray-600 mb-1">Parking</dt>
                        <dd className="font-medium">
                          <ul className="list-disc list-inside">
                            {property.exterior.parking.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    )}
                    {property.exterior.utilities.length > 0 && (
                      <div>
                        <dt className="text-gray-600 mb-1">Utilities</dt>
                        <dd className="font-medium">
                          <ul className="list-disc list-inside">
                            {property.exterior.utilities.map((utility, index) => (
                              <li key={index}>{utility}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
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