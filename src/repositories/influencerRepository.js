import { supabase } from '../supabase/client';

const TABLE_BY_MODE = {
  premium: 'influencers',
  trial: 'trial_influencers',
};


export async function getInfluencers(mode = 'premium') {
  const { data, error } = await supabase
    .from(TABLE_BY_MODE[mode])
    .select(`
        influencer_id,
        name,
        handle,
        platform,
        region,
        tier,
        real_views,
        engagement_rate,
        followers,
        thumbnail_url
    `)


  if (error) throw error;
  console.log(mode);
  console.log(TABLE_BY_MODE[mode]);

  return data;
}

