import { TablePaginationConfig } from 'ant-design-vue/es/table';
import type { CommonCommand, TableField } from '#/castor-antdv';
import type { PropType } from 'vue';

export const commonTableProps = {
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  dataSource: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array as PropType<TableField[]>,
    default() {
      return [];
    },
  },
  pagination: {
    type: [Object, Boolean] as PropType<TablePaginationConfig | false>,
  },
  addCommand: {
    type: Object as PropType<CommonCommand>,
    default: () => {},
  },
  customCommands: {
    type: Array as PropType<CommonCommand[]>,
    default: () => [],
  },
  settingCommands: {
    type: Array as PropType<CommonCommand[]>,
    default: () => [],
  },
  getList: {
    type: Function,
  },
  customComponents: {
    type: Object,
    default: () => {},
  },
  tableTag: {
    type: String,
    default: '',
  },
  emitRegister: {
    type: Object,
    default: () => {},
  },
  elementProps: {
    type: Object,
    default: () => {},
  },
  extendProps: {
    type: Object,
    default: () => {
      return {
        cacheConfigColumns: true,
        showRefresh: true,
        showColumnConfig: true,
      };
    },
  },
};
