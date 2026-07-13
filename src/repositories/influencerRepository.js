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
// 참조하지 못해 400을 내므로, 조건별로 쿼리를 나눠 보낸 뒤 결과를 id 기준으로 합쳐서 OR을 구현한다.
async function getPremiumInfluencers(select) {
  const now = new Date().toISOString();

  const availabilityQuery = supabase
    .from(TABLE_BY_MODE.premium)
    .select(select)
    .lte('influencer_availability.available_from', now) //<=
    .gte('influencer_availability.available_until', now); //>=

  const guideFitQuery = supabase
    .from(TABLE_BY_MODE.premium)
    .select(select)
    .gte('guide_fit.score', MIN_GUIDE_FIT_SCORE);

  const [availabilityResult, guideFitResult] = await Promise.all([
    availabilityQuery,
    guideFitQuery,
  ]);

  if (availabilityResult.error) throw availabilityResult.error;
  if (guideFitResult.error) throw guideFitResult.error;

  const byId = new Map();

  for (const row of [...availabilityResult.data, ...guideFitResult.data]) {
    byId.set(row.id, row);
  }

  return Array.from(byId.values());
}

export async function getInfluencers(mode = 'trial') {
  let data;

  if (mode === 'premium') {
    data = await getPremiumInfluencers(SELECT_BY_MODE.premium);
  } else {
    const { data: trialData, error } = await supabase
      .from(TABLE_BY_MODE[mode])
      .select(SELECT_BY_MODE[mode]);

    if (error) throw error;

    data = trialData;
  }

  let result = data;

  if (mode === 'premium') {
    result = data.map(({ influencer_availability, guide_fit, rate_card, ...influencer }) => ({
      ...influencer,
      rate_card: rate_card?.rate_card,
      validate_until: rate_card?.validate_until,
    }));
  }

  console.log(`[getInfluencers] mode=${mode} count=${result.length}`);

  return result;
}