// 스크롤 진입 시 요소에 애니메이션을 트리거하는 커스텀 훅.
// Intersection Observer API를 사용하여 성능 최적화.
// 화면에 스크롤되어 보일 때마다 순차 애니메이션이 다시 실행됩니다.
import { useEffect, useRef } from 'react';

/**
 * 단일 요소용 스크롤 애니메이션 훅
 * @param {Object} options
 * @param {number} options.threshold - 요소가 몇 % 보여야 트리거할지 (0~1, 기본 0.15)
 * @param {string} options.rootMargin - 뷰포트 마진 (기본 '0px 0px -50px 0px')
 * @param {boolean} options.once - true면 한 번만 트리거, false면 스크롤할 때마다 트리거 (기본 false)
 */
export function useScrollAnimation({ threshold = 0.15, rootMargin = '0px 0px -50px 0px', once = false } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!window.IntersectionObserver) {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove('is-visible');
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

/**
 * 여러 자식 요소를 순차(stagger) 애니메이션으로 등장시키는 훅
 * 스크롤되어 화면에 들어올 때마다 순차적으로 나타나며, 화면 밖으로 나가면 리셋됩니다.
 * @param {Object} options
 * @param {number} options.staggerDelay - 각 자식 간 딜레이(ms, 기본 100)
 * @param {number} options.threshold - 컨테이너가 몇 % 보여야 트리거할지 (기본 0.1)
 * @param {boolean} options.once - true면 한 번만 트리거 (기본 false)
 */
export function useStaggerAnimation({ staggerDelay = 100, threshold = 0.1, once = false } = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutIds = [];

    const clearTimers = () => {
      timeoutIds.forEach(id => clearTimeout(id));
      timeoutIds = [];
    };

    const revealChildren = () => {
      clearTimers();
      const children = container.querySelectorAll('.animate-child');
      children.forEach((child, idx) => {
        const id = setTimeout(() => {
          child.classList.add('is-visible');
        }, idx * staggerDelay);
        timeoutIds.push(id);
      });
    };

    const hideChildren = () => {
      clearTimers();
      const children = container.querySelectorAll('.animate-child');
      children.forEach(child => {
        child.classList.remove('is-visible');
      });
    };

    if (!window.IntersectionObserver) {
      revealChildren();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealChildren();
          if (once) observer.unobserve(container);
        } else if (!once) {
          hideChildren();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(container);
    return () => {
      clearTimers();
      observer.disconnect();
    };
  }, [staggerDelay, threshold, once]);

  return containerRef;
}
