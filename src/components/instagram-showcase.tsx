"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface InstagramPost {
  id: string;
  type: "photo" | "video";
  src: string;
  thumbnail?: string;
  caption: string;
  date: string;
  likes: number;
  isWork?: boolean; // To distinguish between personal posts and work
}

// Sample Instagram posts - replace with actual data
const instagramPosts: InstagramPost[] = [
  {
    id: "1",
    type: "video",
    src: "/instagram/video1.mp4",
    thumbnail: "/instagram/video1-thumb.jpg",
    caption:
      "Temple videography project in Vrindavan - capturing the divine essence",
    date: "2023-03-15",
    likes: 245,
    isWork: true,
  },
  {
    id: "2",
    type: "photo",
    src: "/instagram/photo1.jpg",
    caption: "Beautiful sunset at Mathura ghat",
    date: "2023-02-28",
    likes: 189,
    isWork: false,
  },
  {
    id: "3",
    type: "video",
    src: "/instagram/video2.mp4",
    thumbnail: "/instagram/video2-thumb.jpg",
    caption: "Video editing workflow - behind the scenes",
    date: "2023-02-10",
    likes: 156,
    isWork: true,
  },
  {
    id: "4",
    type: "photo",
    src: "/instagram/photo2.jpg",
    caption: "Krishna temple architecture details",
    date: "2023-01-20",
    likes: 203,
    isWork: false,
  },
  {
    id: "5",
    type: "video",
    src: "/instagram/video3.mp4",
    thumbnail: "/instagram/video3-thumb.jpg",
    caption: "Cinematic temple shots - my latest project",
    date: "2023-01-05",
    likes: 312,
    isWork: true,
  },
  {
    id: "6",
    type: "photo",
    src: "/instagram/photo3.jpg",
    caption: "Morning prayers at the temple",
    date: "2022-12-15",
    likes: 167,
    isWork: false,
  },
];

export default function InstagramShowcase() {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [filter, setFilter] = useState<"all" | "photos" | "videos" | "work">(
    "all"
  );

  const filteredPosts = instagramPosts.filter((post) => {
    switch (filter) {
      case "photos":
        return post.type === "photo";
      case "videos":
        return post.type === "video";
      case "work":
        return post.isWork;
      default:
        return true;
    }
  });

  const openModal = (post: InstagramPost) => {
    setSelectedPost(post);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2 rounded-full transition-all ${
            filter === "all"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-muted hover:bg-muted/80 text-muted-foreground"
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => setFilter("photos")}
          className={`px-6 py-2 rounded-full transition-all ${
            filter === "photos"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-muted hover:bg-muted/80 text-muted-foreground"
          }`}
        >
          Photos
        </button>
        <button
          onClick={() => setFilter("videos")}
          className={`px-6 py-2 rounded-full transition-all ${
            filter === "videos"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-muted hover:bg-muted/80 text-muted-foreground"
          }`}
        >
          Videos
        </button>
        <button
          onClick={() => setFilter("work")}
          className={`px-6 py-2 rounded-full transition-all ${
            filter === "work"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-muted hover:bg-muted/80 text-muted-foreground"
          }`}
        >
          His Work
        </button>
      </div>

      {/* Instagram Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
            onClick={() => openModal(post)}
          >
            {/* Post Image/Video Thumbnail */}
            <div className="relative w-full h-full">
              {post.type === "photo" ? (
                <Image
                  src={post.src}
                  alt={post.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <Image
                  src={post.thumbnail || "/placeholder-video.jpg"}
                  alt={post.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                {post.type === "video" && (
                  <div className="mb-2">
                    <svg
                      className="w-12 h-12 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                )}
                <p className="text-sm font-medium line-clamp-2">
                  {post.caption}
                </p>
              </div>
            </div>

            {/* Post Type Badge */}
            <div className="absolute top-2 right-2">
              {post.type === "video" && (
                <div className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                  Video
                </div>
              )}
              {post.isWork && (
                <div className="bg-primary/90 text-white px-2 py-1 rounded text-xs mt-1">
                  Work
                </div>
              )}
            </div>

            {/* Likes */}
            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              {post.likes}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-background rounded-lg overflow-hidden">
            {/* Close Button */}
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
              {/* Media */}
              <div className="flex-1 bg-black flex items-center justify-center">
                {selectedPost.type === "photo" ? (
                  <Image
                    src={selectedPost.src}
                    alt={selectedPost.caption}
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <video
                    src={selectedPost.src}
                    controls
                    className="max-w-full max-h-full"
                    autoPlay
                  />
                )}
              </div>

              {/* Post Details */}
              <div className="w-full md:w-80 p-6 bg-background">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    D
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">dushyant_official</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedPost.date}
                    </p>
                  </div>
                </div>

                <p className="text-sm mb-4">{selectedPost.caption}</p>

                <div className="flex items-center text-sm text-muted-foreground">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  {selectedPost.likes} likes
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
