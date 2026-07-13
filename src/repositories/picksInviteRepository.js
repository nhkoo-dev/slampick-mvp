import { supabase } from "../supabase/client";

/**
 * 로그인한 브랜드의 저장한 인플루언서 조회
 */
export async function getPickedInfluencers(brandId) {
    //해당 브랜드가 저장한 influencer_id 조회
  const { data: picks, error: picksError } = await supabase
    .from("picks_invites")
    .select("influencer_id")
    .eq("brand_id", brandId);   //eq : where 연산자

  if (picksError) throw picksError;

  //조회한 influencer_id 만 배열로 추출
  const influencerIds = picks.map((pick) => pick.influencer_id);

  //저장한 influencer_id 가 없을시 빈 배열 반환
  if (influencerIds.length === 0) {
    return [];
  }


  // 저장한 influencer_id에 해당하는 인플루언서 상세 정보 조회
  const { data: influencers, error: influencersError } = await supabase
    .from("influencers")
    .select(`
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
      rate_card (
        rate_card,
        validate_until
      )
    `)
    .in("id", influencerIds);

  if (influencersError) throw influencersError;

    // 중첩된 rate_card 객체를 카드에서 사용하기 쉬운 형태로 변환
  return influencers.map(({ rate_card, ...influencer }) => ({
    ...influencer,
    rate_card: rate_card?.rate_card,
    validate_until: rate_card?.validate_until,
  }));
}

/**
 * 인플루언서 저장
 */
export async function addPick(brandId, influencerId, source = "list") {
  const { error } = await supabase
    .from("picks_invites")
    .insert({
      brand_id: brandId,
      influencer_id: influencerId,
      source,   //list 또는 guide
    });

  if (error) throw error;
}

/**
 * 저장 취소
 */
export async function removePick(brandId, influencerId) {
  const { error } = await supabase
    .from("picks_invites")
    .delete()
    .eq("brand_id", brandId)
    .eq("influencer_id", influencerId);

  if (error) throw error;
}