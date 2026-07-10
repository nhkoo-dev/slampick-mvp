import { supabase } from '../supabase/client';

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
    status
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


export async function getInfluencers(mode = 'premium') {
  const { data, error } = await supabase
    .from(TABLE_BY_MODE[mode])
    .select(SELECT_BY_MODE[mode])


  if (error) throw error;
  console.log(mode);
  console.log(TABLE_BY_MODE[mode]);

  return data;
}

