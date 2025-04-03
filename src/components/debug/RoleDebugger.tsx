
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RoleDebugger: React.FC = () => {
  const { 
    userRole, 
    effectiveRole, 
    simulatedRole,
    isViewingAsOtherRole,
    user,
    userProfile,
    forceUpdateRole,
    setSimulatedRole,
    resetToOriginalRole
  } = useAuth();

  const handleForceAdmin = async () => {
    if (user?.email) {
      await forceUpdateRole(user.email, 'admin');
    }
  };

  const handleSimulateStudent = () => {
    setSimulatedRole('student');
  };

  const handleSimulateInstructor = () => {
    setSimulatedRole('instructor');
  };

  const handleResetRole = () => {
    resetToOriginalRole();
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Role Debugger</CardTitle>
      </CardHeader>
      <CardContent className="text-xs">
        <div className="space-y-1">
          <div><strong>User Email:</strong> {user?.email || 'Not logged in'}</div>
          <div><strong>User ID:</strong> {user?.id || 'None'}</div>
          <div><strong>User Role:</strong> {userRole || 'None'}</div>
          <div><strong>Simulated Role:</strong> {simulatedRole || 'None'}</div>
          <div><strong>Effective Role:</strong> {effectiveRole || 'None'}</div>
          <div><strong>Is Viewing As:</strong> {isViewingAsOtherRole ? 'Yes' : 'No'}</div>
          <div><strong>Profile ID:</strong> {userProfile?.id || 'None'}</div>
          <div><strong>Profile Role:</strong> {userProfile?.role || 'None'}</div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <button 
            onClick={handleForceAdmin}
            className="bg-red-500 text-white px-2 py-1 rounded text-xs"
          >
            Force Admin Role
          </button>
          <button 
            onClick={handleSimulateStudent}
            className="bg-green-500 text-white px-2 py-1 rounded text-xs"
          >
            View as Student
          </button>
          <button 
            onClick={handleSimulateInstructor}
            className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
          >
            View as Instructor
          </button>
          {isViewingAsOtherRole && (
            <button 
              onClick={handleResetRole}
              className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
            >
              Reset to Original Role
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleDebugger;
