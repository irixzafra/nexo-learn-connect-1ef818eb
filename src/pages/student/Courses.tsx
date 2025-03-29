
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useEnrolledCourses } from "@/features/courses/hooks/useEnrolledCourses";
import { EnrolledCoursesList } from "@/features/courses/components/EnrolledCoursesList";

const StudentCourses: React.FC = () => {
  const { user } = useAuth();
  const { enrolledCourses, isLoading } = useEnrolledCourses(user?.id);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mis Cursos</h1>
      <EnrolledCoursesList courses={enrolledCourses} isLoading={isLoading} />
    </div>
  );
};

export default StudentCourses;
