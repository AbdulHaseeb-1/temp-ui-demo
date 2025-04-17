import QuestionCard from "@/components/daralfata/questionCard";
import QuestionSection from "@/components/daralfata/questions";
import SectionBanner from "@/components/general/sectionBanner";
import React from "react";

export default function Bani() {
  return (
    <div className="max-w-[1920px] mx-auto bg-white  text-right">
      <SectionBanner title={"بانی جامعہ حضرت بنوری رحمہ اللہ"} />
      <QuestionSection />

      <div className="flex  gap-6 p-6 max-w-3xl mx-auto">
        {[1, 2].map((item) => (
          <QuestionCard key={item} />
        ))}
      </div>
    </div>
  );
}
