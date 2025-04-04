
// Re-export from an existing toast library like sonner
import { toast as sonnerToast } from 'sonner';

type ToastParams = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning";
  duration?: number;
  action?: React.ReactNode;
};

// Create a wrapper for toast that accepts our parameters
const toast = (params: ToastParams) => {
  const { variant, ...restParams } = params;
  
  // Map our variant to sonner's variant
  let sonnerVariant: "success" | "error" | "warning" | "info" | undefined;
  
  switch (variant) {
    case "destructive":
      sonnerVariant = "error";
      break;
    case "success":
      sonnerVariant = "success";
      break;
    case "warning":
      sonnerVariant = "warning";
      break;
    default:
      sonnerVariant = "info";
  }
  
  return sonnerToast[sonnerVariant || "info"](params.title, {
    description: params.description,
    duration: params.duration,
    action: params.action,
  });
};

export { toast };

export const useToast = () => {
  return { toast };
};
