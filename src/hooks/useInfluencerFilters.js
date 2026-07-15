import { useState } from 'react';
import { FOLLOWER_MIN_BOUND, FOLLOWER_UNBOUNDED_MAX } from '../utils/followerRange';
import { RATE_MIN_BOUND, RATE_UNBOUNDED_MAX } from '../utils/rateRange';
import { SORT_DEFAULT } from '../utils/sortInfluencers';

/**
 * 오늘의 리스트 필터바(지역/플랫폼/카테고리/연령대/티어/팔로워수/3축/정렬/단가) 상태를 관리하는 커스텀 Hook.
 *
 * 티어 버튼과 팔로워수 범위는 서로 배타적으로 동작한다:
 * - 티어를 선택하면 팔로워수 범위는 기본값(전체 구간)으로 초기화되고
 * - 팔로워수 범위(프리셋/직접입력/슬라이더)를 조정하면 티어는 '전체'로 자동 해제된다
 *
 * 단가 범위(rateMin/rateMax)는 정렬(단가↑/단가↓)과 독립적으로 동작한다.
 * 즉 단가 범위를 바꿔도 정렬 선택은 그대로 유지되고, 그 반대도 마찬가지다.
 *
 * 반환하는 객체는 FilterBar가 받는 prop들과 이름이 그대로 일치하므로
 * <FilterBar {...filters} />처럼 그대로 펼쳐 쓸 수 있다.
 */
export function useInfluencerFilters() {
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedPlatform, setSelectedPlatform] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('전체');
  const [selectedTier, setSelectedTier] = useState('전체');
  const [followerMin, setFollowerMin] = useState(FOLLOWER_MIN_BOUND);
  const [followerMax, setFollowerMax] = useState(FOLLOWER_UNBOUNDED_MAX);
  // 3축(가용성/적합도/성과) 다중 선택 상태. 비어있으면 '전체'를 의미한다
  const [selectedAxes, setSelectedAxes] = useState(new Set());
  const [selectedSort, setSelectedSort] = useState(SORT_DEFAULT);
  const [rateMin, setRateMin] = useState(RATE_MIN_BOUND);
  const [rateMax, setRateMax] = useState(RATE_UNBOUNDED_MAX);

  // 티어 버튼(전체/메가/미드/나노)을 선택하면 팔로워수 범위 필터는 기본값(전체 구간)으로 초기화한다
  const handleSelectTier = (nextTier) => {
    setSelectedTier(nextTier);
    setFollowerMin(FOLLOWER_MIN_BOUND);
    setFollowerMax(FOLLOWER_UNBOUNDED_MAX);
  };

  // 팔로워수 범위(프리셋/직접입력/슬라이더)를 조정하면 티어 버튼 선택은 '전체'로 자동 해제한다
  const handleChangeFollowerRange = (min, max) => {
    setFollowerMin(min);
    setFollowerMax(max);
    setSelectedTier('전체');
  };

  // '전체'를 누르면 선택된 축을 모두 지우고, 그 외 축은 다중 토글된다
  const handleToggleAxis = (axis) => {
    if (axis === '전체') {
      setSelectedAxes(new Set());
      return;
    }

    setSelectedAxes((prev) => {
      const next = new Set(prev);

      if (next.has(axis)) {
        next.delete(axis);
      } else {
        next.add(axis);
      }

      return next;
    });
  };

  // 단가 범위(프리셋/직접입력/슬라이더)는 정렬 버튼과 서로 영향을 주지 않는다
  const handleChangeRateRange = (min, max) => {
    setRateMin(min);
    setRateMax(max);
  };

  return {
    selectedRegion,
    setSelectedRegion,
    selectedPlatform,
    setSelectedPlatform,
    selectedCategory,
    setSelectedCategory,
    selectedAgeGroup,
    setSelectedAgeGroup,
    selectedTier,
    setSelectedTier: handleSelectTier,
    followerMin,
    followerMax,
    onChangeFollowerRange: handleChangeFollowerRange,
    selectedAxes,
    onToggleAxis: handleToggleAxis,
    selectedSort,
    setSelectedSort,
    rateMin,
    rateMax,
    onChangeRateRange: handleChangeRateRange,
  };
}
