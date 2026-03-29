/* ============================================================
   CORE.JS — Shared utilities
   ============================================================ */

'use strict';

// ── Progress Bar ──────────────────────────────────────────────
export function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  }, { passive: true });
}

// ── Animated Counters (uses GSAP if available, else rAF) ──────
export function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      const el       = entry.target;
      const target   = parseFloat(el.dataset.count);
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      const prefix   = el.dataset.prefix || '';
      const suffix   = el.dataset.suffix || '';
      const duration = parseFloat(el.dataset.duration || '2');

      if (window.gsap) {
        gsap.fromTo({ val: 0 }, { val: target, duration, ease: 'power2.out',
          onUpdate: function () {
            el.textContent = prefix + this.targets()[0].val.toFixed(decimals) + suffix;
          }
        });
      } else {
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / (duration * 1000), 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = prefix + (eased * target).toFixed(decimals) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

// ── Video: autoplay on viewport, pause on exit ────────────────
export function initVideoAutoplay() {
  const videos = document.querySelectorAll('.phone__screen video, [data-autoplay]');
  if (!videos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.4 });

  videos.forEach(v => {
    v.muted = true;
    v.loop  = true;
    v.playsInline = true;
    observer.observe(v);
  });
}

// ── Video: hover play/pause on cards ─────────────────────────
export function initVideoHover() {
  document.querySelectorAll('[data-hover-video]').forEach(card => {
    const v = card.querySelector('video');
    if (!v) return;
    v.muted = true;
    v.loop  = true;
    v.playsInline = true;
    card.addEventListener('mouseenter', () => v.play().catch(() => {}));
    card.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
  });
}

// ── Fade-up on scroll (for elements without GSAP) ─────────────
export function initFadeUp() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
}

// ── Chart.js growth line chart ────────────────────────────────
export function initGrowthChart(canvasId, labels, datasets, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;

  const triggered = { done: false };
  const observer  = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting || triggered.done) return;
    triggered.done = true;
    observer.disconnect();

    const accent  = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const accent2 = getComputedStyle(document.documentElement).getPropertyValue('--accent-2').trim();
    const muted   = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim();

    const colors  = [accent, accent2, '#e07ec8', '#7e9ec8'];
    const styledDatasets = datasets.map((ds, i) => ({
      ...ds,
      borderColor: colors[i % colors.length],
      backgroundColor: colors[i % colors.length] + '18',
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.4,
      fill: i === 0,
    }));

    new Chart(canvas, {
      type: 'line',
      data: { labels, datasets: styledDatasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1400, easing: 'easeInOutQuart' },
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            labels: { color: muted, font: { family: "'DM Mono'" }, boxWidth: 12 }
          },
          tooltip: {
            backgroundColor: '#1a1a1a',
            borderColor: '#333',
            borderWidth: 1,
            titleColor: '#f0ede8',
            bodyColor: muted,
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: muted, font: { family: "'DM Mono'", size: 11 } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: muted, font: { family: "'DM Mono'", size: 11 } }
          }
        },
        ...options
      }
    });
  }, { threshold: 0.3 });

  observer.observe(canvas);
}

// ── Initialize all shared behaviours ─────────────────────────
export function initCore() {
  initProgressBar();
  initCounters();
  initVideoAutoplay();
  initVideoHover();
  initFadeUp();
}
