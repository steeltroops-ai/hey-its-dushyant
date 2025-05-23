import { NextResponse } from 'next/server';

// This is a simple in-memory store for tributes
// In a real application, you would use a database like Supabase
let tributes: any[] = [
  {
    id: '1',
    name: 'A Friend',
    relationship: 'Friend',
    message: 'A heartfelt message remembering Dushyant and the impact he had.',
    date: 'June 10, 2023'
  },
  {
    id: '2',
    name: 'Family Member',
    relationship: 'Family',
    message: 'A touching tribute from a family member sharing memories.',
    date: 'June 8, 2023'
  }
];

export async function GET() {
  return NextResponse.json(tributes);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request
    if (!body.name || !body.relationship || !body.message) {
      return NextResponse.json(
        { error: 'Name, relationship, and message are required' },
        { status: 400 }
      );
    }
    
    // Create a new tribute
    const newTribute = {
      id: Date.now().toString(),
      name: body.name,
      relationship: body.relationship,
      message: body.message,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
    
    // Add to our "database"
    tributes = [newTribute, ...tributes];
    
    return NextResponse.json(newTribute, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create tribute' },
      { status: 500 }
    );
  }
}
