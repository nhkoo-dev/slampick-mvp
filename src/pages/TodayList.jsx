import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import FilterBar from '../components/today/FilterBar';
import InfluencerCard from '../components/today/InfluencerCard';
import ModeSwitcher from '../components/today/ModeSwitcher';
import TrialOverlay from '../components/today/TrialOverlay';
import { getInfluencers } from '../repositories/influencerRepository';
import { getMyBrand } from '../repositories/brandRepository';
import { addPick, getPickedInfluencers, removePick } from '../repositories/picksInviteRepository';
import { filterInfluencers } from '../utils/filterInfluencers';
import { createTrialPlaceholders } from '../utils/trialPlaceholder';

const TRIAL_VISIBLE_COUNT = 20;
const TRIAL_PLACEHOLDER_COUNT = 8;

export default function TodayList() {
  const [influencers, setInfluencers] = useState([]);
  const [brand, setBrand] = useState(null);
  const [pickedIds, setPickedIds] = useState(new Set());
  // 페이지 진입 시점에 이미 저장되어 있던 influencer id 스냅샷. 리스트 노출 여부를 결정할 때만 사용하고,
  // 같은 화면에서 좋아요를 누른다고 즉시 갱신하지 않는다 (새로고침/재진입 시에만 갱신됨)
  const [excludedIds, setExcludedIds] = useState(new Set());
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
        const myBrand = await getMyBrand();
        setBrand(myBrand);

        if (myBrand?.tier === 'premium') {
          setTier('premium');
          setViewMode('premium');
        }

        else {
          setTier('trial');
          setViewMode('trial');
        }

        // 이미 저장한 인플루언서는 리스트 진입 시점에만 제외 대상으로 스냅샷을 떠 둔다
        const picks = await getPickedInfluencers(myBrand.id); //pick 은 좋아요 눌러놨던 인플루언서 배열
        setExcludedIds(new Set(picks.map((pick) => pick.id)));

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

  // 기존 필터링 결과에서, 페이지 진입 시점에 이미 저장되어 있던 인플루언서만 제외한다
  const filteredInfluencers = filterInfluencers(influencers, {
    isTrial,
    selectedRegion,
    selectedTier,
  }).filter((influencer) => !excludedIds.has(influencer.id));

  // trial은 실제 데이터를 20개까지만 노출하고 나머지는 블러 placeholder로 대체
  let visibleInfluencers = filteredInfluencers;

  if (isTrial) {
    visibleInfluencers = filteredInfluencers.slice(0, TRIAL_VISIBLE_COUNT);
  }

  // premium tier 유저가 체험 화면을 미리보는 경우에는 구독 유도 블러를 보여주지 않는다
  let placeholderInfluencers = [];

  if (isTrial && !isPremiumTier) {
    placeholderInfluencers = createTrialPlaceholders(
      filteredInfluencers,
      TRIAL_PLACEHOLDER_COUNT
    );
  }

  const handleSubscribeClick = () => {
    alert('구독하기 기능은 준비 중입니다.');
  };

  const handleFavoriteToggle = async (influencerId) => {
    if (!brand?.id) return;

    const isPicked = pickedIds.has(influencerId);

    try {
      if (isPicked) {
        await removePick(brand.id, influencerId);
        setPickedIds((prev) => {
          const next = new Set(prev);
          next.delete(influencerId);
          return next;
        });
      }

      else {
        await addPick(brand.id, influencerId, 'list');
        setPickedIds((prev) => new Set(prev).add(influencerId));
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            <ModeSwitcher
              isPremiumTier={isPremiumTier}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
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
          <FilterBar
            isTrial={isTrial}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedTier={selectedTier}
            setSelectedTier={setSelectedTier}
            selectedAxis={selectedAxis}
            setSelectedAxis={setSelectedAxis}
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {visibleInfluencers.map((influencer) => (
            <InfluencerCard
              key={influencer.id}
              {...influencer}
              isFavorite={pickedIds.has(influencer.id)}
              onFavoriteToggle={() => handleFavoriteToggle(influencer.id)}
            />
          ))}
        </div>

        {isTrial && (
          <TrialOverlay
            placeholders={placeholderInfluencers}
            onSubscribe={handleSubscribeClick}
          />
        )}
      </main>
    </div>
  );
}
