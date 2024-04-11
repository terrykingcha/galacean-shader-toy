# Galacean Shader Toy

这是一个基于 [Galacean Engine](https://galacean.antgroup.com/) 的项目，目的是为了实现一个类似 ShaderToy 的网站。

在 1.2.0 版本中，Galacean 支持了 [ShaderLab](https://galacean.antgroup.com/engine/docs/latest/cn/graphics-shader-lab) 功能，为了能更好的分享有趣或有用的材质，所以做了这个项目。

## 如何运行

1. clone 本项目。
2. 运行 `npm install`。
3. 运行 `npm run dev`。
4. 打开浏览器，访问 `http://localhost:3000`。

## 如何贡献你的 ShaderLab

1. fork 本项目。
2. 在 `src/shaderlab` 目录下创建一个新的文件，文件名为 `your_name.gs`，内容为你的 ShaderLab 代码。
3. 在 `src/shaderlab/index.ts` 中，根据示例添加你的 ShaderLab 文件。
4. 运行 `npm run dev`，测试你的l ShadeLab。
5. 提交 PR。

## 本项目的里程碑

- [x] 完成 ShaderLab 展示功能。
- [x] 可选择材质球模式和平面模式。
- [ ] 完成 对应 ShadeLab 的 GUI面板。
- [ ] 可选择模型模式（支持GLTF上传）。
- [ ] 完成 在线编辑 ShaderLab 代码。
- [ ] 完成 ShaderLab 的分享功能。