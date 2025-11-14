const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
const outDir = path.join(process.cwd(), '.next', 'server', 'app');

function injectScript(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    console.log(`Already injected: ${filePath}`);
    return;
  }
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', `  ${scriptTag}\n  </head>`);
  } else if (content.includes('<body')) {
    content = content.replace('<body', `${scriptTag}\n  <body`);
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Injected console capture script into: ${filePath}`);
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

console.log('Injecting console capture script into build files...');
walkDir(outDir);
console.log('Console capture script injection complete!');