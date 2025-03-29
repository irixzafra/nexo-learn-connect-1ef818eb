import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { TestDataProvider } from "@/contexts/TestDataContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorBoundaryFallback from "@/components/ErrorBoundaryFallback";

// Landing and public pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import CoursesCatalog from "./pages/CoursesCatalog";
import CourseDetail from "./pages/CourseDetail";
import AboutUs from "./pages/AboutUs";
import Courses from "./pages/Courses";
import Scholarships from "./pages/Scholarships";

// Dashboard and shared pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Messages from "./pages/placeholder/Messages";
import Calendar from "./pages/placeholder/Calendar";
import Billing from "./pages/placeholder/Billing";
import Settings from "./pages/placeholder/Settings";

// Instructor pages
import InstructorDashboard from "./pages/instructor/Dashboard";
import InstructorStudents from "./pages/instructor/Students";
import CoursesList from "./pages/instructor/CoursesList";
import CreateCourse from "./pages/instructor/CreateCourse";
import EditCourseDetails from "./pages/instructor/EditCourseDetails";
import EditCourseStructure from "./pages/instructor/EditCourseStructure";
import EditLesson from "./pages/instructor/EditLesson";

// Student pages
import StudentCourses from "./pages/student/Courses";
import CourseLearn from "./pages/student/CourseLearn";
import LessonView from "./pages/student/LessonView";
import Checkout from "./pages/student/Checkout";

// Admin pages
import TestDataManagement from '@/pages/admin/TestDataManagement';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    },
  },
});

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <TestDataProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <EditModeProvider>
                <TooltipProvider>
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route path="/courses" element={<CoursesCatalog />} />
                    <Route path="/courses/:id" element={<CourseDetail />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/scholarships" element={<Scholarships />} />
                    
                    {/* Protected routes */}
                    <Route path="/home" element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="/my-courses" element={
                      <ProtectedRoute>
                        <StudentCourses />
                      </ProtectedRoute>
                    } />
                    <Route path="/users" element={
                      <ProtectedRoute requiredRole="admin">
                        <Users />
                      </ProtectedRoute>
                    } />
                    <Route path="/courses/:courseId/learn" element={
                      <ProtectedRoute>
                        <CourseLearn />
                      </ProtectedRoute>
                    } />
                    <Route path="/courses/:courseId/learn/:lessonId" element={
                      <ProtectedRoute>
                        <LessonView />
                      </ProtectedRoute>
                    } />
                    <Route path="/checkout/:courseId" element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    } />
                    <Route path="/messages" element={
                      <ProtectedRoute>
                        <Messages />
                      </ProtectedRoute>
                    } />
                    <Route path="/calendar" element={
                      <ProtectedRoute>
                        <Calendar />
                      </ProtectedRoute>
                    } />
                    <Route path="/billing" element={
                      <ProtectedRoute>
                        <Billing />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    } />
                    
                    {/* Instructor routes */}
                    <Route path="/instructor/dashboard" element={
                      <ProtectedRoute requiredRole="instructor">
                        <InstructorDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/instructor/students" element={
                      <ProtectedRoute requiredRole="instructor">
                        <InstructorStudents />
                      </ProtectedRoute>
                    } />
                    <Route path="/instructor/courses" element={
                      <ProtectedRoute requiredRole="instructor">
                        <CoursesList />
                      </ProtectedRoute>
                    } />
                    <Route path="/instructor/courses/new" element={
                      <ProtectedRoute requiredRole="instructor">
                        <CreateCourse />
                      </ProtectedRoute>
                    } />
                    <Route path="/instructor/courses/:id/edit" element={
                      <ProtectedRoute requiredRole="instructor">
                        <EditCourseDetails />
                      </ProtectedRoute>
                    } />
                    <Route path="/instructor/courses/:id/structure" element={
                      <ProtectedRoute requiredRole="instructor">
                        <EditCourseStructure />
                      </ProtectedRoute>
                    } />
                    <Route path="/instructor/courses/:courseId/lessons/:lessonId/edit" element={
                      <ProtectedRoute requiredRole="instructor">
                        <EditLesson />
                      </ProtectedRoute>
                    } />
                    
                    {/* Admin routes */}
                    <Route path="/admin/dashboard" element={
                      <ProtectedRoute requiredRole="admin">
                        <Home />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/content" element={
                      <ProtectedRoute requiredRole="admin">
                        <Home />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/test-data" element={
                      <ProtectedRoute requiredRole="admin">
                        <TestDataManagement />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                  <Sonner />
                </TooltipProvider>
              </EditModeProvider>
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </TestDataProvider>
    </ErrorBoundary>
  );
}

export default App;
