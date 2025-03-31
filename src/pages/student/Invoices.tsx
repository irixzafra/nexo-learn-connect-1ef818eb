
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useInvoices } from '@/features/payments/hooks/useInvoices';
import { InvoiceHeader } from '@/features/payments/components/invoice/InvoiceHeader';
import { InvoiceList } from '@/features/payments/components/invoice/InvoiceList';
import AppLayout from '@/layouts/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const Invoices: React.FC = () => {
  const { user } = useAuth();
  const { invoices, isLoading, filter, setFilter } = useInvoices(user?.id);

  const handleFilterChange = (value: string) => {
    setFilter(value as 'all' | 'paid' | 'pending');
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <InvoiceHeader />
          
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="all" onValueChange={handleFilterChange} value={filter}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger value="paid">Pagadas</TabsTrigger>
                  <TabsTrigger value="pending">Pendientes</TabsTrigger>
                </TabsList>
                
                <TabsContent value={filter}>
                  {/* Pass proper props to InvoiceList */}
                  <InvoiceList 
                    invoices={invoices.map(invoice => ({
                      ...invoice,
                      date: new Date(invoice.created_at || Date.now()).toISOString()
                    }))} 
                    isLoading={isLoading} 
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Invoices;
