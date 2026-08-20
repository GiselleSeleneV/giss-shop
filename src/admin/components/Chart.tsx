import React from 'react';

interface ChartProps {
  title: string;
  data: { label: string; value: number }[];
}

const Chart: React.FC<ChartProps> = ({ title, data }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gold/20">
      <h3 className="text-lg font-semibold text-navy mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 sm:gap-4">
            <div className="w-16 sm:w-20 shrink-0 text-xs sm:text-sm text-muted-foreground font-medium">
              {item.label}
            </div>
            <div className="min-w-0 flex-1 bg-[#f7f3eb] rounded-full h-3">
              <div 
                className="bg-gold h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <div className="w-12 text-sm font-medium text-navy text-right">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;