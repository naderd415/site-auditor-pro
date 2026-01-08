import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log for debugging (users can screenshot console)
    console.error('[ErrorBoundary] Page crashed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
            <div className="glass-card p-6 rounded-2xl max-w-md w-full">
              <h1 className="text-xl font-bold">حدث خطأ في الصفحة</h1>
              <p className="text-sm text-muted-foreground mt-2">
                حاول تحديث الصفحة. لو المشكلة مستمرة ابعتلي لقطة من Console.
              </p>
              {this.state.error?.message ? (
                <details className="mt-4">
                  <summary className="text-sm text-primary cursor-pointer">عرض سبب الخطأ</summary>
                  <pre className="mt-2 text-xs whitespace-pre-wrap break-words text-muted-foreground">
                    {this.state.error.message}
                  </pre>
                </details>
              ) : null}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
