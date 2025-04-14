import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const price = formData.get('price') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string;
    const images = formData.getAll('images') as File[];

    // Save images
    const imageUrls = await Promise.all(
      images.map(async (image, index) => {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `property-${Date.now()}-${index}.${image.name.split('.').pop()}`;
        const imagePath = path.join(process.cwd(), 'public', 'images', 'properties', filename);
        await fs.writeFile(imagePath, buffer);
        return `/images/properties/${filename}`;
      })
    );

    // Read existing properties
    const dataPath = path.join(process.cwd(), 'src', 'data', 'properties.ts');
    let propertiesContent = await fs.readFile(dataPath, 'utf-8');
    
    // Parse existing properties array
    const propertiesMatch = propertiesContent.match(/export const properties = (\[[\s\S]*?\]);/);
    const properties = propertiesMatch ? eval(propertiesMatch[1]) : [];

    // Add new property
    const newProperty = {
      id: properties.length + 1,
      title,
      price: parseFloat(price),
      location,
      description,
      images: imageUrls,
    };

    properties.push(newProperty);

    // Update properties file
    const newContent = `export const properties = ${JSON.stringify(properties, null, 2)};`;
    await fs.writeFile(dataPath, newContent);

    return NextResponse.json({ success: true, property: newProperty });
  } catch (error) {
    console.error('Error saving property:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save property' },
      { status: 500 }
    );
  }
} 