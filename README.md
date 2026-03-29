# Pitch Deck — Sitio Multi-Presentación

Sitio 100% estático, sin bundlers, sin npm. Listo para Vercel.

---

## Estructura

```
/
├── index.html                          ← Menú principal con cards por marca
├── vercel.json                         ← Rewrites para URLs limpias
├── shared/
│   ├── css/base.css                    ← Variables CSS, reset, layout, mockups, KPIs
│   └── js/core.js                      ← Contadores, autoplay de video, fade-up, chart init
├── brands/
│   └── cuerpo-que-descansa/
│       ├── index.html                  ← Presentación completa
│       ├── css/theme.css               ← Paleta e identidad visual de la marca
│       ├── js/main.js                  ← Animaciones GSAP ScrollTrigger
│       └── assets/                     ← Imágenes y videos locales
└── data/
    └── cuerpo-que-descansa.json        ← KPIs, textos, datos del gráfico
```

---

## Deploy en Vercel

```bash
# Opción A — CLI
npm i -g vercel
cd pitch-deck
vercel

# Opción B — GitHub
# 1. Sube la carpeta pitch-deck a un repo GitHub
# 2. Importa en vercel.com → New Project → selecciona el repo
# 3. Framework Preset: Other
# 4. Root Directory: . (o la carpeta donde está index.html)
# 5. Deploy
```

La URL limpia será automática gracias a `vercel.json`.
`/brands/cuerpo-que-descansa` → sirve `/brands/cuerpo-que-descansa/index.html`

---

## Agregar una nueva presentación

1. Duplica la carpeta `brands/cuerpo-que-descansa/`
2. Renómbrala `brands/nombre-nueva-marca/`
3. Edita `theme.css`: cambia solo las variables `:root` para la identidad visual
4. Edita `index.html`: reemplaza los textos y secciones
5. Edita `data/nombre-nueva-marca.json`: pon tus métricas y datos
6. Agrega una card en el `index.html` raíz apuntando a la nueva ruta

---

## Personalización rápida

### Cambiar la paleta de color
Solo edita las variables en `brands/tu-marca/css/theme.css`:

```css
:root {
  --accent:      #tu-color-principal;
  --accent-2:    #tu-color-secundario;
  --accent-glow: rgba(r,g,b, 0.12);
}
```

### Cambiar los datos del gráfico
Edita `data/cuerpo-que-descansa.json` → sección `chart`.

### Cambiar los KPIs animados
En el HTML, busca los elementos con `data-count`:
```html
<span data-count="94" data-suffix="%" data-duration="2.2">0%</span>
```
- `data-count`: valor final al que anima
- `data-suffix`: símbolo que se agrega al final
- `data-decimals`: cantidad de decimales (default 0)
- `data-duration`: segundos de animación

### Videos en mockup de celular
```html
<div class="phone">
  <div class="phone__screen">
    <video src="assets/tu-video.mp4" muted loop playsinline></video>
  </div>
</div>
```
El autoplay/pause por viewport es automático vía `IntersectionObserver` en `core.js`.

---

## CDNs usados (sin npm, sin build)

| Librería         | CDN |
|-----------------|-----|
| GSAP 3.12.5      | cdnjs.cloudflare.com |
| ScrollTrigger    | cdnjs.cloudflare.com |
| Chart.js 4.4.1   | cdnjs.cloudflare.com |
| Google Fonts     | fonts.googleapis.com |

---

## Checklist antes de lanzar

- [ ] Reemplaza `hola@tucorreo.com` en el botón de precio
- [ ] Reemplaza `56900000000` con tu número de WhatsApp real
- [ ] Agrega tu nombre en `data/cuerpo-que-descansa.json` → `author`
- [ ] Sube las imágenes/videos a `assets/` si los necesitas
- [ ] Verifica en mobile (responsive activo desde 900px y 600px)
