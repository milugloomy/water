import { fabric } from 'fabric';
import dayjs from 'dayjs';
import waterStore, { initWaterValue } from '../views/water/waterStore';
import { watch } from 'vue';
import global from './global';
import { PositionType } from './types';

export const isMac = (function () {
  return /macintosh|mac os x/i.test(navigator.userAgent);
})();

export const getSeconds = () => {
  return dayjs().format('YYYYMMDDHHmmss');
};

export function getTopLeft(lastObject: any): { top: number, left: number } {
  const canvas = global.canvas;
  if (!lastObject) {
    return {
      top: 60,
      left: 140,
    };
  }

  let top;
  let left;
  const canvasBoundaries = canvas.calcViewportBoundaries();
  const centerX = (lastObject.aCoords.tl.x + lastObject.aCoords.br.x) / 2 + 10;
  const centerY = (lastObject.aCoords.tl.y + lastObject.aCoords.br.y) / 2 + 10;
  if (centerX > canvasBoundaries.br.x) {
    left = lastObject.left - 50;
  } else {
    left = lastObject.left + 50;
  }
  if (centerY > canvasBoundaries.br.y) {
    top = lastObject.top - 50;
  } else {
    top = lastObject.top + 50;
  }
  return {
    top,
    left,
  };
}

export const addWater = () => {
  const canvas = global.canvas;
  const { waterList } = waterStore;
  const newName = getSeconds();
  waterList.push({
    ...initWaterValue,
    name: newName,
  });
  const textProps = waterList[waterList.length - 1];
  const lastTextProps = waterList[waterList.length - 2];

  // 获取上一个添加的canvas元素
  let lastObject;
  if (lastTextProps) {
    const allObjects = canvas.getObjects();
    lastObject = allObjects.find(obj => obj.name === lastTextProps.name);
  }
  // 计算当前新增的canvas元素的位置
  const { left, top } = getTopLeft(lastObject);

  const text = new fabric.Textbox(textProps.text, {
    name: newName,
    top: top,
    left: left,
    angle: 0,
    fontFamily: textProps.fontFamily,
    fontSize: textProps.fontSize,
    fill: textProps.color, // 填充色：橙色
    fontWeight: textProps.bold ? 600 : 400,
    fontStyle: textProps.italic ? 'italic' : '',
    lineHeight: textProps.lineHeight,
    opacity: textProps.opacity / 100,
    originX: 'center',
    originY: 'center',
    transparentCorners: false, // 选中时，角是被填充了。true 空心；false 实心
    borderColor: '#16f1fc', // 选中时，边框颜色：天蓝
    borderScaleFactor: 1, // 选中时，边的粗细：5px
    borderDashArray: [4, 2], // 选中时，虚线边的规则
    cornerColor: '#a1de93', // 选中时，角的颜色是 青色
    cornerStyle: 'circle', // 选中时，叫的属性。默认rect 矩形；circle 圆形
    cornerSize: 10, // 选中时，角的大小为20
    cornerDashArray: [10, 2, 6], // 选中时，虚线角的规则
    borderOpacityWhenMoving: 0.6, // 当对象活动和移动时，对象控制边界的不透明度
  });
  text.lockScalingX = true;
  text.lockScalingY = true;

  text.on('rotating', e => {
    console.log(text.name);
    textProps.rotate = parseInt((e as any).transform.target.angle);
  });
  text.on('modified', e => {
    if (textProps.position !== PositionType.duplicate) {
      textProps.text = text.text || '';
    }
  });

  canvas.add(text);
  canvas.setActiveObject(text);

  watch(() => textProps.text, () => {
    if (textProps.position === PositionType.duplicate) {
      renderDuplicate(textProps, text);
    } else {
      text.text = textProps.text;
    }
    canvas.renderAll();
  });
  watch(() => textProps.fontFamily, () => {
    text.fontFamily = textProps.fontFamily;
    canvas.renderAll();
  });
  watch(() => textProps.fontSize, () => {
    text.fontSize = textProps.fontSize;
    canvas.renderAll();
  });
  watch(() => textProps.color, () => {
    // fill修改不生效，但改动fontSize加1减1后就生效了
    text.fontSize = textProps.fontSize + 1;
    text.fontSize = textProps.fontSize - 1;
    text.fill = textProps.color;
    canvas.renderAll();
  });
  watch(() => textProps.bold, () => {
    text.fontWeight = textProps.bold ? 600 : 400;
    canvas.renderAll();
  });
  watch(() => textProps.italic, () => {
    text.fontStyle = textProps.italic ? 'italic' : '';
    canvas.renderAll();
  });
  watch(() => textProps.rotate, () => {
    text.angle = textProps.rotate;
    canvas.renderAll();
  });
  watch(() => textProps.opacity, () => {
    text.opacity = textProps.opacity / 100;
    canvas.renderAll();
  });
  watch(() => textProps.lineHeight, () => {
    text.lineHeight = textProps.lineHeight;
    canvas.renderAll();
  });
  watch(() => textProps.position, () => {
    if (textProps.position === PositionType.common) {
      // 平铺的时候 这俩不相等
      if (text.text !== textProps.text) {
        text.text = textProps.text;
        canvas.renderAll();
      }
      textProps.rotate = 0;
      text.width = 0;
      canvas.renderAll();
      setTimeout(() => {
        text.left = text.width! / 2 + 20;
        text.top = text.height! / 2 + 20;
        canvas.renderAll();
      });
    }
    if (textProps.position === PositionType.duplicate) {
      if (text.text === textProps.text) {
        renderDuplicate(textProps, text);
      }
    }
    if (textProps.position === PositionType.leftBottom) {
      if (text.text !== textProps.text) {
        text.text = textProps.text;
        canvas.renderAll();
      }
      textProps.rotate = 0;
      text.width = 0;
      canvas.renderAll();
      // 设置宽度为0后重新计算宽度
      setTimeout(() => {
        text.left = text.width! / 2 + 20;
        text.top = canvas.height! - (text.height! / 2 + 20);
        canvas.renderAll();
      });
    }
    if (textProps.position === PositionType.rightBottom) {
      if (text.text !== textProps.text) {
        text.text = textProps.text;
        canvas.renderAll();
      }
      textProps.rotate = 0;
      text.width = 0;
      canvas.renderAll();
      setTimeout(() => {
        text.left = canvas.width! - (text.width! / 2 + 20);
        text.top = canvas.height! - (text.height! / 2 + 20);
        canvas.renderAll();
      });
    }
  });
};

