# Instagram Live Feed Setup Guide

Since you're Dushyant's brother and have access to his account, you can set up live Instagram integration using the Instagram Basic Display API.

## Prerequisites

- Access to @dushyant.vibess Instagram account
- Facebook Developer Account
- Basic understanding of API keys

## Step-by-Step Setup

### 1. Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App"
3. Choose "Consumer" as app type
4. Fill in app details:
   - App Name: "Dushyant Memorial Website"
   - App Contact Email: Your email
   - Purpose: "Memorial/Remembrance Website"

### 2. Add Instagram Basic Display Product

1. In your app dashboard, click "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Go to Instagram Basic Display > Basic Display

### 3. Create Instagram Test User

1. In Basic Display settings, scroll to "User Token Generator"
2. Click "Add or Remove Instagram Testers"
3. Add @dushyant.vibess as a tester
4. The account owner needs to accept the invitation

### 4. Generate Access Token

1. Go back to "User Token Generator"
2. Click "Generate Token" next to @dushyant.vibess
3. Log in with Dushyant's Instagram account
4. Authorize the app
5. Copy the generated access token

### 5. Get User ID

The User ID is included in the token response, or you can get it by calling:
```
https://graph.instagram.com/me?fields=id,username&access_token=YOUR_ACCESS_TOKEN
```

### 6. Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in your values:
```env
INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token
INSTAGRAM_USER_ID=dushyant_user_id
```

### 7. Convert to Long-Lived Token

Short-lived tokens expire in 1 hour. Convert to long-lived (60 days):

```bash
curl -i -X GET "https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_secret=YOUR_APP_SECRET
  &access_token=YOUR_SHORT_LIVED_TOKEN"
```

## Alternative: Manual Setup (If API is Complex)

If the API setup is too complex, I can help you with these simpler options:

### Option 1: Instagram Embed Widget

```html
<!-- Add this to a custom component -->
<iframe 
  src="https://www.instagram.com/dushyant.vibess/embed" 
  width="400" 
  height="480" 
  frameborder="0" 
  scrolling="no" 
  allowtransparency="true">
</iframe>
```

### Option 2: Third-Party Instagram Widgets

- **SnapWidget**: Free Instagram feed widget
- **Elfsight**: Instagram feed widget with customization
- **LightWidget**: Simple Instagram embed

### Option 3: Instagram Profile Link

Simple button that opens his Instagram profile:

```jsx
<a 
  href="https://instagram.com/dushyant.vibess" 
  target="_blank"
  className="instagram-profile-button"
>
  View @dushyant.vibess on Instagram
</a>
```

## Current Implementation

The website is already set up to:

1. **Try Instagram API first** - If configured, loads live content
2. **Fallback to cached data** - If API fails, shows our curated content
3. **Graceful degradation** - Always shows something meaningful

## Benefits of Live Integration

✅ **Always Up-to-Date**: Shows latest posts automatically
✅ **Original Links**: Direct links to Instagram posts
✅ **Full Metadata**: Captions, dates, engagement data
✅ **Video Support**: Plays videos directly from Instagram
✅ **Memorial Context**: Adds respectful framing

## Maintenance

- **Token Refresh**: Long-lived tokens need renewal every 60 days
- **Monitoring**: Check API status regularly
- **Backup**: Always have cached content as fallback

## Legal Considerations

✅ **Account Owner Permission**: You have access as his brother
✅ **Memorial Purpose**: Clearly stated memorial context
✅ **Respectful Use**: Content displayed with dignity
✅ **Original Attribution**: Links back to original posts

## Need Help?

If you need assistance with:
- Setting up the Facebook Developer account
- Generating access tokens
- Configuring environment variables
- Testing the integration

Let me know and I can guide you through each step!

## Quick Start (Recommended)

For immediate results, the website currently works with cached content. You can:

1. **Use it as-is** with the sample content
2. **Replace sample data** with real posts manually
3. **Set up API later** when you have time

The live integration is an enhancement, not a requirement for the memorial website to work beautifully.
