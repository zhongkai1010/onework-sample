import { reactive } from 'vue'
import type { UnwrapNestedRefs } from 'vue'
import { cloneDeep, set as setValue } from 'lodash-es'
type Result<T> = [
  UnwrapNestedRefs<T>,
  (field?: string, excludes?: string[]) => void,
  (data: object, excludes?: string[]) => void,
  (field: string, value: unknown) => void
] & {
  form: UnwrapNestedRefs<T>
  resetFields: (field?: string, excludes?: string[]) => void
  assignFields: (data: object, excludes?: string[]) => void
}

/**
 * 表单数据hook
 * @param initValue 初始值
 */
export function useFormData<T extends object>(init?: T): Result<T> {
  let initValue = init == null ? ({} as T) : cloneDeep(init)
  /** 表单数据 */
  const form = reactive(init == null ? ({} as T) : { ...init })

  /** 重置为初始值 */
  const resetFields = (field?: string, excludes?: string[]) => {
    const keys = Object.keys(form)
    if (typeof field === 'string' && field) {
      if (keys.includes(field)) {
        form[field] = cloneDeep(initValue[field])
      }
      return
    }
    keys.forEach((key) => {
      if (!excludes || !excludes.includes(key)) {
        form[key] = cloneDeep(initValue[key])
      }
    })
  }

  /** 赋值不改变字段 */
  const assignFields = (data: object, excludes?: string[] | boolean) => {
    if (excludes === true) {
      initValue = data == null ? ({} as T) : cloneDeep(data as T)
    }
    Object.keys(form).forEach((key) => {
      if (!excludes || excludes === true || !excludes.includes(key)) {
        form[key] = data?.[key]
      }
    })
  }

  /** 赋值某字段 */
  const setFieldValue = (field: string, value: unknown) => {
    //form[field] = value;
    setValue(form, field, value)
  }

  const result = [form, resetFields, assignFields, setFieldValue]
  // 支持对象解构以兼容旧版
  Object.assign(result, {
    form,
    resetFields,
    assignFields
  })
  return result as Result<T>
}
