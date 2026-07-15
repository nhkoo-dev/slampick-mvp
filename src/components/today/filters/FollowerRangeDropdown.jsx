import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatFollowersLabel } from '../../../utils/influencerFormat';
import {
  FOLLOWER_MIN_BOUND,
  FOLLOWER_MAX_BOUND,
  FOLLOWER_UNBOUNDED_MAX,
  FOLLOWER_PRESETS,
  isFollowerRangeActive,
} from '../../../utils/followerRange';

// 슬라이더 두 손잡이를 겹쳐진 range input 2개로 구현한다. 손잡이(thumb)에만 클릭이 닿도록
// 트랙 부분은 pointer-events-none으로 비활성화하고, thumb만 CSS로 다시 활성화한다
const RANGE_INPUT_CLASS =
  'pointer-events-none absolute top-1/2 h-1.5 w-full -translate-y-1/2 appearance-none bg-transparent ' +
  '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 ' +
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full ' +
  '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white ' +
  '[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 ' +
  '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full ' +
  '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-white';

function getTriggerLabel(followerMin, followerMax) {
  if (!isFollowerRangeActive(followerMin, followerMax)) {
    return '전체';
  }

  if (followerMax >= FOLLOWER_UNBOUNDED_MAX) {
    return `${formatFollowersLabel(followerMin)}+`;
  }

  return `${formatFollowersLabel(followerMin)} - ${formatFollowersLabel(followerMax)}`;
}

export default function FollowerRangeDropdown({
  followerMin,
  followerMax,
  onChangeFollowerRange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // 드롭다운 바깥을 클릭하면 패널을 닫는다
  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const handleSelectPreset = (preset) => {
    onChangeFollowerRange(preset.min, preset.max);
  };

  // 슬라이더/입력창에는 실제 상태값(followerMax가 Infinity일 수 있음) 대신
  // 화면에 표시 가능한 값으로 clamp한 displayMax를 사용한다
  const displayMax = Number.isFinite(followerMax) ? followerMax : FOLLOWER_MAX_BOUND;

  const handleMinInputChange = (event) => {
    const value = Number(event.target.value);
    if (Number.isNaN(value)) return;

    const clampedMin = Math.min(Math.max(value, FOLLOWER_MIN_BOUND), displayMax);
    onChangeFollowerRange(clampedMin, followerMax);
  };

  const handleMaxInputChange = (event) => {
    const value = Number(event.target.value);
    if (Number.isNaN(value)) return;

    const clampedMax = Math.max(Math.min(value, FOLLOWER_MAX_BOUND), followerMin);
    onChangeFollowerRange(followerMin, clampedMax);
  };

  const handleMinSliderChange = (event) => {
    const value = Math.min(Number(event.target.value), followerMax);
    onChangeFollowerRange(value, followerMax);
  };

  const handleMaxSliderChange = (event) => {
    const value = Math.max(Number(event.target.value), followerMin);
    onChangeFollowerRange(followerMin, value);
  };

  const minPercent =
    ((followerMin - FOLLOWER_MIN_BOUND) / (FOLLOWER_MAX_BOUND - FOLLOWER_MIN_BOUND)) * 100;
  const maxPercent =
    ((displayMax - FOLLOWER_MIN_BOUND) / (FOLLOWER_MAX_BOUND - FOLLOWER_MIN_BOUND)) * 100;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-1.5 text-sm font-medium text-text-muted transition-colors hover:border-primary/40 hover:text-primary"
      >
        팔로워: {getTriggerLabel(followerMin, followerMax)}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_20px_40px_rgba(71,51,255,0.14)]">
          <ul>
            {FOLLOWER_PRESETS.map((preset) => {
              const isSelected = followerMin === preset.min && followerMax === preset.max;

              return (
                <li key={preset.label}>
                  <button
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm transition-colors ${
                      isSelected ? 'bg-gray-100 text-text' : 'text-text-secondary hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        isSelected ? 'border-primary' : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <span className="h-2 w-2 rounded-full bg-primary" />}
                    </span>
                    {preset.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 flex items-center gap-2">
            <input
              type="number"
              min={FOLLOWER_MIN_BOUND}
              max={displayMax}
              value={followerMin}
              onChange={handleMinInputChange}
              className="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <span className="text-text-muted">-</span>
            <input
              type="number"
              min={followerMin}
              max={FOLLOWER_MAX_BOUND}
              value={displayMax}
              onChange={handleMaxInputChange}
              className="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="relative mt-4 h-4">
            <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-gray-200" />
            <div
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary"
              style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
            />
            <input
              type="range"
              min={FOLLOWER_MIN_BOUND}
              max={FOLLOWER_MAX_BOUND}
              value={followerMin}
              onChange={handleMinSliderChange}
              className={RANGE_INPUT_CLASS}
            />
            <input
              type="range"
              min={FOLLOWER_MIN_BOUND}
              max={FOLLOWER_MAX_BOUND}
              value={displayMax}
              onChange={handleMaxSliderChange}
              className={RANGE_INPUT_CLASS}
            />
          </div>
        </div>
      )}
    </div>
  );
}
