<template>
  <div v-show="objRightMenuData.show" class="rightMenu" :style="objRightMenuData.style">
    <div class="menu-li" v-on:click="rightMenuCopyObj()">复制水印</div>
    <div class="menu-li" v-on:click="rightMenuDelete()">删除</div>
    <div class="menu-li" v-on:click="rightMenuCopy()">复制图片</div>
    <div class="menu-li" v-on:click="rightMenuDownload()">下载</div>
  </div>
  <div v-show="rightMenuData.show" class="rightMenu" :style="rightMenuData.style">
    <div class="menu-li" v-on:click="rightMenuCopy()">复制图片</div>
    <div class="menu-li" v-on:click="rightMenuDownload()">下载</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import global from '../../common/global';
import { addWater, base64ToBlob, downloadFile2, removeWater } from '../../common/util';
import { ElMessage } from 'element-plus';

const canvas = global.canvas!;
const rightMenuData = reactive<{
  show: boolean,
  style: string
}>({
  show: false,
  style: 'display: none',
});
const objRightMenuData = reactive<{
  show: boolean,
  style: string
}>({
  show: false,
  style: 'display: none',
});
let rightClickObj: any = undefined;

function rightMenuDelete() {
  removeWater(rightClickObj.name);
  objRightMenuData.show = false;
}

function rightMenuCopyObj() {
  addWater({
    text: rightClickObj.text,
    fontFamily: rightClickObj.fontFamily,
    fontSize: rightClickObj.fontSize,
    color: rightClickObj.fill,
    bold: rightClickObj.fontWeight >= 600,
    italic: rightClickObj.fontStyle?.includes('italic'),
    rotate: rightClickObj.angle,
    opacity: rightClickObj.opacity * 100,
    lineHeight: rightClickObj.lineHeight,
    position: 1,
    expand: true,
    name: '',
  });
  objRightMenuData.show = false;
}

async function rightMenuCopy() {
  try {
    canvas.discardActiveObject();
    canvas.renderAll();
    // fabric的canvas.toDataURL会压缩图片质量，使用原生的canvas
    const htmlCanvas = document.querySelector('canvas');
    const base64 = htmlCanvas!.toDataURL('image/jpeg', 1);
    const clipboardItemInput = new ClipboardItem({ 'image/png': base64ToBlob(base64, 'image/png') });
    await navigator.clipboard.write([clipboardItemInput]);
    ElMessage.success('已复制到剪切板');
  } catch (e) {
    console.error(e);
    ElMessage.warning('复制失败');
  } finally {
    rightMenuData.show = false;
    objRightMenuData.show = false;
  }
}

async function rightMenuDownload() {
  try {
    canvas.discardActiveObject();
    canvas.renderAll();
    // fabric的canvas.toDataURL会压缩图片质量，使用原生的canvas
    const htmlCanvas = document.querySelector('canvas');
    const base64 = htmlCanvas!.toDataURL('image/jpeg', 1);
    await downloadFile2(base64, 'aaa.jpg');
    ElMessage.success('下载成功');
  } catch (e) {
    console.error(e);
    ElMessage.warning('下载失败');
  } finally {
    rightMenuData.show = false;
    objRightMenuData.show = false;
  }
}

onMounted(() => {
  canvas.on('mouse:up', opt => {
    if (opt.button === 3) {
      // 当前鼠标位置
      let pointX = opt.pointer!.x;
      let pointY = opt.pointer!.y;
      const absoluteStyle = `
        position: absolute;
        left: ${pointX}px;
        top: ${pointY}px;
      `;
      // 点击水印
      if (opt.target) {
        // console.log(opt.target);
        rightClickObj = opt.target;
        objRightMenuData.show = true;
        objRightMenuData.style = absoluteStyle;
      }
      // 点击canvas
      else {
        rightMenuData.show = true;
        rightMenuData.style = absoluteStyle;
      }
    } else {
      rightClickObj = undefined;
      objRightMenuData.show = false;
      rightMenuData.show = false;
    }
  });
});
</script>

<style scoped lang="less">
.rightMenu {
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 0 5px #aaa;
  font-size: 14px;
  .menu-li {
    word-break: keep-all;
    padding: 6px 40px;
    &:not(:last-child) {
      border-bottom: 1px solid #ccc;
    }
    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }
}
</style>
