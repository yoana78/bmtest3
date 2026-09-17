// 이 파일은 "제품 상세" 페이지입니다 (주소: /catalog/:productId).
// 카탈로그에서 제품 카드를 클릭하면 이 페이지로 이동하며,
// 큰 이미지, 요약 정보, 탭(상세정보/원료·성분), 같은 브랜드의 관련 제품을 보여줍니다.
import React, { useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import { translateIngredients } from '../utils/translateIngredients';
import './ProductDetail.css';

// 카테고리/동물종류 한글 -> 영문 매핑 (영어 모드 표시용)
const categoryEnMap = {
  '사료': 'Feed',
  '간식': 'Treats',
  '모래': 'Litter',
  '용품': 'Supplies'
};

const petTypeEnMap = {
  'dog': 'Dog',
  'cat': 'Cat'
};

// 데이터에는 dog/cat으로 저장되므로 한국어 모드에서도 라벨을 바꿔줘야 한다
const petTypeKoMap = {
  'dog': '강아지',
  'cat': '고양이'
};

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { brands, products } = useData();
  const [activeTab, setActiveTab] = useState('info'); // 현재 선택된 탭 ('info' 또는 'nutrition')

  const product = products.find(p => p.id === productId);

  // 존재하지 않는 제품 id로 접근하면 카탈로그로 돌려보냄
  if (!product) {
    return <Navigate to="/catalog" replace />;
  }

  const isEn = lang === 'en';
  const brand = brands.find(b => b.id === product.brandId);
  const brandColor = brand?.color || '#1B3A91';
  
  const relatedProducts = products
    .filter(p => p.brandId === product.brandId && p.id !== product.id)
    .slice(0, 5);

  const rawFeatures = Array.isArray(product.features)
    ? product.features
    : (product.features ? product.features.split('\n') : []);

  const featuresList = isEn ? (product.featuresEn || rawFeatures) : rawFeatures;

  const shelfLifeText = isEn ? (product.shelfLifeEn || '18 months from manufacturing date') : product.shelfLife;
  const originText = isEn ? (product.originEn || 'Republic of Korea') : product.origin;
  const ingredientsText = isEn ? (product.ingredientsEn || translateIngredients(product.ingredients)) : product.ingredients;

  // 값이 비어있는 항목은 표에 빈 줄로 남지 않도록 걸러낸다 (예전에 저장된 데이터 대비)
  const nutritionEntries = Object.entries(product.nutrition || {}).filter(([, v]) => v && String(v).trim());
  const showNutrition = nutritionEntries.length > 0 && (product.category === '사료' || product.category === '간식');

  return (
    <div className="product-detail-page page-container">
      <div className="container">
        {/* SECTION: 현재 위치 경로 표시 (홈 > 카탈로그 > 브랜드 > 제품명) */}
        <div className="breadcrumb">
          <Link to="/">{isEn ? 'Home' : '홈'}</Link>
          <span className="separator">&gt;</span>
          <Link to="/catalog">{isEn ? 'Product Catalog' : '제품 카탈로그'}</Link>
          <span className="separator">&gt;</span>
          <Link to={`/brands/${brand?.id}`}>{isEn ? (brand?.nameEn || brand?.nameKo) : brand?.nameKo}</Link>
          <span className="separator">&gt;</span>
          <span className="current">{isEn ? product.nameEn : product.nameKo}</span>
        </div>

        {/* SECTION: 상단 - 제품 이미지 + 요약 정보(가격/코드/구매 버튼 등) */}
        <div className="product-main-view">
          <div className="product-gallery">
            <div className="product-image-large" style={{ background: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '340px' }}>
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.nameKo} 
                  style={{ maxHeight: '280px', maxWidth: '90%', objectFit: 'contain' }} 
                  onError={(e) => {
                    e.target.onerror = null;
                    if (brand?.logo) {
                      e.target.src = brand.logo;
                    } else {
                      e.target.style.display = 'none';
                    }
                  }}
                />
              ) : brand?.hasLogo ? (
                <img src={brand.logo} alt={brand.nameEn} style={{ maxHeight: '110px', maxWidth: '240px', objectFit: 'contain', transform: `scale(${brand.logoScale || 1})` }} />
              ) : (
                <span className="product-icon-large" style={{ color: brandColor, fontSize: '2.5rem', fontWeight: '800' }}>
                  {brand?.nameEn || brand?.nameKo}
                </span>
              )}
            </div>
          </div>
          
          <div className="product-summary">
            <Link to={`/brands/${brand?.id}`} className="product-brand-link" style={{ color: brandColor }}>
              {isEn ? (brand?.nameEn || brand?.nameKo) : brand?.nameKo}
            </Link>
            
            <h1 className="product-title">{isEn ? product.nameEn : product.nameKo}</h1>
            
            <div className="product-badges">
              <span className="badge">{isEn ? (categoryEnMap[product.category] || product.category) : product.category}</span>
              <span className="badge">{isEn ? (petTypeEnMap[product.petType] || product.petType) : (petTypeKoMap[product.petType] || product.petType)}</span>
            </div>

            <div className="product-meta-list">
              <div className="meta-item">
                <span className="meta-label">{isEn ? 'Barcode / Code' : '상품코드'}</span>
                <span className="meta-value">{product.code}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">{isEn ? 'Specification' : '규격'}</span>
                <span className="meta-value">{product.spec || (isEn ? 'See specification' : '규격 정보 참조')}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">{isEn ? 'Shelf Life' : '유통기한'}</span>
                <span className="meta-value">{shelfLifeText}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">{isEn ? 'Country of Origin' : '제조국'}</span>
                <span className="meta-value">{originText}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {product.purchaseUrl ? (
                <a
                  href={product.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary back-btn"
                  style={{ textDecoration: 'none', textAlign: 'center' }}
                >
                  {isEn ? 'Buy Now' : '바로 구매하기'} ↗
                </a>
              ) : (
                <button
                  disabled
                  className="btn btn-secondary back-btn"
                  style={{ opacity: 0.5, cursor: 'not-allowed' }}
                  title={isEn ? 'Purchase link coming soon' : '구매 링크 준비중'}
                >
                  {isEn ? 'Buy Now (Coming Soon)' : '바로 구매하기 (준비중)'}
                </button>
              )}
              <button onClick={() => navigate('/catalog')} className="btn btn-secondary back-btn">
                {isEn ? 'Back to Catalog' : '목록으로 돌아가기'}
              </button>
            </div>
          </div>
        </div>

        {/* SECTION: 탭 영역 - "상세 정보" / "원료 및 성분" 전환 */}
        <div className="product-details-content">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              {isEn ? 'Details & Features' : '상세 정보'}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              {isEn ? 'Ingredients & Nutrition' : '원료 및 성분'}
            </button>
          </div>

          <div className="tab-content">
            {/* SECTION: "상세 정보" 탭 내용 - 특징 목록과 상세 이미지 */}
            {activeTab === 'info' && (
              <div className="info-tab">
                {featuresList.length > 0 && (
                  <>
                    <h3>{isEn ? 'Key Features' : '제품 특징'}</h3>
                    <ul className="feature-list">
                      {featuresList.map((feature, idx) => (
                        <li key={idx}>
                          <span className="check-icon">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {Array.isArray(product.infoImages) && product.infoImages.length > 0 && (
                  <div className="info-image-list" style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {product.infoImages.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`${isEn ? product.nameEn : product.nameKo} 상세이미지 ${idx + 1}`}
                        style={{ maxWidth: '100%', width: 'auto', height: 'auto', borderRadius: '8px', border: '1px solid #EAEAEA', display: 'block', margin: '0 auto' }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SECTION: "원료 및 성분" 탭 내용 - 원료 설명과 영양성분표 */}
            {activeTab === 'nutrition' && (
              <div className="nutrition-tab">
                {ingredientsText && (
                  <>
                    <h3>{isEn ? 'Main Ingredients' : '사용 원료'}</h3>
                    <p className="ingredients-text">{ingredientsText}</p>
                  </>
                )}

                {showNutrition && (
                  <>
                    <h3 className="mt-8">{isEn ? 'Guaranteed Analysis / Nutrition' : '등록 성분량'}</h3>
                    <div className="nutrition-table-container">
                      <table className="nutrition-table">
                        <tbody>
                          {nutritionEntries.map(([key, value]) => {
                            // 실제 데이터는 영문 키(protein/fat/fiber/...)로 저장되어 있으므로,
                            // 그 영문 키를 기준으로 한글/영문 표시 라벨을 매핑한다.
                            const labelMap = {
                              protein: { ko: '조단백', en: 'Crude Protein' },
                              fat: { ko: '조지방', en: 'Crude Fat' },
                              fiber: { ko: '조섬유', en: 'Crude Fiber' },
                              moisture: { ko: '수분', en: 'Moisture' },
                              ash: { ko: '조회분', en: 'Crude Ash' },
                              calcium: { ko: '칼슘', en: 'Calcium' },
                              phosphorus: { ko: '인', en: 'Phosphorus' }
                            };
                            const label = labelMap[key];
                            return (
                              <tr key={key}>
                                <th>{label ? (isEn ? label.en : label.ko) : key}</th>
                                <td>{value}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SECTION: 같은 브랜드의 다른 제품 추천 목록 */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h3>{isEn ? 'Related Products' : '관련 제품'}</h3>
            <div className="related-grid">
              {relatedProducts.map(rp => (
                <Link to={`/catalog/${rp.id}`} className="related-card" key={rp.id}>
                  <div className="related-image">
                    <img
                      src={rp.image}
                      alt={rp.nameKo}
                      onError={(e) => {
                        e.target.onerror = null;
                        if (brand?.logo) {
                          e.target.src = brand.logo;
                        } else {
                          e.target.style.display = 'none';
                        }
                      }}
                    />
                  </div>
                  <div className="related-info">
                    <h4>{isEn ? rp.nameEn : rp.nameKo}</h4>
                    <p>{rp.spec}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
