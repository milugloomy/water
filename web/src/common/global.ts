import { fabric } from 'fabric';
import { ElMessage } from 'element-plus';

type GlobalValueType = {
  _canvas: fabric.Canvas | undefined,
  canvas: fabric.Canvas
}

const globalValue: GlobalValueType = {
  _canvas: undefined,
  get canvas() {
    if (!this._canvas) {
      ElMessage.warning('canvas还未准备好');
      throw new Error('canvas还未准备好');
    }
    return this._canvas;
  },
  set canvas(val) {
    this._canvas = val;
  },
};

export default globalValue;
