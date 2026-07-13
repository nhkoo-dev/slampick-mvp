import { supabase } from '../supabase/client';

const MIN_GUIDE_FIT_SCORE = 80;

const TABLE_BY_MODE = {
  premium: 'influencers',
  trial: 'trial_influencers_view',
};

const SELECT_BY_MODE = {
  premium: `
    id,
    name,
    handle,
    platform,
    region,
    tier,
    followers,
    real_views,
    engagement_rate,
    thumbnail_url,
    status,
    influencer_availability!inner(
      available_from,
      available_until
    ),
    guide_fit!inner(score),
    rate_card(
      rate_card,
      validate_until
    )
  `,
  trial: `
    id,
    name,
    handle,
    platform,
    region,
    tier,
    followers,
    real_views,
    thumbnail_url,
    status,
    is_barter,
    barter_reason,
    rate_card
  `,
};

// PostgREST의 or()는 서로 다른 !inner 조인 테이블(influencer_availability, guide_fit)을 함께
// 참조하지 못해 400을 내므로, 따라서 각 조건을 개별 쿼리로 조회한 뒤, id 기준으로 중복을 제거하여 OR 조건을 구현한다.
async function getPremiumInfluencers(select) {
  const now = new Date().toISOString();

  //현재 협업이 가능한 인플루언서 조회
  const availabilityQuery = supabase
    .from(TABLE_BY_MODE.premium)
    .select(select)
    .lte('influencer_availability.available_from', now) //<=
    .gte('influencer_availability.available_until', now); //>=

  //guide 적합도 기준을 만족하는 인플루언서 조회
  const guideFitQuery = supabase
    .from(TABLE_BY_MODE.premium)
    .select(select)
    .gte('guide_fit.score', MIN_GUIDE_FIT_SCORE);

  //두 조건 동시에 조회
  const [availabilityResult, guideFitResult] = await Promise.all([
    availabilityQuery,
    guideFitQuery,
  ]);

  if (availabilityResult.error) throw availabilityResult.error;
  if (guideFitResult.error) throw guideFitResult.error;

  //id 기준 중복 제거
  const byId = new Map();

  for (const row of [...availabilityResult.data, ...guideFitResult.data]) {
    byId.set(row.id, row);
  }

  return Array.from(byId.values());
}

function isAvailableNow(availability, now) {
  if (!availability) return false;

  return (
    new Date(availability.available_from) <= now &&
    now <= new Date(availability.available_until)
  );
}

function isGuideFitScore(guideFit) {
  return Boolean(guideFit) && guideFit.score >= MIN_GUIDE_FIT_SCORE;
}

export async function getInfluencers(mode = 'trial') {
  let data;

  if (mode === 'premium') {
    data = await getPremiumInfluencers(SELECT_BY_MODE.premium); // premium 일 경우 함수 호출
  } else {
    const { data: trialData, error } = await supabase
      .from(TABLE_BY_MODE[mode])
      .select(SELECT_BY_MODE[mode]);

    if (error) throw error;

    data = trialData;
  }

  let result = data;

  if (mode === 'premium') {
    const now = new Date();

    result = data.map(({ influencer_availability, guide_fit, rate_card, ...influencer }) => ({
      ...influencer,
      rate_card: rate_card?.rate_card,
      validate_until: rate_card?.validate_until,
      isAvailable: isAvailableNow(influencer_availability, now),
      isGuideFit: isGuideFitScore(guide_fit),
    }));
  }

  console.log(`[getInfluencers] mode=${mode} count=${result.length}`);

  return result;
}