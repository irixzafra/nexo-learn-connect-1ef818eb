
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, FileQuestion } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const OrphanReviewPage: React.FC = () => {
  // Esta es una lista aproximada de archivos en src/pages que podrían no estar importados en AppRoutes.tsx
  // Basada en el conocimiento del proyecto
  const potentialOrphanPages = [
    'src/pages/AboutUs.tsx',
    'src/pages/Careers.tsx',
    'src/pages/CertificateVerify.tsx',
    'src/pages/Community.tsx',
    'src/pages/ContactPage.tsx',
    'src/pages/CourseDetail.tsx',
    'src/pages/CourseDetailPage.tsx',
    'src/pages/CourseLanding.tsx',
    'src/pages/Courses.tsx',
    'src/pages/CoursesCatalog.tsx',
    'src/pages/DynamicPage.tsx',
    'src/pages/Home.tsx',
    'src/pages/Index.tsx',
    'src/pages/LeaderBoard.tsx',
    'src/pages/Login.tsx',
    'src/pages/Notifications.tsx',
    'src/pages/Profile.tsx', 
    'src/pages/Recommendations.tsx',
    'src/pages/Register.tsx',
    'src/pages/Scholarships.tsx',
    'src/pages/Users.tsx',
    'src/pages/admin/Users.tsx',
    'src/pages/admin/audit/AuditLog.tsx',
    'src/pages/admin/certificates/CertificateManagement.tsx',
    'src/pages/admin/certificates/CertificateVerifyPage.tsx',
    'src/pages/admin/content/TemplatesPage.tsx',
    'src/pages/admin/courses/AdminCourseDetail.tsx',
    'src/pages/admin/courses/AdminLessonEdit.tsx',
    'src/pages/admin/dashboard/index.tsx',
    'src/pages/admin/design/DesignSystem.tsx',
    'src/pages/admin/finances/AdminFinances.tsx',
    'src/pages/admin/gamification/index.tsx',
    'src/pages/admin/instructors/AdminInstructors.tsx',
    'src/pages/admin/navigation/NavigationExplorer.tsx',
    'src/pages/admin/pages/CreatePage.tsx',
    'src/pages/admin/pages/EditPage.tsx',
    'src/pages/admin/resources/ResourceRepository.tsx',
    'src/pages/admin/settings/ThemeSettings.tsx',
    'src/pages/admin/settings/developer.tsx',
    'src/pages/design-system/DesignSystemPage.tsx',
    'src/pages/design-system/components/ButtonPage.tsx',
    'src/pages/legal/AccessibilityPage.tsx',
    'src/pages/legal/CookiesPage.tsx',
    'src/pages/legal/PrivacyPage.tsx',
    'src/pages/legal/TermsPage.tsx',
    'src/pages/moderator/CommunityManagement.tsx',
    'src/pages/moderator/ContentReview.tsx',
    'src/pages/moderator/Dashboard.tsx',
    'src/pages/moderator/ReportedContent.tsx',
    'src/pages/moderator/UserWarnings.tsx',
    'src/pages/payment/PaymentCancel.tsx',
    'src/pages/payment/PaymentSuccess.tsx',
    'src/pages/placeholder/Billing.tsx',
    'src/pages/placeholder/Calendar.tsx',
    'src/pages/placeholder/Invoices.tsx',
    'src/pages/placeholder/Messages.tsx',
    'src/pages/placeholder/PlaceholderPage.tsx',
    'src/pages/placeholder/Settings.tsx',
    'src/pages/placeholder/Users.tsx',
    'src/pages/profile/index.tsx',
    'src/pages/public/CertificateVerificationPortal.tsx',
    'src/pages/public/CertificateVerifyPage.tsx',
    'src/pages/student/Achievements.tsx',
    'src/pages/student/Billing.tsx',
    'src/pages/student/Checkout.tsx',
    'src/pages/student/CheckoutCancel.tsx',
    'src/pages/student/CheckoutSuccess.tsx',
    'src/pages/student/CourseLearn.tsx',
    'src/pages/student/CourseNotes.tsx',
    'src/pages/student/Courses.tsx',
    'src/pages/student/Dashboard.tsx',
    'src/pages/student/Invoices.tsx',
    'src/pages/student/LessonView.tsx',
    'src/pages/student/MyCourses.tsx',
    'src/pages/user/CertificateDetail.tsx',
    'src/pages/user/Certificates.tsx',
    'src/pages/user/Preferences.tsx',
  ];

  return (
    <AdminPageLayout 
      title="Revisión de Páginas Huérfanas" 
      subtitle="Páginas potencialmente no utilizadas en rutas de la aplicación"
      backHref="/app/admin/dashboard"
    >
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-amber-500 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Nota Importante
          </CardTitle>
          <CardDescription>
            Esta lista es una aproximación y puede requerir verificación manual. Los archivos listados
            están presentes en el directorio <code>src/pages/</code> pero podrían no estar siendo
            utilizados como componentes en <code>AppRoutes.tsx</code>.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Páginas Potencialmente Huérfanas</CardTitle>
          <CardDescription>
            Se encontraron {potentialOrphanPages.length} archivos que podrían no estar siendo utilizados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {potentialOrphanPages.map((filePath, index) => (
              <div 
                key={index} 
                className="flex items-start p-3 rounded-md border border-border bg-card/50 hover:bg-muted/50 transition-colors"
              >
                <FileQuestion className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-mono">{filePath}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
};

export default OrphanReviewPage;
