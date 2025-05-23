"use client";

import { useState } from "react";
import PhotoGallery from "@/components/photo-gallery";
import PhotoUpload from "@/components/photo-upload";

type LayoutTemplate = "masonry" | "grid" | "featured" | "mosaic";

// Sample photos (replace with actual photos of Dushyant)
const samplePhotos = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1588417446723-884e75a48432",
    alt: "Temple in Vrindavan",
    width: 1200,
    height: 800,
    caption: "Exploring temples in Vrindavan",
    location: "Vrindavan",
    date: "2023-01-15",
    size: "large",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    alt: "Music session",
    width: 800,
    height: 1200,
    caption: "Music session at college",
    location: "College Campus",
    date: "2022-11-10",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
    alt: "Video project",
    width: 1200,
    height: 900,
    caption: "Working on a video project",
    location: "Mathura",
    date: "2023-03-05",
    size: "medium",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    alt: "Late night conversations",
    width: 1200,
    height: 800,
    caption: "Late night conversations on the hostel rooftop",
    location: "Hostel Rooftop",
    date: "2022-12-20",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1513151233558-d860c5398176",
    alt: "Birthday celebration",
    width: 800,
    height: 1200,
    caption: "Birthday celebration",
    location: "Local Café",
    date: "2022-10-08",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1609601546193-35c11409df9d",
    alt: "Spiritual discussion",
    width: 1200,
    height: 800,
    caption: "Spiritual discussion by the river",
    location: "Yamuna Riverbank",
    date: "2023-02-12",
    size: "medium",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    alt: "Friend gathering",
    width: 1200,
    height: 900,
    caption: "Gathering with friends",
    location: "Friend's House",
    date: "2023-04-18",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1588417446723-884e75a48432",
    alt: "Temple visit",
    width: 800,
    height: 1000,
    caption: "Visiting a temple in Mathura",
    location: "Mathura",
    date: "2023-01-30",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1609601546193-35c11409df9d",
    alt: "College event",
    width: 1200,
    height: 800,
    caption: "College cultural event",
    location: "College Auditorium",
    date: "2022-09-15",
    size: "large",
  },
];

export default function PhotoGallerySection() {
  const [photos, setPhotos] = useState(samplePhotos);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [activeLayout, setActiveLayout] = useState<LayoutTemplate>("masonry");

  // Function to handle photo upload
  const handlePhotoUpload = async (
    file: File,
    metadata: { caption?: string; location?: string; date?: string }
  ) => {
    setIsUploading(true);

    try {
      // In a real application, you would upload the file to a storage service like Supabase Storage
      // For now, we'll create a local URL and add it to our photos array
      const fileUrl = URL.createObjectURL(file);

      // Create a new photo object
      const newPhoto = {
        id: Date.now().toString(),
        src: fileUrl,
        alt: metadata.caption || "Photo of Dushyant",
        width: 1200, // Placeholder dimensions
        height: 800,
        caption: metadata.caption,
        location: metadata.location,
        date: metadata.date,
      };

      // Add the new photo to the photos array
      setPhotos((prevPhotos) => [newPhoto, ...prevPhotos]);

      // Hide the upload form after successful upload
      setShowUploadForm(false);
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to upload photo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
        >
          {showUploadForm ? "Hide Upload Form" : "Add New Photo"}
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="max-w-xl mx-auto mb-12">
          <PhotoUpload onUpload={handlePhotoUpload} isUploading={isUploading} />
        </div>
      )}

      {/* Layout Selection */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <h3 className="w-full text-center text-lg font-medium mb-2">
          Choose Layout
        </h3>
        <button
          onClick={() => setActiveLayout("masonry")}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeLayout === "masonry"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Masonry
        </button>
        <button
          onClick={() => setActiveLayout("grid")}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeLayout === "grid"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Grid
        </button>
        <button
          onClick={() => setActiveLayout("featured")}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeLayout === "featured"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Featured
        </button>
        <button
          onClick={() => setActiveLayout("mosaic")}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeLayout === "mosaic"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Mosaic
        </button>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery photos={photos} columns={3} layout={activeLayout} />
    </div>
  );
}
