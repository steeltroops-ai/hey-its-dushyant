"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  name: string;
  href: string;
  external?: boolean;
}

export default function EnhancedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "About", href: "#about" },
    { name: "Timeline", href: "#timeline" },
    { name: "Memories", href: "#memories" },
    { name: "Tribute", href: "#tribute" },
    { name: "Photos", href: "/photos" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style on scroll
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["about", "timeline", "memories", "tribute"];
      let currentSection = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when mobile menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <header
      className="w-full fixed top-0 z-50 transition-all duration-300 py-4"
      data-scrolled={isScrolled ? "true" : "false"}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo/Site Title */}
        <Link href="/" className="relative group">
          <motion.span
            className="text-xl font-semibold transition-colors text-white"
            initial={{ opacity: 1, y: 0 }}
            animate={{
              color: isScrolled ? "var(--foreground)" : "#ffffff",
              textShadow: isScrolled ? "none" : "0 2px 4px rgba(0,0,0,0.5)",
            }}
            transition={{ duration: 0.3 }}
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Remembering Dushyant
          </motion.span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative group text-white"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={item.external ? undefined : closeMobileMenu}
              style={{
                color: isScrolled ? "var(--foreground)" : "#ffffff",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                transition: "color 0.3s ease",
              }}
            >
              <motion.span
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`transition-colors ${
                  activeSection === item.href.replace("#", "")
                    ? "text-primary font-medium"
                    : "hover:text-primary"
                }`}
                style={{
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                {item.name}
              </motion.span>
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  activeSection === item.href.replace("#", "")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-50"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          style={{
            filter: isScrolled
              ? "none"
              : "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
          }}
        >
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              translateY: isMobileMenuOpen ? 8 : 0,
            }}
            className="block w-6 h-0.5 bg-white"
            style={{
              backgroundColor: isScrolled ? "var(--foreground)" : "#ffffff",
            }}
          />
          <motion.span
            animate={{
              opacity: isMobileMenuOpen ? 0 : 1,
            }}
            className="block w-6 h-0.5 bg-white"
            style={{
              backgroundColor: isScrolled ? "var(--foreground)" : "#ffffff",
            }}
          />
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              translateY: isMobileMenuOpen ? -8 : 0,
            }}
            className="block w-6 h-0.5 bg-white"
            style={{
              backgroundColor: isScrolled ? "var(--foreground)" : "#ffffff",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-lg md:hidden z-40"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`text-2xl font-medium ${
                      activeSection === item.href.replace("#", "")
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    } transition-colors`}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
