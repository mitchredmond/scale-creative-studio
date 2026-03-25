/**
 * Animations — Subtle, refined motion
 * Minimal aesthetic = minimal, purposeful animation
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

let lenis;

// ==========================================================================
// Smooth Scroll
// ==========================================================================

export function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  
  gsap.ticker.lagSmoothing(0);
  lenis.on('scroll', ScrollTrigger.update);

  return lenis;
}

// ==========================================================================
// Nav scroll state
// ==========================================================================

function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  ScrollTrigger.create({
    start: 100,
    onUpdate: (self) => {
      if (self.scroll() > 100) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    },
  });
}

// ==========================================================================
// Fade animations
// ==========================================================================

function initFadeAnimations() {
  // Fade up
  document.querySelectorAll('[data-animate="fade-up"]').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Simple fade
  document.querySelectorAll('[data-animate="fade"]').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// ==========================================================================
// Stagger animations
// ==========================================================================

function initStaggerAnimations() {
  document.querySelectorAll('[data-stagger]').forEach((container) => {
    const children = container.children;
    const delay = parseFloat(container.dataset.stagger) || 0.1;
    
    gsap.fromTo(children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: delay,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// ==========================================================================
// Image parallax — very subtle
// ==========================================================================

function initParallax() {
  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.1;
    
    gsap.to(el, {
      yPercent: speed * 30,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

// ==========================================================================
// Hero animation
// ==========================================================================

export function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  const title = document.querySelector('.hero__title');
  const subtitle = document.querySelector('.hero__subtitle');
  const meta = document.querySelector('.hero__meta');
  
  if (title) {
    tl.fromTo(title,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
  }
  
  if (subtitle) {
    tl.fromTo(subtitle,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    );
  }
  
  if (meta) {
    tl.fromTo(meta,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2'
    );
  }
  
  return tl;
}

// ==========================================================================
// Project detail page
// ==========================================================================

export function animateProjectPage() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  const header = document.querySelector('.project-header');
  const images = document.querySelectorAll('.project-images__item');
  
  if (header) {
    tl.fromTo(header,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
  }
  
  if (images.length) {
    images.forEach((img) => {
      gsap.fromTo(img,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }
  
  return tl;
}

// ==========================================================================
// Initialize
// ==========================================================================

export function initAnimations() {
  initSmoothScroll();
  initNavScroll();
  initFadeAnimations();
  initStaggerAnimations();
  initParallax();
  
  // Page-specific
  if (document.querySelector('.hero')) {
    animateHero();
  }
  
  if (document.querySelector('.project-header')) {
    animateProjectPage();
  }
  
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger, lenis };
