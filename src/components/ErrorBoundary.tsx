import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong</h1>
              <p className="text-gray-600 mb-4">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
              {this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                  <p className="text-sm text-red-800 font-mono">{this.state.error.message}</p>
                </div>
              )}
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
