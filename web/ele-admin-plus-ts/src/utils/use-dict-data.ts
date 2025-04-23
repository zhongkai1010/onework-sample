import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { EleMessage } from 'ele-admin-plus/es';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/modules/user';
import { listDictionaryData } from '@/api/system/dictionary-data';
import type { DictionaryData } from '@/api/system/dictionary-data/model';

/**
 * 获取字典数据hook
 * @param codes 字典编码
 */
export function useDictData(codes: string[]): ComputedRef<DictionaryData[]>[] {
  const result: ComputedRef<DictionaryData[]>[] = [];

  // 已缓存的字典
  const userStore = useUserStore();
  const { dicts } = storeToRefs(userStore);

  codes.forEach((code) => {
    result.push(computed<DictionaryData[]>(() => dicts.value[code] || []));
    // 若还未缓存过则获取字典数据
    if (dicts.value[code] != null) {
      return;
    }
    userStore.setDicts([], code);
    listDictionaryData({ dictCode: code })
      .then((list) => {
        userStore.setDicts(list, code);
      })
      .catch((e) => {
        EleMessage.error(e.message);
      });
  });

  return result;
}
