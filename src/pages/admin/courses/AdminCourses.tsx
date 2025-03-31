
import React from "react";
import { List, FolderTree, Network, Award, BarChart3 } from "lucide-react";
import AdminPageLayout from "@/layouts/AdminPageLayout";
import { AdminTabItem } from "@/components/shared/AdminNavTabs";
import AllCoursesTab from "@/components/admin/courses/tabs/AllCoursesTab";
import CategoriesTab from "@/components/admin/courses/tabs/CategoriesTab";
import LearningPathsTab from "@/components/admin/courses/tabs/LearningPathsTab";
import CertificatesTab from "@/components/admin/courses/tabs/CertificatesTab";
import AnalyticsTab from "@/components/admin/courses/tabs/AnalyticsTab";

const AdminCourses: React.FC = () => {
  const tabs: AdminTabItem[] = [
    {
      value: 'list',
      label: 'Listado de cursos',
      icon: <List className="h-4 w-4" />,
      content: <AllCoursesTab />
    },
    {
      value: 'categories',
      label: 'Categorías',
      icon: <FolderTree className="h-4 w-4" />,
      content: <CategoriesTab />
    },
    {
      value: 'learning-paths',
      label: 'Rutas de Aprendizaje',
      icon: <Network className="h-4 w-4" />,
      content: <LearningPathsTab />
    },
    {
      value: 'certificates',
      label: 'Certificados',
      icon: <Award className="h-4 w-4" />,
      content: <CertificatesTab />
    },
    {
      value: 'analytics',
      label: 'Analíticas',
      icon: <BarChart3 className="h-4 w-4" />,
      content: <AnalyticsTab />
    }
  ];

  return (
    <AdminPageLayout
      title="Gestión de Cursos"
      subtitle="Administra cursos, categorías, rutas de aprendizaje y certificados"
      tabs={tabs}
      defaultTabValue="list"
    />
  );
};

export default AdminCourses;
