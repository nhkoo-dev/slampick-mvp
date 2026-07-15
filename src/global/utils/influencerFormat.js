import { toDateOnly } from './date';

const PLATFORM_ICONS = {
  instagram: '📷',
  tiktok: '🎵',
  youtube: '▶️',
};

// 플랫폼별 작은 아이콘 표시용 (lucide-react에는 브랜드 아이콘이 없어 이모지로 대체)
export function getPlatformIcon(platform) {
  if (!platform) return null;

  return PLATFORM_ICONS[platform.toLowerCase()] ?? null;
}

// 단가 표시용 문자열 생성
export function formatRateCardLabel(rate_card) {
  if (!rate_card) return null;

  const rateCardInManwon = Math.floor(rate_card / 10000);
  return `단가 ${rateCardInManwon.toLocaleString()}만원`;
}

// 팔로워 수 축약 표시용 문자열 생성 (1만 이상이면 예: 181,000 -> 18.1만, 미만이면 그대로 표시)
export function formatFollowersLabel(followers) {
  if (followers == null) return null;

  if (followers >= 10000) {
    const followersInManwon = parseFloat((followers / 10000).toFixed(1));
    return `${followersInManwon.toLocaleString()}만`;
  }

  return followers.toLocaleString();
}

// rate_card 유효기간 표시용 문자열 생성
export function formatValidateUntilLabel(validate_until) {
  if (!validate_until) return null;

  return `~${toDateOnly(validate_until)}`;
}

// 협업 가능 기간(가용기간) 표시용 문자열 생성
export function formatAvailableUntilLabel(available_until) {
  if (!available_until) return null;

  return `가용기간 ${toDateOnly(available_until)}`;
}
