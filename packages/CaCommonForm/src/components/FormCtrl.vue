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
      :disabled="isDisabledRef"
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <AutoComplete
      v-else-if="type === 'autocomplete'"
      v-model:value="model[dataField]"
      placeholder="请选择"
      :disabled="isDisabledRef"
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <DatePicker
      v-else-if="type === 'date'"
      v-model:value="model[dataField]"
      placeholder="请选择"
      :disabled="isDisabledRef"
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <RangePicker
      v-else-if="type === 'dateRange'"
      v-model:value="model[dataField]"
      :disabled="isDisabledRef"
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <TimePicker
      v-else-if="type === 'time'"
      v-model:value="model[dataField]"
      placeholder="请选择"
      :disabled="isDisabledRef"
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <TimeRangePicker
      v-else-if="type === 'timeRange'"
      v-model:value="model[dataField]"
      :disabled="isDisabledRef"
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
      :disabled="isDisabledRef"
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
      :disabled="isDisabledRef"
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <RadioGroup
      v-else-if="type === 'radioGroup'"
      v-model:value="model[dataField]"
      :disabled="isDisabledRef"
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
      :disabled="isDisabledRef"
      placeholder="请输入"
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
    />
    <Switch
      v-else-if="type === 'switch'"
      v-model:checked="model[dataField]"
      :disabled="isDisabledRef"
      v-bind="elementProps"
      :style="elementProps.style"
    />
    <Tooltip
      v-else-if="type === 'image'"
      placement="bottom"
      :title="isDisabledRef ? '' : '点击上传图片'"
    >
      <Upload :showUploadList="false" :disabled="isDisabledRef" v-bind="elementProps">
        <div class="ant-upload-wrapper">
          <img
            :src="model[dataField] || defaultAvatarUrl"
            :style="{
              width: extendProps?.imageOptions?.width || '100px',
              height: extendProps.imageOptions?.height || '100px',
              borderRadius: extendProps.imageOptions?.radius || '50%',
              objectFit: 'cover',
              cursor: isDisabledRef ? 'default' : 'pointer',
              ...extendProps.imageOptions?.style
            }"
          />
        </div>
      </Upload>
    </Tooltip>
    <Input
      v-else
      v-model:value="model[dataField]"
      :disabled="
        operateType === 'view' || (disableValidator && disableValidator({ model, operateType }))
      "
      placeholder="请输入"
      v-bind="elementProps"
      :style="{ width: '100%', ...elementProps.style }"
      @blur="() => handleBlur(dataField)"
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
  Switch,
  Tooltip,
  Upload
} from 'ant-design-vue'
import { FormFieldExtendProps } from '#/castor-antd'
import { Rule } from 'ant-design-vue/es/form/interface'

const emit = defineEmits(['blur'])
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
  },
  validate: {
    type: Function,
    default: undefined
  }
})

const model = computed(() => props.defaultModel)
const defaultAvatarUrl =
  'data:image/png;base64,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'

const isDisabledRef = computed(() => {
  return (
    props.operateType === 'view' ||
    (props.disableValidator &&
      props.disableValidator({ model: props.defaultModel, operateType: props.operateType }))
  )
})

const handleBlur = (dataField: string) => {
  console.log('FormCtrl handleBlur for field:', dataField)
  if (props.validate) {
    console.log('validate function exists')
    props.validate(dataField, { trigger: 'blur' }).catch(() => {})
  }else{
    console.log('validate function does not exist')
  }
}
</script>
