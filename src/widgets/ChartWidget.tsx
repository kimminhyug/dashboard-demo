import type { WidgetProps } from 'dashboardity';
import { WidgetContainer } from 'dashboardity';

type ChartItem = { label?: string; value?: number };
type ChartData = ChartItem[] | { items?: ChartItem[] };

const ChartWidget: React.FC<WidgetProps<ChartData>> = ({ data, options, className }) => {
  const title = (options?.title as string | undefined) ?? '';
  const items: ChartItem[] = Array.isArray(data)
    ? data
    : (data as { items?: ChartItem[] })?.items ?? [];
  const maxVal = items.length
    ? Math.max(...items.map((d) => d.value ?? 0), 1)
    : 1;

  return (
    <WidgetContainer title={title} className={className}>
      <div className="h-full min-h-0 min-w-0 overflow-x-auto overflow-y-hidden flex-1">
        <div
          className="flex items-end gap-1 sm:gap-2 h-full flex-1"
          style={{ minWidth: items.length ? `${items.length * 32}px` : undefined }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-0.5 min-w-8 shrink-0"
              title={`${item.label ?? ''}: ${item.value}`}
            >
              <div
                className="w-full rounded-t bg-indigo-500 min-h-[4px] transition-all"
                style={{
                  height: `${Math.max(4, ((item.value ?? 0) / maxVal) * 100)}%`,
                }}
              />
              <span className="text-[10px] sm:text-xs text-slate-500 truncate w-full text-center">
                {item.label ?? ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </WidgetContainer>
  );
};

export default ChartWidget;
