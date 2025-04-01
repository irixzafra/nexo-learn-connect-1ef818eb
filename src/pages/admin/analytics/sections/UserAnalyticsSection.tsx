
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const usersByRoleData = [
  { name: 'Estudiantes', value: 4200 },
  { name: 'Instructores', value: 320 },
  { name: 'Moderadores', value: 45 },
  { name: 'Administradores', value: 20 },
  { name: 'Otros', value: 150 }
];

const userActivityData = [
  { name: 'Lun', activos: 1200, nuevos: 84 },
  { name: 'Mar', activos: 1350, nuevos: 92 },
  { name: 'Mié', activos: 1400, nuevos: 105 },
  { name: 'Jue', activos: 1250, nuevos: 85 },
  { name: 'Vie', activos: 1500, nuevos: 110 },
  { name: 'Sáb', activos: 950, nuevos: 65 },
  { name: 'Dom', activos: 850, nuevos: 40 }
];

const retentionData = [
  { name: 'Semana 1', tasa: 100 },
  { name: 'Semana 2', tasa: 85 },
  { name: 'Semana 3', tasa: 72 },
  { name: 'Semana 4', tasa: 68 },
  { name: 'Semana 8', tasa: 55 },
  { name: 'Semana 12', tasa: 48 },
  { name: 'Semana 24', tasa: 35 }
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const UserAnalyticsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Users Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Actividad de Usuarios</CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={userActivityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="activos" name="Usuarios Activos" fill="#8884d8" />
                  <Bar dataKey="nuevos" name="Nuevos Registros" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución por Rol</CardTitle>
            <CardDescription>Total: 4,735 usuarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={usersByRoleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {usersByRoleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} usuarios`, 'Cantidad']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Retention */}
      <Card>
        <CardHeader>
          <CardTitle>Retención de Usuarios</CardTitle>
          <CardDescription>Tasa de retención de cohorte por semana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={retentionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit="%" domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Tasa de Retención']} />
                <Bar dataKey="tasa" name="Retención" fill="#3182ce" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Users Card */}
      <Card>
        <CardHeader>
          <CardTitle>Usuarios Más Activos</CardTitle>
          <CardDescription>Basado en actividad en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Usuario</th>
                  <th className="text-left p-2">Rol</th>
                  <th className="text-left p-2">Cursos Completados</th>
                  <th className="text-left p-2">Última Actividad</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Ana Martínez</td>
                  <td className="p-2">Estudiante</td>
                  <td className="p-2">7</td>
                  <td className="p-2">Hoy, 14:32</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Carlos López</td>
                  <td className="p-2">Estudiante</td>
                  <td className="p-2">5</td>
                  <td className="p-2">Hoy, 12:21</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Marta Rodríguez</td>
                  <td className="p-2">Estudiante</td>
                  <td className="p-2">12</td>
                  <td className="p-2">Ayer, 19:45</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Javier Santos</td>
                  <td className="p-2">Instructor</td>
                  <td className="p-2">4</td>
                  <td className="p-2">Hoy, 09:15</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Laura González</td>
                  <td className="p-2">Estudiante</td>
                  <td className="p-2">8</td>
                  <td className="p-2">Hoy, 11:03</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAnalyticsSection;
