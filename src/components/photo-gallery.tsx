"use client";

import { useState } from "react";
import Image from "next/image";

interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  date?: string;
  location?: string;
  size?: "small" | "medium" | "large"; // Optional size for flexible layouts
}

type LayoutTemplate = "masonry" | "grid" | "featured" | "mosaic";

interface PhotoGalleryProps {
  photos: Photo[];
  columns?: number;
  layout?: LayoutTemplate;
}

export default function PhotoGallery({
  photos,
  columns = 3,
  layout = "masonry",
}: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Function to open the lightbox
  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = "hidden"; // Prevent scrolling when lightbox is open
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  // Distribute photos across columns for masonry layout
  const distributePhotos = () => {
    const photoColumns: Photo[][] = Array.from({ length: columns }, () => []);

    photos.forEach((photo, index) => {
      const columnIndex = index % columns;
      photoColumns[columnIndex].push(photo);
    });

    return photoColumns;
  };

  // Render different layout templates
  const renderLayout = () => {
    switch (layout) {
      case "grid":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => openLightbox(photo)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                />

                {(photo.caption || photo.date || photo.location) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm opacity-0 hover:opacity-100 transition-opacity">
                    {photo.caption && (
                      <p className="font-medium">{photo.caption}</p>
                    )}
                    {(photo.date || photo.location) && (
                      <p className="text-xs text-gray-300">
                        {photo.location && <span>{photo.location}</span>}
                        {photo.date && photo.location && <span> • </span>}
                        {photo.date && <span>{photo.date}</span>}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "featured":
        return (
          <div className="space-y-4">
            {/* Featured photo (first photo) */}
            {photos.length > 0 && (
              <div
                className="relative w-full h-[50vh] overflow-hidden rounded-lg shadow-md cursor-pointer"
                onClick={() => openLightbox(photos[0])}
              >
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />

                {(photos[0].caption ||
                  photos[0].date ||
                  photos[0].location) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                    {photos[0].caption && (
                      <p className="text-lg font-medium">{photos[0].caption}</p>
                    )}
                    {(photos[0].date || photos[0].location) && (
                      <p className="text-sm text-gray-300">
                        {photos[0].location && (
                          <span>{photos[0].location}</span>
                        )}
                        {photos[0].date && photos[0].location && (
                          <span> • </span>
                        )}
                        {photos[0].date && <span>{photos[0].date}</span>}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Grid for remaining photos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {photos.slice(1).map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => openLightbox(photo)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover"
                  />

                  {(photo.caption || photo.date || photo.location) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm opacity-0 hover:opacity-100 transition-opacity">
                      {photo.caption && (
                        <p className="font-medium">{photo.caption}</p>
                      )}
                      {(photo.date || photo.location) && (
                        <p className="text-xs text-gray-300">
                          {photo.location && <span>{photo.location}</span>}
                          {photo.date && photo.location && <span> • </span>}
                          {photo.date && <span>{photo.date}</span>}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "mosaic":
        return (
          <div className="grid grid-cols-6 gap-4">
            {photos.map((photo, index) => {
              // Determine size based on photo.size or position in array
              const size =
                photo.size ||
                (index % 5 === 0
                  ? "large"
                  : index % 3 === 0
                  ? "medium"
                  : "small");

              // Set grid classes based on size
              let sizeClasses = "col-span-2 row-span-2"; // small (default)
              if (size === "medium") sizeClasses = "col-span-3 row-span-3";
              if (size === "large") sizeClasses = "col-span-4 row-span-4";

              return (
                <div
                  key={photo.id}
                  className={`relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-[1.02] ${sizeClasses}`}
                  onClick={() => openLightbox(photo)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />

                  {(photo.caption || photo.date || photo.location) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm opacity-0 hover:opacity-100 transition-opacity">
                      {photo.caption && (
                        <p className="font-medium">{photo.caption}</p>
                      )}
                      {(photo.date || photo.location) && (
                        <p className="text-xs text-gray-300">
                          {photo.location && <span>{photo.location}</span>}
                          {photo.date && photo.location && <span> • </span>}
                          {photo.date && <span>{photo.date}</span>}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );

      case "masonry":
      default:
        // Masonry layout (default)
        const photoColumns = distributePhotos();
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photoColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-4">
                {column.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={() => openLightbox(photo)}
                  >
                    <div
                      className="relative"
                      style={{
                        paddingBottom: `${(photo.height / photo.width) * 100}%`,
                      }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    {(photo.caption || photo.date || photo.location) && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm opacity-0 hover:opacity-100 transition-opacity">
                        {photo.caption && (
                          <p className="font-medium">{photo.caption}</p>
                        )}
                        {(photo.date || photo.location) && (
                          <p className="text-xs text-gray-300">
                            {photo.location && <span>{photo.location}</span>}
                            {photo.date && photo.location && <span> • </span>}
                            {photo.date && <span>{photo.date}</span>}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Photo Gallery Layout */}
      {renderLayout()}

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>

            {(selectedPhoto.caption ||
              selectedPhoto.date ||
              selectedPhoto.location) && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                {selectedPhoto.caption && (
                  <p className="text-lg font-medium">{selectedPhoto.caption}</p>
                )}
                {(selectedPhoto.date || selectedPhoto.location) && (
                  <p className="text-sm text-gray-300 mt-1">
                    {selectedPhoto.location && (
                      <span>{selectedPhoto.location}</span>
                    )}
                    {selectedPhoto.date && selectedPhoto.location && (
                      <span> • </span>
                    )}
                    {selectedPhoto.date && <span>{selectedPhoto.date}</span>}
                  </p>
                )}
              </div>
            )}

            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              onClick={closeLightbox}
              aria-label="Close lightbox"
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
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
