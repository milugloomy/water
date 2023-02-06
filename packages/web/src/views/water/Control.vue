<template>
  <div class="control">
    <span v-on:click="clickUpload">
      <CirclePlus class="icon" />
      <a>添加图片</a>
    </span>
    <span v-on:click="deleteAll">
      <Delete class="icon" />
      <a>清空列表</a>
    </span>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import waterStore from './waterStore';

defineProps({
  clickUpload: Function
})

const { currentPic } = storeToRefs(waterStore);
const { imgList } = waterStore; // 引用类型不需要storeToRefs

function deleteAll() {
  imgList.splice(0, imgList.length);
  currentPic.value = undefined;
}
</script>

<style lang="less" scoped>
@import "./index";

.control {
  display: flex;
  height: 20px;
  font-size: 14px;
  span {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 4px;
    color: #555;
    &:hover {
      color: #077bff;
    }
    a {
      margin-left: 3px;
    }
  }
}
</style>
