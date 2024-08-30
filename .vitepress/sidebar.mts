import fs from 'fs';
import path from 'path';

interface Item {
  text: string;
  link: string;
}

interface DirectoryStructure {
  text: string;
  items: Item[];
}

export function getDirectoryStructure(dir: string): DirectoryStructure[] {
  const result: DirectoryStructure[] = [];
  const subdirs = fs.readdirSync(dir, { withFileTypes: true });

  subdirs.forEach((subdir) => {
    if (subdir.isDirectory()) {
      const subdirPath = path.join(dir, subdir.name);
      const items: Item[] = [];

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

      result.push({
        text: subdir.name,
        items: items,
      });
    }
  });

  return result;
}


  