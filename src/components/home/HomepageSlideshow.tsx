
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import type { Slide } from '@/types';
import { getSlidesForHomepage } from '@/services/slideService';
import { Skeleton } from '@/components/ui/skeleton';

export function HomepageSlideshow() {
  const [slides, setSlides] = React.useState<Slide[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSlides = async () => {
      setIsLoading(true);
      try {
        const fetchedSlides = await getSlidesForHomepage();
        setSlides(fetchedSlides);
      } catch (error) {
        console.error("Failed to fetch slides:", error);
      }
      setIsLoading(false);
    };
    fetchSlides();
  }, []);
  
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  if (isLoading) {
    return (
      <Skeleton className="w-full aspect-[12/5]" />
    );
  }

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full aspect-[12/5] flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">No slides available.</p>
      </div>
    );
  }


  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full group"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={slide.id || index}>
            <Card className="border-none shadow-none rounded-none bg-transparent">
              <CardContent className="relative flex aspect-[12/5] items-center justify-center p-0">
                <Image
                  src={slide.imageUrl || `https://picsum.photos/seed/defaultSlide${index}/1200/500`}
                  alt={slide.title}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={slide.dataAiHint || "abstract background"}
                  priority={index === 0} 
                  className="brightness-75"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 bg-black/40">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl text-slate-100 drop-shadow-md max-w-2xl">
                    {slide.description}
                  </p>
                  {slide.ctaText && slide.ctaLink && (
                    <Button asChild size="lg" className="mt-4 sm:mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/60 hover:bg-background text-foreground" />
      <CarouselNext className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/60 hover:bg-background text-foreground" />
    </Carousel>
  );
}
