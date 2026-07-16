import { useCallback, useState } from 'react';
import {
  addPick,
  getPickedInfluencers,
  removePick,
} from '../repositories/picksInviteRepository';

/**
 * 좋아요(저장) 기능을 관리하는 커스텀 Hook
 *
 * - 저장한 인플루언서 ID 상태 관리
 * - 저장 목록 조회
 * - 저장 / 저장 취소
 *
 * TodayList, MyPage 등 여러 페이지에서 공통으로 사용한다.
 */
export function useFavorite(brandId, tier = 'trial') {
  const [pickedIds, setPickedIds] = useState(new Set());

    /**
   * 로그인한 브랜드가 저장한 인플루언서 목록을 조회한다.
   * 조회한 결과를 pickedIds(Set)로 관리하여
   * 카드의 좋아요 상태를 판단할 때 사용한다.
   */
  const loadFavorites = useCallback(async () => {
    if (!brandId) return [];

    const picks = await getPickedInfluencers(brandId, tier);
    setPickedIds(new Set(picks.map((pick) => pick.id)));

    return picks;
  }, [brandId, tier]);

    /**
   * 좋아요(저장) 상태를 토글한다.
   *
   * - 이미 저장된 경우 → removePick()
   * - 저장되지 않은 경우 → addPick()
   *
   * DB 반영 후 화면 상태도 함께 업데이트한다.
   */
  const toggleFavorite = useCallback(async (influencerId) => {
    if (!brandId) return;

    const isPicked = pickedIds.has(influencerId);

    try {
      if (isPicked) {
        await removePick(brandId, influencerId);
        setPickedIds((prev) => {
          const next = new Set(prev);
          next.delete(influencerId);
          return next;
        });
      }

      else {
        await addPick(brandId, influencerId, 'list');
        setPickedIds((prev) => new Set(prev).add(influencerId));
      }
    } catch (error) {
      console.error(error);
    }
  }, [brandId, pickedIds]);

  return { pickedIds, loadFavorites, toggleFavorite };
}
