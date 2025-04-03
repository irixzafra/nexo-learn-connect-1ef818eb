
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

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
      console.log('>>> DEBUG RoleDebugger: Forcing admin role for', user.email);
      await forceUpdateRole(user.email, 'admin');
    } else if (userProfile?.email) {
      console.log('>>> DEBUG RoleDebugger: Forcing admin role for profile email', userProfile.email);
      await forceUpdateRole(userProfile.email, 'admin');
    } else {
      console.log('>>> DEBUG RoleDebugger: Forcing admin role for default email admin@nexo.com');
      await forceUpdateRole('admin@nexo.com', 'admin');
    }
  };

  return (
    <Card className="mb-4 border-red-200">
      <CardHeader className="pb-2 bg-red-50">
        <CardTitle className="text-sm flex items-center">
          <Shield className="h-4 w-4 mr-2 text-red-500" />
          Role Debugger
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs">
        <div className="space-y-1">
          <div><strong>User Email:</strong> {user?.email || 'Not logged in'}</div>
          <div><strong>User ID:</strong> {user?.id || 'None'}</div>
          <div><strong>User Role:</strong> {userRole || 'None'}</div>
          <div><strong>User Role Type:</strong> {typeof userRole}</div>
          <div><strong>User Role (Exact Value):</strong> "{userRole}"</div>
          <div><strong>Effective Role:</strong> {effectiveRole || 'None'}</div>
          <div><strong>Is Viewing As Other:</strong> {isViewingAsOtherRole ? 'Yes' : 'No'}</div>
          <div><strong>Profile ID:</strong> {userProfile?.id || 'None'}</div>
          <div><strong>Profile Role:</strong> {userProfile?.role || 'None'}</div>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <Button 
            onClick={handleForceAdmin}
            className="bg-red-500 text-white px-2 py-1 rounded text-xs"
          >
            Force Admin Role
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleDebugger;
