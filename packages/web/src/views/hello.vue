<template>
  <canvas id="canvas" width="350" height="200"></canvas>
</template>

<script setup lang="ts">
import { fabric } from 'fabric';
import { onMounted } from 'vue';
import currentPic from '../assets/bz/cj.jpg'

onMounted(() => {
  const canvas = new fabric.Canvas('canvas');
  var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20
  });
  canvas.add(rect);
});
</script>

<style scoped>
</style>
