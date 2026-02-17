export const buildCSS = s => `
body {
  font-family: ${s.bodyFontFamily};
  color: ${s.bodyColor};
  position: relative;
}

/* WATERMARK */
.watermark {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-30deg);
  font-size: 80px;
  color: rgba(0, 0, 0, 0.05);
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
}

/* Make content above watermark */
.header, .section, .item, .verification {
  position: relative;
  z-index: 1;
}

h1 {
  font-size: ${s.h1Size}px;
  color: ${s.h1Color};
  margin-bottom: 4px;
}

.sub {
  font-size: ${s.subSize}px;
  color: ${s.subColor};
}

.section {
  font-size: ${s.sectionSize}px;
  font-weight: bold;
  margin-top: 22px;
}

.item {
  font-size: ${s.itemSize}px;
}

.muted {
  font-size: ${s.mutedSize}px;
  color: ${s.mutedColor};
}

.photo {
  width: ${s.photoSize}px;
  height: ${s.photoSize}px;
  border-radius: ${s.photoRadius}%;
  object-fit: cover;
}

/* VERIFICATION FOOTER */
.verification {
  margin-top: 40px;
  font-size: 11px;
  text-align: center;
  color: #777;
  border-top: 1px solid #ddd;
  padding-top: 8px;
},
.qr-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.qr {
  width: 100px;
  height: 100px;
}

`;

