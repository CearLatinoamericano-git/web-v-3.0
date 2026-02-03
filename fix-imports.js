const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Función para convertir nombre de variable a nombre de archivo
function varToFileName(varName) {
  return varName
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
    .replace(/\s+/g, '-');
}

// Buscar todos los archivos con importaciones figma:asset
const files = execSync('find . -type f \\( -name "*.tsx" -o -name "*.ts" \\)', { encoding: 'utf-8' })
  .split('\n')
  .filter(f => f && !f.includes('node_modules') && !f.includes('dist'));

files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf-8');
    const originalContent = content;
    
    // Patrón para encontrar importaciones: import varName from "figma:asset/..."
    const importPattern = /import\s+(\w+)\s+from\s+["']figma:asset\/[^"']+["']/g;
    
    let match;
    while ((match = importPattern.exec(content)) !== null) {
      const varName = match[1];
      const fileName = varToFileName(varName);
      const newImport = `import ${varName} from '/images/${fileName}.png'`;
      content = content.replace(match[0], newImport);
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`Fixed: ${file}`);
    }
  } catch (err) {
    // Ignorar errores
  }
});

console.log('Done!');

