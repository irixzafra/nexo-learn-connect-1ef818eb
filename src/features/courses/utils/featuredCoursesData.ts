
import { FeaturedCourse } from '../components/FeaturedCourseCard';

export const courseCategories = [
  "Todos", "Diseño", "Desarrollo", "Marketing", "Negocios", "Fotografía", "Música"
];

export const featuredCourses: FeaturedCourse[] = [
  {
    id: 1,
    title: "Diseño de Interfaces Modernas",
    description: "Aprende a crear interfaces atractivas y funcionales con principios de UX/UI modernos.",
    instructor: "Ana García",
    price: 129,
    rating: 4.8,
    students: 1240,
    hours: 24,
    level: "Intermedio",
    category: "Diseño",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    id: 2,
    title: "Desarrollo Web Fullstack",
    description: "Domina HTML, CSS, JavaScript, React, Node.js y más en este curso completo.",
    instructor: "Carlos Mendez",
    price: 199,
    rating: 4.9,
    students: 3150,
    hours: 42,
    level: "Todos los niveles",
    category: "Desarrollo",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: 3,
    title: "Marketing Digital Estratégico",
    description: "Estrategias efectivas de marketing digital para hacer crecer tu negocio.",
    instructor: "Laura Torres",
    price: 149,
    rating: 4.7,
    students: 1870,
    hours: 18,
    level: "Principiante",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978"
  },
  {
    id: 4,
    title: "Fotografía Profesional",
    description: "Técnicas avanzadas de fotografía para capturar momentos perfectos.",
    instructor: "Miguel Ángel",
    price: 159,
    rating: 4.6,
    students: 920,
    hours: 22,
    level: "Intermedio",
    category: "Fotografía",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
  },
  {
    id: 5,
    title: "Emprendimiento Digital",
    description: "Cómo crear y escalar negocios digitales desde cero.",
    instructor: "Elena Jiménez",
    price: 179,
    rating: 4.8,
    students: 2450,
    hours: 28,
    level: "Todos los niveles",
    category: "Negocios",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
  },
  {
    id: 6,
    title: "Desarrollo de Apps Móviles",
    description: "Crea aplicaciones nativas para iOS y Android con React Native.",
    instructor: "Roberto Sánchez",
    price: 189,
    rating: 4.9,
    students: 1650,
    hours: 36,
    level: "Avanzado",
    category: "Desarrollo",
    image: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521"
  }
];
