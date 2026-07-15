import Card from './Card';
import InfluencerCardThumbnail from './InfluencerCardThumbnail';
import InfluencerCardBody from './InfluencerCardBody';
import {
  getPlatformIcon,
  formatRateCardLabel,
  formatFollowersLabel,
  formatValidateUntilLabel,
  formatAvailableUntilLabel,
} from '../../utils/influencerFormat';

// 인플루언서 1명을 나타내는 카드. TodayList/MyPage/TrialOverlay에서 공통으로 사용되어 common으로 위치
// 원본 데이터(raw props)를 표시용 라벨로 변환한 뒤, 썸네일/본문 렌더링은 하위 컴포넌트에 위임한다
export default function InfluencerCard({
  name,
  handle,
  platform,
  region,
  tier,
  real_views,
  engagement_rate,
  followers,
  thumbnail_url,
  rate_card,
  validate_until,
  available_until,
  isFavorite = false,
  onFavoriteToggle,
}) {
  const platformIcon = getPlatformIcon(platform);
  const rateCardLabel = formatRateCardLabel(rate_card);
  const followersLabel = formatFollowersLabel(followers);
  const validateUntilLabel = formatValidateUntilLabel(validate_until);
  const availableUntilLabel = formatAvailableUntilLabel(available_until);

  return (
    <Card
      hover
      className="group flex h-full flex-col overflow-hidden hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_20px_40px_rgba(71,51,255,0.14)]"
    >
      <InfluencerCardThumbnail
        name={name}
        handle={handle}
        region={region}
        tier={tier}
        platformIcon={platformIcon}
        thumbnail_url={thumbnail_url}
      />

      <InfluencerCardBody
        followersLabel={followersLabel}
        platform={platform}
        rateCardLabel={rateCardLabel}
        validateUntilLabel={validateUntilLabel}
        availableUntilLabel={availableUntilLabel}
        real_views={real_views}
        engagement_rate={engagement_rate}
        tier={tier}
        isFavorite={isFavorite}
        onFavoriteToggle={onFavoriteToggle}
      />
    </Card>
  );
}
