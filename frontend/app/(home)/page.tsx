import Header from "@/components/general/Header";
import HomeCarousel from "@/components/home/carousel";
import CourseSection from "@/components/home/coursesSection";
import FeatureCardSection from "@/components/home/featureCardSection";
import PrayerTimesSection from "@/components/home/prayerTimesSection";
import QuestionSection from "@/components/home/questtionsSection";
import React from "react";

export default function HomePage() {
  return (
    <div className=" flex flex-col items-center justify-center w-full h-full">
      <div className="max-w-[1920] mx-auto space-y-20">
        <HomeCarousel />
        <FeatureCardSection />
        <QuestionSection />
        <CourseSection />
        <PrayerTimesSection />
      </div>
    </div>
  );
}
