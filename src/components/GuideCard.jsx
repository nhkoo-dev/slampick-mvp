export default function GuideCard({
  category,
  headerColor,
  badge,
  title,
  description,
  metrics,
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
      <div className={`px-5 py-6 text-text-inverse ${headerColor}`}>
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-text-muted">
          {badge.icon} {badge.label}
        </span>
        <h3 className="mt-1 text-base font-bold text-text">{title}</h3>
        <p className="text-sm text-text-secondary">{description}</p>
        <p className="text-sm text-gray-400">{metrics.join(' · ')}</p>

        <button
          type="button"
          className="mt-auto w-fit pt-3 text-sm font-semibold text-blue-600"
        >
          가이드 열기 ›
        </button>
      </div>
    </div>
  );
}
