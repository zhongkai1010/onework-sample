export default [
  {
    url: '/api/mock/get/200',
    method: 'get',
    timeout: '2000',
    response: () => {
      return {
        code: 0,
        result: 'OK',
      }
    },
  },
  {
    url: '/api/mock/get/400',
    method: 'get',
    statusCode: 400,
    timeout: '2000',
    response: () => {
      return {
        code: -1,
        message: 'Internal Server Error',
      }
    },
  },
  {
    url: '/api/mock/get/500',
    method: 'get',
    timeout: '2000',
    statusCode: 500,
    response: () => {
      return {
        code: -1,
        message: 'Internal Server Error',
      }
    },
  },
  {
    url: '/api/mock/get/timeout',
    method: 'get',
    timeout: '1000000',

    response: () => {
      return {
        code: -1,
        message: 'Internal Server Error',
      }
    },
  },
  {
    url: '/login',
    method: 'post',
    response: ({ body }) => {
      if (body.username === 'admin') {
        return {
          success: true,
          data: {
            username: 'admin',
          },
        }
      } else {
        return {
          success: true,
          data: {
            username: 'common',
          },
        }
      }
    },
  },
]
