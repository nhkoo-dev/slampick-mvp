import { supabase } from '../supabase/client';

export async function getInfluencers() {
  const { data, error } = await supabase
    .from('influencers')
    .select(`
      influencer_id,
      name,
      platform,
      country,
      instagram_followers,
      cover_url
    `)
    .not('name', 'is', null)
    .not('platform', 'is', null)
    .not('country', 'is', null)
    .not('instagram_followers', 'is', null)
    .not('cover_url', 'is', null)

  if (error) throw error;

  return data;
}