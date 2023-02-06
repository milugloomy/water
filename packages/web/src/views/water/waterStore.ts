import { defineStore } from 'pinia'
import { reactive, ref } from 'vue';

export const initWaterValue = {
  text: '这是水印',
  fontFamily: 'SimSong',
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

const useWaterStore = defineStore('waterStore', () => {
  const currentPic = ref<string | undefined>();
  const waterList = reactive<Array<typeof initWaterValue>>([]);
  const imgList = reactive<string[]>([]);

  return {
    currentPic,
    waterList,
    imgList,
  };
});

const waterStore = useWaterStore();

export default waterStore;
