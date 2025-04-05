
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Check, AlertTriangle, FileCog, FileCode, Trash2, Box } from 'lucide-react';
import { useSupabaseTable } from '@/hooks/use-supabase-table';
import { GlobalDataTable, TableDrawer, TableColumn } from '@/components/global-table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Types for review elements
type ElementStatus = 'obsolete' | 'deprecated' | 'review' | 'current';
type ElementType = 'component' | 'page' | 'route' | 'hook' | 'util';

interface ReviewElement {
  id: string;
  name: string;
  type: ElementType;
  status: ElementStatus;
  path: string;
  replacedBy?: string;
  lastUpdated: string;
  usageCount: number;
  description?: string;
}

// Component for filtering elements
const ElementsFilter: React.FC<{
  search: string;
  setSearch: (value: string) => void;
  statusFilter: ElementStatus | 'all';
  setStatusFilter: (value: ElementStatus | 'all') => void;
  typeFilter: ElementType | 'all';
  setTypeFilter: (value: ElementType | 'all') => void;
}> = ({ search, setSearch, statusFilter, setStatusFilter, typeFilter, setTypeFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4">
      <div className="flex-1">
        <Input
          placeholder="Search by name or path..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={statusFilter === 'all' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setStatusFilter('all')}
        >
          All
        </Badge>
        <Badge 
          variant={statusFilter === 'obsolete' ? 'destructive' : 'outline'}
          className="cursor-pointer"
          onClick={() => setStatusFilter('obsolete')}
        >
          Obsolete
        </Badge>
        <Badge 
          variant={statusFilter === 'deprecated' ? 'secondary' : 'outline'}
          className="cursor-pointer"
          onClick={() => setStatusFilter('deprecated')}
        >
          Deprecated
        </Badge>
        <Badge 
          variant={statusFilter === 'review' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setStatusFilter('review')}
        >
          Under Review
        </Badge>
        <Badge 
          variant={statusFilter === 'current' ? 'outline' : 'outline'}
          className="cursor-pointer"
          onClick={() => setStatusFilter('current')}
        >
          Current
        </Badge>
      </div>
    </div>
  );
};

const ReviewElementsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ElementStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ElementType | 'all'>('all');
  const [selectedElement, setSelectedElement] = useState<ReviewElement | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Use our custom hook to interact with the database
  const {
    data: elementsData,
    isLoading,
    update,
  } = useSupabaseTable<any>({
    tableName: 'ui_components',
    queryKey: ['review-elements'],
    transformer: (item: any): ReviewElement => ({
      id: item.id,
      name: item.name,
      type: (item.type || 'component') as ElementType,
      status: (item.status === 'active' ? 'current' : 'review') as ElementStatus,
      path: item.path || '',
      lastUpdated: item.updated_at || item.created_at,
      usageCount: 0, // Could calculate this from another query
      description: item.description || ''
    })
  });

  // Filter elements based on search and selected filters
  const filteredElements = elementsData ? elementsData.filter(el => {
    const matchesSearch = search.trim() === '' || 
      el.name.toLowerCase().includes(search.toLowerCase()) ||
      el.path.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || el.status === statusFilter;
    const matchesType = typeFilter === 'all' || el.type === typeFilter || 
      (activeTab !== 'all' && el.type === activeTab);
    
    return matchesSearch && matchesStatus && matchesType;
  }) : [];

  // Define columns for the table
  const columns: TableColumn<ReviewElement>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      editable: true,
      required: true,
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
            {row.original.path}
          </div>
        </div>
      ),
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      type: 'select',
      editable: true,
      required: true,
      options: [
        { label: 'Component', value: 'component' },
        { label: 'Page', value: 'page' },
        { label: 'Route', value: 'route' },
        { label: 'Hook', value: 'hook' },
        { label: 'Utility', value: 'util' }
      ],
      cell: ({ row }) => {
        const type = row.original.type;
        return <Badge variant="outline">{type}</Badge>;
      }
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      type: 'select',
      editable: true,
      required: true,
      options: [
        { label: 'Current', value: 'current' },
        { label: 'Under Review', value: 'review' },
        { label: 'Deprecated', value: 'deprecated' },
        { label: 'Obsolete', value: 'obsolete' }
      ],
      cell: ({ row }) => {
        const status = row.original.status;
        switch (status) {
          case 'obsolete':
            return <Badge variant="destructive">Obsolete</Badge>;
          case 'deprecated':
            return <Badge variant="secondary">Deprecated</Badge>;
          case 'review':
            return <Badge variant="default">Under Review</Badge>;
          case 'current':
            return <Badge variant="outline">Current</Badge>;
          default:
            return null;
        }
      },
    },
    {
      id: 'path',
      header: 'Path',
      accessorKey: 'path',
      type: 'text',
      editable: true,
      required: true,
    },
    {
      id: 'replacedBy',
      header: 'Replaced By',
      accessorKey: 'replacedBy',
      type: 'text',
      editable: true,
    },
    {
      id: 'usageCount',
      header: 'Uses',
      accessorKey: 'usageCount',
      type: 'number',
      editable: false,
    },
    {
      id: 'lastUpdated',
      header: 'Last Updated',
      accessorKey: 'lastUpdated',
      type: 'date',
      editable: false,
    },
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
      type: 'text',
      editable: true,
      meta: { multiline: true },
      hidden: true,
    }
  ];

  // Handle edit element
  const handleEditElement = (element: ReviewElement) => {
    setSelectedElement(element);
    setIsDrawerOpen(true);
  };
  
  // Custom actions renderer
  const renderActions = (element: ReviewElement) => (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          // View element logic
          toast.info(`Viewing element: ${element.name}`);
        }}
      >
        <ExternalLink className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          // Mark as current
          toast.info(`Marking as current: ${element.name}`);
        }}
      >
        <Check className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          // Delete element logic
          toast.info(`Deleting: ${element.name}`);
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  // Handle form submission (update element)
  const handleSubmit = async (formData: ReviewElement) => {
    if (!selectedElement) return;
    
    try {
      const updateData = {
        name: formData.name,
        type: formData.type,
        status: formData.status === 'current' ? 'active' : formData.status,
        path: formData.path,
        // Map other fields from ReviewElement to ui_components fields
        description: formData.description,
        // replacedBy would need a column in ui_components
      };
      
      await update({ id: selectedElement.id, data: updateData });
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Error updating element:', error);
      toast.error('Failed to update element');
    }
  };

  return (
    <div className="container mx-auto py-4">
      <PageHeader
        title="Components Review"
        description="Review components, pages, routes, hooks, and utilities"
      />
      
      <div className="mt-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="component">Components</TabsTrigger>
            <TabsTrigger value="page">Pages</TabsTrigger>
            <TabsTrigger value="route">Routes</TabsTrigger>
            <TabsTrigger value="hook">Hooks</TabsTrigger>
            <TabsTrigger value="util">Utilities</TabsTrigger>
          </TabsList>
          
          <ElementsFilter 
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
          
          <Card>
            <CardContent className="pt-6">
              <GlobalDataTable
                data={filteredElements}
                columns={columns}
                searchPlaceholder="Search by name or path..."
                searchColumn="name"
                exportFilename="review-elements"
                onRowClick={handleEditElement}
                renderCustomActions={renderActions}
                emptyState={
                  isLoading ? (
                    <div className="text-center py-8">
                      <div className="spinner mb-2"></div>
                      <p className="text-muted-foreground">Loading elements...</p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Box className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">
                        No elements found for the selected filters
                      </p>
                    </div>
                  )
                }
              />
            </CardContent>
          </Card>
          
          {/* Element Details in Drawer */}
          <TableDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            title="Edit Element"
            data={selectedElement}
            columns={columns}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default ReviewElementsPage;
