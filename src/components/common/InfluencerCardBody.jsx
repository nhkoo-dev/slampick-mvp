import { Calendar, Users, Wallet } from 'lucide-react';

// InfluencerCard 하단 본문. 팔로워/플랫폼/단가/가용기간 등 지표와 즐겨찾기·연락하기 버튼을 표시한다
export default function InfluencerCardBody({
  followersLabel,
  platform,
  rateCardLabel,
  validateUntilLabel,
  availableUntilLabel,
  real_views,
  engagement_rate,
  tier,
  isFavorite,
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

  return (
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
