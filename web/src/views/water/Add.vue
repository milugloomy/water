<template>
  <div class="top_right">
    <el-tabs type="card" v-show="imgList.length > 0">
      <el-tab-pane label="添加文字水印">
        <el-form :model="waterList" ref="formRef" class="form" label-width="60px">
          <el-card v-for="(water, i) in waterList" class="box-card">
            <template #header>
              <div class="card-header">
                <span class="card-header-title" v-on:click="water.expand = !water.expand">
                  <span>水印{{ i + 1 }}</span>
                  <ArrowDownBold v-if="water.expand" class="icon arrow_icon" />
                  <ArrowUpBold v-else class="icon arrow_icon" />
                </span>
                <el-popconfirm hide-icon :title="'确认删除水印' + (i + 1) + '吗？'" v-on:confirm="remove(i)">
                  <template #reference>
                    <el-button text class="delete_button">删除</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </template>
            <div class="card-body" :class="water.expand ? 'card-body-show' : 'card-body-hide'">
              <div :class="water.fontFamily?.split(' ')[0]">
                <el-form-item label="文字">
                  <el-input v-model="water.text" type="textarea" :rows="3" />
                </el-form-item>
              </div>
              <div :class="water.fontFamily?.split(' ')[0]">
                <el-form-item label="字体">
                  <el-select v-model="water.fontFamily" value-key="fontFamily">
                    <el-option
                      v-for="item in options"
                      :key="item.label"
                      :label="item.label"
                      :value="item.fontFamily"
                    >
                      <span :style="'font-family: ' + item.fontFamily">{{ item.label }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="inline">
                <el-form-item label="字号">
                  <el-input v-model="water.fontSize" type="number" />
                </el-form-item>
                <el-form-item label="颜色">
                  <el-color-picker v-model="water.color" />
                </el-form-item>
              </div>
              <div class="inline">
                <el-form-item label="加粗" class="flex1">
                  <el-switch v-model="water.bold" />
                </el-form-item>
                <el-form-item label="斜体" class="flex1">
                  <el-switch v-model="water.italic" />
                </el-form-item>
              </div>
              <div class="inline">
                <el-form-item class="flex1">
                  <template #label>
                    <el-tooltip placement="left" content="0-360度">
                      旋转
                    </el-tooltip>
                  </template>
                  <el-slider v-model="water.rotate" :max="360" :show-tooltip="false" />
                </el-form-item>
                <span class="text">{{ water.rotate }}</span>
              </div>
              <div class="inline">
                <el-form-item class="flex1">
                  <template #label>
                    <el-tooltip placement="left" content="0透明，100不透明">
                      透明度
                    </el-tooltip>
                  </template>
                  <el-slider v-model="water.opacity" :show-tooltip="false" />
                </el-form-item>
                <span class="text">{{ water.opacity }}</span>
              </div>
              <el-form-item label="位置">
                <el-select v-model="water.position">
                  <el-option v-for="row in PositionOptions" :value="row.value" :label="row.label" />
                </el-select>
              </el-form-item>
              <template v-if="water.position === PositionType.duplicate">
                <div class="inline">
                  <el-form-item label="行间距">
                    <el-input v-model="water.lineHeight" type="number" :step="0.1" />
                  </el-form-item>
                  <span class="text">倍</span>
                </div>
              </template>
            </div>
          </el-card>
          <!--          <el-form-item>-->
          <!--            <el-button type="primary" @click="onSubmit(formRef)">get</el-button>-->
          <!--          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="add">添加水印</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="添加图片水印">
        <div class="sorry">暂不支持</div>
      </el-tab-pane>
    </el-tabs>
    <div v-show="imgList.length === 0" class="sorry">
      请先添加图片
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import waterStore from './waterStore';
import { addWater, removeWater, isMac } from '../../common/util';
import { FormInstance } from 'element-plus';
import { PositionOptions, PositionType } from '../../common/types';

const { imgList, waterList } = waterStore; // 引用类型不需要storeToRefs

const formRef = ref();

const options = isMac ? [
  { fontFamily: 'Hei', label: '黑体' },
  { fontFamily: 'Lantinghei SC', label: '兰亭黑体' },
  { fontFamily: 'SimSong', label: '宋体' },
  { fontFamily: 'STFangsong', label: '仿宋' },
  { fontFamily: 'Kai', label: '楷体' },
  { fontFamily: 'Xingkai SC', label: '行楷' },
  { fontFamily: 'Baoli SC', label: '隶书' },
  { fontFamily: 'Wawati SC', label: '娃娃体' },
] : [];

function remove(index: number) {
  removeWater(waterList[index].name)
}

function add() {
  addWater();
}

function onSubmit(form: FormInstance) {
  form.validate(res => {
    console.log(res);
    console.log(waterList);
  });
}
</script>

<style lang="less" scoped>
@import "./index";

.Hei {
  :deep(.el-select .el-input__inner) {
    font-family: Hei;
  }
}
.Lantinghei {
  :deep(.el-select .el-input__inner) {
    font-family: Lantinghei SC;
  }
}
.SimSong {
  :deep(.el-select .el-input__inner) {
    font-family: SimSong;
  }
}
.STFangsong {
  :deep(.el-select .el-input__inner) {
    font-family: STFangsong;
  }
}
.Kai {
  :deep(.el-select .el-input__inner) {
    font-family: Kai;
  }
}
.Xingkai {
  :deep(.el-select .el-input__inner) {
    font-family: Xingkai SC;
  }
}
.Baoli {
  :deep(.el-select .el-input__inner) {
    font-family: Baoli SC;
  }
}
.Wawati {
  :deep(.el-select .el-input__inner) {
    font-family: Wawati SC;
  }
}
.box-card {
  :deep(.el-card__header) {
    padding: 10px 20px;
  }
  :deep(.el-card__body) {
    padding: 0;
  }
  margin-bottom: 4px;
  .card-header {
    display: flex;
    align-items: center;
    .card-header-title {
      cursor: pointer;
      display: flex;
      align-items: center;
      flex: 1;
    }
    .arrow_icon {
      color: #aaa;
      margin-left: 10px;
    }
    .delete_button {
      color: #3988ff;
    }
  }
  .card-body {
    transition: all .5s;
    padding-left: 20px;
    padding-right: 20px;
  }
  .card-body-hide {
    padding-top: 0;
    padding-bottom: 0;
    max-height: 0;
  }
  .card-body-show {
    padding-top: 20px;
    padding-bottom: 20px;
    max-height: 500px;
  }
}

.top_right {
  width: 25%;
  overflow-y: auto;
  border-left: 1px solid #ddd;

  .form {
    .inline {
      display: flex;
      width: 100%;
      .flex1 {
        flex: 1;
      }
      .text {
        margin-top: 4px;
        text-align: right;
        width: 26px;
        margin-left: 10px;
      }
    }
  }

  :deep(.el-tabs__nav) {
    width: 100%;
    display: flex;
  }
  :deep(.el-tabs__item) {
    flex: 1;
  }
  .sorry {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }
}

</style>
