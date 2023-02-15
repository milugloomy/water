<template>
  <div class="block">
    <span>输出目录</span>
    <span>输出目录</span>
    <el-input v-model="path" readonly />
    <el-button type="primary" @click="open">选择目录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const path = ref('');

function open() {
  window.electronAPI.openDirectoryDialog().then(console.log);
}

</script>

<style lang="less" scoped>
.block {
  display: flex;
  align-items: center;
}
</style>
