import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import InfluencerCard from '../components/common/InfluencerCard';
import { getMyBrand } from '../repositories/brandRepository';
import { useFavorite } from '../hooks/useFavorite';

export default function MyPage() {
  const [influencers, setInfluencers] = useState([]);
  const [brand, setBrand] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // RLS상 influencers 테이블은 premium tier만 직접 읽을 수 있어서,
  // 찜 상세 조회 시 어느 테이블을 볼지 useFavorite에 tier를 알려줘야 한다
  let tier = 'trial';
  if (brand?.tier === 'premium') {
    tier = 'premium';
  }

  const { pickedIds, loadFavorites, toggleFavorite } = useFavorite(brand?.id, tier);

  useEffect(() => {
    async function loadBrand() {
      try {
        const myBrand = await getMyBrand();
        setBrand(myBrand);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    loadBrand();
  }, []);

  useEffect(() => {
    async function loadMyPicks() {
      if (!brand?.id) return;

      try {
        const picks = await loadFavorites();
        setInfluencers(picks);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMyPicks();
  }, [brand?.id, loadFavorites]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-extrabold text-text">마이페이지</h1>
        <p className="mt-1 text-sm text-text-secondary">
          저장한 인플루언서 목록
        </p>

        {!isLoading && influencers.length === 0 && (
          <p className="mt-10 text-sm text-gray-400">
            아직 저장한 인플루언서가 없습니다.
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {influencers.map((influencer) => (
            <InfluencerCard
              key={influencer.id}
              {...influencer}
              isFavorite={pickedIds.has(influencer.id)}
              onFavoriteToggle={() => toggleFavorite(influencer.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
