/// <reference types="vite/client" />

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}
declare module '*.json'
declare module '*.png'
declare module '*.jpg'
