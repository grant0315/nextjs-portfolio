import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['content:encoded', 'media:content'],
  },
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml',
  },
});

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
  categories?: string[];
  author?: string;
  thumbnail?: string;
}

export async function GET() {
  try {
    // Replace with your Medium username or RSS feed URL
    // Format: https://medium.com/feed/@username
    // Or: https://username.medium.com/feed
    const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME || '@granthopkins'; // Default fallback
    const username = MEDIUM_USERNAME.replace('@', '');
    
    // Try both RSS feed URL formats
    let MEDIUM_FEED_URL = `https://medium.com/feed/@${username}`;
    
    // Alternative format: https://username.medium.com/feed
    const alternativeUrl = `https://${username}.medium.com/feed`;
    
    console.log('Fetching Medium posts from:', MEDIUM_FEED_URL);
    console.log('Medium username:', MEDIUM_USERNAME);
    
    let feed;
    let lastError: Error | null = null;
    
    // Helper function to fetch with retry
    const fetchWithRetry = async (url: string): Promise<any> => {
      try {
        // First try with rss-parser
        return await parser.parseURL(url);
      } catch (parseError) {
        // If that fails, try manual fetch + parse
        console.log('RSS parser failed, trying manual fetch for:', url);
        try {
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
              'Accept': 'application/rss+xml, application/xml, text/xml',
            },
            redirect: 'follow',
          });
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          const xmlText = await response.text();
          return await parser.parseString(xmlText);
        } catch (fetchError) {
          throw parseError; // Throw original error
        }
      }
    };
    
    try {
      console.log('Attempting to fetch:', MEDIUM_FEED_URL);
      feed = await fetchWithRetry(MEDIUM_FEED_URL);
      console.log('Successfully fetched feed from first URL');
    } catch (firstError) {
      lastError = firstError instanceof Error ? firstError : new Error(String(firstError));
      console.log('First URL failed, trying alternative:', alternativeUrl);
      console.error('First error:', lastError.message);
      
      try {
        feed = await fetchWithRetry(alternativeUrl);
        MEDIUM_FEED_URL = alternativeUrl;
        console.log('Successfully fetched feed from alternative URL');
      } catch (secondError) {
        const secondErr = secondError instanceof Error ? secondError : new Error(String(secondError));
        console.error('Both RSS feed URLs failed:');
        console.error('URL 1 error:', lastError.message);
        console.error('URL 2 error:', secondErr.message);
        
        // Check if it's a network/CORS issue
        const errorMsg = lastError.message.toLowerCase();
        if (errorMsg.includes('cors') || errorMsg.includes('network') || errorMsg.includes('fetch')) {
          throw new Error(`Network error fetching RSS feed. Medium may be blocking requests. Try visiting ${MEDIUM_FEED_URL} directly in your browser.`);
        }
        
        throw new Error(`Failed to fetch RSS feed. Tried: ${MEDIUM_FEED_URL} and ${alternativeUrl}. Error: ${lastError.message}`);
      }
    }
    
    if (!feed || !feed.items || feed.items.length === 0) {
      return NextResponse.json({
        error: 'No posts found in RSS feed',
        posts: [],
        feedUrl: MEDIUM_FEED_URL,
        username: MEDIUM_USERNAME,
      });
    }
    
    const posts: MediumPost[] = feed.items.map((item: any) => {
      // Extract thumbnail from content if available
      let thumbnail: string | undefined;
      if (item['content:encoded']) {
        const imgMatch = item['content:encoded'].match(/<img[^>]+src="([^"]+)"/i);
        if (imgMatch) {
          thumbnail = imgMatch[1];
        }
      }
      
      // Extract categories/tags
      const categories = item.categories || [];
      
      return {
        title: item.title || 'Untitled',
        link: item.link || '',
        pubDate: item.pubDate || '',
        content: item['content:encoded'] || item.content || '',
        contentSnippet: item.contentSnippet || '',
        guid: item.guid || item.link || '',
        categories,
        author: item.creator || feed.title || '',
        thumbnail,
      };
    });
    
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    // Log full error details for debugging
    console.error('Full error details:', {
      message: errorMessage,
      stack: errorStack,
      env: {
        MEDIUM_USERNAME: process.env.MEDIUM_USERNAME || 'not set',
        NODE_ENV: process.env.NODE_ENV,
      },
    });
    
    return NextResponse.json(
      { 
        error: `Failed to fetch blog posts: ${errorMessage}`,
        posts: [],
        details: process.env.NODE_ENV === 'development' ? {
          message: errorMessage,
          stack: errorStack,
        } : undefined,
      },
      { status: 500 }
    );
  }
}

