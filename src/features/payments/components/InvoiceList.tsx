
import React from 'react';
import { useInvoices } from '@/features/payments/hooks/useInvoices';
import { InvoiceHeader } from './invoice/InvoiceHeader';
import { InvoiceCard } from './invoice/InvoiceCard';
import { InvoiceEmptyState } from './invoice/InvoiceEmptyState';
import { InvoiceLoadingState } from './invoice/InvoiceLoadingState';

export const InvoiceList: React.FC = () => {
  const { invoices, isLoading } = useInvoices();

  if (isLoading) {
    return <InvoiceLoadingState />;
  }

  if (invoices.length === 0) {
    return <InvoiceEmptyState />;
  }

  return (
    <div className="space-y-8">
      <InvoiceHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {invoices.map((invoice) => (
          <InvoiceCard key={invoice.id} {...invoice} />
        ))}
      </div>
    </div>
  );
};
