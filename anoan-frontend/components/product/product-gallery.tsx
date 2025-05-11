"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ProductGalleryProps {
  images: string[]
  productName: string
  sku: string
  altText?: string
}

export function ProductGallery({ images, productName, sku, altText }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)

  const handlePrevious = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }

  const handleNext = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={images[activeIndex] || "/placeholder.svg"}
          alt={altText || `${productName} - ${sku} - Imagine ${activeIndex + 1}`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Imagine anterioară</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Imagine următoare</span>
          </Button>
        </div>
        <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-4 right-4 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Mărește imaginea</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={images[activeIndex] || "/placeholder.svg"}
                alt={altText || `${productName} - ${sku} - Imagine ${activeIndex + 1}`}
                fill
                priority
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-2 overflow-auto pb-1 snap-x">
        {images.map((image, i) => (
          <button
            key={i}
            className={cn(
              "relative aspect-square w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md snap-start",
              i === activeIndex && "ring-2 ring-primary ring-offset-2",
            )}
            onClick={() => setActiveIndex(i)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={altText || `${productName} - ${sku} - Miniatură ${i + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
