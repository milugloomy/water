/// <reference types="vite/client" />

import { fabric } from 'fabric';

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  canvas: fabric.Canvas;
}
