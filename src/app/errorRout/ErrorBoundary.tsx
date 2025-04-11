"use client";

import React, { ErrorInfo, ReactNode, useEffect } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
            <div className="text-center">
              <div className="inline-flex rounded-full bg-red-100 p-4">
                <div className="rounded-full bg-red-200 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <h1 className="mt-5 text-2xl font-bold text-[#056968]">Oops, something went wrong</h1>
              <p className="mt-2 text-[#056968]">
                We apologize for the inconvenience. Our team has been notified about this issue.
              </p>
              {typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md text-left overflow-auto max-h-60">
                  <p className="font-medium text-red-600">{this.state.error?.toString()}</p>
                  {this.state.errorInfo && (
                    <pre className="mt-2 text-xs text-[#056968]">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-[#056968] text-white px-4 py-2 rounded-md hover:bg-[#045756] transition-colors"
                >
                  Return to Home
                </button>
                <button
                  onClick={this.resetError}
                  className="border border-[#edb13b] text-[#edb13b] px-4 py-2 rounded-md hover:bg-[#edb13b] hover:text-white transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to use hooks within class component
const ErrorBoundaryWithHooks = (props: ErrorBoundaryProps) => {
  useEffect(() => {
    // You could add analytics or logging initialization here
  }, []);

  return <ErrorBoundary {...props} />;
};

export default ErrorBoundaryWithHooks;