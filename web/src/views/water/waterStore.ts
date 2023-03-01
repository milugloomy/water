import { defineStore } from 'pinia'
import { reactive, ref } from 'vue';
import {isMac} from "../../common/util";

export const initWaterValue = {
  text: '这是水印',
  fontFamily: isMac ? 'SimSong' : '宋体',
  fontSize: 28,
  color: 'rgba(234, 100, 100)',
  bold: false,
  italic: false,
  rotate: 0,
  opacity: 80,
  position: 1,
  expand: true,
  name: '',
  lineHeight: 1.2
}

export type PicType = {
  base64: string;
  name: string;
};

const useWaterStore = defineStore('waterStore', () => {
  const currentPic = ref<PicType>();
  const outputPath = ref<string | undefined>();
  const waterList = reactive<Array<typeof initWaterValue>>([]);
  const imgList = reactive<PicType[]>([]);

  return {
    currentPic,
    outputPath,
    waterList,
    imgList,
  };
});

const waterStore = useWaterStore();

export default waterStore;
