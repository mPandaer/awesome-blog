import fs from 'fs';
import path from 'path'
import { getDisplayName } from "./util.mjs";



/**
 * 文件命名格式
 */
const filePattern = /^(\d*)_(.*)\.md$/
const dirPattern = /^(\d*)_(.*)$/


export function getSideBar(dirPath) {
    console.log(dirPath)
    const sideBar = {};

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    const dirs = entries.filter(entry => entry.isDirectory());

    for (const dir of dirs) {
        const key = `/${dirPath}/${dir.name}`;

        // 生成一个配置对象
        const subDirPath = path.join(dirPath, dir.name);
        sideBar[key] = getSideBarItem(subDirPath, "index.md");
    }

    // TODO 排序
    return sideBar;
}


function getSideBarItem(dirPath, ...ignorePatterns) {
    const items = [];
    let entries = fs.readdirSync(dirPath, { withFileTypes: true });

    // 过滤忽略的文件和目录
    entries = entries.filter(entry => {
        return !ignorePatterns.some(pattern => {
            if (typeof pattern === 'string') {
                return entry.name === pattern;
            }
            if (pattern instanceof RegExp) {
                return pattern.test(entry.name);
            }
            return false;
        });
    });

    for (const entry of entries) {
        if (entry.isFile()) {
            const displayName = getDisplayName(entry.name, filePattern);
            const link = path.join(dirPath, entry.name).replace(/\\/g, '/');
            items.push({ text: displayName, link: `/${link}` });
            continue;
        }

        // 递归
        const displayName = getDisplayName(entry.name, dirPattern);
        const innerItems = getSideBarItem(path.join(dirPath, entry.name), ...ignorePatterns);
        items.push({ text: displayName, collapsed: true, items: innerItems });
    }
    return items;
}
