
import React from 'react';
import { useInvoices } from '@/features/payments/hooks/useInvoices';
import { InvoiceHeader } from './invoice/InvoiceHeader';
import { InvoiceList as InvoiceListComponent } from './invoice/InvoiceList';

export const InvoiceList: React.FC = () => {
  const { invoices, isLoading, downloadInvoice } = useInvoices();

  return (
    <div className="space-y-8">
      <InvoiceHeader />
      <InvoiceListComponent
        invoices={invoices}
        isLoading={isLoading}
        downloadInvoice={downloadInvoice}
      />
    </div>
  );
};
