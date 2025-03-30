
import React from 'react';
import { TestDataType } from '@/contexts/test-data';
import { 
  BookOpen,
  Users,
  FileText,
  MessageSquare,
  Folder,
  UserCircle,
  ClipboardList,
  Tag,
  GraduationCap,
  Award,
  ScrollText,
  CreditCard,
} from 'lucide-react';

// Mapping of data types to icons
export const typeIcons: Record<TestDataType, React.ReactNode> = {
  course: <BookOpen className="h-5 w-5" />,
  user: <Users className="h-5 w-5" />,
  lesson: <FileText className="h-5 w-5" />,
  message: <MessageSquare className="h-5 w-5" />,
  module: <Folder className="h-5 w-5" />,
  profile: <UserCircle className="h-5 w-5" />,
  assignment: <ClipboardList className="h-5 w-5" />,
  category: <Tag className="h-5 w-5" />,
  enrollment: <GraduationCap className="h-5 w-5" />,
  quiz: <ScrollText className="h-5 w-5" />,
  certificate: <Award className="h-5 w-5" />,
  payment: <CreditCard className="h-5 w-5" />
};

// Data types with their display names
export const dataTypeLabels: Record<TestDataType, string> = {
  course: 'Cursos',
  user: 'Usuarios',
  lesson: 'Lecciones',
  message: 'Mensajes',
  module: 'Módulos',
  profile: 'Perfiles',
  assignment: 'Tareas',
  category: 'Categorías',
  enrollment: 'Inscripciones',
  quiz: 'Evaluaciones',
  certificate: 'Certificados',
  payment: 'Pagos'
};

// Logical grouping of data types
export const dataTypeGroups = {
  content: ['course', 'module', 'lesson', 'quiz', 'assignment'] as TestDataType[],
  users: ['user', 'profile'] as TestDataType[],
  classification: ['category'] as TestDataType[],
  interaction: ['message'] as TestDataType[],
  progress: ['enrollment', 'certificate'] as TestDataType[],
  finance: ['payment'] as TestDataType[]
};

// Group labels
export const groupLabels: Record<string, string> = {
  content: 'Contenido',
  users: 'Usuarios',
  classification: 'Clasificación',
  interaction: 'Interacción',
  progress: 'Progreso',
  finance: 'Finanzas'
};

// Data type dependencies
export const dataTypeDependencies: Partial<Record<TestDataType, TestDataType[]>> = {
  lesson: ['course', 'module'],
  module: ['course'],
  enrollment: ['course', 'user'],
  certificate: ['course', 'user', 'enrollment'],
  assignment: ['course', 'module'],
  quiz: ['course', 'module'],
  payment: ['course', 'user']
};
