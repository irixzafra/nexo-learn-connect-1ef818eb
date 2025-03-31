
import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';

// Página de ejemplo para pruebas
const DummyPage: FC<{ title: string }> = ({ title }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p>Esta es una página de ejemplo para la navegación.</p>
  </div>
);

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AppLayout>
            <DummyPage title="Página Principal" />
          </AppLayout>
        } />
        <Route path="/home" element={
          <AppLayout>
            <DummyPage title="Panel Principal" />
          </AppLayout>
        } />
        <Route path="/courses" element={
          <AppLayout>
            <DummyPage title="Mis Cursos" />
          </AppLayout>
        } />
        <Route path="/community" element={
          <AppLayout>
            <DummyPage title="Comunidad" />
          </AppLayout>
        } />
        <Route path="/calendar" element={
          <AppLayout>
            <DummyPage title="Calendario" />
          </AppLayout>
        } />
        <Route path="/messages" element={
          <AppLayout>
            <DummyPage title="Mensajes" />
          </AppLayout>
        } />
        <Route path="/notifications" element={
          <AppLayout>
            <DummyPage title="Notificaciones" />
          </AppLayout>
        } />
        <Route path="/reports" element={
          <AppLayout>
            <DummyPage title="Reportes" />
          </AppLayout>
        } />
        <Route path="/finances" element={
          <AppLayout>
            <DummyPage title="Finanzas" />
          </AppLayout>
        } />
        <Route path="/saved-items" element={
          <AppLayout>
            <DummyPage title="Elementos Guardados" />
          </AppLayout>
        } />
        <Route path="/settings" element={
          <AppLayout>
            <DummyPage title="Configuración" />
          </AppLayout>
        } />
        <Route path="/profile" element={
          <AppLayout>
            <DummyPage title="Mi Perfil" />
          </AppLayout>
        } />
        <Route path="/admin/*" element={
          <AppLayout>
            <DummyPage title="Administración" />
          </AppLayout>
        } />
        <Route path="/auth/login" element={<DummyPage title="Login" />} />
        <Route path="/auth/register" element={<DummyPage title="Registro" />} />
      </Routes>
    </BrowserRouter>
  );
};
