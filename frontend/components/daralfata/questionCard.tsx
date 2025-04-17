import React from "react";

export default function QuestionCard() {
  const questions = [
    {
      id: 1,
      title: "باطل مذاہب اور فرقے",
      description: "قادیانیوں کے شرعی و قانونی اعتبار سے کافر ہونے کی وضاحت",
    },
    {
      id: 2,
      title: "باطل مذاہب اور فرقے",
      description: "قادیانیوں کے شرعی و قانونی اعتبار سے کافر ہونے کی وضاحت",
    },
    {
      id: 3,
      title: "باطل مذاہب اور فرقے",
      description: "قادیانیوں کے شرعی و قانونی اعتبار سے کافر ہونے کی وضاحت",
    },
  ];

  return (
    <div className="flex flex-col w-full mx-auto mt-10 shadow-2xl rounded-3xl ">
      <div className="flex justify-between items-center px-4  py-3 text-white bg-[url('/images/pattern.png')] bg-cover bg-center rounded-t-2xl ">
        <button className="text-xs">تمام سوالات دیکھیں</button>
        <div className="text-2xl">ایمان و عقائد</div>
      </div>
      <div className="px-4 ">
        {questions.map((question, index) => (
          <div key={question.id}>
            <div
              className={`flex flex-col ${
                index === questions.length - 1
                  ? ""
                  : "border-b border-neutral-400"
              } justify-center items-end gap-2 py-3 `}
            >
              <div className="text-sm ">{question.title}</div>
              <p className="text-sm text-primary">{question.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
