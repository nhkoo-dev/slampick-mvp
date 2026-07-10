import { Cpu, ShoppingBag, Sparkles, TrendingUp, Users } from 'lucide-react';

// 실제 FilterBar(지역/티어/3축)와 동일한 구성의 필터 프리뷰
const FILTER_ROWS = [
  { label: '지역', options: ['전체', 'US', '중화권', '일본', '중동'] },
  { label: '티어', options: ['전체', '메가', '미드', '나노'] },
  { label: '3축', options: ['전체', '가용성', '적합도', '성과'] },
];

// 실제 인플루언서 사진 대신 카테고리를 나타내는 그라데이션 + 아이콘으로 대체한 placeholder 데이터
const INFLUENCERS = [
  {
    name: '루나',
    handle: 'luna.seoul',
    country: '🇰🇷 KR',
    category: '뷰티',
    icon: Sparkles,
    gradient: 'from-rose-400 to-fuchsia-500',
    metricIcon: Users,
    metricLabel: '482K',
  },
  {
    name: '미아',
    handle: 'mia.tokyo',
    country: '🇯🇵 JP',
    category: '패션',
    icon: ShoppingBag,
    gradient: 'from-sky-400 to-blue-500',
    metricIcon: TrendingUp,
    metricLabel: '4.8%',
  },
  {
    name: '조이',
    handle: 'zoe.la',
    country: '🇺🇸 US',
    category: '테크',
    icon: Cpu,
    gradient: 'from-amber-400 to-orange-500',
    metricIcon: Users,
    metricLabel: '96K',
  },
];

export default function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md animate-[float_7s_ease-in-out_infinite] rounded-[24px] border border-white/25 bg-white/10 p-2 shadow-[0_30px_80px_rgba(20,10,60,0.45)] backdrop-blur-xl">
      {/* browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <div className="ml-3 flex-1 truncate rounded-full bg-white/20 px-4 py-1 text-xs text-white/80">
          app.slampick.io/today
        </div>
      </div>

      {/* TodayList를 축소한 대시보드 프리뷰 */}
      <div className="rounded-[20px] bg-white p-4 shadow-inner">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-bold text-gray-900">오늘의 리스트</h3>
          <span className="text-[10px] text-gray-400">2026.07.10</span>
        </div>

        {/* 필터 (지역 / 티어 / 3축) */}
        <div className="mt-3 space-y-2 rounded-xl border border-gray-200 p-3">
          {FILTER_ROWS.map((row) => (
            <div key={row.label} className="flex flex-wrap items-center gap-1.5">
              <span className="w-8 shrink-0 text-[10px] font-semibold text-gray-500">
                {row.label}
              </span>
              {row.options.map((option, i) => (
                <span
                  key={option}
                  className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                    i === 0
                      ? 'bg-gray-900 text-white'
                      : 'border border-gray-300 bg-white text-gray-600'
                  }`}
                >
                  {option}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* 인플루언서 썸네일 그리드 (9:16 비율, object-contain으로 잘리지 않게 표시) */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {INFLUENCERS.map((inf) => (
            <div
              key={inf.handle}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
            >
              <div
                className={`relative flex aspect-[9/16] w-full items-center justify-center overflow-hidden bg-gradient-to-br ${inf.gradient}`}
              >
                <inf.icon className="h-6 w-6 object-contain text-white/90" />

                <span className="absolute left-1.5 top-1.5 rounded-full bg-black/40 px-1.5 py-0.5 text-[8px] font-medium text-white">
                  {inf.category}
                </span>
                <span className="absolute right-1.5 top-1.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[8px] font-medium text-gray-700">
                  {inf.country}
                </span>
              </div>

              <div className="p-1.5">
                <p className="truncate text-[11px] font-bold text-gray-900">
                  {inf.name}
                </p>
                <p className="truncate text-[9px] text-gray-400">@{inf.handle}</p>
                <p className="mt-1 flex items-center gap-0.5 text-[10px] font-semibold text-gray-700">
                  <inf.metricIcon className="h-2.5 w-2.5 text-primary" />
                  {inf.metricLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
