import Link from 'next/link';
import PhotoGallerySection from './photo-gallery-section';

export const metadata = {
  title: 'Photo Gallery | In Memory of Dushyant',
  description: 'A collection of photos and memories of Dushyant',
};

export default function PhotosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="w-full bg-background/80 backdrop-blur-sm fixed top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold">
            Remembering Dushyant
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/photos"
              className="text-primary font-medium"
            >
              Photos
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Photo Gallery</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A collection of photos celebrating Dushyant's life, his adventures, and the moments we shared together.
          </p>
          
          <PhotoGallerySection />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">In loving memory of Dushyant</p>
          <p className="text-sm text-muted-foreground">
            This memorial website was created with love by Mayank to honor and preserve the memory of a dear friend.
          </p>
          <div className="mt-6">
            <Link 
              href="/"
              className="text-primary hover:underline"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
