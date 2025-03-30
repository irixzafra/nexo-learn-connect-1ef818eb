
import React from 'react';
import { useSubscription } from '@/features/payments/hooks/useSubscription';
import { Loader2 } from 'lucide-react';
import { ManageSubscriptionHeader } from './subscription/ManageSubscriptionHeader';
import { ActiveSubscriptionCard } from './subscription/ActiveSubscriptionCard';
import { NoSubscriptionAlert } from './subscription/NoSubscriptionAlert';

export const ManageSubscription: React.FC = () => {
  const { subscription, isLoading, cancelSubscription, resumeSubscription } = useSubscription();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!subscription) {
    return <NoSubscriptionAlert />;
  }

  return (
    <div className="space-y-8">
      <ManageSubscriptionHeader />
      
      <ActiveSubscriptionCard 
        subscription={subscription}
        onCancel={cancelSubscription}
        onResume={resumeSubscription}
      />
    </div>
  );
};
