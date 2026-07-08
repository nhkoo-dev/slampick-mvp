import { useState } from 'react';

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
  avatarColor,
  avatarInitial,
  name,
  handle,
  platform,
  followers,
  region,
  views,
  engagementRate,
  badges,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`relative flex h-32 items-center justify-center text-2xl font-bold text-white ${avatarColor}`}
      >
        {avatarInitial}
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
          {platform}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700">
          {region}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-base font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-400">@{handle}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>팔로워 {followers}</span>
          <span>조회 {views}</span>
          <span>ER {engagementRate}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <Badge key={badge.label} {...badge} />
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <button
            type="button"
            aria-label="즐겨찾기"
            onClick={() => setIsFavorite((prev) => !prev)}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg transition-colors ${
              isFavorite
                ? 'border-rose-200 bg-rose-50 text-rose-500'
                : 'border-gray-200 text-gray-300 hover:text-gray-400'
            }`}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
          <button
            type="button"
            className="flex-1 rounded-full bg-black py-2 text-sm font-semibold text-white"
          >
            연락하기
          </button>
        </div>
      </div>
    </div>
  );
}
