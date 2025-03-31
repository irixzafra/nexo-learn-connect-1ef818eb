import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { CacheManager } from "@/lib/cache/CacheManager";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ConnectionStatus } from "@/components/offline/ConnectionStatus";
import { Loader } from "@/components/ui/Loader";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/layout/sidebar/SidebarProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import CourseDetails from "@/pages/CourseDetails";
import LessonView from "@/pages/student/LessonView";
import CourseNotes from "@/pages/student/CourseNotes";
import Checkout from "@/pages/Checkout";
import Profile from "@/pages/profile";
import AdminDashboard from "@/pages/admin/dashboard";
import UserManagement from "@/pages/admin/UserManagement";
import AdminCourses from "@/pages/admin/courses/AdminCourses";
import InstructorDashboard from "@/pages/instructor/Dashboard";
import AdminPageEdit from "@/pages/admin/pages/AdminPageEdit";
import AdminPages from "@/pages/admin/pages/AdminPages";
import SettingsPage from "@/pages/admin/settings";
import TestDataPage from "@/pages/admin/test-data";
import AuditLogPage from "@/pages/admin/AuditLog";
import DesignPage from "@/pages/admin/design";
import BillingPage from "@/pages/admin/Billing";
import LearningPathsAdmin from "@/pages/admin/learning-paths";
import Achievements from "@/pages/student/Achievements";
import GamificationAdmin from "@/pages/admin/gamification";

const queryClient = new QueryClient();

function App() {
  const { initializeAuth } = useAuth();

  React.useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className="App">
      <ErrorBoundary>
        <CacheManager>
          <ConnectionStatus />
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <SidebarProvider>
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:courseId" element={<CourseDetails />} />
                    <Route
                      path="/courses/:courseId/learn/:lessonId"
                      element={
                        <ProtectedRoute>
                          <LessonView />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/courses/:courseId/notes"
                      element={
                        <ProtectedRoute>
                          <CourseNotes />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/checkout/:courseId"
                      element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/dashboard"
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/users"
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <UserManagement />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/courses"
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <AdminCourses />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/learning-paths"
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <LearningPathsAdmin />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/instructor/dashboard"
                      element={
                        <ProtectedRoute roles={["instructor"]}>
                          <InstructorDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/pages/edit/:pageId"
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <AdminPageEdit />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/pages"
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <AdminPages />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/settings"
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <SettingsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/test-data"
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <TestDataPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/audit-log"
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <AuditLogPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/design"
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <DesignPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/billing"
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <BillingPage />
                        </ProtectedRoute>
                      }
                    />
                    
                    {/* Gamification Routes */}
                    <Route
                      path="/profile/achievements"
                      element={
                        <ProtectedRoute>
                          <Achievements />
                        </ProtectedRoute>
                      }
                    />
                    
                    <Route
                      path="/admin/gamification"
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <GamificationAdmin />
                        </ProtectedRoute>
                      }
                    />
                    
                  </Routes>
                </Suspense>
                <Toaster />
              </SidebarProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </CacheManager>
      </ErrorBoundary>
    </div>
  );
}

export default App;
