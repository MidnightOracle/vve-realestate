import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Basic Info
    const title = formData.get('title') as string;
    const price = formData.get('price') as string;
    const address = formData.get('address') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string;
    const beds = formData.get('beds') as string;
    const fullBaths = formData.get('fullBaths') as string;
    const halfBaths = formData.get('halfBaths') as string;
    const sqFt = formData.get('sqFt') as string;
    const lotArea = formData.get('lotArea') as string;
    const yearBuilt = formData.get('yearBuilt') as string;
    const mlsId = formData.get('mlsId') as string;
    const images = formData.getAll('images') as File[];

    // Interior Features
    const laundryRoom = formData.get('laundryRoom') === 'true';
    const appliances = JSON.parse(formData.get('appliances') as string);
    const flooring = JSON.parse(formData.get('flooring') as string);
    const otherInteriorFeatures = JSON.parse(formData.get('otherInteriorFeatures') as string);

    // Area & Lot
    const waterFrontage = formData.get('waterFrontage') as string;
    const architectureStyle = formData.get('architectureStyle') as string;
    const propertyType = formData.get('propertyType') as string;
    const status = formData.get('status') as string;

    // Exterior Features
    const stories = formData.get('stories') as string;
    const pool = formData.get('pool') as string;
    const airConditioning = formData.get('airConditioning') as string;
    const heatType = formData.get('heatType') as string;
    const waterSource = formData.get('waterSource') as string;
    const securityFeatures = JSON.parse(formData.get('securityFeatures') as string);
    const sewer = formData.get('sewer') as string;
    const otherExteriorFeatures = JSON.parse(formData.get('otherExteriorFeatures') as string);
    const parking = JSON.parse(formData.get('parking') as string);
    const roof = formData.get('roof') as string;
    const utilities = JSON.parse(formData.get('utilities') as string);

    // Create directories if they don't exist
    const publicDir = path.join(process.cwd(), 'public');
    const imagesDir = path.join(publicDir, 'images');
    const propertiesDir = path.join(imagesDir, 'properties');
    
    await fs.mkdir(propertiesDir, { recursive: true });

    // Save images
    const imageUrls = await Promise.all(
      images.map(async (image, index) => {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `property-${Date.now()}-${index}.${image.name.split('.').pop()}`;
        const imagePath = path.join(propertiesDir, filename);
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
      address,
      location,
      description,
      beds: parseInt(beds),
      fullBaths: parseInt(fullBaths),
      halfBaths: parseInt(halfBaths),
      sqFt: parseFloat(sqFt),
      lotArea,
      yearBuilt: parseInt(yearBuilt),
      mlsId,
      images: imageUrls,
      interior: {
        laundryRoom,
        appliances,
        flooring,
        otherFeatures: otherInteriorFeatures,
      },
      areaAndLot: {
        waterFrontage,
        architectureStyle,
        propertyType,
        status,
      },
      exterior: {
        stories: parseInt(stories),
        pool,
        airConditioning,
        heatType,
        waterSource,
        securityFeatures,
        sewer,
        otherFeatures: otherExteriorFeatures,
        parking,
        roof,
        utilities,
      },
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