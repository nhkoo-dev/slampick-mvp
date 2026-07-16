import InfluencerCard from '../../../global/components/common/InfluencerCard';
import Button from '../../../global/components/common/Button';

/**
 * trial 화면 전용 구독 유도 오버레이.
 * placeholders(블러 처리될 자리 채우기용 카드)를 블러 그리드로 렌더링하고,
 * 그 위에 반투명 레이어 + 구독 CTA 버튼을 겹쳐서 보여준다.
 * placeholders가 비어 있으면(=필터링된 데이터가 없으면) 아무것도 렌더링하지 않는다.
 *
 * @param {object[]} placeholders - 블러로 가려질 InfluencerCard용 placeholder 데이터 배열
 * @param {() => void} onSubscribe - "구독하기" 버튼 클릭 핸들러
 */
export default function TrialOverlay({ placeholders, onSubscribe }) {
  if (placeholders.length === 0) {
    return null;
  }

  return (
    <div className="relative mt-6">
      {/* 실제 데이터를 재사용한 카드들을 블러 처리해서 "콘텐츠가 더 있다"는 느낌만 준다 */}
      <div className="grid grid-cols-2 gap-3 blur-sm select-none sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {placeholders.map((influencer, index) => (
          <InfluencerCard key={`trial-placeholder-${index}`} {...influencer} />
        ))}
      </div>

      {/* 블러 카드 위에 겹쳐지는 구독 유도 레이어 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl bg-white/70 text-center backdrop-blur-sm">
        <span className="text-4xl">🔒</span>
        <p className="max-w-xs text-base font-semibold text-text">
          구독하면 모든 인플루언서를 확인할 수 있습니다.
        </p>
        <Button variant="gradient" size="sm" onClick={onSubscribe}>
          구독하기
        </Button>
      </div>
    </div>
  );
}
