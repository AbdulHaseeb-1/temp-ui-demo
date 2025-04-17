import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CourseSection() {
  const courses = [
    {
      id: 1,
      title: "درس نظامی",
      description: "مولانا محمد عبدالرحمن",
    },
    {
      id: 2,
      title: "درس نظامی",
      description: "مولانا محمد عبدالرحمن",
    },
    {
      id: 3,
      title: "درس نظامی",
      description: "مولانا محمد عبدالرحمن",
    },
    {
      id: 4,
      title: "درس نظامی",
      description: "مولانا محمد عبدالرحمن",
    },
  ];

  return (
    <section className=" bg-white w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl text-center mb-12 text-primary">
          کورسز
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="relative overflow-hidden shadow-xl p-0 flex flex-col w-full max-w-[372px] h-auto mx-auto"
            >
              <div className="relative w-full h-48">
                <Image
                  src="/images/home/course.png"
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center items-center py-8 px-4">
                <CardContent className="text-center -mt-12">
                  <h3 className="text-3xl md:text-3xl text-primary mb-4">
                    {course.title}
                  </h3>
                  <p className="text-lg md:text-lg text-gray-600">
                    {course.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-4 flex justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-md w-24 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    مزید
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
