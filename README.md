# Dashboard Demo

[dashboardity](https://www.npmjs.com/package/dashboardity) 기반 대시보드 데모. JSON으로 레이아웃·위젯을 관리하고, 브레이크포인트별 반응형 그리드를 사용합니다.

## 기능

- **차트 위젯** · **카드 위젯**: `src/widgets/`
- **JSON 스펙**: `src/data/dashboardSpec.json` (레이아웃, 패널, `breakpoints`, `columnsByBreakpoint`)
- **반응형**: base(2열) → sm(4) → md(6) → lg(8) → xl(12열)
- **Tailwind CSS** 스타일

## 실행

```bash
npm install
npm run dev
```

빌드: `npm run build`
# dashboard-demo
