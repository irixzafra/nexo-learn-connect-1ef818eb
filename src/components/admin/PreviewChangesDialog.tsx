
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SitePage } from '@/types/pages';

interface PreviewChangesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  originalPage: SitePage;
  modifiedPage: SitePage;
}

// Simplified preview dialog
const PreviewChangesDialog: React.FC<PreviewChangesDialogProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Confirm Changes</DialogTitle>
          <DialogDescription>
            Review the changes before publishing.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p>Preview functionality has been removed as part of the inline editing cleanup.</p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Publish Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewChangesDialog;
