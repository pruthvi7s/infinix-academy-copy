
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import placeholderImages from "@/app/lib/placeholder-images.json";

const MarqueeContent = ({ courses }: { courses: typeof placeholderImages.trendingCourses }) => (
  <div className="flex flex-nowrap animate-marquee motion-reduce:animate-none space-x-6 pr-6">
    {courses.map((course, index) => (
      <Link href="/courses" key={`${course.title}-${index}`} className="block w-80 flex-shrink-0">
          <Card className="h-full transition-transform duration-300 ease-in-out hover:scale-105">
            <CardHeader className="p-0">
                <Image 
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={225}
                    className="rounded-t-lg aspect-video object-cover"
                    data-ai-hint={course.dataAiHint}
                />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-base font-semibold truncate" title={course.title}>{course.title}</CardTitle>
            </CardContent>
          </Card>
      </Link>
    ))}
  </div>
);

export default function TrendingCoursesMarquee() {
  return (
    <section className="w-full py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-headline font-bold text-primary flex items-center justify-center gap-3">
          <TrendingUp className="h-8 w-8" />
          Top Trending Courses
        </h2>
        <p className="text-lg text-muted-foreground mt-2">Explore our most popular courses.</p>
      </div>
      <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex flex-nowrap">
          <MarqueeContent courses={placeholderImages.trendingCourses} />
          <MarqueeContent courses={placeholderImages.trendingCourses} />
        </div>
      </div>
    </section>
  );
}
