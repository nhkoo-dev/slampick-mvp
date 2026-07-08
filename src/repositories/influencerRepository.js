const DUMMY_INFLUENCERS = [
  {
    avatarColor: 'bg-emerald-800',
    avatarInitial: 'DR',
    name: 'Dr.Rejuall',
    handle: 'drrejuall',
    platform: 'TikTok',
    followers: '48만',
    region: 'US',
    tier: '미드',
    views: '62K',
    engagementRate: '7.4%',
    potentialViews: '120만',
    badges: [
      { label: '오늘 새로 가용', tone: 'green', icon: '🕐' },
      { label: '약사 신뢰형', tone: 'blue', icon: '⚡' },
    ],
  },
  {
    avatarColor: 'bg-slate-700',
    avatarInitial: 'MY',
    name: 'mayaya',
    handle: 'mayaya',
    platform: 'TikTok',
    followers: '55만',
    region: 'US',
    tier: '메가',
    views: '71K',
    engagementRate: '6.8%',
    potentialViews: '138만',
    badges: [
      { label: '최근 68K 터짐', tone: 'pink', icon: '↗' },
      { label: '인터뷰형 적합', tone: 'blue', icon: '⚡' },
    ],
  },
  {
    avatarColor: 'bg-neutral-900',
    avatarInitial: '소',
    name: '소예',
    handle: 'soye.glow',
    platform: 'TikTok',
    followers: '35만',
    region: 'US',
    tier: '미드',
    views: '29K',
    engagementRate: '8.2%',
    potentialViews: '62만',
    badges: [
      { label: '오늘 새로 가용', tone: 'green', icon: '🕐' },
      { label: '뷰티 가이드 적합', tone: 'blue', icon: '⚡' },
    ],
  },
  {
    avatarColor: 'bg-amber-600',
    avatarInitial: '유',
    name: '유리',
    handle: 'yuri.beaute',
    platform: 'Instagram',
    followers: '8만',
    region: '일본',
    tier: '나노',
    views: '6K',
    engagementRate: '11.2%',
    potentialViews: '18만',
    badges: [
      { label: '오늘 새로 가용', tone: 'green', icon: '🕐' },
      { label: '무명(버티)', tone: 'orange', icon: '🔥' },
    ],
  },
];

// TODO: Supabase 연동 시 이 함수 내부만 실제 쿼리로 교체하면 됩니다.
// 예) const { data } = await supabase.from('influencers').select('*').eq('is_today', true);
export async function getTodayInfluencers() {
  return DUMMY_INFLUENCERS;
}
