
import React from 'react';
import { Badge } from '@/components/ui/badge';

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Activo</Badge>;
    case 'development':
      return <Badge variant="secondary" className="bg-amber-500 text-black hover:bg-amber-600">En Desarrollo</Badge>;
    case 'not-implemented':
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">No Implementado</Badge>;
    case 'duplicate':
      return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200">Duplicado</Badge>;
    case 'deprecated':
      return <Badge variant="destructive">Deprecado</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
