# draggable_upload ![example workflow](https://github.com/zjjaxx/draggable-upload/actions/workflows/webpack.yml/badge.svg)

![pictrue](https://github.com/zjjaxx/draggable-upload/blob/master/src/example/assets/upload.gif)
## 描述

基于vue3.0的可拖拽排序、拖拽上传的上传组件

## 安装
通过 npm 或者 yarn 安装
```
yarn add draggable_upload
//or
npm i draggable_upload
```
浏览器直接引入

打包生成draggableUpload.umd.min.js
```
git clone https://github.com/zjjaxx/draggable-upload.git
cd draggable-upload
yarn 
yarn run build
```
```
    <script src="https://unpkg.com/vue@next"></script>
    <script src="path/draggableUpload.umd.min.js"></script>
```
## 属性
|  属性名  |  类型   |  默认值   | 必填 | 格式| 说明|
| --- | --- | --- | --- | --- |---|
|  fileList   |   array  |   -  | 必填 | `[{ url:"",status:"success",//...其它自定义属性}] `| 上传数组 ``` 状态值为 loading 、 success 、 error```|
|  limit   |   number  |  1000   | 否| 4| 图片上传数量限制 |
|   input原生属性 multiple 、accept 等 |   - | - |  否  | - |除了props其它自定义属性直接作用于input元素上 |
|   uploadClass  |   string  |  -   | 否 | - | 上传input 类名 |
|   imgClass  | string    |  -   | 否 | - | 图片类名 |
|   draggable  | boolean    |  false   | 否 | - | 拖拽上传 |

## 事件

|  事件名  | 参数| 说明|
| --- | --- | --- | 
|  fileChange   |   file,fileList  |   选取文件回调  |
|  removeImg   |   index,item,fileList  | 移除图片回调 |
|   imgPreview |   item |预览图片回调 |


## 插槽
|   命名插槽  |  命名   |  插槽prop   |
| --- | --- | --- |
|  默认插槽   |   default  |   -  |
|  预览插槽   |   previewIcon  |  item   |
|   删除插槽  |  deleteIcon   |   index, item, fileList  |
|   加载状态插槽  |   progress  |  item   |
|   成功状态插槽  | successIcon    |  item   |
|   失败状态插槽  |   errorIcon  |  item   |
|   拖拽样式插槽  |   dragIcon  |  -   |
## [example demo](https://github.com/zjjaxx/draggable-upload/blob/master/src/example/App.vue)

