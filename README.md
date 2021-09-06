# draggable_upload ![example workflow](https://github.com/zjjaxx/draggable-upload/actions/workflows/webpack.yml/badge.svg)

## 描述
基于vue3.0的可拖拽排序的图片上传组件

## 安装
```
yarn add draggable_upload
//or
npm i draggable_upload
```
## 属性
|  属性名  |  类型   |  默认值   | 必填 | 格式| 说明|
| --- | --- | --- | --- | --- |---|
|  fileList   |   array  |   -  | 必填 | `[{ url:"",status:"",//状态值为 loading | success | error//...其它自定义属性}] `| 上传数组|
|  limit   |   number  |  1000   | 否| 4| 图片上传数量限制 |
|   input原生属性 multiple 、accept 等 |   - | - |  否  | - |除了props其它自定义属性直接作用于input元素上 |
|   uploadClass  |   string  |  -   | 否 | - | 上传input 类名 |
|   imgClass  | string    |  -   | 否 | - | 图片类名 |


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
## 使用
```
 <draggableUpload
      :limit="4"
      draggable
      multiple="multiple"
      accept=".jpg,.jpeg,.png"
      :fileList="fileList"
      @fileChange="handleFileChange"
      @removeImg="handleRemoveImg"
      @imgPreview="handleImgPreview"
    >
      <i class="iconfont add-icon icon-jiahao"></i>
      <template v-slot:progress="{ item }">
        <span class="status">{{ item.status }}</span>
      </template>
      <template v-slot:previewIcon="{ item }">
        <span class="text mr-20" @click="handleImgPreview(item)">预览</span>
      </template>
      <template v-slot:deleteIcon="{ index, item, fileList }">
        <span class="text" @click="handleRemoveImg(index, item, fileList)"
          >删除</span
        >
      </template>
    </draggableUpload>
```
```
  setup() {
    const fileList = reactive([
      {
        status: "success",
        url: mockUrl,
      },
    ]);
    const handleFileChange = (file, fileList) => {
      console.log("file fileList is", file, fileList);
      let index = fileList.length;
      fileList.push({
        url: "",
        status: "loading",
      });
      setTimeout(() => {
        if (index % 2 == 0) {
          fileList[index].url = "";
          fileList[index].status = "error";
        } else {
          fileList[index].url = mockUrl + Math.random();
          fileList[index].status = "success";
        }
      }, 1000);
    };
    const handleRemoveImg = (index, item, fileList) => {
      fileList.splice(index, 1);
    };
    const handleImgPreview = (item) => {
      console.log("preview", item.url);
    };
    return {
      fileList,
      handleFileChange,
      handleRemoveImg,
      handleImgPreview,
    };
  },
```
