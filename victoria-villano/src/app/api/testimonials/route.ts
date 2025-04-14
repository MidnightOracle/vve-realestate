import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const author = formData.get('author') as string;
    const role = formData.get('role') as string;
    const text = formData.get('text') as string;
    const featured = formData.get('featured') === 'true';
    const image = formData.get('image') as File;

    // Save image
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `testimonial-${Date.now()}.${image.name.split('.').pop()}`;
    const imagePath = path.join(process.cwd(), 'public', 'images', 'testimonials', filename);
    await fs.writeFile(imagePath, buffer);
    const imageUrl = `/images/testimonials/${filename}`;

    // Read existing testimonials
    const dataPath = path.join(process.cwd(), 'src', 'data', 'testimonials.ts');
    let testimonialsContent = await fs.readFile(dataPath, 'utf-8');
    
    // Parse existing testimonials array
    const testimonialsMatch = testimonialsContent.match(/export const testimonials = (\[[\s\S]*?\]);/);
    const testimonials = testimonialsMatch ? eval(testimonialsMatch[1]) : [];

    // Add new testimonial
    const newTestimonial = {
      id: testimonials.length + 1,
      author,
      role,
      text,
      image: imageUrl,
      featured,
    };

    testimonials.push(newTestimonial);

    // Update testimonials file
    const newContent = `export const testimonials = ${JSON.stringify(testimonials, null, 2)};`;
    await fs.writeFile(dataPath, newContent);

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    console.error('Error saving testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save testimonial' },
      { status: 500 }
    );
  }
} 