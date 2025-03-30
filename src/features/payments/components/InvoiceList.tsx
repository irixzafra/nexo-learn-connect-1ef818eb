
import React from 'react';
import { useInvoices } from '@/features/payments/hooks/useInvoices';
import { InvoiceHeader } from './invoice/InvoiceHeader';
import { InvoiceCard } from './invoice/InvoiceCard';
import { InvoiceEmptyState } from './invoice/InvoiceEmptyState';
import { InvoiceLoadingState } from './invoice/InvoiceLoadingState';

export const InvoiceList: React.FC = () => {
  const { invoices, isLoading, downloadInvoice } = useInvoices();

  if (isLoading) {
    return <InvoiceLoadingState />;
  }

  if (invoices.length === 0) {
    return <InvoiceEmptyState />;
  }

  return (
    <div className="space-y-8">
      <InvoiceHeader />
      <InvoiceCard invoices={invoices} downloadInvoice={downloadInvoice} />
    </div>
  );
};
