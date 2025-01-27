import * as fs from 'fs';
import * as path from 'path';
import {getDisplayName} from "./util.mjs";


const dirPattern = /^(\d*)_(.*)$/

/**
 * 获取导航栏配置
 * @param dirPath 
 * @returns 
 */
export function getNavBar(dirPath) {
    const navBar = [];

    const dirs = fs.readdirSync(dirPath, { withFileTypes: true }).filter(file => file.isDirectory() && file.name !== "images");

    for (const dir of dirs) {
        const displayName = getDisplayName(dir.name, dirPattern);
        const link = path.join(dirPath, dir.name).replace(/\\/g, '/');
        navBar.push({ text: displayName, link: `/${link}/` });
    }


    return navBar;
}

