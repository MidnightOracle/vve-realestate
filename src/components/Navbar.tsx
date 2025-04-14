'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) { // scroll down
          setIsVisible(false);
        } else { // scroll up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
        setIsScrolled(window.scrollY > 50);
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } ${isScrolled ? 'bg-white/90 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Victoria Villano Evans"
            width={180}
            height={50}
            className={`h-12 w-auto ${isScrolled ? '' : 'invert brightness-0'}`}
          />
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link href="/" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-accent transition-colors`}>Home</Link>
          <Link href="/listings" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-accent transition-colors`}>Listings</Link>
          <Link href="/testimonials" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-accent transition-colors`}>Testimonials</Link>
          <Link href="/about" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-accent transition-colors`}>About</Link>
          <Link href="/contact" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-accent transition-colors`}>Contact</Link>
        </div>
      </div>
    </nav>
  )
} 