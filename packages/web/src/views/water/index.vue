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
      <Output />
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
import Output from './Output.vue';
import { storeToRefs } from 'pinia';
import waterStore, { PicType } from './waterStore';
import global from '../../common/global';
import { addWater } from '../../common/util';

const { currentPic, outputPath } = storeToRefs(waterStore);
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
  if (files[0].path && !outputPath.value) {
    const path = files[0].path;
    outputPath.value = path.substring(0, path.lastIndexOf('/'));
  }
  upload(files);
}

function upload(files: File[]) {
  const loading = ElLoading.service();
  const promises: Promise<PicType>[] = [];
  for (let i = 0; i < files.length; i++) {
    promises.push(new Promise<PicType>(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = function () {
        resolve({
          base64: reader.result as string,
          name: files[i].name
        });
      };
    }));
  }
  return Promise.all(promises).then(res => {
    // 去重
    for (let i = 0; i < res.length; i++) {
      if (!imgList.find(item => item.base64 === res[i].base64)) {
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
