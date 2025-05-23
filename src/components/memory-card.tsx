"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface MemoryCardProps {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  imageSrc?: string;
}

export default function MemoryCard({
  id,
  title,
  location,
  date,
  description,
  imageSrc,
}: MemoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className={`memory-card bg-card rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
        isExpanded ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div
        className={`relative ${isExpanded ? "h-64" : "h-48"} cursor-pointer`}
        onClick={toggleExpand}
      >
        {imageSrc ? (
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
            <p className="text-neutral-500">Memory Photo {id}</p>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-3">
          {location} • {date}
        </p>

        <p className={isExpanded ? "" : "line-clamp-3"}>{description}</p>

        {description.length > 150 && (
          <button
            type="button"
            onClick={toggleExpand}
            className="mt-3 text-sm text-primary hover:underline"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}
