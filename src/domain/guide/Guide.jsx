import { useEffect, useState } from 'react';
import Header from '../../global/components/common/Header';
import GuideFilterBar from './components/GuideFilterBar';
import InfluencerCard from '../../global/components/common/InfluencerCard';
import { getInfluencers } from '../../global/repositories/influencerRepository';

const STATS = [
  { label: '업로드 완수율', value: '92%', valueColor: 'text-blue-600' },
  { label: '가이드 → 촬영 착수', value: '평균 5일', valueColor: 'text-emerald-600' },
  { label: '진행 내역 · 수수료 20%', value: '100% 투명', valueColor: 'text-text' },
];

export default function Guide() {
  const [influencers, setInfluencers] = useState([]);
  const [region, setRegion] = useState('전체');

  useEffect(() => {
    async function load() {
      const data = await getInfluencers('trial');
      setInfluencers(data);
    }

    load();
  }, []);

  let filteredInfluencers = influencers;
  if (region !== '전체') {
    filteredInfluencers = influencers.filter((influencer) => influencer.region === region);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-2xl font-extrabold text-text">
          전략 시딩 가이드
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          여기선 놀지 않아요 — 슬램픽이 매끄럽게 실행하고, 검증된 성공을
          만듭니다. 시장·타겟 가이드를 열람하는 만큼 픽하세요.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-surface p-5 text-center shadow-sm"
            >
              <p className={`text-2xl font-extrabold ${stat.valueColor}`}>
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <GuideFilterBar active={region} onChange={setRegion} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredInfluencers.map((influencer) => (
            <InfluencerCard key={influencer.id} {...influencer} variant="compact" />
          ))}
        </div>
      </main>
    </div>
  );
}
