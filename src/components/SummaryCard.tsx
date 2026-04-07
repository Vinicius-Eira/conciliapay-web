import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  valueColor?: string;
  isLoading: boolean;
}

export function SummaryCard({ title, value, icon, valueColor = "text-gray-900", isLoading }: SummaryCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        {icon && <div className="text-gray-400 group-hover:text-brand-primary transition-colors">{icon}</div>}
      </div>
      
      {isLoading ? (
        <div className="flex items-center gap-2 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Carregando...</span>
        </div>
      ) : (
        <h3 className={`text-3xl font-bold mt-1 ${valueColor}`}>
          {value}
        </h3>
      )}
    </div>
  );
}