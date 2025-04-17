import React from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function PrayerTimesSection() {
  const prayers = [
    { name: "فجر", time: "05:30 AM" },
    { name: "ظہر", time: "01:15 PM" },
    { name: "عصر", time: "05:15 PM" },
    { name: "مغرب", time: "06:35 PM" },
    { name: "عشاء", time: "08:15 PM" },
  ];

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-teal-700 font-arabic">
          نماز کے اوقات
        </h2>

        <div className="grid bg-gradient-to-br from-[#CB6565] to-[#A84545] mx-auto rounded-2xl shadow-lg overflow-hidden">
          <div className="rounded-lg relative min-h-[338px] ">
            {/* Background decorative elements */}
            <div className="absolute right-0 bottom-0">
              <Image
                src="/images/home/prayers/mosque.svg"
                alt="Mosque silhouette"
                width={252}
                height={175}
                className="opacity-80"
              />
            </div>
            <div className="absolute right-0 top-0">
              <Image
                src="/images/home/prayers/Sun.svg"
                alt="Sun"
                width={252}
                height={170}
                className="opacity-80"
              />
            </div>

            {/* Prayer times grid */}
            <div className="xl:max-w-[80%] grid grid-cols-2 lg:grid-cols-5 gap-4 h-full px-4 py-6 md:p-8 text-white relative z-10">
              {prayers.map((prayer, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center md:items-start   rounded-lg p-4 transition-colors"
                >
                  <div className="font-arabic text-4xl md:text-5xl mb-2">
                    {prayer.name}
                  </div>
                  <div
                    className={`font-bold ${geistSans.className} text-2xl md:text-3xl text-nowrap `}
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                  >
                    {prayer.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
