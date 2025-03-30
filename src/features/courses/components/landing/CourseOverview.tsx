
import React from "react";
import { BookOpen } from "lucide-react";
import { Course, Module, Lesson } from "@/types/course";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { CourseDescriptionTab } from "./tabs/CourseDescriptionTab";
import { CourseContentTab } from "./tabs/CourseContentTab";
import { CourseFAQTab } from "./tabs/CourseFAQTab";

interface CourseOverviewProps {
  course: Course;
  modulesWithLessons: Array<Module & { lessons: Lesson[] }>;
  expandedFAQs: string[];
  setExpandedFAQs: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CourseOverview: React.FC<CourseOverviewProps> = ({
  course,
  modulesWithLessons,
  expandedFAQs,
  setExpandedFAQs,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="lg:col-span-2">
      <Tabs defaultValue="descripcion" className="mt-4">
        <TabsList className="mb-6 grid w-full grid-cols-3 lg:w-auto lg:inline-flex bg-transparent p-0 space-x-2">
          <TabsTrigger value="descripcion" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Descripción
          </TabsTrigger>
          <TabsTrigger value="temario" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Temario
          </TabsTrigger>
          <TabsTrigger value="faq" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            FAQs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="descripcion" className="mt-0">
          <CourseDescriptionTab course={course} />
        </TabsContent>
        
        <TabsContent value="temario" className="mt-0">
          <CourseContentTab 
            modulesWithLessons={modulesWithLessons} 
            courseId={course.id} 
          />
        </TabsContent>
        
        <TabsContent value="faq" className="mt-0">
          <CourseFAQTab
            expandedFAQs={expandedFAQs}
            setExpandedFAQs={setExpandedFAQs}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
