import Image from 'next/image'
import Link from 'next/link'
import Carousel from '@/components/Carousel'

export default function Home() {
  const featuredProperties = [
    {
      id: 1,
      title: 'Oceanfront Villa',
      price: '$2.5M',
      image: '/images/property1.jpg',
      address: '123 Ocean Way, Palm Coast, FL',
      beds: 4,
      baths: 3.5,
      sqft: 3200,
    },
    {
      id: 2,
      title: 'Beachside Manor',
      price: '$3.2M',
      image: '/images/property2.jpg',
      address: '456 Coastal Drive, Palm Coast, FL',
      beds: 5,
      baths: 4,
      sqft: 4100,
    },
    {
      id: 3,
      title: 'Coastal Estate',
      price: '$4.1M',
      image: '/images/property3.jpg',
      address: '789 Beach Blvd, Palm Coast, FL',
      beds: 6,
      baths: 5.5,
      sqft: 5300,
    },
  ]

  const testimonials = [
    {
      id: 1,
      text: "Victoria's expertise in Palm Coast real estate is unmatched. She helped us find our dream home!",
      author: "Sarah Johnson",
      image: '/images/testimonial1.jpg',
    },
    {
      id: 2,
      text: "Professional, knowledgeable, and always available. Highly recommend Victoria for any real estate needs.",
      author: "Michael Smith",
      image: '/images/testimonial2.jpg',
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen">
        <Image
          src="/images/hero-beach.jpg"
          alt="Palm Coast Beach"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30">
          <div className="container h-full flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-5xl md:text-7xl font-serif mb-6">
              Victoria Villano Evans
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Palm Coast Realtor
            </p>
            <button className="btn btn-primary">Explore Properties</button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-6">Meet Victoria</h2>
              <p className="text-gray-600 mb-6">
                With over a decade of experience in Palm Coast real estate, Victoria Villano Evans brings unparalleled expertise and dedication to every client. Specializing in luxury properties and waterfront homes, she has consistently ranked among the top realtors in the area.
              </p>
              <Link href="/about" className="btn btn-primary inline-block">
                Learn More
              </Link>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/images/agent1.jpg"
                alt="Victoria Villano Evans"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-serif text-center mb-16">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <div key={property.id} className="relative group">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif">{property.title}</h3>
                    <p className="text-accent text-xl font-semibold mt-2">{property.price}</p>
                    <p className="text-gray-600 mt-2 text-sm">{property.address}</p>
                    <div className="flex items-center gap-3 mt-4 text-gray-600 text-sm">
                      <span>{property.beds} Beds</span>
                      <span>|</span>
                      <span>{property.baths} Baths</span>
                      <span>|</span>
                      <span>{property.sqft.toLocaleString()} Sq.Ft.</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/listings" className="btn btn-primary">
              View All Listings
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-serif text-center mb-16">What Clients Say</h2>
          <div className="relative pb-12">
            <Carousel
              items={testimonials.map(testimonial => (
                <div key={testimonial.id} className="px-4">
                  <div className="max-w-2xl mx-auto text-center">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <p className="text-xl italic mb-4">{testimonial.text}</p>
                    <p className="text-gray-600 mb-8">- {testimonial.author}</p>
                  </div>
                </div>
              ))}
            />
          </div>
          <div className="text-center mt-8">
            <Link href="/testimonials" className="btn btn-primary">
              Read More Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/images/logo.png"
                alt="Victoria Villano Evans"
                width={180}
                height={50}
                className="mb-4 invert"
              />
              <p className="text-gray-400">
                Your trusted Palm Coast real estate expert
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/listings" className="text-gray-400 hover:text-white">Listings</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/testimonials" className="text-gray-400 hover:text-white">Testimonials</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Palm Coast Pkwy</li>
                <li>Palm Coast, FL 32137</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: victoria@example.com</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Victoria Villano Evans. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
} 