const { execSync } = require('child_process');

execSync('mcra imp -cli create-rboil', { cwd: './intergration/fixtures' });
execSync('npx create-mcra test-project-zero', { cwd: './intergration/fixtures' });
