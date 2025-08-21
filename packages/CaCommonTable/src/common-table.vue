<template>
  <div
    class="table-append-header"
    v-if="title || addCommand || (customCommands && customCommands.length)"
  >
    <div class="table-title">{{ title || '' }}</div>
    <div class="table-commands">
      <Button
        v-if="
          addCommand &&
          addCommand.text &&
          (!addCommand.visibleValidator || addCommand.visibleValidator())
        "
        type="primary"
        :disabled="addCommand.disableValidator && addCommand.disableValidator()"
        v-bind="addCommand.elementProps"
        @click="handleEmit(addCommand.command)"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        {{ addCommand.text }}
      </Button>
      <ButtonGroup v-if="customCommands && customCommands.length" class="table-custom-commands">
        <Button
          v-for="(item, index) of customCommands"
          v-show="!item.visibleValidator || item.visibleValidator()"
          :key="index"
          :disabled="item.disableValidator && item.disableValidator()"
          v-bind="item.elementProps"
          @click="handleEmit(item.command)"
          >{{ item.text }}
        </Button>
      </ButtonGroup>
    </div>
  </div>
  <Table
    :row-key="rowKey"
    :loading="loading"
    :dataSource="dataSource"
    :columns="antColumns"
    :scroll="{
      x: '100%'
    }"
    :pagination="
      pagination === false
        ? false
        : {
            showSizeChanger: true,
            showTotal: (total: number) => t('table.total', undefined, { total }),
            ...pagination
          }
    "
    v-bind="elementProps"
    :sticky="tableSticky"
  />
</template>

<script lang="tsx" setup name="CaCommonTable">
import { computed, ref, onMounted } from 'vue'
import { Table, Button, ButtonGroup } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { commonTableProps } from './props'
import CommandColumn from './components/CommandColumn.vue'
import StatusColumn from './components/StatusColumn.vue'
import LinkColumn from './components/LinkColumn.vue'
import ImageColumn from './components/ImageColumn.vue'
import ComponentColumn from './components/ComponentColumn.vue'
import { handleCommand } from './../../hooks/useCommand'
import { useI18n } from '../../hooks/useI18n'
// 设置table的sticky（粘性头部和滚动条）
let tableSticky = ref()
onMounted(() => {
  tableSticky.value = {
    getContainer: () => document.getElementById('comTable') as HTMLElement
  }
})

const props = defineProps(commonTableProps)
const { t } = useI18n()
const handleEmit = (event: string, args?: object) => {
  handleCommand(props.emitRegister, event, args)
}
const antColumns = computed<any>(() =>
  props.columns.map((r) => {
    switch (r.type) {
      case 'index':
        return {
          title: r.label,
          customRender: ({ index }) => {
            const pagination = props.pagination || false
            if (pagination === false) {
              return `${index + 1}`
            } else {
              return `${((pagination.current || 1) - 1) * (pagination.pageSize || 10) + index + 1}`
            }
          },
          align: 'center',
          ...r.elementProps
        }
      case 'link':
        return {
          title: r.label,
          customRender: ({ record, index }) => {
            return (
              <LinkColumn
                command={(r.extendProps || {}).linkCommand}
                dataField={r.dataField}
                handleEmit={handleEmit}
                record={record}
                index={index}
                elementProps={r.elementProps}
              />
            )
          },
          ...r.elementProps
        }
      case 'image':
        return {
          title: r.label,
          customRender: ({ record, index }) => {
            return (
              <ImageColumn
                dataField={r.dataField}
                record={record}
                index={index}
                elementProps={r.extendProps?.subElementProps}
              />
            )
          },
          ...r.elementProps
        }
      case 'custom':
        return {
          title: r.label,
          customRender: ({ record }) => {
            return (
              <ComponentColumn
                customComponents={props.customComponents}
                componentKey={(r.extendProps || {}).componentKey}
                dataField={r.dataField}
                record={record}
                handleEmit={handleEmit}
              />
            )
          },
          ...r.elementProps
        }
      case 'commands':
        return {
          title: r.label,
          customRender: ({ record, index }) => {
            return (
              <CommandColumn
                commands={(r.extendProps || {}).commands}
                handleEmit={handleEmit}
                record={record}
                index={index}
              />
            )
          },
          ...r.elementProps
        }
      case 'status':
        return {
          title: r.label,
          customRender: ({ record }) => {
            return (
              <StatusColumn
                options={(r.extendProps || {}).options}
                record={record}
                dataField={r.dataField}
              />
            )
          },
          ...r.elementProps
        }
      default:
        return {
          title: r.label,
          dataIndex: r.dataField,
          ...r.elementProps
        }
    }
  })
)
</script>

<script lang="tsx">
export default {
  inheritAttrs: false
}
</script>

<style lang="scss" scoped>
.table-append-header {
  margin: 6px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .table-title {
    font-size: 16px;
    font-weight: bold;
  }

  .table-commands {
    .table-custom-commands,
    .table-setting-commands {
      margin-left: 16px;
    }
  }
}
</style>
