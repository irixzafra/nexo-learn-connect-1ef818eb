
// Re-export from an existing toast library like sonner
import { toast } from 'sonner';

export { toast };
export const useToast = () => {
  return { toast };
};
