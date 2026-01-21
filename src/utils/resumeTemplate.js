export const resumeHTML = resume => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
  body {
    font-family: Arial, sans-serif;
    padding: 24px;
  }
  h1 {
    margin-bottom: 4px;
  }
  .sub {
    font-size: 12px;
    color: #555;
  }
  .section {
    margin-top: 20px;
    font-weight: bold;
  }
</style>
</head>

<body>
  <h1>${resume.name}</h1>
  <div class="sub">
    ${resume.email} | ${resume.phone} | ${resume.location}
  </div>

  <div class="section">Summary</div>
  <p>${resume.summary}</p>
</body>
</html>
`;
