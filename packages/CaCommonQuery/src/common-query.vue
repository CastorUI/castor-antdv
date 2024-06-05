<template>
  <Form ref="formRef" :model="model" layout="inline" v-bind="elementProps">
    <QueryCtrl
      v-for="(field, index) in fields"
      :key="index"
      :default-model="model"
      v-bind="field"
      @enterKeyDown="handleKeyDown"
    />
    <FormItem>
      <Button
        v-for="(item, index) of commands"
        v-show="!item.visibleValidator || item.visibleValidator()"
        :key="index"
        class="command"
        :disabled="item.disableValidator && item.disableValidator()"
        v-bind="item.elementProps"
        @click="handleEmit(item.command)"
        >{{ item.text }}
      </Button>
    </FormItem>
  </Form>
</template>

<script lang="tsx" setup name="CaCommonQuery">
import { Form, FormItem, Button } from 'ant-design-vue'
import { computed } from 'vue'
import QueryCtrl from './components/QueryCtrl.vue'
import { commonQueryProps } from './props'
import { handleCommand } from './../../hooks/useCommand'

const props = defineProps(commonQueryProps)

const { resetFields } = Form.useForm(props.model, undefined)

const formEmitRegister = computed(() => props.emitRegister)
formEmitRegister.value['resetFields'] = resetFields

const handleEmit = (event: string, args?: object) => {
  handleCommand(props.emitRegister, event, args)
}
const handleKeyDown = () => {
  //回车后执行搜索方法
  const keyDownEvents = props.commands.filter((item) => item.canKeyDown)
  keyDownEvents.map((event) => {
    handleEmit(event.command)
  })
}
</script>

<script lang="tsx">
export default {
  inheritAttrs: false
}
</script>

<style lang="scss" scoped>
.command {
  margin-right: 12px;
}
</style>
