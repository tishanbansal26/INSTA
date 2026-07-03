import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = "Something went wrong", 
  message = "We couldn't load this data. Please try again.",
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-red-50/50 rounded-xl border border-red-100">
      <div className="p-3 mb-4 bg-red-100 rounded-full text-red-600">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 max-w-md">{message}</p>
      
      {onRetry && (
        <Button 
          variant="outline" 
          className="mt-6 border-red-200 text-red-600 hover:bg-red-50"
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
