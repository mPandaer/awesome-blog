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

export function getDisplayName(filename, pattern) {
    const match = filename.match(pattern);
    if (match && match[2]) {
        return match[2];  // 返回第二个捕获组，即去掉前缀和后缀的部分
    }
    return filename.replace(path.extname(filename), "");  // 如果匹配失败，返回原文件名
}

export function genLinkUrl(file, dir) {
    console.log("util",file.name)
    let fileName = file.name.replace(path.extname(file.name), "");
    return `/${path.basename(dir.parentPath)}/${dir.name}/${fileName}`;
}