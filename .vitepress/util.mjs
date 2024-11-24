import path from "path";
import fs from "fs";

/**
 * 在忽略一些目录的情况下，是否只包含文件
 * @param dir 指定目录
 * @param ignoreDir 要忽略的目录
 * @returns {boolean} true 表示只包含文件，false表示不只包含文件，即存在目录
 */
export function isOnlyContainsFiles(dir, ...ignoreDir) {
    let readOptions = {
        withFileTypes: true,
    }
    let dirPath = path.join(dir.parentPath, dir.name);
    let dirs = fs.readdirSync(dirPath, readOptions).filter(file => file.isDirectory() && !ignoreDir.includes(file.name));
    return dirs.length === 0
}

export function getDisplayName(name, filePattern) {
    return name.match(filePattern)[2]
}

export function genLinkUrl(file, dir) {
    let fileName = file.name.replace(path.extname(file.name), "");
    return `/${path.basename(dir.parentPath)}/${dir.name}/${fileName}`;
}