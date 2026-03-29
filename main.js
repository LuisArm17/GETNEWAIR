'use strict';

import { initCore, initGrowthChart } from '../../../shared/js/core.js';

/* ════════════════════════════════════════════════════════════
   MAIN.JS — Cuerpo que Descansa
   Runs after DOM is ready. Loads data from JSON then wires
   GSAP ScrollTrigger animations.
   ════════════════════════════════════════════════════════════ */

async function loadData() {
  try {
    const res  = await fetch('../../../data/cuerpo-que-descansa.json');
    return await res.json();
  } catch {
    // Fallback: data already rendered in HTML
    return null;
  }
}

function initGSAP() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // ── Hero entrance ──────────────────────────────────────────
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('.hero__eyebrow',  { y: 20, opacity: 0, duration: 0.8 })
    .from('.hero__title',    { y: 40, opacity: 0, duration: 1,   stagger: 0.05 }, '-=0.4')
    .from('.hero__sub',      { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.hero__actions',  { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero__scroll-hint', { opacity: 0, duration: 0.6 }, '-=0.2');

  // ── Progress bar via ScrollTrigger ────────────────────────
  ScrollTrigger.create({
    start: 'top top',
    end:   'bottom bottom',
    onUpdate: self => {
      const bar = document.getElementById('progress-bar');
      if (bar) bar.style.width = (self.progress * 100) + '%';
    }
  });

  // ── Section: Who (pin + scrub) ────────────────────────────
  const whoSection = document.querySelector('.section--who');
  if (whoSection) {
    gsap.from(whoSection.querySelectorAll('.fade-scroll'), {
      scrollTrigger: {
        trigger: whoSection,
        start:   'top 75%',
        toggleActions: 'play none none reverse'
      },
      y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
    });
  }

  // ── Section: Timeline items ───────────────────────────────
  const timelineItems = document.querySelectorAll('.timeline__item');
  if (timelineItems.length) {
    gsap.from(timelineItems, {
      scrollTrigger: {
        trigger: '.section--program',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out'
    });
  }

  // ── Section: KPIs (pin + counter trigger) ─────────────────
  const kpiSection = document.querySelector('.section--kpis');
  if (kpiSection) {
    gsap.from(kpiSection.querySelectorAll('.kpi-card'), {
      scrollTrigger: {
        trigger: kpiSection,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      scale: 0.9, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.4)'
    });
  }

  // ── Section: Includes ─────────────────────────────────────
  gsap.from('.include-item', {
    scrollTrigger: { trigger: '.section--includes', start: 'top 70%' },
    x: -20, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out'
  });

  // ── Section: Pitches ──────────────────────────────────────
  gsap.from('.pitch-item', {
    scrollTrigger: { trigger: '.section--pitches', start: 'top 70%' },
    x: -30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
  });

  // ── Price card ────────────────────────────────────────────
  gsap.from('.price-card', {
    scrollTrigger: { trigger: '.section--price', start: 'top 70%' },
    y: 40, opacity: 0, scale: 0.97, duration: 0.8, ease: 'power3.out'
  });

  // ── Closing pinned section ────────────────────────────────
  const closingSection = document.querySelector('.section--closing');
  if (closingSection) {
    const closingTl = gsap.timeline({
      scrollTrigger: {
        trigger: closingSection,
        start:  'top top',
        end:    '+=600',
        pin:    true,
        scrub:  1
      }
    });
    closingTl
      .from('.closing__mark',    { opacity: 0, scale: 0.8, duration: 1 })
      .from('.closing__content', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5');
  }
}

// ── Tabs (profile sections) ──────────────────────────────────
function initTabs() {
  const tabsContainers = document.querySelectorAll('[data-tabs]');
  tabsContainers.forEach(container => {
    const btns   = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');

    function activate(index) {
      btns.forEach((b, i) => b.classList.toggle('active', i === index));
      panels.forEach((p, i) => p.classList.toggle('active', i === index));
    }

    btns.forEach((btn, i) => btn.addEventListener('click', () => activate(i)));
    activate(0);
  });
}

// ── Init chart from JSON data ────────────────────────────────
function initChart(data) {
  if (!data) return;
  initGrowthChart(
    'growth-chart',
    data.chart.labels,
    data.chart.datasets
  );
}

// ── Boot ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadData();
  initCore();
  initGSAP();
  initTabs();
  initChart(data);
});
