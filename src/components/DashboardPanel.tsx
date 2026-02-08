import type {
  BreakpointKey,
  DashboardSpec,
  DataSource,
  WidgetRegistry,
} from "dashboardity";
import {
  DashboardRuntime,
  getBreakpointKey,
  resolveColumns,
  useContainerWidth,
} from "dashboardity";
import { useRef } from "react";

const BREAKPOINT_BORDER: Record<string, string> = {
  base: "rgb(244 63 94)",
  sm: "rgb(245 158 11)",
  md: "rgb(16 185 129)",
  a4: "rgb(236 72 153)",
  lg: "rgb(6 182 212)",
  xl: "rgb(139 92 246)",
};

type DashboardPanelProps = {
  spec: DashboardSpec;
  widgets: WidgetRegistry;
  dataSource: DataSource;
  index: number;
  /** 지정 시 해당 브레이크포인트(1열 등)로 고정. 모달 4분할에서 base 사용 */
  forceBreakpoint?: BreakpointKey;
};

export const DashboardPanel = ({
  spec,
  widgets,
  dataSource,
  index,
  forceBreakpoint,
}: DashboardPanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawWidth = useContainerWidth(containerRef);
  // 초기/미측정 시 0이면 1열(base)로 해석되도록 최소 너비 사용
  const width = rawWidth > 0 ? rawWidth : 320;
  const columns =
    forceBreakpoint != null
      ? (spec.columnsByBreakpoint as Record<string, number>)?.[forceBreakpoint] ??
        spec.columns
      : resolveColumns(
          width,
          spec.columnsByBreakpoint ?? spec.columns,
          spec.breakpoints,
        );
  const breakpointKey =
    forceBreakpoint ?? getBreakpointKey(width, spec.breakpoints);
  const borderColor =
    BREAKPOINT_BORDER[breakpointKey] ?? BREAKPOINT_BORDER.base;

  return (
    <div
      ref={containerRef}
      className="h-full w-full min-h-0 min-w-0 flex flex-col overflow-hidden rounded-lg bg-white shadow border-l-4"
      style={{ borderLeftColor: borderColor }}
    >
      <div className="shrink-0 px-2 py-1 bg-slate-100 border-b border-slate-200 text-xs font-medium text-slate-600">
        대시보드 {index + 1} · {breakpointKey} · {columns}열
      </div>
      <div className="flex-1 min-h-0 min-w-0 overflow-x-hidden overflow-y-auto flex flex-col">
        <DashboardRuntime
          key={`${spec.id}-${index}`}
          initialSpec={spec}
          widgets={widgets}
          dataSource={dataSource}
          forceBreakpoint={forceBreakpoint}
          mode="view"
          rowHeight={40}
          gridOptions={{ showGrid: true }}
          className="dashboard-runtime-wrap w-full max-w-full h-full min-h-0 min-w-0 overflow-hidden"
        />
      </div>
    </div>
  );
};
