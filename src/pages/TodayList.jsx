import { useEffect, useState } from 'react';
import Header from '../components/Header';
import FilterBar, { FilterPill } from '../components/FilterBar';
import InfluencerCard from '../components/InfluencerCard';
import { getInfluencers } from '../repositories/influencerRepository';

const MODES = [
  { value: 'premium', label: '구독(실시간)' },
  { value: 'trial', label: '체험(무료)' },
];

const TIER_MAP = {
  메가: 'MEGA',
  미드: 'MID',
  나노: 'NANO',
};

const REGION_MAP = {
  US: "US",
  중화권: "CN",
  일본: "JP",
  중동: "UAE" 

}


export default function TodayList() {
  const [influencers, setInfluencers] = useState([]);
  const [mode, setMode] = useState('premium');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedTier, setSelectedTier] = useState('전체');
  const [selectedAxis, setSelectedAxis] = useState('전체');

  useEffect(() => {
      async function load() {
          const data = await getInfluencers(mode);
          //console.log(data);
          console.log(data.map(i => i.tier));   // 추가
          setInfluencers(data);
      }

      load();
  }, [mode]);

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesRegion =
      selectedRegion === '전체' || influencer.region === REGION_MAP[selectedRegion];
    const matchesTier =
      selectedTier === '전체' || influencer.tier === TIER_MAP[selectedTier];

    return matchesRegion && matchesTier;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-extrabold text-gray-900">
              오늘의 리스트
            </h1>
            <span className="text-sm text-gray-400">2026.07.02</span>
          </div>

          <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
            {MODES.map((m) => (
              <FilterPill
                key={m.value}
                label={m.label}
                active={mode === m.value}
                onClick={() => setMode(m.value)}
              />
            ))}
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          오늘{' '}
          <span className="font-semibold text-primary">+5명</span> 새로 협업
          가능 · ↔ 이 조건으로 매일 자동 탐색 중 · 연락은 자유롭게.
        </p>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#1c1147] via-[#3b1f9e] to-[#4733FF] px-5 py-3.5 text-sm font-medium text-white shadow-[0_8px_30px_rgba(71,51,255,0.25)]">
          <span>
            ⚡ 월 <span className="font-bold text-amber-300">1,000만+</span>{' '}
            6개월 시딩 계약 중 &lsquo;오늘의 리스트&rsquo; 자동 무료
          </span>
          <span>›</span>
        </div>

        <div className="mt-6">
          <FilterBar
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedTier={selectedTier}
            setSelectedTier={setSelectedTier}
            selectedAxis={selectedAxis}
            setSelectedAxis={setSelectedAxis}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredInfluencers.map((influencer) => (
            <InfluencerCard key={influencer.influencer_id} {...influencer} />
          ))}
        </div>
      </main>
    </div>
  );
}
