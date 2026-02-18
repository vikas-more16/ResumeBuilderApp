export const fusionResumeHTML = (
  resume = {},
  css = '',
  qr = '',
  verificationCode = '',
  barcodeBase64 = '',
  config = '',
) => {
  const personal = resume.personalInfo || {};

  const fullName = `${personal.firstName || ''} ${personal.lastName || ''
    }`.trim();

  const location = [personal.city, personal.country].filter(Boolean).join(', ');

  const phoneStyled = personal.phone
    ? personal.phone
      .split('')
      .map((char, index) => {
        const size = 8 + index * 3.5;
        return `<span style="font-size:${size}px">${char}</span>`;
      })
      .join('')
    : '';

  function generateWatermarkGrid(config) {
    const {
      defaultText,
      fontSize,
      rows,
      columns,
      rowOverrides = [],
      colOverrides = []
    } = config;

    const rowMap = {};
    rowOverrides.forEach(r => rowMap[r.index] = r.text);

    const colMap = {};
    colOverrides.forEach(c => colMap[c.index] = c.text);

    let html = "";

    for (let i = 1; i <= rows; i++) {
      html += `<div class="wm-row">`;

      for (let j = 1; j <= columns; j++) {

        let cellText = defaultText;

        if (rowMap[i]) {
          cellText = rowMap[i];
        }

        if (colMap[j]) {
          cellText = colMap[j];
        }

        html += `<span>${cellText}</span>`;
      }

      html += `</div>`;
    }

    return html;
  }

  const watermarkHTML = generateWatermarkGrid(config);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap" rel="stylesheet">
<title>${resume.title || 'Resume'}</title>

<style>
${css}
</style>
</head>

<body>
<div class="corner-phone">
  ${phoneStyled}
</div>

 <!-- ===== WATERMARK BACKGROUND TEXT (BOTTOM LAYER) ===== -->
<div class="watermark-text-layer">
    ${watermarkHTML}
</div>

<!-- ===== WATERMARK LOGO (MIDDLE LAYER) ===== -->
<div class="watermark-logo-layer">
  <div class="watermark-logo-shield">
    <div class="watermark-photo-wrapper">
      <img src="${personal.photo}" class="watermark-logo" />
      <div class="watermark-overlay-text">
        TRUSCHOLAR VERIFIED
      </div>
    </div>
  </div>
</div>



 <div class="content-layer">
  <div class="header">
    ${personal.photo ? `<img src="${personal.photo}" class="photo" />` : ''}

    <div>
      <div class="name-container">
  <div class="microtext">
    ${personal.email} • ${personal.email} • ${personal.email} • ${personal.email}
  </div>
  <h1>${fullName}</h1>
</div>

      <div class="sub">
        ${personal.jobTitle || ''}
        ${personal.jobTitle ? ' | ' : ''}
        ${personal.email || ''}
        ${personal.email ? ' | ' : ''}
        ${personal.phone || ''}
        ${personal.phone ? ' | ' : ''}
        ${location}
      </div>
    </div>
  </div>

  ${resume.socialLinks?.length
      ? `<div class="section">Links</div>
         <ul>
           ${resume.socialLinks
        .map(
          link => `
             <li class="sub">${link.network || ''} : ${link.link || ''}</li>
           `,
        )
        .join('')}
         </ul>`
      : ''
    }

  ${personal.summary
      ? `<div class="section">Summary</div>
         <p class="muted">${personal.summary}</p>`
      : ''
    }

  ${resume.education?.length
      ? `<div class="section">Education</div>
         ${resume.education
        .map(
          edu => `
           <div class="item">
             <strong>${edu.program || ''}</strong>
             ${edu.specialization ? ` - ${edu.specialization}` : ''}
             <div class="muted">
               ${edu.institute || ''}
               ${edu.city ? ', ' + edu.city : ''}
               ${edu.country ? ', ' + edu.country : ''}
             </div>
             <div class="muted">
               ${edu.startDate ? new Date(edu.startDate).getFullYear() : ''}
               ${edu.endDate ? ' - ' + new Date(edu.endDate).getFullYear() : ''}
               ${edu.score ? ` | ${edu.scoreType || ''}: ${edu.score}` : ''}
             </div>
           </div>
         `,
        )
        .join('')}`
      : ''
    }

  ${resume.experience?.length
      ? `<div class="section">Experience</div>
         ${resume.experience
        .map(
          exp => `
           <div class="item">
             <strong>${exp.jobTitle || ''}</strong>
             ${exp.company ? ` - ${exp.company}` : ''}
             <div class="muted">
               ${exp.employmentType || ''}
               ${exp.city ? ', ' + exp.city : ''}
               ${exp.country ? ', ' + exp.country : ''}
             </div>
             <div class="muted">
               ${exp.startDate ? new Date(exp.startDate).getFullYear() : ''}
               ${exp.endDate ? ' - ' + new Date(exp.endDate).getFullYear() : ''}
             </div>
             ${exp.description ? `<p>${exp.description}</p>` : ''}
           </div>
         `,
        )
        .join('')}`
      : ''
    }

  ${resume.skills?.length
      ? `<div class="section">Skills</div>
         ${resume.skills
        .map(
          skill => `
           <div class="item">
             <strong>${skill.category || ''}</strong>
             <div class="muted">
               ${(skill.skills || []).join(', ')}
             </div>
           </div>
         `,
        )
        .join('')}`
      : ''
    }
<!-- VERIFICATION FOOTER -->
<div class="verification">
  Verified Resume ID: ${verificationCode}
  <br/>
  This resume is digitally generated and tamper-evident.
</div>

<!-- QR SECTION -->
<div class="qr-container">
  <img src="${qr}" class="qr" />
</div>

<!-- BARCODE SECTION -->
<div class="barcode-container">
  <img src="${barcodeBase64}" class="barcode-img" />
</div>


</body>
</html>
`;
};
