
import React from 'react';
import { useAuth } from '@/contexts/auth';

const Profile: React.FC = () => {
  const { user, profile } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
      
      {profile ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium mb-2">Información Personal</h2>
              <p><span className="font-medium">Nombre:</span> {profile.full_name}</p>
              <p><span className="font-medium">Email:</span> {user?.email}</p>
              <p><span className="font-medium">Rol:</span> {profile.role}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
          No se pudo cargar la información del perfil.
        </div>
      )}
    </div>
  );
};

export default Profile;
