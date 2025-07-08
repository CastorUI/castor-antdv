<template>
  <div
    v-if="type === 'space'"
    class="form-item-space"
    :style="{
      float: 'left',
      width: 'calc(100% + 28px)',
      height: '12px',
      margin: '0 -16px 0 -12px',
      background: '#f0f2f5',
      ...elementProps.style
    }"
  />
  <FormItem
    v-else-if="!visibleValidator || visibleValidator({ model, operateType })"
    :label="label"
    :name="dataField"
    :rules="rules"
    v-bind="{ ...extendProps.formItemProps, ...validateInfos[dataField] }"
    :style="{
      float: 'left',
      width: `calc(${width} - ${layout === 'vertical' ? '16px' : '0px'})`,
      marginLeft: `${layout === 'vertical' ? '8px' : '0'}`,
      marginRight: `${layout === 'vertical' ? '8px' : '0'}`,
      marginBottom:
        ['groupTitle', 'custom', 'space'].includes(type) || validateInfos[dataField]?.help
          ? '0'
          : 'inherit',
      ...extendProps.formItemStyle
    }"
  >
    <template
      v-if="
        [
          'default',
          'inputNumber',
          'date',
          'textArea',
          'select',
          'radioGroup',
          'switch',
          'checkboxGroup'
        ].includes(type) && operateType === 'view'
      "
    >
      <span
        v-if="['select', 'radioGroup'].includes(type)"
        v-bind="elementProps"
        :style="{ width: '100%', whiteSpace: 'pre-line', ...elementProps.style }"
      >
        {{
          ((elementProps.options || []).filter((r) => r.value === model[dataField])[0] || {})
            .label || '暂无'
        }}
      </span>
      <span
        v-else-if="['switch'].includes(type)"
        v-bind="elementProps"
        :style="{ width: '100%', whiteSpace: 'pre-line', ...elementProps.style }"
      >
        {{
          model[dataField] === null || model[dataField] === undefined
            ? '暂无'
            : model[dataField]
            ? '是'
            : '否'
        }}
      </span>
      <span
        v-else-if="['checkboxGroup'].includes(type)"
        v-bind="elementProps"
        :style="{ width: '100%', whiteSpace: 'pre-line', ...elementProps.style }"
      >
        {{
          ((elementProps.options || []).filter((r) => model[dataField].includes(r.value)) || [])
            .map((r) => r.label)
            .join(' , ') || '暂无'
        }}
      </span>
      <span
        v-else
        v-bind="elementProps"
        :style="{ width: '100%', whiteSpace: 'pre-line', ...elementProps.style }"
      >
        {{
          `${model[dataField] || (elementProps?.suffix ? ' - ' : '暂无')}${
            elementProps?.suffix || ''
          }`
        }}
      </span>
    </template>
    <Select
      v-else-if="type === 'select'"
      v-model:value="model[dataField]"
      placeholder="请选择"
      :disabled="
        operateType === 'view' || (disableValidator && disableValidator({ model, operateType }))
      "
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <AutoComplete
      v-else-if="type === 'autocomplete'"
      v-model:value="model[dataField]"
      placeholder="请选择"
      :disabled="
        operateType === 'view' || (disableValidator && disableValidator({ model, operateType }))
      "
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <DatePicker
      v-else-if="type === 'date'"
      v-model:value="model[dataField]"
      placeholder="请选择"
      :disabled="
        operateType === 'view' || (disableValidator && disableValidator({ model, operateType }))
      "
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <RangePicker
      v-else-if="type === 'dateRange'"
      v-model:value="model[dataField]"
      :disabled="
        operateType === 'view' || (disableValidator && disableValidator({ model, operateType }))
      "
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <TimePicker
      v-else-if="type === 'time'"
      v-model:value="model[dataField]"
      placeholder="请选择"
      :disabled="
        operateType === 'view' || (disableValidator && disableValidator({ model, operateType }))
      "
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <TimeRangePicker
      v-else-if="type === 'timeRange'"
      v-model:value="model[dataField]"
      :disabled="
        operateType === 'view' || (disableValidator && disableValidator({ model, operateType }))
      "
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <span
      v-else-if="type === 'text'"
      v-bind="elementProps"
      :style="{ width: '100%', whiteSpace: 'pre-line', ...elementProps.style }"
    >
      {{
        `${model[dataField] || (elementProps?.suffix ? ' - ' : '暂无')}${
          elementProps?.suffix || ''
        }`
      }}
    </span>
    <Textarea
      v-else-if="type === 'textArea'"
      v-model:value="model[dataField]"
      :disabled="
        operateType === 'view' || (disableValidator && disableValidator({ model, operateType }))
      "
      placeholder="请输入"
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <div
      v-else-if="type === 'groupTitle'"
      v-bind="elementProps"
      :style="{
        overflow: 'hidden',
        width: '100%',
        fontSize: '16px',
        fontWeight: 'bold',
        ...elementProps.style
      }"
    >
      <div style="float: left">
        {{ extendProps.groupTitle }}
        <span style="margin-left: 36px; font-size: 14px; color: #999; font-weight: normal">{{
          extendProps.subTitle
        }}</span>
      </div>
      <div v-if="extendProps.groupCommands" :style="{ float: 'right' }">
        <Button
          v-for="(item, index) of extendProps.groupCommands"
          v-show="!item.visibleValidator || item.visibleValidator({ model, operateType })"
          :key="index"
          type="link"
          :disabled="item.disableValidator && item.disableValidator({ model, operateType })"
          v-bind="item.elementProps"
          @click.stop="handleEmit(item.command)"
          >{{ item.text }}
        </Button>
      </div>
    </div>
    <CheckboxGroup
      v-else-if="type === 'checkboxGroup'"
      v-model:value="model[dataField]"
      :disabled="
        operateType === 'view' || (disableValidator && disableValidator({ model, operateType }))
      "
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <RadioGroup
      v-else-if="type === 'radioGroup'"
      v-model:value="model[dataField]"
      :disabled="
        operateType === 'view' || (disableValidator && disableValidator({ model, operateType }))
      "
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <component
      v-else-if="type === 'custom' && extendProps.componentKey"
      :is="customComponents[extendProps.componentKey]"
      v-model:component-data="model[dataField]"
      :model="model"
      :operate-type="operateType"
      v-bind="elementProps"
    />
    <span
      v-else-if="type === 'status'"
      v-bind="elementProps"
      :style="{
        width: '100%',
        ...elementProps.style,
        color: (
          (extendProps.statusOptions || []).filter((r) => r.value === model[dataField])[0] || {}
        ).color
      }"
    >
      {{
        ((extendProps.statusOptions || []).filter((r) => r.value === model[dataField])[0] || {})
          .label
      }}
    </span>
    <InputNumber
      v-else-if="type === 'inputNumber'"
      v-model:value="model[dataField]"
      :disabled="
        operateType === 'view' || (disableValidator && disableValidator({ model, operateType }))
      "
      placeholder="请输入"
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <Switch
      v-else-if="type === 'switch'"
      v-model:checked="model[dataField]"
      :disabled="
        operateType === 'view' || (disableValidator && disableValidator({ model, operateType }))
      "
      v-bind="elementProps"
      :style="elementProps.style"
    />
    <Input
      v-else
      v-model:value="model[dataField]"
      :disabled="
        operateType === 'view' || (disableValidator && disableValidator({ model, operateType }))
      "
      placeholder="请输入"
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    >
      <template v-if="extendProps && extendProps.beforeText" #addonBefore>
        <span>{{ extendProps.beforeText }}</span>
      </template>
    </Input>
  </FormItem>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue'
