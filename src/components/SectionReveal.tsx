import React, { useRef, useState, useEffect } from 'react';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  id 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If IntersectionObserver is not supported, show immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setIsVisible(true);
        return;
      }
    } catch {
      // Continue if media query fails
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.05, 
        rootMargin: '0px 0px -40px 0px' 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      style={{ animationDelay: delay ? `${delay}ms` : undefined }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        isVisible
          ? 'animate-fade-in-up opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
};
