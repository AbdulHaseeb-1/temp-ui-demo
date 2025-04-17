import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

export default function HomeCarousel() {
  return (
    // shadcn customized carousel
    <Carousel>
      <CarouselContent className="relative">
        {[1, 2, 3, 4].map((item) => (
          <CarouselItem key={item}>
            <Image
              src={"/images/home/board.png"}
              height={2000}
              width={2000}
              alt="Board"
              className="min-h-[20rem] max-h-[32rem] w-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  );
}
