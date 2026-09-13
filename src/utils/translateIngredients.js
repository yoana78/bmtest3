// 원료 및 성분 영문 번역 사전 및 헬퍼 함수
const INGREDIENT_DICTIONARY = {
  // 육류 / 가금류 / 어류
  '오리고기분말': 'Duck Meal',
  '오리고기': 'Duck Meat',
  '오리분': 'Duck Meal',
  '오리': 'Duck',
  '닭고기분말': 'Chicken Meal',
  '닭고기': 'Chicken Meat',
  '닭가슴살': 'Chicken Breast',
  '가수분해닭고기': 'Hydrolyzed Chicken',
  '가수분해가금류': 'Hydrolyzed Poultry',
  '가수분해동물성단백질': 'Hydrolyzed Animal Protein',
  '가수분해연어': 'Hydrolyzed Salmon',
  '연어': 'Salmon',
  '연어살': 'Salmon Meat',
  '연어유': 'Salmon Oil',
  '연어오일': 'Salmon Oil',
  '정제연어유': 'Refined Salmon Oil',
  '황태': 'Dried Pollack',
  '황태분말': 'Dried Pollack Powder',
  '참치': 'Tuna',
  '참치분말': 'Tuna Powder',
  '생선살': 'Fish Meat',
  '게살': 'Crab Meat',
  '양고기분말': 'Lamb Meal',
  '양고기': 'Lamb Meat',
  '소고기': 'Beef',
  '소간': 'Beef Liver',
  '밀웜분말': 'Mealworm Powder',
  '동애등에분말': 'Black Soldier Fly Larvae Powder',
  '동애등에': 'Black Soldier Fly Larvae',
  '멸치분말': 'Anchovy Powder',
  '새우분말': 'Shrimp Powder',

  // 곡류 / 전분 / 콩류
  '쌀가루': 'Rice Flour',
  '유기농쌀가루': 'Organic Rice Flour',
  '닭고기 현미': 'Chicken & Brown Rice',
  '보리': 'Barley',
  '보리순': 'Barley Sprout',
  '귀리': 'Oats',
  '밀싹': 'Wheatgrass',
  '옥수수': 'Corn',
  '소맥분': 'Wheat Flour',
  '타피오카전분': 'Tapioca Starch',
  '타피오카': 'Tapioca',
  '유기농타피오카': 'Organic Tapioca',
  '감자전분': 'Potato Starch',
  '감자분말': 'Potato Powder',
  '고구마전분': 'Sweet Potato Starch',
  '유기농고구마': 'Organic Sweet Potato',
  '대두박': 'Soybean Meal',
  '유기농대두박': 'Organic Soybean Meal',
  '대두분': 'Soybean Flour',
  '유기농대두분': 'Organic Soybean Flour',
  '완두분': 'Pea Flour',
  '완두단백': 'Pea Protein',
  '강낭콩': 'Kidney Beans',
  '흰강낭콩추출물': 'White Kidney Bean Extract',
  '주정박': 'Distillers Dried Grains',
  '비트펄프': 'Beet Pulp',
  '비트펄트': 'Beet Pulp',

  // 채소 / 과일 / 해조류
  '블루베리': 'Blueberry',
  '블루베리분말': 'Blueberry Powder',
  '크랜베리': 'Cranberry',
  '크랜베리분말': 'Cranberry Powder',
  '크렌베리': 'Cranberry',
  '사과': 'Apple',
  '바나나': 'Banana',
  '바나나분말': 'Banana Powder',
  '딸기': 'Strawberry',
  '파인애플': 'Pineapple',
  '당근': 'Carrot',
  '시금치': 'Spinach',
  '브로콜리': 'Broccoli',
  '단호박': 'Sweet Pumpkin',
  '호박': 'Pumpkin',
  '호박즙': 'Pumpkin Juice',
  '파슬리': 'Parsley',
  '케일': 'Kale',
  '아사이': 'Acai Berry',
  '인디언구스베리': 'Indian Gooseberry (Amla)',
  '미역': 'Seaweed',
  '다시마': 'Kelp',
  '스피루리나': 'Spirulina',
  '클로렐라': 'Chlorella',
  '야채과일혼합분말': 'Fruit & Vegetable Blend Powder',

  // 기능성 원료 / 추출물 / 영양소
  '유청단백': 'Whey Protein',
  '아마씨': 'Flaxseed',
  '글루코사민': 'Glucosamine',
  'MSM': 'MSM (Methylsulfonylmethane)',
  '초록입홍합': 'Green Lipped Mussel',
  '초록입홍합분말': 'Green Lipped Mussel Powder',
  '초록입홍합추출분말': 'Green Lipped Mussel Extract Powder',
  '녹색입홍합': 'Green Lipped Mussel',
  '녹색입홍합추출물': 'Green Lipped Mussel Extract',
  '상어연골': 'Shark Cartilage',
  '상어연골분말': 'Shark Cartilage Powder',
  '콘드로이친': 'Chondroitin',
  '연골분말': 'Cartilage Powder',
  '콜라겐': 'Collagen',
  '피쉬콜라겐': 'Fish Collagen',
  '저분자콜라겐': 'Low Molecular Fish Collagen',
  '히알루론산': 'Hyaluronic Acid',
  'L-카르니틴': 'L-Carnitine',
  'L-아르기닌': 'L-Arginine',
  'L-라이신': 'L-Lysine',
  '타우린': 'Taurine',
  '코엔자임Q10': 'Coenzyme Q10',
  '코엔자임q10': 'Coenzyme Q10',
  '코엔자임Q': 'Coenzyme Q10',
  '코엔자임q': 'Coenzyme Q10',
  '아스타잔틴': 'Astaxanthin',
  '헤마토코쿠스추출물': 'Haematococcus Extract (Astaxanthin)',
  '루테인': 'Lutein',
  '마리골드추출물': 'Marigold Extract (Lutein)',
  '마리골드추출분말': 'Marigold Extract Powder (Lutein)',
  '밀크씨슬': 'Milk Thistle',
  '유카추출물': 'Yucca Extract',
  '유카추추물': 'Yucca Extract',
  '녹차추출물': 'Green Tea Extract',
  '녹차분말': 'Green Tea Powder',
  '로즈마리추출물': 'Rosemary Extract',
  '세이지추출물': 'Sage Extract',
  '가르시니아 캄보지아추출물': 'Garcinia Cambogia Extract',
  '가르시니아캄보지아추출물': 'Garcinia Cambogia Extract',
  '홍삼': 'Red Ginseng',
  '프로폴리스': 'Propolis',
  '후코이단': 'Fucoidan',
  '초유': 'Colostrum',
  '초유단백분말': 'Colostrum Protein Powder',
  '난황분': 'Egg Yolk Powder',
  '산양유': 'Goat Milk',
  '우유': 'Milk',
  '치즈분말': 'Cheese Powder',

  // 장건강 / 유산균
  '프리바이오틱스': 'Prebiotics (FOS)',
  '프락토올리고당': 'Fructooligosaccharides (FOS)',
  '이눌린': 'Inulin',
  '유산균': 'Probiotics',
  '유산균혼합분말': 'Probiotics Blend Powder',
  '맥주효모': "Brewer's Yeast",
  '건조효모': 'Dried Yeast',
  '효모': 'Yeast',
  '베타글루칸': 'Beta-Glucan',
  'β-글루칸': 'Beta-Glucan',
  '차전자피': 'Psyllium Husk',
  '셀룰로오스': 'Cellulose',
  '대두다당류': 'Soybean Polysaccharides',

  // 유지류 / 첨가물 / 미네랄
  '정제계유': 'Refined Chicken Oil',
  '정제닭기름': 'Refined Chicken Fat',
  '정제닭지방': 'Refined Chicken Fat',
  '동물성혼합유지': 'Mixed Animal Fats',
  '카놀라유': 'Canola Oil',
  '코코넛오일': 'Coconut Oil',
  '글리세린': 'Glycerin',
  '식물성 글리세린': 'Vegetable Glycerin',
  '프로필렌글리콜': 'Propylene Glycol',
  '천연향미제': 'Natural Flavor',
  '레시틴': 'Lecithin',
  '인산칼슘': 'Calcium Phosphate',
  '안산칼슘': 'Calcium Phosphate',
  '소르빈산칼륨': 'Potassium Sorbate',
  '잔탄검': 'Xanthan Gum',
  '탄산수소나트륨': 'Sodium Bicarbonate',
  '포도당': 'Dextrose',
  '함수포도당': 'Glucose Monohydrate',
  '비타민프리믹스': 'Vitamin Premix',
  '비타민프리 믹스': 'Vitamin Premix',
  '비타민합제': 'Vitamin Complex',
  '미네랄프리믹스': 'Mineral Premix',
  '미네랄 프리믹스': 'Mineral Premix',
  '미네랄합제': 'Mineral Complex',
  '정제수': 'Purified Water'
};

