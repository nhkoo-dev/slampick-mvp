import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  RATE_MIN_BOUND,
  RATE_MAX_BOUND,
  RATE_UNBOUNDED_MAX,
  RATE_PRESETS,
  isRateRangeActive,
} from '../../../utils/rateRange';

// 슬라이더/입력창은 원 단위 대신 만원 단위로 보여준다 (예: 30,000,000원 -> 3000)
const WON_PER_MANWON = 10000;
const RATE_MIN_BOUND_MANWON = RATE_MIN_BOUND / WON_PER_MANWON;
const RATE_MAX_BOUND_MANWON = RATE_MAX_BOUND / WON_PER_MANWON;

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

function formatManwon(won) {
  return `${Math.floor(won / WON_PER_MANWON).toLocaleString()}만`;
}

function getTriggerLabel(rateMin, rateMax) {
  if (!isRateRangeActive(rateMin, rateMax)) {
    return '전체';
  }

  if (rateMax >= RATE_UNBOUNDED_MAX) {
    return `${formatManwon(rateMin)}+`;
  }

  return `${formatManwon(rateMin)} - ${formatManwon(rateMax)}`;
}

export default function RateRangeDropdown({ rateMin, rateMax, onChangeRateRange }) {
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
    onChangeRateRange(preset.min, preset.max);
  };

  // 슬라이더/입력창에는 실제 상태값(원 단위, rateMax가 Infinity일 수 있음) 대신
  // 만원 단위로 변환하고 화면에 표시 가능한 값으로 clamp한 값을 사용한다
  const minManwon = rateMin / WON_PER_MANWON;
  const displayMaxManwon = Number.isFinite(rateMax)
    ? rateMax / WON_PER_MANWON
    : RATE_MAX_BOUND_MANWON;

  const handleMinInputChange = (event) => {
    const value = Number(event.target.value);
    if (Number.isNaN(value)) return;

    const clampedMin = Math.min(Math.max(value, RATE_MIN_BOUND_MANWON), displayMaxManwon);
    onChangeRateRange(clampedMin * WON_PER_MANWON, rateMax);
  };

  const handleMaxInputChange = (event) => {
    const value = Number(event.target.value);
    if (Number.isNaN(value)) return;

    const clampedMax = Math.max(Math.min(value, RATE_MAX_BOUND_MANWON), minManwon);
    onChangeRateRange(rateMin, clampedMax * WON_PER_MANWON);
  };

  const handleMinSliderChange = (event) => {
    const value = Math.min(Number(event.target.value), displayMaxManwon);
    onChangeRateRange(value * WON_PER_MANWON, rateMax);
  };

  const handleMaxSliderChange = (event) => {
    const value = Math.max(Number(event.target.value), minManwon);
    onChangeRateRange(rateMin, value * WON_PER_MANWON);
  };

  const minPercent =
    ((minManwon - RATE_MIN_BOUND_MANWON) / (RATE_MAX_BOUND_MANWON - RATE_MIN_BOUND_MANWON)) * 100;
  const maxPercent =
    ((displayMaxManwon - RATE_MIN_BOUND_MANWON) / (RATE_MAX_BOUND_MANWON - RATE_MIN_BOUND_MANWON)) *
    100;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-1.5 text-sm font-medium text-text-muted transition-colors hover:border-primary/40 hover:text-primary"
      >
        단가: {getTriggerLabel(rateMin, rateMax)}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_20px_40px_rgba(71,51,255,0.14)]">
          <ul>
            {RATE_PRESETS.map((preset) => {
              const isSelected = rateMin === preset.min && rateMax === preset.max;

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
              min={RATE_MIN_BOUND_MANWON}
              max={displayMaxManwon}
              value={minManwon}
              onChange={handleMinInputChange}
              className="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <span className="text-text-muted">-</span>
            <input
              type="number"
              min={minManwon}
              max={RATE_MAX_BOUND_MANWON}
              value={displayMaxManwon}
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
              min={RATE_MIN_BOUND_MANWON}
              max={RATE_MAX_BOUND_MANWON}
              value={minManwon}
              onChange={handleMinSliderChange}
              className={RANGE_INPUT_CLASS}
            />
            <input
              type="range"
              min={RATE_MIN_BOUND_MANWON}
              max={RATE_MAX_BOUND_MANWON}
              value={displayMaxManwon}
              onChange={handleMaxSliderChange}
              className={RANGE_INPUT_CLASS}
            />
          </div>
        </div>
      )}
    </div>
  );
}
