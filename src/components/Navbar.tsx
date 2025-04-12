'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) { // scroll down
          setIsVisible(false);
        } else { // scroll up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav className={`fixed w-full bg-white/90 backdrop-blur-sm z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Victoria Villano Evans"
            width={180}
            height={50}
            className="h-12 w-auto"
          />
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-accent">Home</Link>
          <Link href="/listings" className="text-gray-700 hover:text-accent">Listings</Link>
          <Link href="/testimonials" className="text-gray-700 hover:text-accent">Testimonials</Link>
          <Link href="/about" className="text-gray-700 hover:text-accent">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-accent">Contact</Link>
        </div>
      </div>
    </nav>
  )
} 