import fs from 'fs';
import path from 'path'

const itemMd = [`---\noutline: [2,5]\n---\n# 全部文章 \n`];

export function getAllFiles(dir) {
    let files = fs.readdirSync(dir, { withFileTypes: true });
    files = files.filter(file => file.name !== "images")
    files.forEach(file => {
        if (file.isDirectory()) {
            let dirPath =  path.join(dir, file.name)
            itemMd.push(`## ${file.name}\n`);
            getAllFiles(dirPath);
        }else if (!file.name.includes("index")) {
            let fullPath = path.join(dir, file.name);
            fullPath = fullPath.replaceAll(path.sep,"/").replace(path.extname(file.name),"")
            let displayName = path.basename(file.name).replace(path.extname(file.name),"");
            let mdStr = `- [${displayName}](/${encodeURIComponent(fullPath)})\n`;
            itemMd.push(mdStr);
        }
    })
}



export function writeAllFileItems2BlogIndex() {
    getAllFiles('./blog')
    // 将数据写入index文件
    let indexDocMd = `${itemMd.join('')}`;
    fs.writeFileSync('blog/index.md', indexDocMd);
}