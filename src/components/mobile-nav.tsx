"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span
          className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="flex justify-end p-4">
            <button
              onClick={closeMenu}
              className="w-10 h-10 flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center h-[calc(100vh-80px)] space-y-8 text-xl">
            <Link
              href="#about"
              onClick={closeMenu}
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="#timeline"
              onClick={closeMenu}
              className="hover:text-primary transition-colors"
            >
              Timeline
            </Link>
            <Link
              href="#memories"
              onClick={closeMenu}
              className="hover:text-primary transition-colors"
            >
              Memories
            </Link>
            <Link
              href="#tribute"
              onClick={closeMenu}
              className="hover:text-primary transition-colors"
            >
              Tribute
            </Link>
            <Link
              href="/photos"
              onClick={closeMenu}
              className="hover:text-primary transition-colors"
            >
              Photos
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
