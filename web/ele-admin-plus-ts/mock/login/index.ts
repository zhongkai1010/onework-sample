import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/captcha',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: '操作成功',
        data: {
          base64:
            'data:image/png;base64,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',
          text: 'bzdbq'
        }
      };
    }
  },
  {
    url: '/api/login',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '登录成功',
        data: {
          access_token:
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VybmFtZVwiOlwiYWRtaW5cIixcInRlbmFudElkXCI6NH0iLCJleHAiOjE3NDU0NTc5NzIsImlhdCI6MTc0NTM3MTU3Mn0.zdBtnfRglTgRU1T3rwX5t93AmAsEN9Yk-_CmRAoABVw',
          user: {
            userId: 40,
            username: 'admin',
            password:
              '$2a$10$sWH.qQmf/dHMURzE4kN0puBOdB7VWwcDFB2NvwpMaHYz6OFZwQGBy',
            nickname: '管理员',
            avatar: 'https://cdn.eleadmin.com/20200610/avatar.jpg',
            sex: '2',
            phone: '12345678901',
            email: 'eleadmin@eclouds.com',
            emailVerified: 0,
            realName: null,
            idCard: null,
            birthday: '2021-05-21',
            introduction: '遗其欲，则心静！',
            organizationId: 31,
            status: 0,
            deleted: 0,
            tenantId: 4,
            createTime: '2020-01-13 14:43:52',
            updateTime: '2023-04-10 15:08:51',
            organizationName: 'XXX公司',
            sexName: '女',
            roles: [
              {
                roleId: 10,
                roleCode: 'admin',
                roleName: '管理员',
                comments: '管理员',
                deleted: 0,
                tenantId: 4,
                createTime: '2020-02-26 15:18:37',
                updateTime: '2020-03-21 15:15:54',
                userId: null
              }
            ],
            enabled: true,
            accountNonLocked: true,
            credentialsNonExpired: true,
            accountNonExpired: true
          }
        }
      };
    }
  }
] as MockMethod[];
