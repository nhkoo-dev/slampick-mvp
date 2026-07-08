import { supabase } from '../supabase/client';

export async function getInfluencers() {
    const { data, error } = await supabase
        .from('influencers')
        .select('*');

    if (error) throw error;

    return data;
}