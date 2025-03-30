
/**
 * Helper functions for the CourseCard components
 */

/**
 * Format a date string to a localized format
 * @param dateString - The date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
};

/**
 * Determine if a course is starting soon (within 14 days)
 * @param startDate - The course start date
 * @returns Boolean indicating if course starts soon
 */
export const isStartingSoon = (startDate?: string): boolean => {
  if (!startDate) return false;
  
  const courseStartDate = new Date(startDate);
  const now = new Date();
  
  // Calculate if course starts within 14 days
  const millisecondsDiff = courseStartDate.getTime() - now.getTime();
  const daysDiff = millisecondsDiff / (1000 * 60 * 60 * 24);
  
  return courseStartDate > now && daysDiff < 14;
};

/**
 * Check if a course has a high rating
 * @param rating - The course rating
 * @param threshold - The threshold for high rating (default: 4.5)
 * @returns Boolean indicating if course has high rating
 */
export const hasHighRating = (rating?: number, threshold = 4.5): boolean => {
  return !!rating && rating >= threshold;
};

/**
 * Generate random number of students enrolled this week for popular courses
 * @returns Number of random enrollments
 */
export const getRandomEnrollmentsThisWeek = (): number => {
  return Math.floor(Math.random() * 50) + 10;
};
