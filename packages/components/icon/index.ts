import { Plugin } from "vue";
export type SFCWithInstall<T> = T & Plugin; // 添加插件类型
import _Icon from './src/icon.vue'

// export const withInstall = <T, E extends Record<string, any>>(
//   main: T,
//   extra?: E
// ) => {
//   ;(main as SFCWithInstall<T>).install = (app): void => {
//     for (const comp of [main, ...Object.values(extra ?? {})]) {
//       app.component(comp.name, comp)
//     }
//   }

//   if (extra) {
//     for (const [key, comp] of Object.entries(extra)) {
//       ;(main as any)[key] = comp
//     }
//   }
//   return main as SFCWithInstall<T> & E
// }


export function withInstall<T>(comp: T) {
  (comp as SFCWithInstall<T>).install = function (app) {
    const { name } = comp as unknown as { name: string }
    app.component(name, comp);// 注册全局组件
  }
  return comp as SFCWithInstall<T>; 
}

const Icon = withInstall(_Icon) 
export default Icon //可以通过app.use使用，也可以通过import使用

export * from './src/icon'

