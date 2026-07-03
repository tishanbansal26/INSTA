import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ 
  title = "No Data Found", 
  description = "Get started by creating a new record.",
  icon = <FolderOpen className="w-12 h-12 text-slate-300" />
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center bg-white border border-dashed rounded-xl border-slate-200">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 max-w-sm">{description}</p>
    </div>
  );
}
