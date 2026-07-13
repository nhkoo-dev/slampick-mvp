import Card from '../common/Card';
import { toDateOnly } from '../../utils/date';

const BADGE_TONES = {
  green: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  blue: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  pink: 'bg-rose-50 text-rose-600 ring-1 ring-rose-200',
  orange: 'bg-orange-50 text-orange-600 ring-1 ring-orange-200',
};

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
}) {
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

      <span className="absolute left-2 top-2 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] text-text-inverse sm:left-3 sm:top-3 sm:px-2 sm:py-1 sm:text-xs">
        {platform}
      </span>

      <span className="absolute right-2 top-2 rounded-full bg-white/90 px-1.5 py-0.5 text-[10px] sm:right-3 sm:top-3 sm:px-2 sm:py-1 sm:text-xs">
        {region}
      </span>

      {rateCardLabel && (
        <span className="absolute bottom-2 left-2 rounded-full bg-surface/90 px-1.5 py-0.5 text-[10px] font-semibold text-primary sm:bottom-3 sm:left-3 sm:px-2 sm:py-1 sm:text-xs">
          {rateCardLabel}
        </span>
      )}

      {validateUntilLabel && (
        <span className="absolute bottom-2 right-2 rounded-full bg-surface/90 px-1.5 py-0.5 text-[10px] font-semibold text-text-secondary sm:bottom-3 sm:right-3 sm:px-2 sm:py-1 sm:text-xs">
          {validateUntilLabel}
        </span>
      )}
    </div>

    <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-6">
      <div>
        <h3 className="text-sm font-bold text-text sm:text-base">
          {name}
        </h3>

        <p className="text-xs text-gray-400 sm:text-sm">
          @{handle}
        </p>
      </div>

      <div className="space-y-0.5 text-xs text-text-secondary sm:space-y-1 sm:text-sm">
        <p>팔로워 {followers?.toLocaleString()}</p>
        <p>조회수 {real_views?.toLocaleString()}</p>
        <p>참여율 {engagement_rate}%</p>
        <p>티어 {tier}</p>
        {availableUntilLabel && <p>{availableUntilLabel}</p>}
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

  </Card>
);
}
