<template>
  <div class="page">
    <div class="top">
      <div class="top_left">
        <ImageBlock :clickUpload="uploadPre" :upload="upload" />
        <Control :clickUpload="uploadPre" />
        <ImageScroll />
      </div>
      <Add />
    </div>
    <div class="bottom">
<!--      <Output />-->
    </div>
  </div>
  <input
    ref="uploadInput"
    v-on:change="uploadEvent"
    type="file"
    multiple="multiple"
    accept="image/*"
    style="display: none"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElLoading } from 'element-plus';
import ImageBlock from './ImageBlock.vue';
import ImageScroll from './ImageScroll.vue';
import Control from './Control.vue';
import Add from './Add.vue';
// import Output from './Output.vue';
import { storeToRefs } from 'pinia';
import waterStore from './waterStore';
import global from '../../common/global';
import { addWater } from '../../common/util';

const { currentPic } = storeToRefs(waterStore);
const { imgList } = waterStore; // 引用类型不需要storeToRefs
const uploadInput = ref();

function uploadPre() {
  if (uploadInput.value.value) {
    uploadInput.value.value = '';
  }
  uploadInput.value.click();
}

function uploadEvent(event: Event) {
  const files = (event.target as any).files;
  upload(files);
}

function upload(files: File[]) {
  const loading = ElLoading.service();
  const promises: Promise<string>[] = [];
  for (let i = 0; i < files.length; i++) {
    promises.push(new Promise<string>(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = function (e) {
        resolve(reader.result as string);
      };
    }));
  }
  return Promise.all(promises).then(res => {
    // 去重
    for (let i = 0; i < res.length; i++) {
      if (imgList.indexOf(res[i]) === -1) {
        imgList.push(res[i]);
      }
    }
    if (!currentPic.value) {
      currentPic.value = imgList[0];
    }
    // 如果没水印 添加一个
    const canvas = global.canvas!;
    const objects = canvas.getObjects();
    if (objects.length === 0) {
      addWater();
    }
  }).finally(() => {
    loading.close();
  });
}
</script>

<style lang="less" scoped>
.icon {
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
}
.page {
  width: 1200px;
  height: 750px;
  border: 1px solid #ddd;
  .top {
    height: calc(100% - 50px);
    display: flex;
    .top_left {
      width: 75%;
    }
  }
  .bottom {
    height: 50px;
    border-top: 1px solid #ddd;
  }
}
</style>
