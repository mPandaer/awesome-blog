import fs from 'fs';
import path from 'path'
import {genLinkUrl, getDisplayName, isOnlyContainsFiles} from "./util.mjs";


const filePattern =  /^(\d*)(.*)\.md$/
const dirPattern = /^(\d*)(.*)$/


function createSideItem(dir) {
    let items = genItems(dir)
    return {
        text: getDisplayName(dir.name,dirPattern),
        items:items,
    }

}


function genItems(dir) {
    let dirPath = path.join(dir.parentPath, dir.name);
    let files = fs.readdirSync(dirPath, {withFileTypes: true}).filter(file => file.isFile());
    return files.map((file) => {
        let displayFileName = getDisplayName(file.name, filePattern);
        let linkUrl = genLinkUrl(file, dir);
        return {
            text: displayFileName,
            link: linkUrl,
        }
    });
}

function appendSideItem(dir, extItems) {
    let items = genItems(dir);
    Object.keys(extItems).forEach((key) => {
        extItems[key].forEach((innerItem) => {
            innerItem.items.forEach((item) => {
                item.link = `/${path.basename(dir.parentPath)}${item.link}`;
            })
            items.push(innerItem)
        })
    })
    return {text: getDisplayName(dir.name,dirPattern),items:items}
}


function genShowPattern(dir) {
    return `/${path.basename(dir.parentPath)}/${dir.name}`;
}

export function genSideBarConfig(rootDir) {
    // 读取一级目录
    let readOptions = {withFileTypes: true,recursive:false};
    let dirs = fs.readdirSync(rootDir,readOptions).filter((file) => file.isDirectory() && file.name !== "images");
    if (dirs.length === 0) {
        return {};
    }
    let sideBar =  {};
    for (let dir of dirs) {
        if (isOnlyContainsFiles(dir,"images")) {
            let sideItem = createSideItem(dir);
            sideBar[genShowPattern(dir)] = [sideItem]
            continue;
        }
        // 如果不是只包含文件，就递归
        let dirPath = path.join(dir.parentPath, dir.name);
        let innerSideBar = genSideBarConfig(dirPath)
        let sideItem = appendSideItem(dir,innerSideBar)
        sideBar[genShowPattern(dir)] = [sideItem,]
    }

    return sideBar;
}


// console.log(genSideBarConfig("./blog"));

