import { NextResponse } from 'next/server';

// Instagram Basic Display API configuration
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

interface InstagramMediaResponse {
  data: Array<{
    id: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    media_url: string;
    thumbnail_url?: string;
    caption?: string;
    timestamp: string;
    permalink: string;
  }>;
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

interface InstagramUserResponse {
  id: string;
  username: string;
  account_type: string;
  media_count: number;
}

export async function GET() {
  try {
    // Check if we have the required environment variables
    if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
      console.log('Instagram API credentials not configured, using fallback data');
      return getFallbackData();
    }

    // Fetch user profile information
    const profileResponse = await fetch(
      `https://graph.instagram.com/${INSTAGRAM_USER_ID}?fields=id,username,account_type,media_count&access_token=${INSTAGRAM_ACCESS_TOKEN}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!profileResponse.ok) {
      throw new Error(`Profile API error: ${profileResponse.status}`);
    }

    const profile: InstagramUserResponse = await profileResponse.json();

    // Fetch user's media
    const mediaResponse = await fetch(
      `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,media_type,media_url,thumbnail_url,caption,timestamp,permalink&limit=20&access_token=${INSTAGRAM_ACCESS_TOKEN}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!mediaResponse.ok) {
      throw new Error(`Media API error: ${mediaResponse.status}`);
    }

    const mediaData: InstagramMediaResponse = await mediaResponse.json();

    // Return the combined data
    return NextResponse.json({
      profile,
      media: mediaData.data,
      lastUpdated: new Date().toISOString(),
      source: 'instagram_api'
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // Cache for 5 minutes
      },
    });

  } catch (error) {
    console.error('Instagram API Error:', error);
    
    // Return fallback data if API fails
    return getFallbackData();
  }
}

async function getFallbackData() {
  try {
    // Try to load our static data as fallback
    const fs = await import('fs');
    const path = await import('path');
    
    const filePath = path.join(process.cwd(), 'src/data/instagram-posts.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const posts = JSON.parse(fileContents);

    // Convert our static data format to Instagram API format
    const convertedMedia = posts.map((post: any) => ({
      id: post.id,
      media_type: post.type === 'video' ? 'VIDEO' : 'IMAGE',
      media_url: post.src,
      thumbnail_url: post.thumbnail,
      caption: post.caption,
      timestamp: new Date(post.date).toISOString(),
      permalink: `https://instagram.com/p/${post.id}/` // Placeholder URL
    }));

    const fallbackProfile = {
      id: 'dushyant_vibess',
      username: 'dushyant.vibess',
      account_type: 'PERSONAL',
      media_count: posts.length
    };

    return NextResponse.json({
      profile: fallbackProfile,
      media: convertedMedia,
      lastUpdated: new Date().toISOString(),
      source: 'fallback_data',
      note: 'Using cached content. Live Instagram integration requires API setup.'
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (fallbackError) {
    console.error('Fallback data error:', fallbackError);
    
    // Last resort: return minimal data
    return NextResponse.json({
      profile: {
        id: 'dushyant_vibess',
        username: 'dushyant.vibess',
        account_type: 'PERSONAL',
        media_count: 0
      },
      media: [],
      lastUpdated: new Date().toISOString(),
      source: 'minimal_fallback',
      error: 'Unable to load Instagram content'
    }, { status: 200 });
  }
}

// Optional: Add a POST endpoint for refreshing the access token
export async function POST(request: Request) {
  try {
    const { refresh_token } = await request.json();
    
    if (!refresh_token) {
      return NextResponse.json(
        { error: 'Refresh token required' },
        { status: 400 }
      );
    }

    // Refresh the access token
    const response = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${refresh_token}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    
    return NextResponse.json({
      access_token: data.access_token,
      token_type: data.token_type,
      expires_in: data.expires_in
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { error: 'Failed to refresh access token' },
      { status: 500 }
    );
  }
}
