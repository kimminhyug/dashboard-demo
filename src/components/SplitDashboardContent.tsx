import type { DashboardSpec, DataSource, WidgetRegistry } from "dashboardity";
import { SplitLayout } from "react-splitty";
import { DashboardPanel } from "./DashboardPanel";

type SplitDashboardContentProps = {
  spec: DashboardSpec;
  widgets: WidgetRegistry;
  dataSource: DataSource;
};

export const SplitDashboardContent = ({
  spec,
  widgets,
  dataSource,
}: SplitDashboardContentProps) => (
  <div className="absolute inset-0 flex flex-col min-h-[360px] min-w-0">
    <SplitLayout
      rows={2}
      cols={2}
      resizable={true}
      resizeButtonClassName="hidden"
      initialRowHeights={[50, 50]}
      initialColWidths={[50, 50]}
      minRowHeightPercent={15}
      minColWidthPercent={15}
      className="flex-1 min-h-0 border border-slate-200 rounded-lg overflow-hidden bg-slate-200"
      dividerClassName="bg-slate-300 hover:bg-slate-400"
      cellClassName="p-1 bg-slate-100 min-h-0 overflow-hidden"
    >
      <div className="h-full w-full min-h-0 min-w-0 overflow-hidden">
        <DashboardPanel spec={spec} widgets={widgets} dataSource={dataSource} index={0} forceBreakpoint="base" />
      </div>
      <div className="h-full w-full min-h-0 min-w-0 overflow-hidden">
        <DashboardPanel spec={spec} widgets={widgets} dataSource={dataSource} index={1} forceBreakpoint="base" />
      </div>
      <div className="h-full w-full min-h-0 min-w-0 overflow-hidden">
        <DashboardPanel spec={spec} widgets={widgets} dataSource={dataSource} index={2} forceBreakpoint="base" />
      </div>
      <div className="h-full w-full min-h-0 min-w-0 overflow-hidden">
        <DashboardPanel spec={spec} widgets={widgets} dataSource={dataSource} index={3} forceBreakpoint="base" />
      </div>
    </SplitLayout>
  </div>
);
