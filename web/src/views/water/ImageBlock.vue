<template>
  <div class="image_block" :class="dragOver ? 'drag_over' : ''" ref="plusDiv">
    <div v-show="imgList.length > 0" style="position: relative">
      <canvas id="canvas" class="image_block" />
      <RightMenu v-if="canvasInit" />
    </div>
    <div v-show="imgList.length === 0" class="plus_div" v-on:click="clickUpload">
      <Plus class="plusIcon" />
      <span>{{ dragOver ? '松开添加图片' : '拖拽或点击添加图片' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import waterStore from './waterStore';
import { ElMessage } from 'element-plus';
import { fabric } from 'fabric';
import RightMenu from './RightMenu.vue';
import global from '../../common/global';
import { getContainerSize } from '../../common/util';

const props = defineProps({
  clickUpload: Function,
  upload: {
    type: Function,
    required: true,
  },
});

// 这东西转成proxy传给子组件有问题
let canvas: fabric.Canvas;
let canvasInit = ref(false);
const { currentPic, outputPath } = storeToRefs(waterStore);
const { imgList } = waterStore; // 引用类型不需要storeToRefs
const plusDiv = ref();
const dragOver = ref(false);

onMounted(() => {
  addDropEvent();

  canvas = new fabric.Canvas('canvas', {
    fireRightClick: true, // 启用右键，button的数字为3
    stopContextMenu: true, // 禁止默认右键菜单
  });
  global.canvas = canvas;
  canvasInit.value = true;

  const container = document.querySelector('.image_block');
  canvas.setWidth(container!.clientWidth);
  canvas.setHeight(container!.clientHeight);
  canvas.selection = false; // 禁止框选

});

watch(currentPic, () => {
  if(currentPic.value?.base64) {
    fabric.Image.fromURL(currentPic.value.base64, (img) => {
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
  }
});


function addDropEvent() {
  plusDiv.value.addEventListener('dragenter', function (e: DragEvent) {  //拖进
    e.preventDefault();
    dragOver.value = true;
  });
  plusDiv.value.addEventListener('dragover', function (e: DragEvent) {  //拖来拖去
    e.preventDefault();
    dragOver.value = true;
  });
  plusDiv.value.addEventListener('dragleave', function (e: DragEvent) {  //离开
    e.preventDefault();
    dragOver.value = false;
  });
  plusDiv.value.addEventListener('drop', function (event: DragEvent) {
    event.preventDefault();
    dragOver.value = false;
    const files = event.dataTransfer!.files as unknown as Array<File & { path?: string }>;
    const imgFiles = [...files].filter(file => file.type.includes('image'));
    if (imgFiles.length === 0) {
      ElMessage.warning('仅支持上传图片文件！');
      return;
    }
    if (imgFiles[0].path && !outputPath.value) {
      const path = imgFiles[0].path;
      outputPath.value = path.substring(0, path.lastIndexOf('/'));
    }

    if (imgFiles.length < files.length) {
      ElMessage.warning('已添加图片，过滤非图片文件');
    }
    props.upload(imgFiles);
  });
}
</script>

<style lang="less" scoped>
@import "./index";

.drag_over {
  background: #3336;
}
.image_block {
  position: relative;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ddd;
  .plus_div {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      margin-top: 10px;
      color: #666;
      font-size: 14px;
    }
    .plusIcon {
      color: #777;
      height: 50px;
      width: 50px;
      padding: 6px 26px;
      border: 2px solid #bbb;
      border-radius: 6px;
    }
  }
}
</style>
