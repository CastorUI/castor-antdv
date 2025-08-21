import { TFunc } from '#/castor-antdv'
import { App, getCurrentInstance, inject, ref } from 'vue'

export const I18N_KEY = Symbol('castor-antdv-i18n')

// 内置仅供库内部使用的双语文案（不对外暴露定制能力）
const internalMessages: Record<'zh-CN' | 'en-US', Record<string, string>> = {
  'zh-CN': {
    'common.selectPlaceholder': '请选择',
    'common.inputPlaceholder': '请输入',
    'common.none': '暂无',
    'common.yes': '是',
    'common.no': '否',
    'upload.clickToUploadImage': '点击上传图片',
    'table.total': '共 {total} 条'
  },
  'en-US': {
    'common.selectPlaceholder': 'please select',
    'common.inputPlaceholder': 'please enter',
    'common.none': 'N/A',
    'common.yes': 'Yes',
    'common.no': 'No',
    'upload.clickToUploadImage': 'click to upload image',
    'table.total': 'Total {total} items'
  }
}

const internalLocale = ref<'zh-CN' | 'en-US'>('zh-CN')

function interpolate(template: string, values?: Record<string, any>) {
  if (!template) return ''
  if (!values) return template
  return template.replace(/\{(.*?)\}/g, (_, k) => {
    const v = values[k]
    return v === undefined || v === null ? '' : String(v)
  })
}

export function provideI18n(app: App, t?: TFunc) {
  app.provide(I18N_KEY, { t })
}

export function useI18n() {
  const injected = inject<{ t?: TFunc } | null>(I18N_KEY, null)
  const instance = getCurrentInstance()
  const globalT: any = instance?.appContext?.config?.globalProperties?.$t

  const t = (key: string, fallback?: string, values?: Record<string, any>) => {
    try {
      if (injected?.t) {
        const r = injected.t(key, values)
        if (typeof r === 'string' && r !== key) return r
      }
      if (typeof globalT === 'function') {
        const r = globalT(key, values)
        if (typeof r === 'string' && r !== key) return r
      }
    } catch {
      // swallow and fallback
    }
  // 没有可用的 t：优先使用库内置中文文案；否则 fallback；否则 key
    const msg = internalMessages[internalLocale.value][key]
  if (msg) return interpolate(msg, values)
  if (fallback) return interpolate(fallback, values)
  return interpolate(key, values)
  }

  return { t }
}

export function setCastorAntdvLocale(locale: 'zh-CN' | 'en-US') {
  internalLocale.value = locale
}
