import { Loader2 } from 'lucide-react';

interface SkeletonLoaderProps {
  text?: string;
  className?: string;
}

export function SkeletonLoader({ text = "Loading data...", className = "" }: SkeletonLoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-slate-500 animate-pulse ${className}`}>
      <Loader2 className="w-8 h-8 mb-4 animate-spin text-blue-500" />
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}
