export const fusionResumeHTML = (resume = {}, css = '') => {
  const personal = resume.personalInfo || {};

  const fullName = `${personal.firstName || ''} ${
    personal.lastName || ''
  }`.trim();

  const location = [personal.city, personal.country].filter(Boolean).join(', ');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${resume.title || 'Resume'}</title>

<style>
${css}
</style>
</head>

<body>

  <div class="header">
    ${personal.photo ? `<img src="${personal.photo}" class="photo" />` : ''}

    <div>
      <h1>${fullName}</h1>
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

  ${
    resume.socialLinks?.length
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

  ${
    personal.summary
      ? `<div class="section">Summary</div>
         <p class="muted">${personal.summary}</p>`
      : ''
  }

  ${
    resume.education?.length
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

  ${
    resume.experience?.length
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

  ${
    resume.skills?.length
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

</body>
</html>
`;
};
