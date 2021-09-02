# draggable-upload

## 描述
基于vue3.0的可拖拽排序的图片上传组件

## 安装
```
yarn add draggable_upload
//or
npm i draggable_upload
```
## 使用
```
 <draggableUpload
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
export default {
  //...
  data() {
    return {
      fileList: [
        {
          status: "success",
          url: mockUrl,
        },
      ],
    };
  },
  methods: {
    handleFileChange(file, fileList) {
      console.log("file fileList is", file, fileList);
      let index = fileList.length;
      fileList.push({
        url: "",
        status: "loading",
      });
      setTimeout(() => {
        fileList[index].url = mockUrl;
        fileList[index].status = "success";
      }, 1000);
    },
    handleRemoveImg(index, item, fileList) {
      fileList.splice(index, 1);
    },
    handleImgPreview(item) {
      console.log("preview", item.url);
    },
  },
};
```
