<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <draggableUpload
    :fileList="fileList"
    @fileChange="handleFileChange"
    @removeImg="handleRemoveImg"
    @imgPreview="handleImgPreview"
  ></draggableUpload>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import draggableUpload from "../draggable-upload.vue";
export default {
  name: "App",
  components: {
    HelloWorld,
    draggableUpload,
  },
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleFileChange(file, fileList) {
      console.log("file fileList is", file, fileList);
    },
    handleRemoveImg(index, item, fileList) {},
    handleImgPreview(item) {},
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
