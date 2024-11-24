import fs from 'fs';
import path from 'path'
import {genLinkUrl, getDisplayName, isOnlyContainsFiles} from "./util.mjs";


const filePattern =  /^(\d*)_?(.*)\.md$/
const dirPattern = /^(\d*)_?(.*)$/



function createFileItem(dir) {
    let readOptions = {withFileTypes: true};
    let dirPath =  path.join(dir.parentPath, dir.name);
    let files = fs.readdirSync(dirPath, readOptions).filter(file => file.isFile());
    let items = files.map(file => {
        return {
            text: getDisplayName(file.name,filePattern),
            link: genLinkUrl(file,dir)
        }
    });

    return {
        text: getDisplayName(dir.name,dirPattern),
        items: items,
    }
}

// 假设 给定一个目录，根据该目录下的一级目录生成对应的对象
function genAllFilesConfig(rootDir) {
    // 获取到全部的一级目录
    let readOptions = {withFileTypes: true};
    let dirs = fs.readdirSync(rootDir,readOptions).filter((file) => file.isDirectory() && file.name !== "images");
    if (dirs.length === 0) {
        return [];
    }
    let res = [];
    // 遍历这些一级目录
    for (let dir of dirs) {
        // 如果这个一级目录只有文件 就直接生成对应的对象
        if (isOnlyContainsFiles(dir,"images")) {
            let item = createFileItem(dir);
            res.push(item);
            continue;
        }
        // 如果没有就递归
        let dirPath = path.join(dir.parentPath, dir.name);
        let items = genAllFilesConfig(dirPath);
        items.forEach(item => {
            item.items.forEach(item => {
                item.link = `/${path.basename(dir.parentPath)}${item.link}`;
            })
        })
        let item = createFileItem(dir)
        item.items.push(...items);
        res.push(item);
    }
    return res;

}




export function writeAllFileItems2BlogIndex() {
    let content = renderMarkdown(genAllFilesConfig("./blog"))
    content = "# 全部文章\n\n" + content
    fs.writeFileSync('blog/all.md', content);
}

function renderMarkdown(items, depth = 0) {
    let markdown = '';

    items.forEach(item => {
        const indent = '  '.repeat(depth);

        if (item.link) {
            // 渲染叶子节点
            markdown += `${indent}- [${item.text}](${item.link})\n`;
        } else if (item.items) {
            // 渲染非叶子节点
            markdown += `${indent}- ${item.text}\n`;
            markdown += renderMarkdown(item.items, depth + 1);
        }
    });

    return markdown;
}