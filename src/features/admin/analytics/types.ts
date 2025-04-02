
export interface PlatformStats {
  total_users: number;
  active_users: number;
  new_users: number;
  total_courses: number;
  active_courses: number;
  total_enrollments: number;
  completion_rate: number;
  average_rating: number;
  // Campos adicionales opcionales que pueden estar presentes en algunos componentes
  new_users_last_7_days?: number;
  coursesCount?: number;
  publishedCoursesCount?: number;
  completionRate?: number;
}
