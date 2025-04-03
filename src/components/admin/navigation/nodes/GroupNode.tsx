
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface GroupNodeProps {
  data: {
    label: string;
    role: string;
  };
}

const GroupNode = memo(({ data }: GroupNodeProps) => {
  const { label, role } = data;
  
  // Determine group color based on role
  const getRoleColor = () => {
    if (role === 'all') return 'bg-green-50 border-green-200';
    if (role === 'student') return 'bg-blue-50 border-blue-200';
    if (role === 'profesor' || role === 'instructor') return 'bg-purple-50 border-purple-200';
    if (role === 'admin') return 'bg-orange-50 border-orange-200';
    return 'bg-gray-50 border-gray-200';
  };
  
  return (
    <div className={`group-node ${getRoleColor()}`}>
      <Handle type="target" position={Position.Top} />
      <div className="group-node-header">{label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

export default GroupNode;
