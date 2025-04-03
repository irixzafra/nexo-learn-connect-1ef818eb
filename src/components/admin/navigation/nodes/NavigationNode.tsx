
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { isValidPath } from '@/utils/routeValidation';
import { ExternalLink, AlertTriangle } from 'lucide-react';

interface NavigationNodeProps {
  data: {
    label: string;
    route: string;
    isActive: boolean;
    role: string;
  };
  selected: boolean;
}

const NavigationNode = memo(({ data, selected }: NavigationNodeProps) => {
  const { label, route, isActive, role } = data;
  
  const isValid = isValidPath(route);
  const isExternal = route.startsWith('http');
  
  // Determine node color based on role
  const getRoleColor = () => {
    if (role === 'all') return 'bg-green-100 border-green-300';
    if (role === 'student') return 'bg-blue-100 border-blue-300';
    if (role === 'profesor' || role === 'instructor') return 'bg-purple-100 border-purple-300';
    if (role === 'admin') return 'bg-orange-100 border-orange-300';
    return 'bg-gray-100 border-gray-300';
  };
  
  return (
    <div className={`navigation-node ${getRoleColor()} ${selected ? 'ring-2 ring-primary' : ''} ${isActive ? 'border-2' : ''}`}>
      <Handle type="target" position={Position.Top} />
      
      <div className="flex items-center justify-between">
        <div className="navigation-node-title">{label}</div>
        {isExternal && <ExternalLink className="h-3 w-3 ml-1 text-blue-500" />}
        {!isValid && <AlertTriangle className="h-3 w-3 ml-1 text-yellow-500" />}
      </div>
      
      <div className="navigation-node-route">{route}</div>
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

export default NavigationNode;
