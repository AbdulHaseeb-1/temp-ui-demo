import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export default function FeatureCardSection() {
  return (
    <section className="container mx-auto md:py-12 px-4 sm:px-6 lg:px-8 xl:px-44">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center">
        <FeatureCard
          icon="/images/home/arabic-art.svg"
          title="تعارف جامعہ مدینہ"
          description="پوسٹ گریجویٹ اور انڈر گریجویٹ کورسز"
          bgColor="bg-white"
          textColor="text-primary"
          borderColor="border-teal-600"
        />
        <FeatureCard
          icon="/images/home/quran-alt.svg"
          title="بانی جامعہ حضرت مفتی محمد رفیع عثمانی"
          description="تعارف، سوانح حیات"
          bgColor="bg-white"
          textColor="text-teal-600"
          borderColor="border-teal-600"
        />
        <FeatureCard
          icon="/images/home/people.svg"
          title="مہتمم"
          description="بانی جامعہ حضرت مفتی محمد رفیع عثمانی"
          bgColor="bg-white"
          textColor="text-teal-600"
          borderColor="border-teal-600"
        />
        <FeatureCard
          icon="/images/home/books.svg"
          title="دارالافتاء"
          description="آپ کے مسائل کا حل"
          bgColor="bg-white"
          textColor="text-teal-600"
          borderColor="border-teal-600"
        />
      </div>
    </section>
  );
}

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
};

function FeatureCard({
  icon,
  title,
  description,
  bgColor = "bg-white",
  borderColor = "border-transparent",
  textColor = "text-black",
}: FeatureCardProps) {
  return (
    <Card
      className={`group grid ${bgColor} ${borderColor} md:border-4 shadow-md w-full h-auto min-h-[200px] sm:min-h-[250px] md:min-h-[282px] transition-all hover:shadow-xl hover:bg-gradient-to-br from-[#0F766E] via-[#025e56] to-[#04D9C8] duration-300`}
    >
      <CardContent className="flex flex-row justify-between items-center p-4 sm:p-6 gap-4 sm:gap-6 h-full">
        <div className="flex-shrink-0 mb-4 sm:mb-0 ">
          <div className="bg-white rounded-full p-2 sm:p-3 flex items-center justify-center shadow-inner">
            <Image
              src={icon}
              width={80}
              height={80}
              alt={title}
              className="object-contain rounded-full w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28"
            />
          </div>
        </div>
        <div
          className={`text-right flex flex-col gap-2 sm:gap-4 transition-colors duration-300 group-hover:text-white ${textColor} rtl`}
          dir="rtl"
        >
          <h3 className={`text-2xl md:text-4xl   leading-relaxed`}>{title}</h3>
          <p className={`text-2xl md:text-4xl leading-relaxed`}>
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
