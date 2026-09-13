// 박람회(엑스포) 갤러리 데이터를 합쳐주는 모듈입니다.
//
// 기존 연도(2019, 2023~2025)는 코드에 그대로 두고,
// 관리자 페이지에서 새로 추가한 연도만 서버(site_settings.expoYears)에 저장해 뒤에 이어붙입니다.
// 그래서 관리자가 아무것도 추가하지 않으면 지금과 똑같은 화면이 나옵니다.
import { expoPhotos as builtInPhotos } from '../data/expo';

// 코드에 들어있는 기존 연도의 제목/설명 (Trust.jsx의 expoYearMeta와 동일한 값)
export const BUILT_IN_YEAR_META = {
  '2019': {
    labelKo: '미국 올랜도 글로벌 펫 엑스포',
    labelEn: 'Global Pet Expo, Orlando',
    descKo: '세계 최대 규모의 미국 올랜도 글로벌 펫 엑스포 참가 현장',
    descEn: "Boomyung's international booth at Global Pet Expo, Orlando, USA."
  },
  '2023': {
    labelKo: '태국 국제 펫 박람회 (Pet Fair SEA)',
    labelEn: 'Pet Fair South East Asia',
    descKo: '방콕 현지 부명 브랜드 단독 부스 및 동남아 바이어 수출 상담',
    descEn: "Showcasing Boomyung's premium brands to global distributors in Bangkok."
  },
  '2024': {
    labelKo: '태국 국제 펫 박람회 (Pet Fair SEA)',
    labelEn: 'Pet Fair South East Asia',
    descKo: '혁신적인 K-펫푸드 라인업 전시 및 글로벌 파트너십 확대',
    descEn: "Expanding international distribution network with innovative K-Pet products."
  },
  '2025': {
    labelKo: '태국 국제 펫 박람회 (Pet Fair SEA)',
    labelEn: 'Pet Fair South East Asia',
    descKo: '지속 가능한 펫 케어 솔루션 글로벌 공개 및 상담 현장',
    descEn: "Presenting sustainable pet care solutions to international partners."
  }
};

// 박람회 사진 한 장의 권장 업로드 규격 (화면에서는 가로로 넓은 타일에 꽉 채워 잘려 보임)
export const EXPO_PHOTO_SIZE = { width: 1600, height: 1200 };

// 관리자가 추가한 연도 하나를 화면용 사진 목록으로 펼친다.
function expandAddedYear(yearEntry) {
  return (yearEntry.photos || []).map((photo, i) => ({
    id: photo.id || `expo-${yearEntry.year}-${i + 1}`,
    titleKo: `${yearEntry.labelKo} #${i + 1}`,
    titleEn: `${yearEntry.labelEn || yearEntry.labelKo} #${i + 1}`,
    category: 'Exhibition',
    year: String(yearEntry.year),
    locationKo: yearEntry.locationKo || '',
    locationEn: yearEntry.locationEn || yearEntry.locationKo || '',
    image: photo.image
  }));
}

// 화면에 뿌릴 최종 사진 목록과 연도별 제목/설명을 만들어 돌려준다
export function buildExpoData(addedYears) {
  const added = Array.isArray(addedYears) ? addedYears : [];

  const photos = [...builtInPhotos];
  const meta = { ...BUILT_IN_YEAR_META };

  added.forEach(entry => {
    if (!entry || !entry.year) return;
    meta[String(entry.year)] = {
      labelKo: entry.labelKo || String(entry.year),
      labelEn: entry.labelEn || entry.labelKo || String(entry.year),
      descKo: entry.descKo || '',
      descEn: entry.descEn || entry.descKo || ''
    };
    photos.push(...expandAddedYear(entry));
  });

  return { photos, meta };
}