import {
  FormItem,
  Input,
  InputNumber,
  AutoComplete,
  Select,
  DatePicker,
  RangePicker,
  TimePicker,
  TimeRangePicker,
  Textarea,
  Button,
  CheckboxGroup,
  RadioGroup,
  Switch
} from 'ant-design-vue'
import { FormFieldExtendProps } from '#/castor-antd'
import { Rule } from 'ant-design-vue/es/form/interface'
const props = defineProps({
  type: {
    type: String,
    default: 'default'
  },
  label: {
    type: String,
    default: undefined
  },
  layout: {
    type: String,
    default: 'horizontal'
  },
  operateType: {
    type: String,
    default: 'add'
  },
  defaultModel: {
    type: Object,
    default: () => {}
  },
  dataField: {
    type: String,
    default: ''
  },
  rules: {
    type: Array as PropType<Rule[]>,
    default: () => null
  },
  width: {
    type: String,
    default: undefined
  },
  disableValidator: {
    type: Function,
    default: undefined
  },
  visibleValidator: {
    type: Function,
    default: () => true
  },
  customComponents: {
    type: Object,
    default: () => {}
  },
  elementProps: {
    type: Object,
    default: () => {}
  },
  extendProps: {
    type: Object as PropType<FormFieldExtendProps>,
    default: () => {}
  },
  handleEmit: {
    type: Function as PropType<(event: string, args?: object) => void>,
    default: () => {}
  },
  validateInfos: {
    type: Object,
    default: () => {}
  }
})

const model = computed(() => props.defaultModel)
</script>
