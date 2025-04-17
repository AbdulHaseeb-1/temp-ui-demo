import { Card, CardContent } from "@/components/ui/card";

export default function QuestionSection() {
  const questions = [
    {
      id: 1,
      date: "2024-02-25",
      title: "جامعہ کے تعلیمی اور دیگر مواد کی دوسرے فارم پر",
      description: "جامعہ کے تعلیمی اور دیگر مواد کی دوسرے فارم پر",
    },
    {
      id: 2,
      date: "2024-02-25",
      title: "جامعہ کے تعلیمی اور دیگر مواد کی دوسرے فارم پر",
      description: "جامعہ کے تعلیمی اور دیگر مواد کی دوسرے فارم پر",
    },
    {
      id: 3,
      date: "2024-02-25",
      title: "جامعہ کے تعلیمی اور دیگر مواد کی دوسرے فارم پر",
      description: "جامعہ کے تعلیمی اور دیگر مواد کی دوسرے فارم پر",
    },
    {
      id: 4,
      date: "2024-02-25",
      title: "جامعہ کے تعلیمی اور دیگر مواد کی دوسرے فارم پر",
      description: "جامعہ کے تعلیمی اور دیگر مواد کی دوسرے فارم پر",
    },
  ];

  return (
    <section className="w-full py-12 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-cover bg-center z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 rounded-2xl shadow-xl px-4 sm:px-6 pt-6 ">
          {/* Header */}
          <div className="flex justify-center mb-8">
            <div className="relative bg-primary text-white text-3xl sm:text-4xl md:text-5xl  h-16 sm:h-20 rounded-xl w-72 sm:w-96 grid place-content-center mt-3">
              <div className="mt-0">سوالات</div>
            </div>
          </div>

          {/* Questions */}
          <div className="text-right">
            {questions.map((question) => (
              <Card
                key={question.id}
                className="border-0 border-b-2 border-neutral-300 shadow-none rounded-xl bg-transparent"
              >
                <CardContent className="flex flex-col md:flex-row gap-4 md:gap-10 px-4 sm:px-5 py-0">
                  {/* Button */}
                  <div className="flex justify-start items-end  md:justify-start order-1 md:order-0">
                    <button className="text-primary text-xl md:text-2xl hover:underline">
                      مزید پڑھیں
                    </button>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 space-y-5 ">
                    <p className="md:text-xl ">تاریخ: {question.date}</p>
                    <h3 className="text-2xl md:text-4xl font-semibold">
                      {question.title}
                    </h3>
                    <p className="text-xl md:text-3xl text-gray-700">
                      {question.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
