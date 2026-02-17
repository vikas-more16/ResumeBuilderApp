export const buildCSS = s => `
body {
  font-family: ${s.bodyFontFamily};
  color: ${s.bodyColor};
  position: relative;
}

/* ===== Layering Structure ===== */

body {
  font-family: ${s.bodyFontFamily};
  color: ${s.bodyColor};
  position: relative;
  z-index: 0;
}
  /* ===== Top Left Increasing Phone Number ===== */
.corner-phone {
  position: fixed;
  top: 10px;
  left: 800px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.15);
  z-index: 3;
  letter-spacing: 2px;
  pointer-events: none;
}


/* ===== Bottom Layer: Repeating Text ===== */
.watermark-text-layer {
  position: fixed;
  left:3%;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.watermark-text {
  position: absolute;
  margin-top:10px;
  font-size: 40px;
  color: rgba(0, 0, 0,0.05);
  line-height: 100px;
}

/* ===== Middle Layer: Center Logo ===== */
.watermark-logo-layer {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
}

/* White shield to block text behind */
.watermark-logo-shield {
  width: 340px;
  height: 340px;
  background-color: white;
  border-radius: 50%;   /* makes circular clean zone */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
}

/* Actual logo */
.watermark-logo {
  width: 280px;
  height: 280px;
  opacity: 0.1;
  object-fit: contain;
}


/* ===== Top Layer: Main Content ===== */
.content-layer {
  position: relative;
  z-index: 2;
}


/* Make content above watermark */
.header, .section, .item, .verification {
  position: relative;
  z-index: 1;
}
  /* ===== Name Container ===== */
.name-container {
  position: relative;
  display: inline-block;
}

/* ===== Microtext Layer ===== */
.microtext {
  position: absolute;
  top: -6px;
  left: 0;
  font-size: 6px;
  letter-spacing: 1px;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.4);
  pointer-events: none;
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

/* ===== Bottom Center Verification Footer ===== */
.verification {
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  text-align: center;
  color: #777;
  border-top: 1px solid #ddd;
  padding-top: 6px;
  width: 60%;
}

/* ===== Bottom Right QR ===== */
.qr-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 3;
}

.qr {
  width: 100px;
  height: 100px;
}

/* ===== Bottom Left Barcode ===== */
.barcode-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 3;
}

.barcode-img {
  width: 250px;
  height: 50px;
}


`;

