/// <reference types="vite/client" />

import { fabric } from 'fabric';

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface Window {
    canvas: fabric.Canvas;
    versions: {
      node: string;
      chrome: string;
      electron: string;
    };
    electronAPI: {
      openDirectoryDialog: () => Promise<string>;
    }
  }
}