function renderDuplicate(textProps: typeof initWaterValue, text: fabric.Textbox) {
  const canvas = global.canvas;
  const canvasWidth = canvas.width!;
  const canvasHeight = canvas.height!;
  const length = Math.ceil(Math.sqrt(canvasWidth * canvasWidth + canvasHeight * canvasHeight)) + 200;
  // 计算一行放几个
  const singleWidth = textProps.fontSize * (textProps.text.length + 0.5); // 0.5为空格宽度
  let columnCount = 0, rowCount = 0;
  let textWidth = 0, textHeight = 0;
  while (textWidth < length) {
    textWidth += singleWidth;
    columnCount++;
  }
  // 计算有几行
  const singleHeight = textProps.fontSize * textProps.lineHeight;
  while (textHeight < length) {
    textHeight += singleHeight;
    rowCount++;
  }
  // 拼文本
  let newText = '';
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < columnCount; j++) {
      newText += textProps.text + ' ';
    }
  }
  text.width = textWidth;
  text.height = textHeight;
  text.text = newText;
  text.lineHeight = textProps.lineHeight;
  canvas.renderAll();
  text.left = -(text.width! - canvas.width!) / 2 + text.width! / 2;
  text.top = -(text.height! - canvas.height!) / 2 + text.height! / 2;
  canvas.renderAll();

  return { newText, textWidth, textHeight }
}

export function removeWater(name: string) {
  const canvas = global.canvas;
  const { waterList } = waterStore;

  const allObjects = canvas.getObjects();
  const selectedObject = allObjects.find(obj => obj.name === name);
  if (selectedObject) {
    canvas.remove(selectedObject);
  }
  const selectedWaterIndex = waterList.findIndex(water => water.name === name);
  if (selectedWaterIndex !== undefined) {
    waterList.splice(selectedWaterIndex, 1);
  }
}

export function base64ToBlob(base64: string, type?: string) {
  let parts = base64.split(';base64,');
  let contentType = parts[0].split(':')[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;
  let uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], {
    type: type || contentType,
  });
}

export function downloadFile(base64: string, fileName: string) { //下载base64图片

  let aLink = document.createElement('a');
  let blob = base64ToBlob(base64); //new Blob([content]);
  // let evt = document.createEvent("HTMLEvents");
  // evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
}

export async function downloadFile2(base64: string, fileName: string) {
  const handle = await (window as any).showSaveFilePicker({
    suggestedName: fileName,
    types: [
      {
        description: 'PNG file',
        accept: {
          'image/png': ['.png'],
        },
      },
      {
        description: 'Jpeg file',
        accept: {
          'image/jpeg': ['.jpeg'],
        },
      },
    ],
  } as any);
  const writable = await handle.createWritable();
  await writable.write(base64ToBlob(base64));
  await writable.close();
}
