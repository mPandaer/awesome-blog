
import fs from 'fs';
import path from 'path'
export function getDirectoryStructure(dir) {
    const result = {};
    const subdirs = fs.readdirSync(dir, { withFileTypes: true });
  
    subdirs.forEach((subdir) => {
      if (subdir.isDirectory()) {
        const subdirPath = path.join(dir, subdir.name);
        const items = [];
  
        const files = fs.readdirSync(subdirPath, { withFileTypes: true });
        files.forEach((file) => {
          if (file.isFile()) {
            const fileNameWithoutExt = path.parse(file.name).name;
            if (fileNameWithoutExt !== 'index') {
              items.push({
                text: fileNameWithoutExt,
                link: `/${path.relative('', dir)}/${subdir.name}/${fileNameWithoutExt}`,
              });
            }
          }
        });
  
        let fullPath = path.join(dir, subdir.name);
        result[`/${fullPath.replace(path.sep,"/")}/`] = {
            text: subdir.name,
            items: items,
          }
        // result.push();
      }
    });
  
    return result;
}

// console.log(getDirectoryStructure('./blog'))

