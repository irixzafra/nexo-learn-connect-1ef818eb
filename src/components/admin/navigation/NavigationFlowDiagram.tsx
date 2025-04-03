
import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { routeMap } from '@/utils/routeUtils';
import { UserRoleType } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';

// Nodos personalizados
import NavigationNode from './nodes/NavigationNode';
import GroupNode from './nodes/GroupNode';

// Estilos
import './styles/navigation-flow.css';

interface NavigationFlowDiagramProps {
  activeRole?: UserRoleType;
  showAllRoutes?: boolean;
}

const NavigationFlowDiagram: React.FC<NavigationFlowDiagramProps> = ({
  activeRole = 'admin',
  showAllRoutes = false,
}) => {
  // Definir tipos de nodos personalizados
  const nodeTypes = useMemo(() => ({
    navigation: NavigationNode,
    group: GroupNode,
  }), []);

  // Función para generar nodos iniciales a partir del routeMap
  const generateInitialElements = useCallback(() => {
    const nodes: any[] = [];
    const edges: any[] = [];
    const processedRoutes = new Set<string>();
    
    // Nodo central para el inicio
    nodes.push({
      id: 'home',
      type: 'navigation',
      data: { 
        label: 'Inicio', 
        route: '/',
        isActive: true,
        role: 'all',
      },
      position: { x: 0, y: 0 },
      style: { zIndex: 1000 }
    });
    
    // Crear grupos principales
    const groups = [
      { id: 'public', label: 'Público', x: -400, y: -200, role: 'all' },
      { id: 'student', label: 'Estudiante', x: 0, y: -200, role: 'student' },
      { id: 'instructor', label: 'Instructor', x: 400, y: -200, role: 'profesor' },
      { id: 'admin', label: 'Administración', x: 200, y: 200, role: 'admin' },
    ];
    
    groups.forEach(group => {
      nodes.push({
        id: group.id,
        type: 'group',
        data: { 
          label: group.label,
          role: group.role,
        },
        position: { x: group.x, y: group.y },
        style: { 
          width: 300, 
          height: 250,
          zIndex: 0
        }
      });
      
      // Conectar el grupo con el nodo home
      edges.push({
        id: `e-home-${group.id}`,
        source: 'home',
        target: group.id,
        animated: true,
        style: { stroke: '#9b87f5' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      });
    });

    // Procesar rutas del routeMap
    let nodeIndex = 1;
    let routesByGroup: Record<string, { id: string, route: string, label: string }[]> = {
      'public': [],
      'student': [],
      'instructor': [],
      'admin': [],
    };
    
    Object.entries(routeMap).forEach(([key, route]) => {
      // Solo procesar rutas que son strings (no funciones)
      if (typeof route === 'string' && !processedRoutes.has(route)) {
        processedRoutes.add(route);
        
        let group = 'public';
        if (route.includes('/admin')) {
          group = 'admin';
        } else if (route.includes('/profesor') || route.includes('/instructor')) {
          group = 'instructor';
        } else if (route.includes('/app')) {
          group = 'student';
        }
        
        routesByGroup[group].push({
          id: `node-${nodeIndex}`,
          route: route,
          label: key
        });
        
        nodeIndex++;
      }
    });
    
    // Agregar nodos al diagrama dentro de cada grupo
    Object.entries(routesByGroup).forEach(([group, routeNodes]) => {
      const columns = 2;
      const itemsPerColumn = Math.ceil(routeNodes.length / columns);
      
      routeNodes.forEach((item, index) => {
        const column = Math.floor(index / itemsPerColumn);
        const row = index % itemsPerColumn;
        
        const parentGroup = nodes.find(node => node.id === group);
        if (!parentGroup) return;
        
        const parentX = parentGroup.position.x;
        const parentY = parentGroup.position.y;
        
        const x = parentX - 100 + (column * 170);
        const y = parentY + 50 + (row * 40);
        
        nodes.push({
          id: item.id,
          type: 'navigation',
          data: { 
            label: item.label, 
            route: item.route,
            isActive: false,
            role: group === 'public' ? 'all' : group,
          },
          position: { x, y },
          parentId: group,
          extent: 'parent',
          style: { 
            zIndex: 10,
            fontSize: '10px',
            padding: '4px',
            height: 'auto',
            width: 150,
          }
        });
        
        // Conectar con nodos relacionados
        if (index > 0) {
          edges.push({
            id: `e-${routeNodes[index-1].id}-${item.id}`,
            source: routeNodes[index-1].id,
            target: item.id,
            type: 'smoothstep',
            style: { stroke: '#e0e0e0' },
          });
        }
      });
    });
    
    return { nodes, edges };
  }, []);
  
  const initialElements = useMemo(() => generateInitialElements(), [generateInitialElements]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialElements.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialElements.edges);
  
  // Filtrar nodos según el rol activo
  const filteredNodes = useMemo(() => {
    if (showAllRoutes) return nodes;
    
    return nodes.filter(node => {
      if (!node.data?.role) return true;
      if (node.data.role === 'all') return true;
      if (Array.isArray(node.data.role) && node.data.role.includes(activeRole)) return true;
      return node.data.role === activeRole;
    });
  }, [nodes, activeRole, showAllRoutes]);
  
  // Filtrar edges según los nodos visibles
  const filteredEdges = useMemo(() => {
    const visibleNodeIds = new Set(filteredNodes.map(node => node.id));
    return edges.filter(edge => 
      visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
    );
  }, [edges, filteredNodes]);
  
  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge({
      ...params,
      animated: true,
      style: { stroke: '#9b87f5' },
    }, eds));
  }, [setEdges]);
  
  return (
    <div className="navigation-flow-container">
      <ReactFlow
        nodes={filteredNodes}
        edges={filteredEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        className="navigation-flow"
      >
        <Controls />
        <MiniMap />
        <Background color="#f0f0f0" gap={16} />
        <Panel position="bottom-center" className="navigation-flow-legend">
          <div className="flex gap-4 p-2 bg-background border rounded-md shadow-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Público</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs">Estudiante</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-xs">Instructor</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-xs">Admin</span>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default NavigationFlowDiagram;
