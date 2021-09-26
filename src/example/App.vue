<template>
  <div class="wrapper">
    <div class="item">
      <h2>基本使用</h2>
      <draggableUpload
        :fileList="fileList"
        @fileChange="handleFileChange"
        @removeImg="handleRemoveImg"
        @imgPreview="handleImgPreview"
      >
        <i class="iconfont add-icon icon-jiahao"></i>
      </draggableUpload>
    </div>
    <div class="item">
      <h2>批量上传</h2>
      <draggableUpload
        multiple="multiple"
        :fileList="fileList1"
        @fileChange="handleFileChange1"
        @removeImg="handleRemoveImg1"
        @imgPreview="handleImgPreview1"
      >
        <i class="iconfont add-icon icon-jiahao"></i>
      </draggableUpload>
    </div>
    <div class="item">
      <h2>上传图片数量限制</h2>
      <draggableUpload
        :limit="4"
        multiple="multiple"
        :fileList="fileList2"
        @fileChange="handleFileChange2"
        @removeImg="handleRemoveImg2"
        @imgPreview="handleImgPreview2"
      >
        <i class="iconfont add-icon icon-jiahao"></i>
      </draggableUpload>
    </div>
    <div class="item">
      <h2>上传文件类型校验</h2>
      <draggableUpload
        :limit="4"
        accept="image/jpg,.png"
        :fileList="fileList3"
        @fileChange="handleFileChange3"
        @removeImg="handleRemoveImg3"
        @imgPreview="handleImgPreview3"
      >
        <i class="iconfont add-icon icon-jiahao"></i>
      </draggableUpload>
    </div>
    <div class="item">
      <h2>拖拽上传</h2>
      <draggableUpload
        :limit="4"
        draggable
        accept="image/jpg,.png"
        :fileList="fileList4"
        @fileChange="handleFileChange4"
        @removeImg="handleRemoveImg4"
        @imgPreview="handleImgPreview4"
      >
      </draggableUpload>
    </div>
  </div>
</template>

<script lang="ts">
import draggableUpload from "../index";
import { reactive, defineComponent } from "vue";
import useUpload from "./useUpload";
export default defineComponent({
  name: "App",
  components: {
    draggableUpload,
  },
  setup() {
    const { fileList, handleFileChange, handleRemoveImg, handleImgPreview } =
      useUpload();
    const {
      fileList: fileList1,
      handleFileChange: handleFileChange1,
      handleRemoveImg: handleRemoveImg1,
      handleImgPreview: handleImgPreview1,
    } = useUpload();
    const {
      fileList: fileList2,
      handleFileChange: handleFileChange2,
      handleRemoveImg: handleRemoveImg2,
      handleImgPreview: handleImgPreview2,
    } = useUpload();
    const {
      fileList: fileList3,
      handleFileChange: handleFileChange3,
      handleRemoveImg: handleRemoveImg3,
      handleImgPreview: handleImgPreview3,
    } = useUpload();
    const {
      fileList: fileList4,
      handleFileChange: handleFileChange4,
      handleRemoveImg: handleRemoveImg4,
      handleImgPreview: handleImgPreview4,
    } = useUpload();
    return {
      fileList,
      handleFileChange,
      handleRemoveImg,
      handleImgPreview,
      fileList1,
      handleFileChange1,
      handleRemoveImg1,
      handleImgPreview1,
      fileList2,
      handleFileChange2,
      handleRemoveImg2,
      handleImgPreview2,
      fileList3,
      handleFileChange3,
      handleRemoveImg3,
      handleImgPreview3,
      fileList4,
      handleFileChange4,
      handleRemoveImg4,
      handleImgPreview4,
    };
  },
});
</script>

<style lang="less">
.wrapper {
  background: #fcfcfc;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-basis: 50%;
  }
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
