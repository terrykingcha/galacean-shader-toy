// @ts-ignore
import Lines from './Lines.gs?raw'; // 导入 shaderlab 文件，注意必须加上?raw的 Query

const shaderLoader: Record<string, string> = {
  Lines, // 导出 shaderlab 文件
};


export default shaderLoader;