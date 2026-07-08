export default function GuideCard({ tag, badge, title, reason, headerColor }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className={`px-5 py-6 text-white ${headerColor}`}>
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
          {tag}
        </span>
      </div>
      <div className="p-5">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {badge}
        </span>
        <h3 className="mt-3 text-base font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{reason}</p>
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-blue-600"
        >
          가이드 열기 ›
        </button>
      </div>
    </div>
  );
}
