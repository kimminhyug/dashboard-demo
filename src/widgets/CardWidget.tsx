import type { WidgetProps } from 'dashboardity';
import { WidgetContainer } from 'dashboardity';

type CardData = {
  value?: string | number;
  subtitle?: string;
  trend?: number;
};

const CardWidget: React.FC<WidgetProps<CardData>> = ({ data, options, className }) => {
  const value = data?.value ?? '-';
  const subtitle = data?.subtitle;
  const trend = data?.trend;
  const title = options?.title as string | undefined ?? '';

  return (
    <WidgetContainer title={title} className={className}>
      <div className="flex flex-col gap-1 min-h-0 min-w-0 overflow-hidden">
        <span className="text-2xl font-semibold text-slate-800 tabular-nums truncate">
          {String(value)}
        </span>
        {subtitle != null && (
          <span className="text-xs text-slate-500">{subtitle}</span>
        )}
        {trend != null && (
          <span className={trend >= 0 ? 'text-xs text-emerald-600' : 'text-xs text-red-600'}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </WidgetContainer>
  );
};

export default CardWidget;
