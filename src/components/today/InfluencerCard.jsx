import { Calendar, Users, Wallet } from 'lucide-react';
import Card from '../common/Card';
import { toDateOnly } from '../../utils/date';

const BADGE_TONES = {
  green: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  blue: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  pink: 'bg-rose-50 text-rose-600 ring-1 ring-rose-200',
  orange: 'bg-orange-50 text-orange-600 ring-1 ring-orange-200',
};

// 플랫폼별 작은 아이콘 표시용 (lucide-react에는 브랜드 아이콘이 없어 이모지로 대체)
const PLATFORM_ICONS = {
  instagram: '📷',
  tiktok: '🎵',
  youtube: '▶️',
};

function getPlatformIcon(platform) {
  if (!platform) return null;

  return PLATFORM_ICONS[platform.toLowerCase()] ?? null;
}

function Badge({ icon, label, tone }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${BADGE_TONES[tone]}`}
    >
      {icon && <span>{icon}</span>}
      {label}
    </span>
  );
}
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
    variant = 'full',
}) {
  const isCompact = variant === 'compact';
  //하트 버튼 클릭시 부모에게 이벤트 전달
  const handleFavoriteClick = () => {
    if (onFavoriteToggle) {
      onFavoriteToggle();
    }
  };

  //즐겨찾기 여부에 따른 버튼 스타일 변경
  let favoriteButtonClasses = 'border-border text-gray-300 hover:text-gray-400';
  let favoriteIcon = '♡';
  if (isFavorite) {
    favoriteButtonClasses = 'border-rose-200 bg-rose-50 text-rose-500';
    favoriteIcon = '♥';
  }

  //단가 표시용 문자열 생성
  let rateCardLabel = null;
  if (rate_card) {
    const rateCardInManwon = Math.floor(rate_card / 10000);
    rateCardLabel = `단가 ${rateCardInManwon.toLocaleString()}만원`;
  }

  //팔로워 수 축약 표시용 문자열 생성 (1만 이상이면 예: 181,000 -> 18.1만, 미만이면 그대로 표시)
  let followersLabel = null;
  if (followers != null) {
    if (followers >= 10000) {
      const followersInManwon = parseFloat((followers / 10000).toFixed(1));
      followersLabel = `${followersInManwon.toLocaleString()}만`;
    } else {
      followersLabel = followers.toLocaleString();
    }
  }

  const platformIcon = getPlatformIcon(platform);

  //rate_card 유효기간 표시용 문자열 생성
  let validateUntilLabel = null;
  if (validate_until) {
    validateUntilLabel = `~${toDateOnly(validate_until)}`;
  }

  //협업 가능 기간(가용기간) 표시용 문자열 생성
  let availableUntilLabel = null;
  if (available_until) {
    availableUntilLabel = `가용기간 ${toDateOnly(available_until)}`;
  }

  //compact(가이드용) 화면에서 표시할 단가 라벨 (없으면 협의 문구로 대체)
  let compactRateCardLabel = rateCardLabel;
  if (!compactRateCardLabel) {
    compactRateCardLabel = '단가 협의';
  }

  let bodyContent;
  if (isCompact) {
    bodyContent = (
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <span className="text-xl font-extrabold text-primary sm:text-2xl">
          {compactRateCardLabel}
        </span>
      </div>
    );
  } else {
    bodyContent = (
      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-6">
        <div className="flex items-center justify-between text-xs font-semibold text-primary sm:text-sm">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {followersLabel} 팔로워
          </span>

          <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium text-text-secondary ring-1 ring-border-strong sm:px-2.5 sm:py-1 sm:text-xs">
            {platform}
          </span>
        </div>

        {rateCardLabel && (
          <div className="flex items-center justify-between text-xs text-text-secondary sm:text-sm">
            <span className="inline-flex items-center gap-1">
              <Wallet className="h-3.5 w-3.5" />
              {rateCardLabel}
            </span>

            {validateUntilLabel && (
              <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium text-text-secondary ring-1 ring-border-strong sm:px-2.5 sm:py-1 sm:text-xs">
                {validateUntilLabel}
              </span>
            )}
          </div>
        )}

        {availableUntilLabel && (
          <div className="inline-flex items-center gap-1 text-xs text-text-secondary sm:text-sm">
            <Calendar className="h-3.5 w-3.5" />
            {availableUntilLabel}
          </div>
        )}

        <div className="border-t border-border" />

        <div className="space-y-0.5 text-[11px] text-text-muted sm:space-y-1 sm:text-xs">
          <p>조회수 {real_views?.toLocaleString()}</p>
          <p>참여율 {engagement_rate}%</p>
          <p>티어 {tier}</p>
        </div>

        <div className="mt-auto flex items-center gap-1.5 pt-1 sm:gap-2 sm:pt-2">
          <button
            type="button"
            aria-label="즐겨찾기"
            onClick={handleFavoriteClick}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-base transition-colors sm:h-10 sm:w-10 sm:text-lg ${favoriteButtonClasses}`}
          >
            {favoriteIcon}
          </button>

          <button
            type="button"
            className="flex-1 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 py-1.5 text-xs font-semibold text-text-inverse shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 sm:py-2 sm:text-sm"
          >
            연락하기
          </button>
        </div>
      </div>
    );
  }

 return (
  <Card
    hover
    className="group flex h-full flex-col overflow-hidden hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_20px_40px_rgba(71,51,255,0.14)]"
  >

    <div className="relative aspect-[9/16] w-full overflow-hidden bg-gray-100">
      <img
        src={thumbnail_url}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

      <span className="absolute right-2 top-2 rounded-full bg-white/90 px-1.5 py-0.5 text-[10px] sm:right-3 sm:top-3 sm:px-2 sm:py-1 sm:text-xs">
        {region}
      </span>

      {!isCompact && (
        <span className="absolute bottom-2 right-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-2.5 py-1 text-xs font-bold text-text-inverse shadow-md shadow-primary/20 sm:bottom-3 sm:right-3 sm:px-3 sm:py-1.5 sm:text-sm">
          {tier}
        </span>
      )}

      <div className="absolute inset-x-2 bottom-2 text-text-inverse sm:inset-x-3 sm:bottom-3">
        <h3 className="text-sm font-bold sm:text-base">
          {name}
          {!isCompact && platformIcon && <span className="ml-1 text-xs sm:text-sm">{platformIcon}</span>}
        </h3>

        <p className="text-xs text-white/80 sm:text-sm">
          @{handle}
        </p>
      </div>
    </div>

    {bodyContent}

  </Card>
);
}
