<template>
  <div class="content" :style="(extendProps || {}).contentStyle">
    <a-spin :spinning="loading">
      <div id="common-form">
        <Form
          ref="formRef"
          :model="model"
          v-bind="elementProps"
          class="common-form-container"
          :style="{
            overflow: 'hidden',
            padding: '0 16px 0 12px',
            ...elementProps.style
          }"
          :scrollToFirstError="true"
        >
          <FormCtrl
            v-for="(field, index) in fields.filter(
              (r) => (r.extendProps || {}).showInFooter !== true
            )"
            :key="index"
            :operate-type="operateType"
            :default-model="model"
            :width="(100 / rowFieldsCount) * (field.columnSpan || 1) + '%'"
            :layout="elementProps.layout || 'horizontal'"
            :customComponents="customComponents"
            :handleEmit="handleEmit"
            :validateInfos="validateInfos"
            v-bind="field"
            :element-props="field.elementProps || {}"
            :extend-props="field.extendProps || {}"
          />
        </Form>
      </div>
    </a-spin>
  </div>
  <div
    class="footer"
    v-if="
      commands &&
      commands.length &&
      commands.some(
        (item) => !item.visibleValidator || item.visibleValidator({ model, operateType })
      )
    "
    :style="{ background: 'white', ...(extendProps || {}).footerStyle }"
  >
    <div class="status" :style="{ overflow: 'hidden' }">
      <FormCtrl
        v-for="(field, index) in fields.filter((r) => (r.extendProps || {}).showInFooter === true)"
        :key="index"
        :operate-type="operateType"
        :default-model="model"
        :width="(100 / rowFieldsCount) * (field.columnSpan || 1) + '%'"
        :layout="elementProps.layout || 'horizontal'"
        :customComponents="customComponents"
        :handleEmit="handleEmit"
        :validateInfos="validateInfos"
        v-bind="field"
        :element-props="field.elementProps || {}"
        :extend-props="field.extendProps || {}"
      />
    </div>
    <div class="commands">
      <Button
        v-for="(item, index) of commands"
        :key="index"
        v-show="!item.visibleValidator || item.visibleValidator({ model, operateType })"
        class="command"
        :loading="item.loading"
        :disabled="item.disableValidator && item.disableValidator.call({ model, operateType })"
        v-bind="item.elementProps"
        @click="handleEmit(item.command, { command: item })"
        >{{ item.text }}
      </Button>
    </div>
  </div>
</template>

<script lang="tsx" setup name="CaCommonForm">
import { Form, Button } from 'ant-design-vue'
import { computed, nextTick, ref, onMounted } from 'vue'
import FormCtrl from './components/FormCtrl.vue'
import { commonFormProps } from './props'
import { handleCommand } from '../../hooks/useCommand'
import scrollIntoView from 'scroll-into-view-if-needed'

const props = defineProps(commonFormProps)

const formRules = computed(() => {
  if (props.elementProps.rules) {
    return props.elementProps.rules
  } else {
    const rules = {}
    props.fields.forEach((field) => {
      if (
        field.rules &&
        (!field.visibleValidator ||
          field.visibleValidator({ model: props.model, operateType: props.operateType }))
      ) {
        rules[field.dataField] = field.rules
      }
    })
    return rules
  }
})

const { resetFields, validate, clearValidate, validateInfos } = Form.useForm(props.model, formRules)
const formRef = ref()

const formEmitRegister = computed(() => props.emitRegister)
// 跳转到具体字段
var scrollToField = function scrollToField(name) {
  const fieldsId = `form_item_${name}`
  // form dom
  const formElement = document.querySelector('#common-form')
  // node dom
  const node = formElement?.querySelector(`#${fieldsId}`)
  if (node) {
    scrollIntoView(node, {
      behavior: (actions) =>
        // list is sorted from innermost (closest parent to your target) to outermost (often the document.body or viewport)
        actions.forEach(({ el, top, left }) => {
          // implement the scroll anyway you want
          el.scrollTop = top - 30
          el.scrollLeft = left
        }),
      scrollMode: 'if-needed',
      block: 'start'
    })
  }
}
nextTick(() => {
  // formEmitRegister.value['validate'] = formRef?.value?.validate;
  formEmitRegister.value['scrollToField'] = formRef?.value?.scrollToField
  formEmitRegister.value['handleFinishFailed'] = formRef?.value?.handleFinishFailed
})
// 处理验证后自动跳转到错误部分
formEmitRegister.value['validate'] = () => {
  return new Promise((resolve, reject) => {
    try {
      validate().then(() => {
        resolve(true)
      })
    } catch (errorInfo: any) {
      scrollToField(errorInfo.errorFields[0].name)
      reject(false)
    }
  })
}
formEmitRegister.value['clearValidate'] = clearValidate
formEmitRegister.value['resetFields'] = resetFields
onMounted(() => {
  formEmitRegister.value['validateFields'] = formRef?.value?.validateFields
})

const handleEmit = (event: string, args?: object) => {
  handleCommand(props.emitRegister, event, args)
}
</script>

<script lang="tsx">
export default {
  inheritAttrs: false
}
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid #f0f0f0;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .status {
    flex: 1;
    display: flex;
  }

  .commands {
    .command {
      margin-left: 12px;
    }
  }
}
</style>
