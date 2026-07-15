import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../../common/Card';
import { FilterPill } from '../../common/FilterPill';
import PrimaryFilters from './PrimaryFilters';
import AdvancedFilters from './AdvancedFilters';

export { FilterPill };

// FilterBar는 필터 카드 조립만 담당한다: 프라이머리 필터는 항상 보여주고,
// 상세 필터(지역/연령대/3축/정렬+단가)는 아코디언 토글로 열고 닫는다.
export default function FilterBar(props) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <Card glass className="p-5">
      <PrimaryFilters {...props} />

      <div className="mt-4 border-t border-border" />

      <button
        type="button"
        onClick={() => setIsAdvancedOpen((prev) => !prev)}
        className="mt-3 flex items-center gap-1 text-sm font-semibold text-text-secondary transition-colors hover:text-primary"
      >
        상세 필터
        {isAdvancedOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isAdvancedOpen && <AdvancedFilters {...props} />}

      <p className="mt-3 text-xs text-gray-400">
        필터는 월 1회 변경 가능 — 정한 조건으로 슬램픽이 계속 찾아 매일 채워요.
      </p>
    </Card>
  );
}
