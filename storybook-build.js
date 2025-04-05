
#!/usr/bin/env node

const { execSync } = require('child_process');

// This is a simple script to build Storybook without modifying package.json
console.log('Building Storybook...');
try {
  execSync('npx storybook build', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to build Storybook:', error);
  process.exit(1);
}
