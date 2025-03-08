const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');

const pageDirs = [
  path.join(__dirname, '../pages'),
  path.join(__dirname, '../src/components')
];

function extractTextFromJSX(content) {
  try {
    content = content.replace(/{\s*\/\*[\s\S]*?\*\/\s*}/g, '');
    
    const root = parse(content);
    return root.textContent.replace(/\s+/g, ' ').trim();
  } catch (e) {
    return '';
  }
}

async function scanDirectories() {
  const knowledgeBase = [];
  
  for (const dir of pageDirs) {
    await scanDir(dir, knowledgeBase);
  }
  
  fs.writeFileSync(
    path.join(__dirname, '../src/components/chatbot/knowledgeBase.json'),
    JSON.stringify(knowledgeBase, null, 2)
  );
  
  console.log(`Generated knowledge base with ${knowledgeBase.length} entries.`);
}

async function scanDir(dir, knowledgeBase) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        await scanDir(fullPath, knowledgeBase);
      }
    } else if (entry.isFile() && /\.(js|jsx|tsx)$/.test(entry.name)) {
      if (entry.name.startsWith('_') || entry.name === 'next.config.js') continue;
      
      const content = fs.readFileSync(fullPath, 'utf-8');
      const textContent = extractTextFromJSX(content);
      
      if (textContent.length > 50) {
        let route = fullPath.replace(/.*\/pages/, '').replace(/\.(js|jsx|tsx)$/, '');
        if (route.endsWith('/index')) route = route.replace(/\/index$/, '');
        if (!route) route = '/';
        
        knowledgeBase.push({
          route,
          content: textContent,
          questions: [
            `Tell me about ${path.basename(route)}`,
            `What is on the ${path.basename(route)} page`,
            `${path.basename(route)} information`
          ]
        });
      }
    }
  }
}

scanDirectories().catch(console.error);
