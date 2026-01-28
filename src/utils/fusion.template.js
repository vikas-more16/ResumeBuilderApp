export const fusionResumeHTML = (resume = {}) => {
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
  body {
    font-family: Arial, Helvetica, sans-serif;
    padding: 24px;
    color: #222;
  }

  h1 {
    margin-bottom: 4px;
    font-size: 70px;
    color: black;

  }

  .sub {
    font-size: 30px;
    color: #555;
    margin-bottom: 12px;
  }

  .section {
    margin-top: 22px;
    font-weight: bold;
    font-size: 45px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 4px;
  }

  .item {
    margin-top: 10px;
    font-size:35px;
  }

  .muted {
    color: #666;
    font-size: 30px;
  }

  ul {
    margin: 6px 0 0 18px;
  }
    li{
    font-size:30px;
    }
</style>
</head>

<body>

  <h1>${fullName || ''}</h1>

  <div class="sub">
    ${personal.jobTitle || ''}
    ${personal.jobTitle ? ' | ' : ''}
    ${personal.email || ''}
    ${personal.email ? ' | ' : ''}
    ${personal.phone || ''}
    ${personal.phone ? ' | ' : ''}
    ${location}
  </div>

  ${
    personal.summary
      ? `<div class="section">Summary</div>
         <p>${personal.summary}</p>`
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

  ${
    resume.socialLinks?.length
      ? `<div class="section">Links</div>
         <ul>
           ${resume.socialLinks
             .map(
               link => `
             <li>
               ${link.network || ''} :
               ${link.link || ''}
             </li>
           `,
             )
             .join('')}
         </ul>`
      : ''
  }

</body>
</html>
`;
};
