
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const courseEnrollmentData = [
  { month: 'Ene', enrollments: 120 },
  { month: 'Feb', enrollments: 145 },
  { month: 'Mar', enrollments: 162 },
  { month: 'Abr', enrollments: 185 },
  { month: 'May', enrollments: 204 },
  { month: 'Jun', enrollments: 235 },
];

const categoryDistribution = [
  { name: 'Programación', value: 35 },
  { name: 'Diseño', value: 25 },
  { name: 'Marketing', value: 15 },
  { name: 'Negocios', value: 10 },
  { name: 'Idiomas', value: 15 },
];

const completionRates = [
  { course: 'Curso A', completionRate: 78 },
  { course: 'Curso B', completionRate: 62 },
  { course: 'Curso C', completionRate: 85 },
  { course: 'Curso D', completionRate: 45 },
  { course: 'Curso E', completionRate: 72 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const popularCourses = [
  { id: 1, title: "Desarrollo Web Completo", students: 523, rating: 4.8 },
  { id: 2, title: "Design Thinking", students: 412, rating: 4.6 },
  { id: 3, title: "Machine Learning Fundamentals", students: 385, rating: 4.9 },
  { id: 4, title: "Marketing Digital", students: 350, rating: 4.5 },
  { id: 5, title: "Inglés para Negocios", students: 328, rating: 4.4 },
];

const CoursesAnalyticsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Enrollment Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Tendencia de Inscripciones</CardTitle>
          <CardDescription>Últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={courseEnrollmentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} inscripciones`, 'Total']} />
                <Legend />
                <Line type="monotone" dataKey="enrollments" name="Inscripciones" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Categoría</CardTitle>
            <CardDescription>Porcentaje de cursos por temática</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Completion Rates */}
        <Card>
          <CardHeader>
            <CardTitle>Tasas de Finalización</CardTitle>
            <CardDescription>Top 5 cursos por tasa de finalización</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={completionRates}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} unit="%" />
                  <YAxis dataKey="course" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Tasa de Finalización']} />
                  <Legend />
                  <Bar dataKey="completionRate" name="Tasa de Finalización" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Popular Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Cursos Más Populares</CardTitle>
          <CardDescription>Basado en número de estudiantes y calificaciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">#</th>
                  <th className="text-left p-2">Curso</th>
                  <th className="text-left p-2">Estudiantes</th>
                  <th className="text-left p-2">Calificación</th>
                </tr>
              </thead>
              <tbody>
                {popularCourses.map((course, index) => (
                  <tr key={course.id} className="border-b">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{course.title}</td>
                    <td className="p-2">{course.students}</td>
                    <td className="p-2">{course.rating}/5.0</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesAnalyticsSection;
