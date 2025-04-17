import React from "react";

export default function SectionBanner({ title }: { title?: string }) {
  return (
    <div>
      <div className="relative bg-[url('/images/sectionBanner.png')] bg-cover bg-center h-52 lg:h-64 w-full">
        <div className="absolute inset-0 bg-white opacity-50" />
        <div className="relative z-10 flex items-center justify-end pr-20  lg:pr-52  xl:pr-80 h-full">
          <h1 className="text-black text-6xl lg:text-8xl ">
            {" "}
            {title ? title : "دارالافتاء"}
          </h1>
        </div>
      </div>
    </div>
  );
}
