// 리뉴얼 푸터 컴포넌트.
// 기존 구조 유지 + 디자인 개선 + 5개 메뉴 체계 반영.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { privacyPolicyKo, privacyPolicyEn } from '../data/privacyPolicy';
import { termsOfServiceKo, termsOfServiceEn } from '../data/termsOfService';

export default function Footer() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <footer className="bm-footer">
      <div className="bm-footer-inner">
        <div className="bm-footer-row">
          {/* 좌측: 회사 정보 */}
          <div className="bm-footer-info" style={{ maxWidth: '550px' }}>
            <div className="bm-footer-logo">
              <img src="./assets/boomyung_ci_logo.png" alt="BOOMYUNG" />
              <span className="bm-footer-logo-text">
                {isEn ? 'BOOMYUNG CO., LTD.' : '(주)부명 BOOMYUNG'}
              </span>
            </div>
            <p>
              {isEn
                ? '306, 19, Geonwon-daero 34beon-gil, Guri-si, Gyeonggi-do, Republic of Korea'
                : '경기도 구리시 건원대로34번길 19 306'}
            </p>
            <p>
              {isEn
                ? 'TEL: +82-31-553-8003 | FAX: +82-31-592-2460'
                : 'TEL: 031-553-8003 | FAX: 031-592-2460'}
            </p>
            <p>E-MAIL: help@petsb2b.co.kr</p>
            <p>{isEn ? 'Business Reg. No.: 132-81-49973' : '사업자등록번호: 132-81-49973'}</p>
          </div>

          {/* 우측: 바로가기 링크 */}
          <div className="bm-footer-links-group">
            <div className="bm-footer-col">
              <span className="bm-footer-col-title">{isEn ? 'COMPANY' : '기업 안내'}</span>
              <Link to="/about">{isEn ? 'About Us' : '회사소개'}</Link>
              <Link to="/brands">{isEn ? 'Our Brands' : '브랜드'}</Link>
              <Link to="/imported-brands">{isEn ? 'Imported Brands' : '수입 브랜드'}</Link>
            </div>
            <div className="bm-footer-col">
              <span className="bm-footer-col-title">{isEn ? 'BUSINESS' : '비즈니스'}</span>
              <Link to="/catalog">{isEn ? 'Product Catalog' : '제품 카탈로그'}</Link>
              <Link to="/trust">{isEn ? 'Trust & Certification' : '신뢰와 인증'}</Link>
              <Link to="/contact">{isEn ? 'B2B Inquiry' : 'B2B 입점 문의'}</Link>
            </div>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="bm-footer-bottom">
          <p>© 2026 BOOMYUNG Co., Ltd. All Rights Reserved.</p>
          <div className="bm-footer-bottom-links">
            <span onClick={() => setShowPrivacyModal(true)}>{isEn ? 'Privacy Policy' : '개인정보처리방침'}</span>
            <span onClick={() => setShowTermsModal(true)}>{isEn ? 'Terms of Service' : '이용약관'}</span>
            <Link to="/admin">{isEn ? 'Admin' : '관리자'}</Link>
          </div>
        </div>
      </div>

      {/* 개인정보처리방침 모달 */}
      {showPrivacyModal && (
        <div className="modal-backdrop" onClick={() => setShowPrivacyModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}
            style={{ maxWidth: '760px', maxHeight: '80vh', overflowY: 'auto', background: '#FFFFFF', padding: '32px', textAlign: 'left', color: '#1F2937' }}>
            <button className="modal-close-btn" onClick={() => setShowPrivacyModal(false)}>&times;</button>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--bm-navy)' }}>
              {isEn ? 'Privacy Policy' : '개인정보처리방침'}
            </h2>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', fontSize: '0.85rem', lineHeight: 1.7, color: '#374151', margin: 0 }}>
              {isEn ? privacyPolicyEn : privacyPolicyKo}
            </pre>
          </div>
        </div>
      )}

      {/* 이용약관 모달 */}
      {showTermsModal && (
        <div className="modal-backdrop" onClick={() => setShowTermsModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}
            style={{ maxWidth: '760px', maxHeight: '80vh', overflowY: 'auto', background: '#FFFFFF', padding: '32px', textAlign: 'left', color: '#1F2937' }}>
            <button className="modal-close-btn" onClick={() => setShowTermsModal(false)}>&times;</button>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--bm-navy)' }}>
              {isEn ? 'Terms of Service' : '이용약관'}
            </h2>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', fontSize: '0.85rem', lineHeight: 1.7, color: '#374151', margin: 0 }}>
              {isEn ? termsOfServiceEn : termsOfServiceKo}
            </pre>
          </div>
        </div>
      )}
    </footer>
  );
}
