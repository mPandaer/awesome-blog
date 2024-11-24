import * as fs from 'fs';
import * as path from 'path';
import {isOnlyContainsFiles} from "./util.mjs";


/**
 * 基于正则表达式 文件名规则排序 00hello 01haha
 * @param name1
 * @param name2
 * @param filePattern
 * @returns {number}
 */
function sortWithPattern(name1, name2,filePattern) {
    let match1 = name1.match(filePattern)
    let match2 = name2.match(filePattern)
    let num1 = parseInt(match1[1], 10)
    let num2 = parseInt(match2[1], 10)
    return num1 - num2;
}

/**
 * 获取目录下的逻辑第一文件并生成对应的LinkUrl
 * @param dir
 * @returns {string}
 */
function getFirstLinkInDir(dir) {
    let readOptions = {
        withFileTypes: true,
    }
    let dirPath = path.join(dir.parentPath,dir.name);
    let filePattern =  /^(\d*)(.*)\.md$/
    let fileNames = fs.readdirSync(dirPath,readOptions).filter(file => file.isFile() && filePattern.test(file.name)).map(file => file.name);
    fileNames = fileNames.sort((name1, name2) => {
        return sortWithPattern(name1,name2,filePattern);
    })
    // console.log("filenames",fileNames,"dir",dir.name)
    let firstName = fileNames[0];
    firstName = firstName.replace(path.extname(firstName), '');
    // TODO 这里先写死 ./blog
    return `/${path.basename(dir.parentPath)}/${dir.name}/${firstName}`;
}

/**
 * 生成matchUrl
 * @param dir
 * @returns {string}
 */
function genMatchUrlWithDir(dir) {
    return `/${path.basename(dir.parentPath)}/${dir.name}/`;
}



/**
 * 根据制定的目录生成对应的导航栏配置
 * @param rootDir 指定的目录
 */
export function genNavBarConfig(rootDir) {
    // 根据rootDir 返回这个目录下的文件对象
    let readOptions = {
        withFileTypes: true,
    }

    let dirs = fs.readdirSync(rootDir,readOptions).filter(file => file.isDirectory() && file.name !== "images");
    if (dirs.length === 0) {
        return [];
    }
    let dirPattern =  /^(\d*)(.*)$/
    dirs.sort((dir1,dir2) => sortWithPattern(dir1.name,dir2.name,dirPattern));
    let res = []

    for (let dir of dirs) {
        let displayName = dir.name.match(dirPattern)[2]
        if (isOnlyContainsFiles(dir,"images")) {
            // 生成一个对象
            let navItem = {text:displayName,link:getFirstLinkInDir(dir),activeMatch:genMatchUrlWithDir(dir)}
            res.push(navItem);
            continue;
        }

        // 拼装成一个合法的Path
        let dirPath = path.join(dir.parentPath, dir.name);
        let items = genNavBarConfig(dirPath)
        items.forEach(item => {
            item.link = `/${path.basename(dir.parentPath)}${item.link}`;
            item.activeMatch = `/${path.basename(dir.parentPath)}${item.activeMatch}`;
        })

        // 基于此生成一个对象
        let navItem = {text:displayName,items:items,activeMatch:genMatchUrlWithDir(dir)}
        res.push(navItem);
    }
    return res;
}
