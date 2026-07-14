import { supabase } from '../supabase/client';

// subscriptions 생성 + brand_user tier 갱신을 Postgres 함수(create_subscription_and_update_tier)
// 하나로 묶어서 처리한다. 함수 전체가 DB 쪽에서 단일 트랜잭션으로 실행되기 때문에,
// 이미 구독 중이거나 brand_user가 없는 등 함수 내부에서 에러가 나면 insert까지 포함해
// 전부 자동 롤백된다 (client에서 별도로 보상 삭제를 할 필요가 없음).
export async function createSubscription({
  plan = 'list',
  price = 500000,
  free_by_contract = false,
  tier = 'premium',
}) {
  // brand_id 없이 RPC를 호출하면 원인 파악이 어려운 Postgres 에러가 그대로 노출되므로 먼저 검증한다.


  const { data, error } = await supabase.rpc('create_subscription_and_update_tier', {
    p_plan: plan,
    p_price: price,
    p_free_by_contract: free_by_contract,
    p_tier: tier,
  });

  

  if (error) throw error;

  return data;
}
