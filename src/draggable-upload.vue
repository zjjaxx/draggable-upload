<template>
  <div class="draggable-upload-wrapper">
    <draggable
      :list="fileList"
      tag="transition-group"
      item-key="url"
      :animation="200"
    >
      <template #item="{ element: item, index }">
        <div class="img-wrapper">
          <template v-if="item.status == 'loading'">
            <slot name="progress" :item="item">
              <span class="loading-text">loading</span>
            </slot>
          </template>
          <img class="img" v-else :src="item.url" alt="" />
          <slot name="successIcon" :item="item" v-if="item.status == 'success'">
            <div class="success-icon-wrapper">
              <i class="iconfont icon-success success-icon"></i>
            </div>
          </slot>
          <slot name="errorIcon" :item="item" v-if="item.status == 'error'">
            <i class="iconfont icon-error error-icon"></i>
          </slot>
          <div class="option-wrapper">
            <slot name="previewIcon" :item="item">
              <i
                class="iconfont icon-yulan icon preview-icon"
                @click="$emit('imgPreview', item)"
              ></i>
            </slot>
            <slot
              name="deleteIcon"
              :item="item"
              :fileList="fileList"
              :index="index"
            >
              <i
                class="icon-shanchu iconfont icon"
                @click="handleRemove(index, item)"
              ></i>
            </slot>
          </div>
        </div>
      </template>
    </draggable>

    <div
      class="upload-wrapper"
      :class="{ 'upload-wrapper-drag-active': isDragEnter }"
      v-if="fileList.length < limit"
    >
      <input
        ref="inputRef"
        class="input"
        type="file"
        v-bind="$attrs"
        @change="handleChange"
      />
      <slot v-if="!draggable"></slot>
      <!-- dragover.prevent阻止默认事件否则不会触发drop -->
      <div
        class="draggalbe-container"
        :class="{ 'drag-enter-active': isDragEnter }"
        v-else
        @click="handleClick"
        @dragenter.prevent
        @drop.prevent="handleDrop"
        @dragover.prevent="handleDragover"
        @dragleave.prevent="handleDragleave"
      >
        <slot name="dragIcon">
          <i class="iconfont icon-Cloudupload upload-icon"></i>
          <span class="drap-tip"
            >将文件拖到此处,或<span class="color-blue">点击上传</span></span
          >
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
import "./font/iconfont.css";
import draggable from "vuedraggable";
export default {
  inheritAttrs: false,
  components: {
    draggable,
  },
  props: {
    draggable: {
      type: Boolean,
      default: false,
    },
    fileList: {
      type: Array,
      required: true,
    },
    limit: {
      type: Number,
      default: 1000,
    },
  },
  setup(props, { emit, attrs }) {
    const isDragEnter = ref(false);
    const inputRef = ref(null);
    const handleDragover = () => {
      isDragEnter.value = true;
    };
    const handleDrop = (event) => {
      let files = Array.from(event.dataTransfer.files);
      const accept = attrs.accept;
      console.log("accept", accept);
      if (accept) {
        files = files.filter((file) => {
          let { type, name } = file;
          const extension =
            name.indexOf(".") > -1 ? `.${name.split(".").pop()}` : "";
          const baseType = type.replace(/\/.*$/, "");
          const flag = accept
            .split(",")
            .map((type) => type.trim())
            .filter((type) => type)
            .some((acceptedType) => {
              if (acceptedType.startsWith(".")) {
                return extension === acceptedType;
              }
              //  /*的判断
              if (/\/\*$/.test(acceptedType)) {
                return baseType === acceptedType.replace(/\/\*$/, "");
              }
              if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
                //jpg jpeg是同一种类型 做下兼容
                acceptedType = acceptedType.replace("jpg", "jpeg");
                type = type.replace("jpg", "jpeg");
                return type === acceptedType;
              }
              return false;
            });
          if (!flag) {
            console.warn(`不支持${extension}类型的文件`);
          }
          return flag;
        });
      }

      isDragEnter.value = false;
      handleChange({ target: { files } });
    };
    const handleDragleave = () => {
      isDragEnter.value = false;
    };
    const handleClick = () => {
      inputRef.value.click();
    };
    const { fileList, limit } = toRefs(props);
    const handleChange = ({ target: { files } }) => {
      const fileListLength = fileList.value.length;
      files.forEach((file, index) => {
        if (index < limit.value - fileListLength) {
          emit("fileChange", file, fileList.value);
        }
      });
    };
    const handleRemove = (index, item) => {
      emit("removeImg", index, item, fileList.value);
    };
    return {
      handleChange,
      fileList,
      handleRemove,
      handleDragover,
      handleDragleave,
      handleDrop,
      isDragEnter,
      inputRef,
      handleClick,
    };
  },
};
</script>

<style lang="less" scoped>
.draggable-upload-wrapper {
  display: flex;
  .upload-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    .draggalbe-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 100;
      .upload-icon {
        font-size: 47px;
        color: #999;
      }
      .drap-tip {
        margin-top: 10px;
        font-size: 14px;
        width: 90px;
        color: #999;
      }
      .color-blue {
        color: blueviolet;
      }
    }
    .drag-enter-active {
      background: blueviolet;
      opacity: 0.1;
    }
    .input {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 10;
    }
  }
  .upload-wrapper-drag-active {
    border: 2px dashed blueviolet;
  }
  .img-wrapper {
    position: relative;
    margin-right: 10px;
    width: 148px;
    height: 148px;
    cursor: pointer;
    border-radius: 6px;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    overflow: hidden;
    &:hover {
      .option-wrapper {
        opacity: 1;
      }
    }
    .img {
      height: 100%;
      width: 100%;
      border-radius: 6px;
    }
    img[src=""] {
      display: none;
    }
    .loading-text {
      position: absolute;
      left: 50%;
      top: 50%;
      font-size: 16px;
      color: #999;
      transform: translate(-50%, -50%);
    }
    .option-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      z-index: 10;
      .icon {
        font-size: 21px;
        color: #fff;
        cursor: pointer;
      }
      .preview-icon {
        margin-right: 15px;
      }
    }
    .success-icon-wrapper {
      position: absolute;
      right: -15px;
      top: -6px;
      width: 40px;
      height: 24px;
      background: #13ce66;
      text-align: center;
      transform: rotate(45deg);
      box-shadow: 0 0 1pc 1px rgb(0 0 0 / 20%);
      z-index: 1;
      .success-icon {
        display: inline-block;
        color: #fff;
        font-size: 12px;
        margin-top: 11px;
        transform: rotate(-45deg);
      }
    }
    .error-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 52px;
      color: #999;
    }
  }
}
</style>
