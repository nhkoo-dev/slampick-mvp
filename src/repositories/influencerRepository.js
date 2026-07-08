import { supabase } from '../supabase/client';

export async function getInfluencers() {
  const { data, error } = await supabase
    .from('influencers')
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

  return data;
}

