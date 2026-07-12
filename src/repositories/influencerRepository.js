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
    guide_fit!inner(score)
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

export async function getInfluencers(mode = 'trial') {
  let query = supabase
    .from(TABLE_BY_MODE[mode])
    .select(SELECT_BY_MODE[mode]);

  if (mode === 'premium') {
    const now = new Date().toISOString();

    query = query
      .lte('influencer_availability.available_from', now) //<=
      .gte('influencer_availability.available_until', now) //>=
      .gte('guide_fit.score', MIN_GUIDE_FIT_SCORE);
  }

  const { data, error } = await query;

  if (error) throw error;

  let result = data;

  if (mode === 'premium') {
    result = data.map(
      ({ influencer_availability, guide_fit, ...influencer }) => influencer
    );
  }

  console.log(`[getInfluencers] mode=${mode} count=${result.length}`);

  return result;
}