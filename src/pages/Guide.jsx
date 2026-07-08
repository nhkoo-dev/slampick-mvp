import { useEffect, useState } from 'react';
import Header from '../components/Header';
import GuideFilterBar from '../components/GuideFilterBar';
import GuideCard from '../components/GuideCard';
import { getGuides } from '../repositories/guideRepository';

const STATS = [
  { label: '업로드 완수율', value: '92%', valueColor: 'text-blue-600' },
  { label: '가이드 → 촬영 착수', value: '평균 5일', valueColor: 'text-emerald-600' },
  { label: '진행 내역 · 수수료 20%', value: '100% 투명', valueColor: 'text-gray-900' },
];

export default function Guide() {
  const [guides, setGuides] = useState([]);
  const [region, setRegion] = useState('전체');

  useEffect(() => {
    async function load() {
      const data = await getGuides();
      setGuides(data);
    }

    load();
  }, []);

  const filteredGuides =
    region === '전체'
      ? guides
      : guides.filter((guide) => guide.region === region);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-2xl font-extrabold text-gray-900">
          전략 시딩 가이드
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          여기선 놀지 않아요 — 슬램픽이 매끄럽게 실행하고, 검증된 성공을
          만듭니다. 시장·타겟 가이드를 열람하는 만큼 픽하세요.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm"
            >
              <p className={`text-2xl font-extrabold ${stat.valueColor}`}>
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <GuideFilterBar active={region} onChange={setRegion} />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.id} {...guide} />
          ))}
        </div>
      </main>
    </div>
  );
}
