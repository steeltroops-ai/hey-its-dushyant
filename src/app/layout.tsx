import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "In Memory of Dushyant",
  description: "A memorial website dedicated to the memory of Dushyant",
  keywords: ["memorial", "remembrance", "tribute", "memory"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <head>
        {/* Preload hero video for faster initial load */}
        <link
          rel="preload"
          as="video"
          href="/hero-video.mp4"
          type="video/mp4"
        />
        <link
          rel="preload"
          as="video"
          href="/hero-video.webm"
          type="video/webm"
        />
        <link rel="preload" as="image" href="/hero-video-poster.jpg" />
        <script src="/register-sw.js" async></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* Critical CSS for navbar - ensures transparency before JS loads */
          header {
            background-color: transparent !important;
            z-index: 50 !important;
          }
          header a, header button {
            color: white !important;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5) !important;
          }
          header button span {
            background-color: white !important;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)) !important;
          }

          /* Prevent white flash during page load */
          html, body {
            background-color: #000 !important;
            margin: 0 !important;
            padding: 0 !important;
            min-height: 100vh !important;
            overflow-x: hidden !important;
            scrollbar-width: none !important; /* Firefox */
            -ms-overflow-style: none !important; /* IE and Edge */
          }

          /* Hide scrollbars for Chrome, Safari and Opera */
          html::-webkit-scrollbar,
          body::-webkit-scrollbar,
          *::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }

          /* Hero section background */
          .enhanced-hero {
            margin-top: 0 !important;
            min-height: 100vh !important;
            background-color: #000 !important;
          }

          /* Video optimization */
          video {
            object-fit: cover !important;
            object-position: center !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            will-change: transform !important;
            backface-visibility: hidden !important;
            transform: translateZ(0) !important; /* Force GPU acceleration */
            transform-style: preserve-3d !important;
            perspective: 1000px !important;
            contain: content !important; /* Improve performance */
          }

          /* Optimize video performance */
          @media (prefers-reduced-motion: no-preference) {
            video {
              animation-duration: 0.01s !important;
              animation-name: videostart !important;
              animation-timing-function: steps(1) !important;
            }
            @keyframes videostart {
              from { opacity: 0.9999; }
              to { opacity: 1; }
            }
          }
        `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black overflow-x-hidden`}
        style={{
          backgroundColor: "#000",
          margin: 0,
          padding: 0,
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </body>
    </html>
  );
}
