import { useEffect, useState } from 'react';
import Header from '../components/Header';
import FilterBar, { FilterPill } from '../components/FilterBar';
import InfluencerCard from '../components/InfluencerCard';
import Button from '../components/Button';
import { getInfluencers } from '../repositories/influencerRepository';
import { getMyBrand } from '../repositories/brandRepository';

const TIER_MAP = {
  메가: 'MEGA',
  미드: 'MID',
  나노: 'NANO',
};

const REGION_MAP = {
  US: "US",
  중화권: "CH",
  일본: "JP",
  중동: "UAE"

}

const TRIAL_VISIBLE_COUNT = 20;
const TRIAL_PLACEHOLDER_COUNT = 8;

const MODES = [
  { value: 'premium', label: '구독(실시간)' },
  { value: 'trial', label: '체험(무료)' },
];

export default function TodayList() {
  const [influencers, setInfluencers] = useState([]);
  // tier: 실제 구독 등급 (서버 조회 결과, 사용자가 바꿀 수 없음)
  const [tier, setTier] = useState('trial');
  // viewMode: 화면에 실제로 표시 중인 모드. premium tier 유저만 버튼으로 전환 가능
  const [viewMode, setViewMode] = useState('trial');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedTier, setSelectedTier] = useState('전체');
  const [selectedAxis, setSelectedAxis] = useState('전체');

  const isPremiumTier = tier === 'premium';
  // viewMode가 'premium'이 아니면 전부 trial 화면으로 취급
  const isTrial = viewMode !== 'premium';

  // 내 브랜드의 구독 tier를 조회한다.
  // premium tier면 기본 화면을 premium으로 두고 버튼으로 trial 미리보기까지 가능하게 하고,
  // 그 외에는 tier/viewMode 모두 trial로 고정한다 (버튼 없음)
  useEffect(() => {
    async function loadTier() {
      try {
        const brand = await getMyBrand();

        if (brand?.tier === 'premium') {
          setTier('premium');
          setViewMode('premium');
        }

        else {
          setTier('trial');
          setViewMode('trial');
        }

      } catch {
        // 브랜드 정보가 없거나 조회 실패 시 안전하게 trial로 처리
        setTier('trial');
        setViewMode('trial');
      }
    }

    loadTier();
  }, []);

  // viewMode에 따라 influencers 테이블(premium) 또는 trial_influencers_view(trial)를 조회
  useEffect(() => {
      async function load() {
          const data = await getInfluencers(viewMode);
          setInfluencers(data);
      }

      load();
  }, [viewMode]);

  // trial은 필터링 없이 조회된 데이터를 그대로 사용 (필터 클릭이 동작하지 않도록)
  let filteredInfluencers = influencers;

  if (!isTrial) {
    filteredInfluencers = influencers.filter((influencer) => {
      const matchesRegion =
        selectedRegion === '전체' || influencer.region === REGION_MAP[selectedRegion];
      const matchesTier =
        selectedTier === '전체' || influencer.tier === TIER_MAP[selectedTier];

      return matchesRegion && matchesTier;
    });
  }

  // trial은 실제 데이터를 20개까지만 노출하고 나머지는 블러 placeholder로 대체
  let visibleInfluencers = filteredInfluencers;

  if (isTrial) {
    visibleInfluencers = filteredInfluencers.slice(0, TRIAL_VISIBLE_COUNT);
  }

  // 블러 처리될 자리 채우기용 카드 (실제 데이터를 순환 재사용, 내용은 블러로 가려짐)
  // premium tier 유저가 체험 화면을 미리보는 경우에는 구독 유도 블러를 보여주지 않는다
  let placeholderInfluencers = [];

  if (isTrial && !isPremiumTier && filteredInfluencers.length > 0) {
    placeholderInfluencers = Array.from(
      { length: TRIAL_PLACEHOLDER_COUNT },
      (_, i) => filteredInfluencers[i % filteredInfluencers.length]
    );
  }

  // trial에서는 FilterBar를 그대로 보여주되, 값 고정 + setter를 no-op으로 바꿔
  // 필터 UI만 남기고 실제 필터링 동작은 막는다 (추후 블러 처리 예정)
  let filterBarProps = {
    selectedRegion,
    setSelectedRegion,
    selectedTier,
    setSelectedTier,
    selectedAxis,
    setSelectedAxis,
  };

  if (isTrial) {
    filterBarProps = {
      selectedRegion: '전체',
      setSelectedRegion: () => {},
      selectedTier: '전체',
      setSelectedTier: () => {},
      selectedAxis: '전체',
      setSelectedAxis: () => {},
    };
  }

  const handleSubscribeClick = () => {
    alert('구독하기 기능은 준비 중입니다.');
  };

  // premium tier만 프리미엄/체험 전환 버튼을 보고, 그 외에는 "무료 체험 중" 뱃지만 노출
  let modeControls = <FilterPill label="무료 체험 중" active />;

  if (isPremiumTier) {
    modeControls = MODES.map((m) => (
      <FilterPill
        key={m.value}
        label={m.label}
        active={viewMode === m.value}
        onClick={() => setViewMode(m.value)}
      />
    ));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-extrabold text-text">
              오늘의 리스트
            </h1>
            <span className="text-sm text-gray-400">2026.07.02</span>
          </div>

          <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
            {modeControls}
          </div>
        </div>
        <p className="mt-1 text-sm text-text-secondary">
          오늘{' '}
          <span className="font-semibold text-primary">+5명</span> 새로 협업
          가능 · ↔ 이 조건으로 매일 자동 탐색 중 · 연락은 자유롭게.
        </p>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#1c1147] via-[#3b1f9e] to-[#4733FF] px-5 py-3.5 text-sm font-medium text-text-inverse shadow-[0_8px_30px_rgba(71,51,255,0.25)]">
          <span>
            ⚡ 월 <span className="font-bold text-amber-300">1,000만+</span>{' '}
            6개월 시딩 계약 중 &lsquo;오늘의 리스트&rsquo; 자동 무료
          </span>
          <span>›</span>
        </div>

        <div className="mt-6">
          <FilterBar {...filterBarProps} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleInfluencers.map((influencer) => (
            <InfluencerCard key={influencer.influencer_id} {...influencer} />
          ))}
        </div>

        {/* trial 전용: 블러 처리된 placeholder 카드 위에 구독 유도 오버레이를 겹쳐 표시 */}
        {isTrial && placeholderInfluencers.length > 0 && (
          <div className="relative mt-6">
            <div className="grid grid-cols-1 gap-6 blur-sm select-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {placeholderInfluencers.map((influencer, index) => (
                <InfluencerCard
                  key={`trial-placeholder-${index}`}
                  {...influencer}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl bg-white/70 text-center backdrop-blur-sm">
              <span className="text-4xl">🔒</span>
              <p className="max-w-xs text-base font-semibold text-text">
                구독하면 모든 인플루언서를 확인할 수 있습니다.
              </p>
              <Button variant="gradient" size="sm" onClick={handleSubscribeClick}>
                구독하기
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
