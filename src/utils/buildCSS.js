export const buildCSS = s => `
body {
  font-family: ${s.bodyFontFamily};
  color: ${s.bodyColor};
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
`;
