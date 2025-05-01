<!-- 富文本编辑器 -->
<template>
  <component v-if="inlineEditor" :is="tagName" :id="elementId" />
  <textarea v-else :id="elementId"></textarea>
  <!-- 文件选择弹窗 -->
  <FormItemRest>
    <FilePicker title="文件选择" :limit="1" :accept="filePickerAccept ? filePickerAccept + '*' : void 0" :params="{ contentType: filePickerAccept }" :base-index="19990099" v-model="showFilePicker" @done="handleFilePickerDone" @close="handleFilePickerClose" />
  </FormItemRest>
</template>

<script lang="ts" setup>
  import { ref, watch, onMounted, onBeforeUnmount, onActivated, onDeactivated, nextTick, useAttrs } from 'vue'
  import FormItemRest from 'ele-admin-plus/es/ele-app/components/form-item-rest'
  import FilePicker from '@/components/FilePicker/index.vue'
  import type { UserFile } from '@/api/system/user-file/model'
  import tinymce from 'tinymce/tinymce'
  import type { Editor as TinyMCEEditor, EditorEvent, RawEditorSettings } from 'tinymce'
  import 'tinymce/themes/silver'
  import 'tinymce/icons/default'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/preview'
  import 'tinymce/plugins/fullscreen'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/searchreplace'
  //import 'tinymce/plugins/save';
  //import 'tinymce/plugins/autosave';
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/autolink'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/media'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/codesample'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/advlist'
  import 'tinymce/plugins/hr'
  import 'tinymce/plugins/charmap'
  import 'tinymce/plugins/emoticons'
  import 'tinymce/plugins/anchor'
  import 'tinymce/plugins/directionality'
  import 'tinymce/plugins/pagebreak'
  import 'tinymce/plugins/quickbars'
  import 'tinymce/plugins/nonbreaking'
  import 'tinymce/plugins/visualblocks'
  import 'tinymce/plugins/visualchars'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/emoticons/js/emojis'
  import { storeToRefs } from 'pinia'
  import { useThemeStore } from '@/store/modules/theme'
  import { DEFAULT_CONFIG, DARK_CONFIG, uuid, bindHandlers, openAlert } from './util'
  import type { AlertOption } from './util'

  defineOptions({ name: 'TinymceEditor' })

  const props = withDefaults(
    defineProps<{
      /** 编辑器唯一id */
      id?: string
      /** v-model */
      modelValue?: string
      /** 编辑器配置 */
      init?: RawEditorSettings
      /** 是否内联模式 */
      inline?: boolean
      /** model events */
      modelEvents?: string
      /** 内联模式标签名 */
      tagName?: string
      /** 是否禁用 */
      disabled?: boolean
      /** 是否跟随框架主题 */
      autoTheme?: boolean
      /** 不跟随框架主题时是否使用暗黑主题 */
      darkTheme?: boolean
    }>(),
    {
      inline: false,
      modelEvents: 'change input undo redo',
      tagName: 'div',
      autoTheme: true
    }
  )

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const attrs = useAttrs()
  const themeStore = useThemeStore()
  const { darkMode } = storeToRefs(themeStore)

  /** 编辑器唯一id */
  const elementId: string = props.id || uuid('tiny-vue')

  /** 编辑器实例 */
  let editorIns: TinyMCEEditor | null = null

  /** 是否内联模式 */
  const inlineEditor: boolean = props.init?.inline || props.inline

  /** 更新value */
  const updateValue = (value: string) => {
    emit('update:modelValue', value)
  }

  /** 修改内容 */
  const setContent = (value?: string) => {
    if (editorIns && typeof value === 'string' && value !== editorIns.getContent()) {
      editorIns.setContent(value)
    }
  }

  /** 渲染编辑器 */
  const render = () => {
    const isDark = props.autoTheme ? darkMode.value : props.darkTheme
    tinymce.init({
      ...DEFAULT_CONFIG,
      ...(isDark ? DARK_CONFIG : {}),
      ...props.init,
      selector: `#${elementId}`,
      readonly: props.disabled,
      inline: inlineEditor,
      setup: (editor: TinyMCEEditor) => {
        editorIns = editor
        editor.on('init', (e: EditorEvent<any>) => {
          // 回显初始值
          if (props.modelValue) {
            setContent(props.modelValue)
          }
          // v-model
          editor.on(props.modelEvents, () => {
            updateValue(editor.getContent())
          })
          // valid events
          bindHandlers(e, attrs, editor)
        })
        if (typeof props.init?.setup === 'function') {
          props.init.setup(editor)
        }
      },
      // 文件上传调用文件选择器
      file_picker_callback: (callback: any, _value: any, meta: any) => {
        if (meta.filetype === 'image') {
          filePickerAccept.value = 'image/'
        } else if (meta.filetype === 'media') {
          filePickerAccept.value = 'video/'
        } else {
          filePickerAccept.value = void 0
        }
        showFilePicker.value = true
        currentEditorCallback = callback
      }
    })
  }

  /** 销毁编辑器 */
  const destory = () => {
    if (tinymce != null && editorIns != null) {
      tinymce.remove(editorIns as any)
      editorIns = null
    }
  }

  /** 弹出提示框 */
  const alert = (option?: AlertOption) => {
    openAlert(editorIns, option)
  }

  defineExpose({ editorIns, alert })

  watch(
    () => props.modelValue,
    (val, prevVal) => {
      if (val !== prevVal) {
        setContent(val || '')
      }
    }
  )

  watch(
    () => props.disabled,
    (disable) => {
      if (editorIns !== null) {
        if (typeof editorIns.mode?.set === 'function') {
          editorIns.mode.set(disable ? 'readonly' : 'design')
        } else {
          editorIns.setMode(disable ? 'readonly' : 'design')
        }
      }
    }
  )

  watch(
    () => props.tagName,
    () => {
      destory()
      nextTick(() => {
        render()
      })
    }
  )

  watch(darkMode, () => {
    if (props.autoTheme) {
      destory()
      nextTick(() => {
        render()
      })
    }
  })

  onMounted(() => {
    render()
  })

  onBeforeUnmount(() => {
    destory()
  })

  onActivated(() => {
    render()
  })

  onDeactivated(() => {
    destory()
  })

  /** 是否打开文件选择弹窗 */
  const showFilePicker = ref(false)

  /** 文件选择弹窗限制类型 */
  const filePickerAccept = ref<string>()

  /** 当前修改的文件项 */
  let currentEditorCallback: any = null

  /** 文件选择弹窗选择完成事件 */
  const handleFilePickerDone = (files: UserFile[]) => {
    showFilePicker.value = false
    if (files.length) {
      currentEditorCallback(files[0].url, {
        text: files[0].name,
        alt: files[0].name
      })
    }
    currentEditorCallback = null
  }

  /** 文件选择弹窗关闭事件 */
  const handleFilePickerClose = () => {
    currentEditorCallback = null
  }
</script>

<style>
  body .tox.tox-tinymce-aux,
  body.tox-fullscreen .tox.tox-tinymce-aux {
    z-index: 19990000;
  }

  .tox-menu.tox-collection.tox-collection--list {
    max-height: 420px !important;
  }

  textarea[id^='tiny-vue'] {
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
    box-sizing: border-box;
  }
</style>
