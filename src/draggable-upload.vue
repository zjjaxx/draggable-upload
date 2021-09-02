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
            <slot name="progress" :item="item"></slot>
          </template>
          <img class="img" v-else :src="item.url" alt="" />
          <div class="option-wrapper">
            <i
              class="iconfont icon-yulan icon preview-icon"
              @click="$emit('imgPreview', item)"
            ></i>
            <i
              class="icon-shanchu iconfont icon"
              @click="handleRemove(index, item)"
            ></i>
          </div>
        </div>
      </template>
    </draggable>

    <div class="upload-wrapper" v-if="fileList.length < limit">
      <input class="input" type="file" v-bind="$attrs" @change="handleChange" />
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import "./font/iconfont.css";
import draggable from "vuedraggable";
export default {
  inheritAttrs: false,
  components: {
    draggable,
  },
  props: {
    fileList: {
      type: Array,
      required: true,
    },
    limit: {
      type: Number,
      default: 1000,
    },
  },
  setup(props, { emit }) {
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
    .input {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      cursor: pointer;
    }
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
      .icon {
        font-size: 21px;
        color: #fff;
        cursor: pointer;
      }
      .preview-icon {
        margin-right: 15px;
      }
    }
  }
}
</style>
