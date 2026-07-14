// InfluencerCard 상단의 9:16 썸네일 영역. 이미지 위에 region/tier 배지와 이름·아이디를 오버레이로 표시한다
export default function InfluencerCardThumbnail({
  name,
  handle,
  region,
  tier,
  platformIcon,
  thumbnail_url,
}) {
  return (
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

      <span className="absolute bottom-2 right-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-2.5 py-1 text-xs font-bold text-text-inverse shadow-md shadow-primary/20 sm:bottom-3 sm:right-3 sm:px-3 sm:py-1.5 sm:text-sm">
        {tier}
      </span>

      <div className="absolute inset-x-2 bottom-2 text-text-inverse sm:inset-x-3 sm:bottom-3">
        <h3 className="text-sm font-bold sm:text-base">
          {name}
          {platformIcon && <span className="ml-1 text-xs sm:text-sm">{platformIcon}</span>}
        </h3>

        <p className="text-xs text-white/80 sm:text-sm">
          @{handle}
        </p>
      </div>
    </div>
  );
}
