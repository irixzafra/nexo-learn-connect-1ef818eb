
import React from 'react';
import { InvoiceCard, InvoiceProps } from './InvoiceCard';
import { InvoiceEmptyState } from './InvoiceEmptyState';
import { InvoiceLoadingState } from './InvoiceLoadingState';

interface InvoiceListProps {
  invoices: InvoiceProps[];
  isLoading: boolean;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, isLoading }) => {
  if (isLoading) {
    return <InvoiceLoadingState />;
  }

  if (!invoices || invoices.length === 0) {
    return <InvoiceEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.id} {...invoice} />
      ))}
    </div>
  );
};
