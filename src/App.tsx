import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { TestDataProvider } from "@/contexts/TestDataContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import CreateCourse from "./pages/instructor/CreateCourse";
import CoursesList from "./pages/instructor/CoursesList";
import EditCourseDetails from "./pages/instructor/EditCourseDetails";
import EditCourseStructure from "./pages/instructor/EditCourseStructure";
import EditLesson from "./pages/instructor/EditLesson";
import CoursesCatalog from "./pages/CoursesCatalog";
import CourseDetail from "./pages/CourseDetail";
import TestDataManagement from "./pages/admin/TestDataManagement";

const Courses = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Cursos</h1>
    <p>Página en desarrollo</p>
  </div>
);

const Users = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Usuarios</h1>
    <p>Página en desarrollo</p>
  </div>
);

const Messages = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Mensajes</h1>
    <p>Página en desarrollo</p>
  </div>
);

const Calendar = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Calendario</h1>
    <p>Página en desarrollo</p>
  </div>
);

const Billing = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Facturación</h1>
    <p>Página en desarrollo</p>
  </div>
);

const Settings = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Configuración</h1>
    <p>Página en desarrollo</p>
  </div>
);

const InstructorStudents = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Estudiantes</h1>
    <p>Página en desarrollo</p>
  </div>
);

const StudentCourses = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Mis Cursos</h1>
    <p>Página en desarrollo</p>
  </div>
);

const CourseLearn = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Aprendizaje</h1>
    <p>Página en desarrollo</p>
  </div>
);

const LessonView = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Lección</h1>
    <p>Página en desarrollo</p>
  </div>
);

const Checkout = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Checkout</h1>
    <p>Página en desarrollo</p>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <EditModeProvider>
          <TestDataProvider>
            <TooltipProvider>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/courses" element={<CoursesCatalog />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
              
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
          </TestDataProvider>
        </EditModeProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
