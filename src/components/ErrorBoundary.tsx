
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  FallbackComponent?: React.ComponentType<{ error?: Error; resetError?: () => void }>;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.FallbackComponent) {
        return (
          <this.props.FallbackComponent 
            error={this.state.error} 
            resetError={this.resetErrorBoundary} 
          />
        );
      }
      
      // Default fallback UI
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-medium text-red-800">Something went wrong</h2>
          <button 
            onClick={this.resetErrorBoundary}
            className="mt-2 px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
