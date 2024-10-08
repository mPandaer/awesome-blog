import * as fs from 'fs';
import * as path from 'path';

/**
 * 遍历给定目录及其子目录
 * @param dir - 要遍历的目录路径
 */

export const navBar = [];

/**
 * 读取目录内容并返回 Promise
 * @param dir - 要读取的目录路径
 * @returns {Promise}
 */
function readDirectory(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, { withFileTypes: true }, (err, files) => {
            if (err) {
                reject(`无法读取目录 ${dir}: ${err}`);
            } else {
                resolve(files);
            }
        });
    });
}

/**
 * 遍历目录并填充 navBar 数组
 * @param dir - 要遍历的目录路径
 * @returns {Promise}
 */
async function traverseDirectory(dir) {
    try {
        const files = await readDirectory(dir);
        
        let subDirs = files.filter(file => file.isDirectory() && !file.name.includes("images"));
        if (subDirs.length === 0) {
            let subFiles = files.filter(file => !file.isDirectory());
            let firstFile = subFiles.filter(file => file.name.includes("00"))[0] || subFiles[0];
            let firstFilePath = path.join(dir, firstFile.name);
            navBar.push({ text: `${path.basename(dir)}`, link: `/${firstFilePath.replace(path.sep,"/")}`,activeMatch: `/${dir.replace(path.sep,"/")}/*` });
        } else {
            // 存在子目录，继续遍历
            for (const file of subDirs) {
                const filePath = path.join(dir, file.name);
                await traverseDirectory(filePath);
            }
        }
    } catch (error) {
        console.error(error);
    }
}




// 示例调用
(async () => {
    const directoryPath = './blog'; // 替换为你的目录路径
    await traverseDirectory(directoryPath);
    // await injectNoSubDir2NavBar(directoryPath);
    // console.log(navBar);
})();

