import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import InfluencerCard from '../components/today/InfluencerCard';
import { getMyBrand } from '../repositories/brandRepository';
import { getPickedInfluencers } from '../repositories/picksInviteRepository';

export default function MyPage() {
  const [influencers, setInfluencers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPicks() {
      try {
        const brand = await getMyBrand();
        const picks = await getPickedInfluencers(brand.id);
        setInfluencers(picks);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPicks();
  }, []);

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
            <InfluencerCard key={influencer.id} {...influencer} isFavorite />
          ))}
        </div>
      </main>
    </div>
  );
}
