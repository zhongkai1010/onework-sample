<template>
  <ele-page :multi-card="false">
    <div class="user-wrapper">
      <ele-card
        :header-style="{ padding: '0 24px' }"
        :body-style="{ padding: 0, minHeight: '462px' }"
        class="user-body"
      >
        <template #header>
          <ele-tabs
            type="plain"
            size="large"
            v-model="active"
            :items="[{ name: 'info', label: '基本信息' }]"
          />
        </template>
        <user-form v-if="active === 'info'" :data="loginUser" @done="updateLoginUser" />
        <user-account v-if="active === 'account'" :data="loginUser" />
      </ele-card>
    </div>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { useUserStore } from '@/store/modules/user'
  import type { User } from '@/api/system/user/model'

  import UserForm from './components/user-form.vue'
  import UserAccount from './components/user-account.vue'

  defineOptions({ name: 'UserProfile' })

  const userStore = useUserStore()

  /** 标签页选中 */
  const active = ref('info')

  /** 登录用户信息 */
  const loginUser = computed(() => userStore.info ?? {})

  /** 修改登录用户 */
  const updateLoginUser = (data: User) => {
    userStore.setInfo({ ...loginUser.value, ...data })
  }
</script>

<style lang="scss" scoped>
  .user-wrapper {
    display: flex;

    .user-side {
      width: 320px;
      margin: 0 16px 0 0;
      flex-shrink: 0;
    }

    .user-body {
      flex: 1;
    }
  }

  @media screen and (max-width: 928px) {
    .user-wrapper .user-side {
      width: 240px;
    }
  }

  @media screen and (max-width: 768px) {
    .user-wrapper {
      display: block;

      .user-side {
        width: auto;
        margin: 0 0 16px 0;
      }
    }
  }
</style>
