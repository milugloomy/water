<template>
  <div class="image_scroll">
    <template v-for="pic in imgList">
      <div class="image_small">
        <img
          :class="pic === currentPic ? 'image_main_select' : ''"
          :src="pic.base64"
          class="image_main"
          v-on:click="selectPic(pic)"
        />
        <CircleCloseFilled v-on:click="deletePic(pic)" class="icon cancel_icon" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import waterStore, { PicType } from './waterStore';

const { currentPic } = storeToRefs(waterStore);
const { imgList } = waterStore; // 引用类型不需要storeToRefs

function selectPic(selectPic: PicType) {
  currentPic.value = selectPic;
}

function deletePic(selectPic: PicType) {
  const index = imgList.indexOf(selectPic);
  imgList.splice(index, 1);
  if (selectPic === currentPic.value) {
    if (imgList[index]) {
      currentPic.value = imgList[index];
    } else {
      currentPic.value = imgList[index - 1];
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index";

.image_scroll {
  height: calc(20% - 20px);
  display: flex;
  align-items: center;
  overflow-x: auto;
  .image_small {
    position: relative;
    height: calc(100% - 20px);
    margin-right: 10px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .image_main_select {
      border: 2px solid #077bff;
    }
    .cancel_icon {
      top: -5px;
      right: -7px;
      position: absolute;
      cursor: pointer;
      color: #777;
    }
  }
}
</style>
