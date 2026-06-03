#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const prdDir = process.argv[2] || 'docs/prd';
const epicFiles = fs.readdirSync(prdDir).filter(f => f.startsWith('epic-') && f.endsWith('.md'));

console.log('═'.repeat(60));
console.log('Epic YAML Extractor');
console.log('═'.repeat(60));

let epicCount = 0;
let storyCount = 0;
const repoTypes = new Set();

epicFiles.forEach(file => {
  const filePath = path.join(prdDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract yaml blocks
  const yamlMatch = content.match(/```yaml\n([\s\S]*?)```/);
  if (!yamlMatch) {
    console.log(`⚠️ No YAML found in ${file}`);
    return;
  }

  const yaml = yamlMatch[1];

  // Basic validation
  if (!yaml.includes('epic_id:')) {
    console.log(`⚠️ Invalid Epic in ${file} - no epic_id found`);
    return;
  }

  // Parse to count stories
  const storyMatches = yaml.match(/-\s+id:\s+"(\d+\.\d+)"/g) || [];
  const storyIdMatches = yaml.match(/title:\s+"([^"]+)"/g) || [];

  // Generate filename
  const epicIdMatch = yaml.match(/epic_id:\s*(\d+)/);
  const titleMatch = yaml.match(/title:\s*"([^"]+)"/);
  const epicNum = epicIdMatch ? epicIdMatch[1] : 'unknown';
  const title = titleMatch ? titleMatch[1]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50) : 'unknown';

  const outFile = path.join(prdDir, `epic-${epicNum}-${title}.yaml`);
  fs.writeFileSync(outFile, yaml);
  epicCount++;
  storyCount += storyMatches.length;

  // Extract repository types
  const repoMatches = yaml.match(/repository_type:\s*(\w+)/g) || [];
  repoMatches.forEach(m => {
    const type = m.replace('repository_type:', '').trim();
    repoTypes.add(type);
  });

  console.log(`✓ epic-${epicNum}-${title}.yaml`);
});

console.log('═'.repeat(60));
console.log('✅ Extracted');
console.log(`   Epic count: ${epicCount}`);
console.log(`   Story count: ${storyCount}`);
console.log(`   Repository types: ${Array.from(repoTypes).join(', ')}`);
console.log('═'.repeat(60));