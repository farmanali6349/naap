"use client";
import { useCallback, useRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

type ZoomableImageProps = {
  src: string;
  alt: string;
};

export default function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  const onUpdate = useCallback(
    ({ x, y, scale }: { x: number; y: number; scale: number }) => {
      const value = make3dTransformValue({ x, y, scale });
      if (imgRef.current) {
        imgRef.current.style.setProperty("transform", value);
      }
    },
    []
  );

  return (
    <Dialog>
      {/* The Thumbnail */}
      <DialogTrigger asChild>
        <Image
          src={src}
          alt={alt}
          width={400}
          height={230}
          className="w-full cursor-zoom-in rounded-lg hover:opacity-90 transition-opacity max-w-lg"
        />
      </DialogTrigger>

      <DialogContent className="w-full max-w-7xl bg-transparent sm:max-w-90vw p-0 border-none">
        <DialogTitle className="text-center p-3 text-lg bg-card text-card-foreground rounded-md">
          Double Click To Zoom
        </DialogTitle>
        <div className="w-full h-[85vh] overflow-hidden">
          <QuickPinchZoom onUpdate={onUpdate} wheelScaleFactor={500}>
            <Image
              ref={imgRef}
              src={src}
              alt={alt}
              width={400}
              height={600}
              className="cursor-zoom-in rounded-lg hover:opacity-90 transition-opacity w-full h-full object-contain"
            />
          </QuickPinchZoom>
        </div>
      </DialogContent>
    </Dialog>
  );
}
