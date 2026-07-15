import { Check } from 'lucide-react';
import Button from '../../../global/components/common/Button';

// Premium Plan 체크리스트에 표시할 항목들
const FEATURES = [
  '월 50만원',
  '실시간 인플루언서 리스트',
  '전체 필터 이용 가능',
  '가이드 적합도 확인',
];

/**
 * TodayList의 trial 화면에서 "구독하기"를 누르면 뜨는 결제 확인 모달.
 * onConfirm에서 실제 결제 게이트웨이 연동 없이 subscriptions 생성 RPC를 바로 호출한다.
 *
 * @param {boolean} isOpen - 모달 표시 여부
 * @param {() => void} onClose - 취소 버튼 또는 배경 클릭 시 호출
 * @param {() => void} onConfirm - 결제하기 버튼 클릭 시 호출
 */
export default function SubscribeModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    // 배경(반투명 오버레이) 클릭 시 닫히도록 onClose 연결
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* 모달 패널 클릭은 배경 클릭으로 전파되지 않도록 막아서, 패널 안을 눌러도 닫히지 않게 한다 */}
      <div
        className="w-full max-w-sm rounded-3xl border border-border bg-surface p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-lg font-extrabold text-text">Premium Plan</h2>

        <ul className="mt-4 space-y-2">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
              <Check className="h-4 w-4 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-border pt-5">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-text-secondary">결제 금액</span>
            <span className="text-xl font-extrabold text-primary">₩500,000 / 월</span>
          </div>

          <p className="mt-1 text-xs text-text-muted">
            다음 결제부터는 매월 자동 결제됩니다.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-gray-50"
          >
            취소
          </button>

          {/* 다른 화면(TrialOverlay 등)과 동일한 보라색 그라데이션 버튼 재사용 */}
          <Button
            variant="gradient"
            onClick={onConfirm}
            className="flex-1 px-5 py-2.5 text-sm font-semibold"
          >
            결제하기
          </Button>
        </div>
      </div>
    </div>
  );
}
