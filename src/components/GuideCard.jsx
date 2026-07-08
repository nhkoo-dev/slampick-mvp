export default function GuideCard({
  category,
  headerColor,
  badge,
  title,
  description,
  metrics,
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className={`px-5 py-6 text-white ${headerColor}`}>
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {badge.icon} {badge.label}
        </span>
        <h3 className="mt-1 text-base font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
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
