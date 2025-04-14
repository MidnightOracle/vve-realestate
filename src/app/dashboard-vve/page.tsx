'use client';

import { useState, FormEvent } from 'react';

export default function AdminDashboard() {
  const [propertyData, setPropertyData] = useState({
    title: '',
    price: '',
    address: '',
    location: '',
    description: '',
    beds: '',
    fullBaths: '',
    halfBaths: '',
    sqFt: '',
    lotArea: '',
    yearBuilt: '',
    mlsId: '',
    images: null as FileList | null,
    // Interior Features
    laundryRoom: false,
    appliances: [] as string[],
    flooring: [] as string[],
    otherInteriorFeatures: [] as string[],
    // Area & Lot
    waterFrontage: '',
    architectureStyle: '',
    propertyType: '',
    status: '',
    // Exterior Features
    stories: '',
    pool: '',
    airConditioning: '',
    heatType: '',
    waterSource: '',
    securityFeatures: [] as string[],
    sewer: '',
    otherExteriorFeatures: [] as string[],
    parking: [] as string[],
    roof: '',
    utilities: [] as string[],
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
      // Basic Info
      formData.append('title', propertyData.title);
      formData.append('price', propertyData.price);
      formData.append('address', propertyData.address);
      formData.append('location', propertyData.location);
      formData.append('description', propertyData.description);
      formData.append('beds', propertyData.beds);
      formData.append('fullBaths', propertyData.fullBaths);
      formData.append('halfBaths', propertyData.halfBaths);
      formData.append('sqFt', propertyData.sqFt);
      formData.append('lotArea', propertyData.lotArea);
      formData.append('yearBuilt', propertyData.yearBuilt);
      formData.append('mlsId', propertyData.mlsId);

      // Interior Features
      formData.append('laundryRoom', String(propertyData.laundryRoom));
      formData.append('appliances', JSON.stringify(propertyData.appliances));
      formData.append('flooring', JSON.stringify(propertyData.flooring));
      formData.append('otherInteriorFeatures', JSON.stringify(propertyData.otherInteriorFeatures));

      // Area & Lot
      formData.append('waterFrontage', propertyData.waterFrontage);
      formData.append('architectureStyle', propertyData.architectureStyle);
      formData.append('propertyType', propertyData.propertyType);
      formData.append('status', propertyData.status);

      // Exterior Features
      formData.append('stories', propertyData.stories);
      formData.append('pool', propertyData.pool);
      formData.append('airConditioning', propertyData.airConditioning);
      formData.append('heatType', propertyData.heatType);
      formData.append('waterSource', propertyData.waterSource);
      formData.append('securityFeatures', JSON.stringify(propertyData.securityFeatures));
      formData.append('sewer', propertyData.sewer);
      formData.append('otherExteriorFeatures', JSON.stringify(propertyData.otherExteriorFeatures));
      formData.append('parking', JSON.stringify(propertyData.parking));
      formData.append('roof', propertyData.roof);
      formData.append('utilities', JSON.stringify(propertyData.utilities));

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
          // Reset all fields to initial state
          title: '',
          price: '',
          address: '',
          location: '',
          description: '',
          beds: '',
          fullBaths: '',
          halfBaths: '',
          sqFt: '',
          lotArea: '',
          yearBuilt: '',
          mlsId: '',
          images: null,
          laundryRoom: false,
          appliances: [],
          flooring: [],
          otherInteriorFeatures: [],
          waterFrontage: '',
          architectureStyle: '',
          propertyType: '',
          status: '',
          stories: '',
          pool: '',
          airConditioning: '',
          heatType: '',
          waterSource: '',
          securityFeatures: [],
          sewer: '',
          otherExteriorFeatures: [],
          parking: [],
          roof: '',
          utilities: [],
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
          <form className="space-y-6" onSubmit={handlePropertySubmit}>
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={propertyData.address}
                  onChange={(e) => setPropertyData({...propertyData, address: e.target.value})}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={propertyData.beds}
                  onChange={(e) => setPropertyData({...propertyData, beds: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Bathrooms</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={propertyData.fullBaths}
                  onChange={(e) => setPropertyData({...propertyData, fullBaths: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Half Bathrooms</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={propertyData.halfBaths}
                  onChange={(e) => setPropertyData({...propertyData, halfBaths: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Square Feet</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={propertyData.sqFt}
                  onChange={(e) => setPropertyData({...propertyData, sqFt: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lot Area (Acres)</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={propertyData.lotArea}
                  onChange={(e) => setPropertyData({...propertyData, lotArea: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={propertyData.yearBuilt}
                  onChange={(e) => setPropertyData({...propertyData, yearBuilt: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MLS ID</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={propertyData.mlsId}
                  onChange={(e) => setPropertyData({...propertyData, mlsId: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
                value={propertyData.description}
                onChange={(e) => setPropertyData({...propertyData, description: e.target.value})}
                required
              ></textarea>
            </div>

            {/* Interior Features */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Interior Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox"
                      className="mr-2"
                      checked={propertyData.laundryRoom}
                      onChange={(e) => setPropertyData({...propertyData, laundryRoom: e.target.checked})}
                    />
                    <span className="text-sm text-gray-700">Laundry Room</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appliances</label>
                  <div className="space-y-2">
                    {[
                      'Built-In Oven',
                      'Cooktop',
                      'Dishwasher',
                      'Dryer',
                      'Microwave',
                      'Range Hood',
                      'Refrigerator',
                      'Washer'
                    ].map((appliance) => (
                      <label key={appliance} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={propertyData.appliances.includes(appliance)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPropertyData({
                                ...propertyData,
                                appliances: [...propertyData.appliances, appliance]
                              });
                            } else {
                              setPropertyData({
                                ...propertyData,
                                appliances: propertyData.appliances.filter(a => a !== appliance)
                              });
                            }
                          }}
                        />
                        <span className="text-sm text-gray-700">{appliance}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flooring</label>
                  <select 
                    multiple
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyData.flooring}
                    onChange={(e) => setPropertyData({
                      ...propertyData, 
                      flooring: Array.from(e.target.selectedOptions, option => option.value)
                    })}
                  >
                    <option value="Carpet">Carpet</option>
                    <option value="Luxury Vinyl">Luxury Vinyl</option>
                    <option value="Tile">Tile</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Area & Lot */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Area & Lot</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Water Frontage</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyData.waterFrontage}
                    onChange={(e) => setPropertyData({...propertyData, waterFrontage: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Architecture Style</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyData.architectureStyle}
                    onChange={(e) => setPropertyData({...propertyData, architectureStyle: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyData.propertyType}
                    onChange={(e) => setPropertyData({...propertyData, propertyType: e.target.value})}
                  >
                    <option value="">Select Type</option>
                    <option value="Condo">Condo</option>
                    <option value="Single Family">Single Family</option>
                    <option value="Townhouse">Townhouse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyData.status}
                    onChange={(e) => setPropertyData({...propertyData, status: e.target.value})}
                  >
                    <option value="">Select Status</option>
                    <option value="For Sale">For Sale</option>
                    <option value="Pending">Pending</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Exterior Features */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Exterior Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stories</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyData.stories}
                    onChange={(e) => setPropertyData({...propertyData, stories: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pool</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyData.pool}
                    onChange={(e) => setPropertyData({...propertyData, pool: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Air Conditioning</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyData.airConditioning}
                    onChange={(e) => setPropertyData({...propertyData, airConditioning: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heat Type</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyData.heatType}
                    onChange={(e) => setPropertyData({...propertyData, heatType: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Water Source</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyData.waterSource}
                    onChange={(e) => setPropertyData({...propertyData, waterSource: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Security Features</label>
                  <div className="space-y-2">
                    {[
                      'Gated Community',
                      'Secured Garage / Parking',
                      'Smoke Detector(s)'
                    ].map((feature) => (
                      <label key={feature} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={propertyData.securityFeatures.includes(feature)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPropertyData({
                                ...propertyData,
                                securityFeatures: [...propertyData.securityFeatures, feature]
                              });
                            } else {
                              setPropertyData({
                                ...propertyData,
                                securityFeatures: propertyData.securityFeatures.filter(f => f !== feature)
                              });
                            }
                          }}
                        />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sewer</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyData.sewer}
                    onChange={(e) => setPropertyData({...propertyData, sewer: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parking</label>
                  <select 
                    multiple
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyData.parking}
                    onChange={(e) => setPropertyData({
                      ...propertyData, 
                      parking: Array.from(e.target.selectedOptions, option => option.value)
                    })}
                  >
                    <option value="Assigned">Assigned</option>
                    <option value="Covered">Covered</option>
                    <option value="Ground Level">Ground Level</option>
                    <option value="Under Building">Under Building</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roof</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyData.roof}
                    onChange={(e) => setPropertyData({...propertyData, roof: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Utilities</label>
                  <div className="space-y-2">
                    {[
                      'Cable Connected',
                      'Electricity Connected',
                      'Phone Available',
                      'Public',
                      'Sewer Connected',
                      'Underground Utilities',
                      'Water Connected'
                    ].map((utility) => (
                      <label key={utility} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={propertyData.utilities.includes(utility)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPropertyData({
                                ...propertyData,
                                utilities: [...propertyData.utilities, utility]
                              });
                            } else {
                              setPropertyData({
                                ...propertyData,
                                utilities: propertyData.utilities.filter(u => u !== utility)
                              });
                            }
                          }}
                        />
                        <span className="text-sm text-gray-700">{utility}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Images</label>
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