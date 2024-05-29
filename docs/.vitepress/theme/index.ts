import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import theme from 'vitepress/dist/client/theme-default/index.js';
import { AntDesignContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';

export default {
  ...theme,
  enhanceApp({ app }) {
    app.use(Antd);
    app.component('demo-preview', AntDesignContainer);
  },
};
