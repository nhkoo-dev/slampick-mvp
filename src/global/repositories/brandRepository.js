import { supabase } from '../supabase/client';

export async function createBrand({ id, name }) {
  if (!id) {
    throw new Error('Supabase Auth UUID가 존재하지 않습니다.');
  }

  const { error } = await supabase.from('brand_user').insert({
    id,
    name,
  });

  if (error) {
    throw error;
  }
}

export async function getMyBrand() {
  const { data, error } = await supabase
    .from('brand_user')
    .select('id, name, tier')
    .single();

  if (error) throw error;

  return data;
}
