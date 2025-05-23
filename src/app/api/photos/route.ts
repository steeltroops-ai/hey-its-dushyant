import { NextResponse } from 'next/server';

// This is a simple in-memory store for photos
// In a real application, you would use Supabase Storage and Database
let photos: any[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1583316174775-bd6dc0e9f298',
    alt: 'Temple in Vrindavan',
    width: 1200,
    height: 800,
    caption: 'Exploring temples in Vrindavan',
    location: 'Vrindavan',
    date: '2023-01-15',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25',
    alt: 'Music session',
    width: 800,
    height: 1200,
    caption: 'Music session at college',
    location: 'College Campus',
    date: '2022-11-10',
  },
  // Add more sample photos here
];

export async function GET() {
  return NextResponse.json(photos);
}

export async function POST(request: Request) {
  try {
    // In a real application, you would:
    // 1. Parse the form data with formData()
    // 2. Upload the file to Supabase Storage
    // 3. Save the metadata to Supabase Database
    
    const body = await request.json();
    
    // Validate the request
    if (!body.src) {
      return NextResponse.json(
        { error: 'Photo source is required' },
        { status: 400 }
      );
    }
    
    // Create a new photo
    const newPhoto = {
      id: Date.now().toString(),
      src: body.src,
      alt: body.caption || 'Photo of Dushyant',
      width: body.width || 1200,
      height: body.height || 800,
      caption: body.caption,
      location: body.location,
      date: body.date,
    };
    
    // Add to our "database"
    photos = [newPhoto, ...photos];
    
    return NextResponse.json(newPhoto, { status: 201 });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json(
      { error: 'Failed to upload photo' },
      { status: 500 }
    );
  }
}
