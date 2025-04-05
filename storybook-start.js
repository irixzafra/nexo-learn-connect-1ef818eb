
#!/usr/bin/env node

const { execSync } = require('child_process');

// This is a simple script to start Storybook without modifying package.json
console.log('Starting Storybook on port 6006...');
try {
  execSync('npx storybook dev -p 6006', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to start Storybook:', error);
  process.exit(1);
}
