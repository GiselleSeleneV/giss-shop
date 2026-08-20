import React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: typeof LucideIcon;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
}) => {
  const changeColor = {
    positive: "text-green-600 bg-green-50",
    negative: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  }[changeType];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gold/20 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-navy truncate">{value}</p>
          <div
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${changeColor}`}
          >
            {change}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className={color.includes("gold") ? "text-navy" : "text-gold"} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
