// 'YYYY-MM-DDTHH:mm:ss' 또는 'YYYY-MM-DD HH:mm:ss' 형태의 날짜 문자열에서 날짜 부분만 추출한다
export function toDateOnly(dateString) {
  return dateString.split('T')[0].split(' ')[0];
}
