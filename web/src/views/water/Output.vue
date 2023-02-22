<template>
  <div class="block">
    <span>输出目录</span>
    <el-input v-model="outputPath" readonly />
    <el-button type="primary" @click="open">选择目录</el-button>
    <el-button :loading="loading" type="primary" @click="save">导出</el-button>
  </div>

  <el-dialog v-model="loading" title="图片生成中。。。" :show-close="false" :close-on-click-modal="false">
    <div style="display: flex; justify-content: center;">
      <el-progress type="circle" :percentage="(imgList.indexOf(currentPic) + 1) / imgList.length * 100">
        <span>{{ imgList.indexOf(currentPic) + 1 }} / {{ imgList.length }}</span>
      </el-progress>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import waterStore from './waterStore';
import { ElMessage } from 'element-plus';
import { fabric } from 'fabric';
import { getContainerSize } from '../../common/util';
import global from '../../common/global';
import { ref } from 'vue';

const loading = ref(false);
const { outputPath, currentPic } = storeToRefs(waterStore);
const { imgList } = waterStore; // 引用类型不需要storeToRefs

function open() {
  window.electronAPI.openDirectoryDialog(outputPath.value).then(dir => {
    outputPath.value = dir;
  });
}

async function save() {
  if (!imgList || imgList.length === 0) {
    ElMessage.warning('请先添加图片');
    return;
  }
  if (!outputPath.value) {
    ElMessage.warning('请先选择导出目录');
    return;
  }
  loading.value = true;
  try {
    const canvas = global.canvas;
    canvas.discardActiveObject();
    canvas.renderAll();
    for (let i = 0; i < imgList.length; i++) {
      const imgBase64 = imgList[i].base64;
      fabric.Image.fromURL(imgBase64, (img) => {
        // 设置画布和图片一样大
        const [imgWidth, imgHeight] = [img.width!, img.height!];
        const [canvasWidth, canvasHeight] = getContainerSize(imgWidth, imgHeight);
        canvas.setWidth(canvasWidth);
        canvas.setHeight(canvasHeight);
        img.set({
          scaleX: canvasWidth / imgWidth,
          scaleY: canvasHeight / imgHeight,
        });
        // 设置背景
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        canvas.renderAll();
      });
      currentPic.value = imgList[i];
      // fabric的canvas.toDataURL会压缩图片质量
      const htmlCanvas = document.querySelector('canvas');
      const canvasBase64 = htmlCanvas!.toDataURL('image/jpeg', 1);
      // await wait(1000);
      await window.electronAPI.saveFile(
        outputPath.value + '/watermark-' + imgList[i].name,
        canvasBase64,
      );
      const dom = document.querySelectorAll('.image_small');
      dom[i]?.scrollIntoView({ behavior: 'smooth' });
    }
    ElMessage.success('导出成功，已打开导出目录！');
    window.electronAPI.openDirectory(outputPath.value + '/watermark-' + imgList[0].name);
  } finally {
    loading.value = false;
  }
}

async function wait(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

</script>

<style lang="less" scoped>
.block {
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  column-gap: 20px;

  span {
    word-break: keep-all;
  }
}
</style>


