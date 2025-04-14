'use client';

import { useState, FormEvent } from 'react';

export default function AdminDashboard() {
  const [propertyData, setPropertyData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    images: null as FileList | null
  });

  const [testimonialData, setTestimonialData] = useState({
    author: '',
    role: '',
    text: '',
    image: null as File | null,
    featured: false
  });

  const [status, setStatus] = useState({
    message: '',
    type: '' as 'success' | 'error' | ''
  });

  const handlePropertySubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ message: 'Submitting...', type: '' });

    try {
      const formData = new FormData();
      formData.append('title', propertyData.title);
      formData.append('price', propertyData.price);
      formData.append('location', propertyData.location);
      formData.append('description', propertyData.description);
      if (propertyData.images) {
        Array.from(propertyData.images).forEach(image => {
          formData.append('images', image);
        });
      }

      const response = await fetch('/api/properties', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ message: 'Property added successfully!', type: 'success' });
        setPropertyData({
          title: '',
          price: '',
          location: '',
          description: '',
          images: null
        });
      } else {
        throw new Error(data.error || 'Failed to add property');
      }
    } catch (error) {
      setStatus({ 
        message: error instanceof Error ? error.message : 'Failed to add property', 
        type: 'error' 
      });
    }
  };

  const handleTestimonialSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ message: 'Submitting...', type: '' });

    try {
      const formData = new FormData();
      formData.append('author', testimonialData.author);
      formData.append('role', testimonialData.role);
      formData.append('text', testimonialData.text);
      formData.append('featured', testimonialData.featured.toString());
      if (testimonialData.image) {
        formData.append('image', testimonialData.image);
      }

      const response = await fetch('/api/testimonials', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ message: 'Testimonial added successfully!', type: 'success' });
        setTestimonialData({
          author: '',
          role: '',
          text: '',
          image: null,
          featured: false
        });
      } else {
        throw new Error(data.error || 'Failed to add testimonial');
      }
    } catch (error) {
      setStatus({ 
        message: error instanceof Error ? error.message : 'Failed to add testimonial', 
        type: 'error' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Property Management Dashboard</h1>
        
        {status.message && (
          <div className={`mb-6 p-4 rounded-md ${
            status.type === 'success' ? 'bg-green-100 text-green-700' : 
            status.type === 'error' ? 'bg-red-100 text-red-700' : 
            'bg-gray-100 text-gray-700'
          }`}>
            {status.message}
          </div>
        )}

        {/* Property Listing Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Add New Property Listing</h2>
          <form className="space-y-4" onSubmit={handlePropertySubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={propertyData.title}
                onChange={(e) => setPropertyData({...propertyData, title: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={propertyData.price}
                onChange={(e) => setPropertyData({...propertyData, price: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={propertyData.location}
                onChange={(e) => setPropertyData({...propertyData, location: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
                value={propertyData.description}
                onChange={(e) => setPropertyData({...propertyData, description: e.target.value})}
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
              <input 
                type="file" 
                multiple 
                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                accept="image/*"
                onChange={(e) => setPropertyData({...propertyData, images: e.target.files})}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Add Property
            </button>
          </form>
        </div>

        {/* Testimonial Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">Add New Testimonial</h2>
          <form className="space-y-4" onSubmit={handleTestimonialSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={testimonialData.author}
                onChange={(e) => setTestimonialData({...testimonialData, author: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role/Title</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={testimonialData.role}
                onChange={(e) => setTestimonialData({...testimonialData, role: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Text</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
                value={testimonialData.text}
                onChange={(e) => setTestimonialData({...testimonialData, text: e.target.value})}
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author Image</label>
              <input 
                type="file" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                accept="image/*"
                onChange={(e) => setTestimonialData({...testimonialData, image: e.target.files?.[0] || null})}
                required
              />
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2"
                checked={testimonialData.featured}
                onChange={(e) => setTestimonialData({...testimonialData, featured: e.target.checked})}
              />
              <label className="text-sm text-gray-700">Feature this testimonial</label>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Add Testimonial
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 