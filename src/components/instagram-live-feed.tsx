"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface InstagramMedia {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  timestamp: string;
  permalink: string;
}

interface InstagramProfile {
  id: string;
  username: string;
  account_type: string;
  media_count: number;
}

export default function InstagramLiveFeed() {
  const [media, setMedia] = useState<InstagramMedia[]>([]);
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<InstagramMedia | null>(null);

  useEffect(() => {
    fetchInstagramData();
  }, []);

  const fetchInstagramData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch from our API endpoint that handles Instagram API calls
      const response = await fetch("/api/instagram-live");

      if (!response.ok) {
        throw new Error("Failed to fetch Instagram data");
      }

      const data = await response.json();
      setMedia(data.media || []);
      setProfile(data.profile || null);
    } catch (err) {
      console.error("Instagram API Error:", err);
      setError(
        "Unable to load live Instagram content. Displaying cached content instead."
      );

      // Fallback to our static data
      try {
        const fallbackResponse = await fetch("/api/instagram-posts");
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          // Convert our static data format to Instagram API format
          const convertedMedia = fallbackData.slice(0, 12).map((post: any) => ({
            id: post.id,
            media_type: post.type === "video" ? "VIDEO" : "IMAGE",
            media_url: post.src,
            thumbnail_url: post.thumbnail,
            caption: post.caption,
            timestamp: new Date(post.date).toISOString(),
            permalink: `https://instagram.com/p/${post.id}/`,
          }));
          setMedia(convertedMedia);
        }
      } catch (fallbackError) {
        console.error("Fallback data error:", fallbackError);
        // Set empty array if everything fails
        setMedia([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const openInstagramPost = (post: InstagramMedia) => {
    // Open the original Instagram post in a new tab
    window.open(post.permalink, "_blank", "noopener,noreferrer");
  };

  const openModal = (post: InstagramMedia) => {
    setSelectedPost(post);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = "auto";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Loading live Instagram content...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      {profile && (
        <div className="text-center mb-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-200/20">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              D
            </div>
            <div>
              <h3 className="text-xl font-semibold">@{profile.username}</h3>
              <p className="text-muted-foreground">
                {profile.media_count} posts
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Live content from Dushyant's Instagram account • Updated
            automatically
          </p>
        </div>
      )}

      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Instagram Grid */}
      {media.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            D
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Instagram Content Coming Soon
          </h3>
          <p className="text-muted-foreground mb-6">
            We're working on displaying Dushyant's Instagram content here.
          </p>
          <button
            onClick={() =>
              window.open("https://instagram.com/dushyant.vibess", "_blank")
            }
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Visit @dushyant.vibess on Instagram
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => openModal(post)}
            >
              {/* Post Image/Video */}
              <div className="relative w-full h-full">
                <Image
                  src={post.thumbnail_url || post.media_url}
                  alt={post.caption || "Instagram post"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Media Type Indicator */}
              {post.media_type === "VIDEO" && (
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Video
                </div>
              )}

              {post.media_type === "CAROUSEL_ALBUM" && (
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Album
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                  <p className="text-sm font-medium line-clamp-3">
                    {post.caption || "View on Instagram"}
                  </p>
                  <div className="mt-2 flex justify-center space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(post);
                      }}
                      className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-xs transition-colors"
                    >
                      Preview
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openInstagramPost(post);
                      }}
                      className="bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded text-xs transition-colors"
                    >
                      View Original
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* View Full Profile Button */}
      <div className="text-center mt-8">
        <button
          onClick={() =>
            window.open("https://instagram.com/dushyant.vibess", "_blank")
          }
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          Visit @dushyant.vibess on Instagram
        </button>
      </div>

      {/* Modal for post preview */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-background rounded-lg overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row h-full">
              <div className="flex-1 bg-black flex items-center justify-center">
                {selectedPost.media_type === "VIDEO" ? (
                  <video
                    src={selectedPost.media_url}
                    controls
                    className="max-w-full max-h-full"
                    autoPlay
                  />
                ) : (
                  <Image
                    src={selectedPost.media_url}
                    alt={selectedPost.caption || "Instagram post"}
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>

              <div className="w-full md:w-80 p-6 bg-background">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    D
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">dushyant.vibess</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedPost.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className="text-sm mb-4">{selectedPost.caption}</p>

                <button
                  onClick={() => openInstagramPost(selectedPost)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  View Original Post on Instagram
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
