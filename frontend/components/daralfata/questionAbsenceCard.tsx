import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function QuestionAbsenceCard() {
  return (
    <div className="rounded-md  border-2 border-primary p-5 md:px-10 py-5 ">
      {/*  */}
      <div className="flex justify-end items-center gap-6 w-full h-full border-b">
        <div className="text-2xl">مطلوبہ سوال موجود نہیں؟</div>
        <Image
          src={"/images/question-mark.png"}
          alt="Image"
          width={1000}
          height={1000}
          className="h-16 w-16"
        />
      </div>
      {/*  */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="text-center text-xl">
          گر آپ کا مطلوبہ سوال موجود نہیں تو اپنا سوال پوچھنے کے لیے نیچے کلک
          کریں، سوال بھیجنے کے بعد جواب کا انتظار کریں۔ سوالات کی کثرت کی وجہ سے
          کبھی جواب دینے میں پندرہ بیس دن کا وقت بھی لگ جاتا ہے۔
        </div>
        <Button className="bg-gradient-to-t from-[#0F766E] to-[#1CDCCD]">
          سوال پوچھیں
        </Button>
      </div>
    </div>
  );
}
