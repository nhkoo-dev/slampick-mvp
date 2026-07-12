import { useState } from 'react';
import Card from '../common/Card';

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
    validate_until
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  let favoriteButtonClasses = 'border-border text-gray-300 hover:text-gray-400';
  let favoriteIcon = '♡';
  if (isFavorite) {
    favoriteButtonClasses = 'border-rose-200 bg-rose-50 text-rose-500';
    favoriteIcon = '♥';
  }

  let rateCardLabel = null;
  if (rate_card) {
    const rateCardInManwon = Math.floor(rate_card / 10000);
    rateCardLabel = `단가 ${rateCardInManwon.toLocaleString()}만원`;
  }

  let validateUntilLabel = null;
  if (validate_until) {
    validateUntilLabel = `유효기간 ${validate_until}`;
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

      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs text-text-inverse">
        {platform}
      </span>

      <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs">
        {region}
      </span>

      {rateCardLabel && (
        <span className="absolute bottom-3 left-3 rounded-full bg-surface/90 px-2 py-1 text-xs font-semibold text-primary">
          {rateCardLabel}
        </span>
      )}
    </div>

    <div className="flex flex-1 flex-col gap-3 p-6">
      <div>
        <h3 className="text-base font-bold text-text">
          {name}
        </h3>

        <p className="text-sm text-gray-400">
          @{handle}
        </p>
      </div>

      <div className="space-y-1 text-sm text-text-secondary">
        <p>팔로워 {followers?.toLocaleString()}</p>
        <p>조회수 {real_views?.toLocaleString()}</p>
        <p>참여율 {engagement_rate}%</p>
        <p>티어 {tier}</p>
        {validateUntilLabel && <p>{validateUntilLabel}</p>}
      </div>

      <div className="mt-auto flex items-center gap-2 pt-2">
        <button
          type="button"
          aria-label="즐겨찾기"
          onClick={() => setIsFavorite((prev) => !prev)}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg transition-colors ${favoriteButtonClasses}`}
        >
          {favoriteIcon}
        </button>

        <button
          type="button"
          className="flex-1 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 py-2 text-sm font-semibold text-text-inverse shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
        >
          연락하기
        </button>
      </div>

    </div>

  </Card>
);
}
