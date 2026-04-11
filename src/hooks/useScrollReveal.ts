'use client';

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const sectionIndex = Array.from(elements).indexOf(entry.target);
            const direction = sectionIndex % 2 === 0 ? 'left' : 'right';
            
            entry.target.classList.add('in-view');
            entry.target.setAttribute('data-direction', direction);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}