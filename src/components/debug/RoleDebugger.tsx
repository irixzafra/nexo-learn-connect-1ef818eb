
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RoleDebugger: React.FC = () => {
  const { 
    userRole, 
    effectiveRole, 
    isViewingAsOtherRole,
    user,
    userProfile,
    forceUpdateRole
  } = useAuth();

  const handleForceAdmin = async () => {
    if (user?.email) {
      await forceUpdateRole(user.email, 'admin');
    }
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
          <div><strong>Effective Role:</strong> {effectiveRole || 'None'}</div>
          <div><strong>Is Viewing As Other:</strong> {isViewingAsOtherRole ? 'Yes' : 'No'}</div>
          <div><strong>Profile ID:</strong> {userProfile?.id || 'None'}</div>
          <div><strong>Profile Role:</strong> {userProfile?.role || 'None'}</div>
        </div>
        <button 
          onClick={handleForceAdmin}
          className="mt-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
        >
          Force Admin Role
        </button>
      </CardContent>
    </Card>
  );
};

export default RoleDebugger;
