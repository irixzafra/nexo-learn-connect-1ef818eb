
import React from 'react';
import { InvoiceCard, InvoiceProps } from './InvoiceCard';
import { InvoiceEmptyState } from './InvoiceEmptyState';
import { InvoiceLoadingState } from './InvoiceLoadingState';

interface InvoiceListProps {
  invoices: InvoiceProps[];
  isLoading: boolean;
  downloadInvoice?: (invoiceId: string) => void;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({ 
  invoices, 
  isLoading,
  downloadInvoice 
}) => {
  if (isLoading) {
    return <InvoiceLoadingState />;
  }

  if (!invoices || invoices.length === 0) {
    return <InvoiceEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {invoices.map((invoice) => (
        <InvoiceCard 
          key={invoice.id} 
          {...invoice} 
          onDownload={downloadInvoice ? () => downloadInvoice(invoice.id) : undefined}
        />
      ))}
    </div>
  );
};
