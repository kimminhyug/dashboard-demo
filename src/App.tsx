import type {
  BreakpointKey,
  DashboardSpec,
  DataSource,
  WidgetRegistry,
} from "dashboardity";
import {
  createStaticDataSource,
  createWidgetRegistry,
  DashboardRuntime,
  TopBar,
} from "dashboardity";
import { useEffect, useState } from "react";
import { ModalController, useModalStore } from "react-splitty";
import { SplitDashboardContent } from "./components/SplitDashboardContent";
import dashboardSpecJson from "./data/dashboardSpec.json";
import { dataByKey } from "./data/sourceData";
import CardWidget from "./widgets/CardWidget";
import ChartWidget from "./widgets/ChartWidget";

const dashboardSpec = dashboardSpecJson as DashboardSpec;

const getModalBoundsFromWindow = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const margin = 0.04;
  return {
    x: Math.round(w * margin),
    y: Math.round(h * margin),
    width: Math.round(w * (1 - 2 * margin)),
    height: Math.round(h * (1 - 2 * margin)),
  };
};

const widgets = createWidgetRegistry({
  card: CardWidget,
  chart: ChartWidget,
});

const dataSource = createStaticDataSource({ dataByKey });

const SPLIT_MODAL_ID = "split-dashboard";

export default function App() {
  const addModal = useModalStore((s) => s.addModal);
  const removeModal = useModalStore((s) => s.removeModal);
  const modals = useModalStore((s) => s.modals);
  const isOpen = modals.some((m) => m.id === SPLIT_MODAL_ID);

  const updateModalBounds = useModalStore((s) => s.updateBounds);

  const openSplitModal = () => {
    if (isOpen) return;
    addModal({
      id: SPLIT_MODAL_ID,
      title: "4분할 대시보드",
      content: (
        <div className="relative h-full min-h-[400px] min-w-0 flex flex-col">
          <SplitDashboardContent
            spec={dashboardSpec}
            widgets={widgets}
            dataSource={dataSource}
          />
        </div>
      ),
      options: {
        resizable: true,
        minWidth: 400,
        minHeight: 300,
      },
      bounds: getModalBoundsFromWindow(),
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    const onResize = () =>
      updateModalBounds(SPLIT_MODAL_ID, getModalBoundsFromWindow());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen, updateModalBounds]);

  const closeSplitModal = () => removeModal(SPLIT_MODAL_ID);

  const [runtimeBreakpoint, setRuntimeBreakpoint] = useState<{
    key: BreakpointKey;
    width: number;
  } | null>(null);

  return (
    <ModalController
      width="100vw"
      height="100vh"
      minimizedBarPosition="bottom"
      className="min-h-screen bg-slate-100 flex flex-col"
    >
      <TopBar
        title={dashboardSpec.title}
        className="shadow-sm bg-white border-b border-slate-200 shrink-0"
      />
      <main className="flex-1 min-h-0 overflow-auto flex flex-col relative">
        <BackgroundDashboard
          spec={dashboardSpec}
          widgets={widgets}
          dataSource={dataSource}
          onBreakpointChange={(key, width) => {
            setRuntimeBreakpoint({ key, width });
            console.log("currentBreakpoint", key, "width", width);
          }}
        />
        <div className="absolute top-3 right-3 flex items-center gap-3 z-5">
          <span className="px-2.5 py-1 rounded-md bg-slate-200/90 text-slate-700 text-sm font-medium">
            breakpoint: {runtimeBreakpoint?.key ?? "—"}
            {runtimeBreakpoint != null && (
              <span className="ml-1 text-slate-500 text-xs">
                ({runtimeBreakpoint.width}px)
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={openSplitModal}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            4분할 대시보드 열기
          </button>
          {isOpen && (
            <button
              type="button"
              onClick={closeSplitModal}
              className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 font-medium hover:bg-slate-300 shadow focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              모달 닫기
            </button>
          )}
        </div>
      </main>
    </ModalController>
  );
}

const BackgroundDashboard = ({
  spec,
  widgets,
  dataSource,
  onBreakpointChange,
}: {
  spec: DashboardSpec;
  widgets: WidgetRegistry;
  dataSource: DataSource;
  onBreakpointChange?: (key: BreakpointKey, width: number) => void;
}) => {
  const handleChange = (nextSpec: DashboardSpec) => {
    console.log(nextSpec);
  };
  return (
    <div className="h-full w-full max-w-full min-h-0 min-w-0 p-4 md:p-6 flex flex-col overflow-x-hidden">
      <div className="max-w-[1600px] w-full mx-auto flex-1 min-h-0 min-w-0 rounded-lg overflow-hidden bg-white shadow border border-slate-200 flex flex-col">
        <DashboardRuntime
          key={spec.id}
          initialSpec={spec}
          widgets={widgets}
          dataSource={dataSource}
          mode="view"
          rowHeight={48}
          onChange={handleChange}
          onBreakpointChange={onBreakpointChange}
          gridOptions={{ showGrid: true }}
          className="dashboard-runtime-wrap w-full h-full min-h-0 min-w-0 overflow-hidden"
        />
      </div>
    </div>
  );
};
