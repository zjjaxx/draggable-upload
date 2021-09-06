<template>
  <div class="wrapper">
    <draggableUpload
      :limit="4"
      draggable
      multiple="multiple"
      accept="image/jpg,.png"
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
  </div>
</template>

<script>
import draggableUpload from "../draggable-upload.vue";
import { reactive } from "vue";
const mockUrl =
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcar0.autoimg.cn%2Fupload%2F2013%2F2%2F18%2Fu_20130218165304639264.jpg&refer=http%3A%2F%2Fcar0.autoimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633182777&t=c1a8a9db9b2e22afc51046858b781fce";
export default {
  name: "App",
  components: {
    draggableUpload,
  },
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
};
</script>

<style lang="less">
.wrapper {
  height: 500px;
  background: #fcfcfc;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-icon {
  font-size: 32px;
  color: #999;
}
.text {
  font-size: 16px;
  color: #fff;
}
.status {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.mr-20 {
  margin-right: 20px;
}
</style>
