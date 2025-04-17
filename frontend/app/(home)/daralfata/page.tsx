import FilterBox from "@/components/daralfata/FilterArea";
import QuestionAbsenceCard from "@/components/daralfata/questionAbsenceCard";
import QuestionCard from "@/components/daralfata/questionCard";
import QuestionSection from "@/components/daralfata/questions";
import SectionBanner from "@/components/general/sectionBanner";

import React from "react";

export default function Daralfata() {
  return (
    <div className="max-w-[1920px] mx-auto space-y-20 mb-20 relative overflow-hidden  ">
      <div>
        <SectionBanner />
        <FilterBox />
        <QuestionSection />
      </div>
      <div className=" max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 px-4 ">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <QuestionCard key={item} />
        ))}
      </div>
      <div className="px-4 max-w-7xl mx-auto">
        <QuestionAbsenceCard />
      </div>
    </div>
  );
}
