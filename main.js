'use strict';
import { initCore, initGrowthChart } from '../../../shared/js/core.js';

/* ── Raindrops generator ── */
function initRain() {
  const container = document.getElementById('raindrops');
  if (!container) return;
  const count = 28;
  for (let i = 0; i < count; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    const left     = Math.random() * 100;
    const height   = 10 + Math.random() * 25;
    const delay    = Math.random() * 8;
    const duration = 1.8 + Math.random() * 2.5;
    const opacity  = 0.3 + Math.random() * 0.4;
    drop.style.cssText = `left:${left}%;height:${height}px;width:1px;animation-delay:${delay}s;animation-duration:${duration}s;opacity:${opacity};top:0;`;
    container.appendChild(drop);
  }
}

/* ── Tabs ── */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const btns   = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');
    const activate = i => {
      btns.forEach((b, j) => b.classList.toggle('active', i === j));
      panels.forEach((p, j) => p.classList.toggle('active', i === j));
    };
    btns.forEach((btn, i) => btn.addEventListener('click', () => activate(i)));
    activate(0);
  });
}

/* ── GSAP animations ── */
function initGSAP() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero__eyebrow', { y: 20, opacity: 0, duration: 0.8 })
    .from('.hero__title',   { y: 44, opacity: 0, duration: 1 },    '-=0.4')
    .from('.hero__sub',     { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.hero__contact', { y: 16, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero .btn',     { y: 12, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.3')
    .from('.hero__scroll',  { opacity: 0, duration: 0.5 }, '-=0.2');

  // Progress via ScrollTrigger
  ScrollTrigger.create({ start:'top top', end:'bottom bottom',
    onUpdate: s => { const b=document.getElementById('progress-bar'); if(b) b.style.width=(s.progress*100)+'%'; }
  });

  // Timeline items
  gsap.from('.timeline__item', {
    scrollTrigger:{ trigger:'.timeline', start:'top 75%', toggleActions:'play none none reverse' },
    y:50, opacity:0, duration:0.8, stagger:0.12, ease:'power3.out'
  });

  // KPI cards
  gsap.from('.kpi-card', {
    scrollTrigger:{ trigger:'.kpi-grid', start:'top 75%', toggleActions:'play none none reverse' },
    scale:0.9, opacity:0, duration:0.7, stagger:0.1, ease:'back.out(1.4)'
  });

  // Include items
  gsap.from('.include-item', {
    scrollTrigger:{ trigger:'.includes-grid', start:'top 75%' },
    x:-20, opacity:0, duration:0.6, stagger:0.08, ease:'power2.out'
  });

  // Pitches
  gsap.from('.pitch-item', {
    scrollTrigger:{ trigger:'.pitch-item', start:'top 75%' },
    x:-30, opacity:0, duration:0.7, stagger:0.12, ease:'power3.out'
  });

  // Price card
  gsap.from('.price-card', {
    scrollTrigger:{ trigger:'.price-card', start:'top 75%' },
    y:40, opacity:0, scale:0.97, duration:0.8, ease:'power3.out'
  });

  // Closing pin
  const closing = document.querySelector('.closing');
  if (closing) {
    gsap.timeline({
      scrollTrigger:{ trigger:closing, start:'top top', end:'+=600', pin:true, scrub:1 }
    })
    .from('.closing__mark',    { opacity:0, scale:0.85, duration:1 })
    .from('.closing__content', { y:30, opacity:0, duration:0.8 }, '-=0.5');
  }
}

/* ── Chart ── */
function initChart() {
  initGrowthChart('growth-chart',
    ['Sem 0','Sem 1','Sem 2','Sem 3','Sem 4'],
    [
      { label:'Calidad de sueño (%)',  data:[28,44,61,78,92] },
      { label:'Tensión corporal (%)',  data:[85,68,50,34,15] }
    ]
  );
}

document.addEventListener('DOMContentLoaded', () => {
  initRain();
  initCore();
  initTabs();
  initGSAP();
  initChart();
});
