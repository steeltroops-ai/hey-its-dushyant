"use client";

import { motion } from "framer-motion";

export default function InstagramProfileWidget() {
  const openInstagramProfile = () => {
    window.open('https://instagram.com/dushyant.vibess', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 p-8 rounded-2xl border border-purple-200/20 shadow-xl backdrop-blur-sm"
      >
        {/* Profile Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              D
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          <h3 className="text-xl font-bold mb-1">@dushyant.vibess</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Videographer • Temple Photography • Creative Content
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="p-3 bg-white/50 rounded-lg">
            <div className="font-bold text-lg">50+</div>
            <div className="text-xs text-muted-foreground">Posts</div>
          </div>
          <div className="p-3 bg-white/50 rounded-lg">
            <div className="font-bold text-lg">2.5K</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div className="p-3 bg-white/50 rounded-lg">
            <div className="font-bold text-lg">180</div>
            <div className="text-xs text-muted-foreground">Following</div>
          </div>
        </div>

        {/* Bio */}
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            🎬 Video Creator & Editor<br/>
            📸 Temple Photography<br/>
            🙏 Spiritual Journey<br/>
            📍 Vrindavan • Mathura
          </p>
        </div>

        {/* Recent Posts Preview */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              onClick={openInstagramProfile}
            >
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <button
          onClick={openInstagramProfile}
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>Visit Instagram Profile</span>
        </button>

        {/* Memorial Note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Preserving Dushyant's creative legacy with love and respect
          </p>
        </div>
      </motion.div>
    </div>
  );
}
