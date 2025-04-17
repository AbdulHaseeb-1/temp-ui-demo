"use client";

import React, { useState } from "react";
import Image from "next/image";
import NavigationMenu from "./NavigationMenu";
import { Menu, Search, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-primary sticky top-0 z-50 shadow-md">
      <div className="px-4 max-w-[1920px] w-full mx-auto">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between h-[90px] gap-6">
          {/* Left Section: Date & Search */}
          <div className="flex items-center gap-4 lg:gap-6 text-white flex-1">
            <span className="text-lg lg:text-base xl:text-xl whitespace-nowrap">
              13 شوال 1446 ھ | 12 اپریل 2025 ء
            </span>
            <div className="flex items-center bg-teal-100 rounded-full px-3 py-2 l w-48 ">
              <Search className="h-6 w-6 text-gray-600" />
              <input
                type="text"
                className="w-full pt-1 flex-grow text-black  bg-transparent border-none focus:outline-none px-3 text-right placeholder:text-neutral-600"
                placeholder="تلاش کریں"
                dir="rtl"
              />
            </div>
          </div>

          {/* Right Section: Nav + Image */}
          <div className="flex items-center gap-4 lg:gap-6 justify-end-safe flex-grow-1">
            <div className="flex justify-center w-full">
              <NavigationMenu />
            </div>
            <Image
              src="/images/header/right.png"
              alt="Logo or Banner"
              width={235}
              height={58}
              className="object-cover w-auto h-10  lg:h-[50px]"
              priority
            />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between h-[70px]">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Image
            src="/images/header/right.png"
            alt="Logo or Banner"
            width={160}
            height={40}
            className="object-cover h-10 w-auto"
            priority
          />
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-primary border-t border-white/20 py-4 px-3 animate-in slide-in-from-top">
            <div className="flex flex-col gap-4">
              <span className="text-white text-center text-sm">
                13 شوال 1446 ھ | 12 اپریل 2025 ء
              </span>

              <div className="flex items-center bg-teal-100 rounded-full px-6 py-2">
                <Search className="h-6 w-6 text-gray-600" />
                <input
                  type="text"
                  className="pt-1 flex-grow text-black  bg-transparent border-none focus:outline-none px-3 text-right placeholder:text-neutral-600"
                  placeholder="تلاش کریں"
                  dir="rtl"
                />
              </div>

              <div className="mt-2">
                <NavigationMenu mobile={true} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