/**
 * 한국어 원료 문자열을 자연스러운 영문 원료 목록으로 자동 변환합니다.
 */
export function translateIngredients(koString) {
  if (!koString || typeof koString !== 'string') return '';

  // 쉼표, 줄바꿈, 가운뎃점 등으로 분리
  const items = koString.split(/[,·\n]/).map(s => s.trim()).filter(Boolean);

  const translated = items.map(item => {
    // 괄호 내용 처리 (예: "마리골드추출물(루테인 함유)" -> "Marigold Extract (contains Lutein)")
    let prefix = item;
    let paren = '';
    const match = item.match(/^(.*?)\((.*?)\)?$/);
    if (match) {
      prefix = match[1].trim();
      paren = match[2].trim();
    }

    // 사전에서 매핑 검색
    let enPrefix = INGREDIENT_DICTIONARY[prefix] || INGREDIENT_DICTIONARY[item];
    if (!enPrefix) {
      // 부분 일치 시도
      for (const [k, v] of Object.entries(INGREDIENT_DICTIONARY)) {
        if (prefix.includes(k)) {
          enPrefix = v;
          break;
        }
      }
    }

    if (!enPrefix) {
      enPrefix = prefix; // 그대로 유지 (영어 고유명사 등)
    }

    if (paren) {
      let enParen = paren;
      if (paren.includes('루테인')) enParen = 'Lutein';
      else if (paren.includes('콘드로이친')) enParen = 'Chondroitin';
      else if (paren.includes('오메가')) enParen = 'Omega-3 & 6';
      else if (paren.includes('FOS')) enParen = 'FOS';
      else if (paren.includes('뿌리')) enParen = 'Root';
      else if (paren.includes('국산')) enParen = 'Domestic';
      else if (paren.includes('20%')) enParen = '20%';
      return `${enPrefix} (${enParen})`;
    }

    return enPrefix;
  });

  // 중복 제거 및 쉼표 연결
  return [...new Set(translated)].join(', ');
}
